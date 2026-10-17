import express from 'express';
import { resolve } from 'node:path';

// Mirrors Vercel clean URLs and real 404 responses for local production checks.
const option = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
};
const root = resolve('dist');
const app = express();
app.enable('strict routing');
app.get('/index.html', (_req, res) => res.redirect(301, '/'));
app.get(['/profile.html', '/profile/', '/profile/index.html'], (_req, res) => res.redirect(301, '/profile'));
app.use(express.static(root, { extensions: ['html'], redirect: false }));
app.use((_req, res) => res.status(404).sendFile(resolve(root, '404.html')));
const port = Number(option('--port', '4173'));
const host = option('--host', '127.0.0.1');
app.listen(port, host, () => console.log(`Production preview: http://${host}:${port}`));
