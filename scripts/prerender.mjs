import { readFile, writeFile, rm } from 'node:fs/promises';
import { render, renderHead, indexedPaths, site } from '../.prerender/entry-server.js';

const template = await readFile('dist/index.html', 'utf8');
for (const path of [...indexedPaths, '/404']) {
  const output = path === '/' ? 'dist/index.html' : path === '/404' ? 'dist/404.html' : `dist${path}.html`;
  const html = template.replace('<!--seo-head-->', renderHead(path)).replace('<div id="root"></div>', `<div id="root" data-prerendered>${render(path)}</div>`);
  await writeFile(output, html);
  console.log(`Pre-rendered ${path} → ${output}`);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexedPaths.map(path => `  <url><loc>${site.url}${path}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile('dist/sitemap.xml', sitemap);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
await rm('.prerender', { recursive: true, force: true });
