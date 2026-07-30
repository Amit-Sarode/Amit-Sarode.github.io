const OPENROUTER_API_URL =
  'https://openrouter.ai/api/v1/chat/completions';

interface Env {
  OPENROUTER_API_KEY: string;
}

const ALLOWED_ORIGINS = [
  'https://amit-sarode.github.io',
  'http://localhost:5173',
];

function corsHeaders(origin: string | null): Record<string, string> {
  const originHeader = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': originHeader,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

/**
 * Durable free models tried, in order, when the requested model is
 * unavailable / rate-limited. The final entry is OpenRouter's auto-router,
 * which picks whatever free model is currently live — the safety net so a
 * single model's 429 can never crash the app.
 *
 * Slugs verified against OpenRouter's live `:free` list; the gpt-oss and
 * Llama 3.3 70B families are the most consistently-free.
 */
const FALLBACK_MODELS = [
  'openai/gpt-oss-120b:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'openrouter/free',
];

/**
 * Build the ordered list of models to try: the client's requested model first,
 * then the fallbacks — de-duplicated so we never call the same model twice.
 */
function buildModelChain(requested?: string): string[] {
  const chain: string[] = [];
  for (const m of [requested, ...FALLBACK_MODELS]) {
    if (m && !chain.includes(m)) {
      chain.push(m);
    }
  }
  return chain;
}

/**
 * A response counts as "unavailable" (try the next model) when the HTTP status
 * is a rate-limit / server error, OR when OpenRouter returns 200 with an error
 * body (it sometimes does for upstream rate limits).
 */
function isUnavailable(status: number, bodyText: string): boolean {
  if ([429, 402, 403, 502, 503].includes(status)) {
    return true;
  }
  if (status >= 200 && status < 300) {
    // 200 with an embedded provider error → treat as failure so we fall back.
    return /"error"\s*:/.test(bodyText) &&
      /rate.?limit|temporarily|unavailable|429|502|503/i.test(bodyText);
  }
  return false;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin');
    const ch = () => corsHeaders(origin);

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: ch(),
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: ch(),
      });
    }

    if (!env.OPENROUTER_API_KEY) {
      return new Response('Server config error', {
        status: 500,
        headers: ch(),
      });
    }

    // Parse the incoming payload so we can swap the model on fallback. We must
    // buffer it (rather than stream request.body straight through) because a
    // fallback means re-sending the request with a different model.
    let payload: Record<string, unknown>;
    try {
      payload = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        {
          status: 400,
          headers: { ...ch(), 'Content-Type': 'application/json' },
        }
      );
    }

    const models = buildModelChain(
      typeof payload.model === 'string' ? payload.model : undefined
    );

    let lastStatus = 502;
    let lastBody = JSON.stringify({ error: 'No model responded' });
    let lastContentType = 'application/json';

    for (const model of models) {
      let openRouterRes: Response;
      try {
        openRouterRes = await fetch(OPENROUTER_API_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...payload, model }),
        });
      } catch {
        // Network error reaching OpenRouter — try the next model.
        lastStatus = 502;
        lastBody = JSON.stringify({
          error: `Failed to contact OpenRouter (model ${model})`,
        });
        lastContentType = 'application/json';
        continue;
      }

      const bodyText = await openRouterRes.text();
      const contentType =
        openRouterRes.headers.get('Content-Type') || 'application/json';

      // Success → return immediately.
      if (!isUnavailable(openRouterRes.status, bodyText)) {
        const responseHeaders = new Headers(ch());
        responseHeaders.set('Content-Type', contentType);
        responseHeaders.set('Cache-Control', 'no-store');
        // Tell the client which model actually served the request.
        responseHeaders.set('X-Model-Used', model);
        return new Response(bodyText, {
          status: openRouterRes.status,
          statusText: openRouterRes.statusText,
          headers: responseHeaders,
        });
      }

      // Unavailable → remember it and fall through to the next model.
      lastStatus = openRouterRes.status;
      lastBody = bodyText;
      lastContentType = contentType;
    }

    // Every model in the chain was rate-limited / unavailable.
    const responseHeaders = new Headers(ch());
    responseHeaders.set('Content-Type', lastContentType);
    responseHeaders.set('Cache-Control', 'no-store');
    responseHeaders.set('X-Model-Fallback-Exhausted', 'true');
    return new Response(lastBody, {
      status: lastStatus,
      headers: responseHeaders,
    });
  },
};
