import test from 'node:test';
import assert from 'node:assert/strict';

async function isolated() { return import(`../server/integrations.mjs?test=${crypto.randomUUID()}`); }
function response() {
  return { headers: {}, setHeader(name, value) { this.headers[name] = value; }, end(body) { this.body = body; } };
}
test('GitHub only exposes owned public non-fork repositories and caches the response', async () => {
  const original = globalThis.fetch;
  let calls = 0;
  const base = { name: 'public-project', owner: { login: 'jayasaisrikar' }, pushed_at: '2026-10-15T10:00:00Z', stargazers_count: 3, language: 'TypeScript', private: false };
  globalThis.fetch = async () => { calls++; return { ok: true, json: async () => [base, { ...base, private: true, name: 'private-project' }, { ...base, name: 'forked', fork: true }, { ...base, name: 'archived', archived: true }, { ...base, name: 'foreign', owner: { login: 'someone-else' } }] }; };
  try {
    const module = await isolated();
    const first = await module.workbench();
    assert.equal(first.status, 'fresh'); assert.equal(first.repos.length, 1);
    assert.equal(first.repos[0].url, 'https://github.com/jayasaisrikar/public-project');
    await module.workbench(); assert.equal(calls, 1);
  } finally { globalThis.fetch = original; }
});
test('upstream failure uses curated data, with no invented activity timestamps', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error('offline'); };
  try {
    const module = await isolated(); const result = await module.workbench();
    assert.equal(result.status, 'curated'); assert.equal(result.fetchedAt, null);
    assert(result.repos.every(repo => repo.pushedAt === null && repo.stars === null));
  } finally { globalThis.fetch = original; }
});
test('a previously fetched GitHub response survives a temporary outage as stale', async () => {
  const original = globalThis.fetch; const now = Date.now;
  globalThis.fetch = async () => ({ ok: true, json: async () => [{ name: 'fork', owner: { login: 'jayasaisrikar' }, pushed_at: '2026-10-15T00:00:00Z', stargazers_count: 1 }] });
  try {
    const module = await isolated(); await module.workbench();
    const time = now(); Date.now = () => time + 16 * 60_000;
    globalThis.fetch = async () => { throw new Error('offline'); };
    const result = await module.workbench(); assert.equal(result.status, 'stale'); assert.equal(result.repos[0].name, 'fork');
  } finally { globalThis.fetch = original; Date.now = now; }
});
test('film shelf works without a key and enriches only the fixed curated picks with a key', async () => {
  const original = globalThis.fetch; const token = process.env.TMDB_READ_TOKEN;
  delete process.env.TMDB_READ_TOKEN;
  try {
    const module = await isolated(); const plain = await module.filmShelf();
    assert.equal(plain.attribution, false); assert.equal(plain.films.length, 6);
    process.env.TMDB_READ_TOKEN = 'test-token-not-a-real-secret';
    let count = 0;
    globalThis.fetch = async url => { count++; const id = Number(new URL(url).pathname.split('/').pop()); return { ok: true, json: async () => ({ id, title: 'Metadata title', poster_path: '/poster.jpg', runtime: 120, genres: [{ name: 'Drama' }] }) }; };
    const enriched = await module.filmShelf();
    assert.equal(enriched.attribution, true); assert.equal(count, 6);
    assert.equal(enriched.films[0].title, plain.films[0].title);
    assert.equal(enriched.films[0].note, plain.films[0].note);
    assert.equal(enriched.films[0].poster, 'https://image.tmdb.org/t/p/w342/poster.jpg');
    assert(!JSON.stringify(enriched).includes('test-token-not-a-real-secret'));
  } finally { globalThis.fetch = original; if (token === undefined) delete process.env.TMDB_READ_TOKEN; else process.env.TMDB_READ_TOKEN = token; }
});
test('API rejects mutation requests and does not proxy arbitrary paths', async () => {
  const module = await isolated(); const res = response();
  assert.equal(await module.handleApi({ url: '/api/workbench', method: 'POST' }, res), true);
  assert.equal(res.statusCode, 405); assert.equal(res.headers.Allow, 'GET, HEAD');
  assert.equal(await module.handleApi({ url: '/api/random', method: 'GET' }, response()), false);
});
