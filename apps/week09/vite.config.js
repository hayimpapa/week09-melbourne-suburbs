import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Dev-only Vite plugin that mounts the Vercel serverless function at
// /api/recommend during `npm run dev`. In production on Vercel, this plugin
// is ignored and Vercel serves the same file from `api/recommend.js` directly.
function apiDevPlugin() {
  return {
    name: 'week09-api-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/recommend', async (req, res) => {
        try {
          // Buffer the body and parse JSON so the handler sees req.body as
          // a plain object (matching Vercel's behaviour).
          let raw = '';
          for await (const chunk of req) raw += chunk;
          req.body = raw ? JSON.parse(raw) : {};

          // Polyfill the Express-ish res helpers Vercel provides.
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(data));
            return res;
          };

          const mod = await server.ssrLoadModule('/api/recommend.js');
          await mod.default(req, res);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('[api-dev]', e);
          res.statusCode = 500;
          res.setHeader('content-type', 'application/json');
          res.end(
            JSON.stringify({
              error: 'Dev API handler threw',
              detail: e?.message ?? String(e),
            })
          );
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env vars (including non-VITE_) and push them into process.env
  // so the serverless function can read ANTHROPIC_API_KEY during dev.
  const env = loadEnv(mode, process.cwd(), '');
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }

  return {
    plugins: [react(), apiDevPlugin()],
    server: {
      port: 5173,
    },
  };
});
