import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const home = await readFile('dist/index.html', 'utf8');
const profile = await readFile('dist/profile.html', 'utf8');
const notFound = await readFile('dist/404.html', 'utf8');
for (const [path, html] of [['/', home], ['/profile', profile]]) {
  assert(html.includes('data-prerendered'), `${path}: missing pre-rendered content`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: expected one h1`);
  assert.equal((html.match(/<title[\s>]/g) || []).length, 1, `${path}: duplicate/missing title`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${path}: duplicate/missing canonical`);
  assert(html.includes(`href="https://jayasaisrikar.xyz${path}"`), `${path}: incorrect canonical`);
  assert(html.includes('Co-founder'), `${path}: missing co-founder content`);
  assert(html.includes('og:image') && html.includes('social-card.png'), `${path}: missing social image`);
  assert(!html.includes('Jay_Resume.pdf'), `${path}: resume must stay private`);
  assert(!html.includes('<!--seo-head-->'), `${path}: unfilled template`);
  const schema = JSON.parse(html.match(/<script data-seo type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert(schema['@graph'].some(entity => entity['@type'] === 'Person'));
  assert(schema['@graph'].some(entity => entity['@type'] === (path === '/' ? 'WebPage' : 'ProfilePage')));
}
assert(home.includes('From breaking news to publication') && home.includes('Drishya AI Labs'), 'Experience must be in the initial HTML');
assert(profile.includes('Inside the toolbox.') && profile.includes('Forrest Gump'), 'Profile content must be in the initial HTML');
assert.notEqual(home.match(/<title[^>]*>(.*?)<\/title>/s)[1], profile.match(/<title[^>]*>(.*?)<\/title>/s)[1]);
assert(notFound.includes('noindex, follow') && !notFound.includes('rel="canonical"'));
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.equal((sitemap.match(/<url>/g) || []).length, 2);
assert(!sitemap.includes('404') && !sitemap.includes('localhost'));
const robots = await readFile('dist/robots.txt', 'utf8');
assert(robots.includes('Allow: /') && robots.includes('https://jayasaisrikar.xyz/sitemap.xml'));
await access('dist/llms.txt');
await access('dist/social-card.png');
console.log('SEO checks passed: static content, per-page metadata, structured data, canonical URLs, crawl files, social card, and noindex 404.');
