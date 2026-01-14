export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Route /commands to /commands/index.html
    if (pathname === '/commands' || pathname === '/commands/') {
      pathname = '/commands/index.html';
    }

    // Default to index.html for root
    if (pathname === '/') {
      pathname = '/index.html';
    }

    try {
      const response = await env.ASSETS.fetch(new Request(new URL(pathname, request.url), request));
      return response;
    } catch (e) {
      // Fallback to index.html for SPA routing
      return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
    }
  }
};
