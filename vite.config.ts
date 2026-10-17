import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { renderHead } from './src/lib/seo';
import { handleApi } from './server/integrations.mjs';
import { config } from 'dotenv';
config({ path: '.env.local', quiet: true });

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), {
      name: 'portfolio-data-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          handleApi(req, res).then(handled => { if (!handled) next(); }).catch(next);
        });
      },
    }, {
      name: 'development-page-metadata',
      apply: 'serve',
      transformIndexHtml(html, context) {
        return html.replace('<!--seo-head-->', renderHead(context.path));
      },
    }],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
