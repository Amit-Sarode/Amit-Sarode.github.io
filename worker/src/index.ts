const OPENROUTER_API_URL =
  'https://openrouter.ai/api/v1/chat/completions';

interface Env {
  OPENROUTER_API_KEY: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://amit-sarode.github.io',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders,
      });
    }

    if (!env.OPENROUTER_API_KEY) {
      return new Response('Server config error', {
        status: 500,
        headers: corsHeaders,
      });
    }

    try {
      const openRouterRes = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: request.body,
      });

      const responseHeaders = new Headers();

      // Preserve content type from OpenRouter
      responseHeaders.set(
        'Content-Type',
        openRouterRes.headers.get('Content-Type') ||
          'application/json'
      );

      responseHeaders.set('Cache-Control', 'no-store');

      // Add CORS headers
      Object.entries(corsHeaders).forEach(([key, value]) => {
        responseHeaders.set(key, value);
      });

      return new Response(openRouterRes.body, {
        status: openRouterRes.status,
        statusText: openRouterRes.statusText,
        headers: responseHeaders,
      });

    } catch {
      return new Response(
        JSON.stringify({
          error: 'Failed to contact OpenRouter',
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }
  },
};