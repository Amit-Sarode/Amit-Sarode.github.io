const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface Env {
  OPENROUTER_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    if (!env.OPENROUTER_API_KEY) {
      return new Response('Server config error', { status: 500 });
    }

    const openRouterRes = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: request.body,
    });

    return new Response(openRouterRes.body, {
      status: openRouterRes.status,
      statusText: openRouterRes.statusText,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-store',
      },
    });
  },
};
