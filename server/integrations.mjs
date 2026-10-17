import { filmPicks } from '../src/data/film-picks.js';

const cache = new Map();
const pending = new Map();
const ttl = { github: 15 * 60_000, films: 24 * 60 * 60_000 };
export const curatedRepos = [
  { name: 'fork', description: 'Governed agent execution and decision simulation.', language: 'TypeScript' },
  { name: 'project-crosswake', description: 'Market-data research, backtesting, and paper signals.', language: 'TypeScript' },
  { name: 'on-chain-analysis-agent', description: 'Multi-agent crypto research with IQAI ADK.', language: 'TypeScript' },
  { name: 'spoc-agent', description: 'Repository analysis and architecture guidance.', language: 'Python' },
].map(repo => ({ ...repo, url: `https://github.com/jayasaisrikar/${repo.name}`, stars: null, pushedAt: null }));

async function cached(key, load) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.time < ttl[key]) return { ...hit.data, status: 'fresh' };
  if (pending.has(key)) return pending.get(key);
  const task = (async () => {
    try {
      const data = await load();
      cache.set(key, { data, time: Date.now() });
      return { ...data, status: 'fresh' };
    } catch {
      if (hit && Date.now() - hit.time < ttl[key] * 4) return { ...hit.data, status: 'stale' };
      return null;
    } finally { pending.delete(key); }
  })();
  pending.set(key, task);
  return task;
}
async function upstream(url, headers) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(6000) });
  if (!response.ok) throw new Error('Upstream unavailable');
  return response.json();
}
export async function workbench() {
  const result = await cached('github', async () => {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'jayasaisrikar-portfolio', 'X-GitHub-Api-Version': '2022-11-28' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const data = await upstream('https://api.github.com/users/jayasaisrikar/repos?type=owner&sort=pushed&direction=desc&per_page=100', headers);
    if (!Array.isArray(data)) throw new Error('Invalid response');
    const repos = data.filter(repo => !repo.private && !repo.fork && !repo.archived && !repo.disabled && repo.owner?.login?.toLowerCase() === 'jayasaisrikar' && /^[\w.-]+$/.test(repo.name) && !Number.isNaN(Date.parse(repo.pushed_at)))
      .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at)).slice(0, 4)
      .map(repo => ({ name: repo.name, description: typeof repo.description === 'string' ? repo.description.slice(0, 300) : 'An experiment from my public workbench.', url: `https://github.com/jayasaisrikar/${repo.name}`, language: typeof repo.language === 'string' ? repo.language : null, stars: Number.isSafeInteger(repo.stargazers_count) ? repo.stargazers_count : 0, pushedAt: repo.pushed_at }));
    if (!repos.length) throw new Error('No public repositories');
    return { repos, fetchedAt: new Date().toISOString() };
  });
  return result || { repos: curatedRepos, fetchedAt: null, status: 'curated' };
}
export async function filmShelf() {
  if (!process.env.TMDB_READ_TOKEN) return { films: filmPicks, status: 'curated', attribution: false };
  const result = await cached('films', async () => {
    // All lookups are fixed film IDs, not a public arbitrary-query proxy.
    const films = await Promise.all(filmPicks.map(async pick => {
      const data = await upstream(`https://api.themoviedb.org/3/movie/${pick.id}?language=en-US`, { Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`, Accept: 'application/json' });
      if (data.id !== pick.id || typeof data.title !== 'string') throw new Error('Invalid movie');
      const poster = typeof data.poster_path === 'string' && /^\/[\w.-]+$/.test(data.poster_path) ? `https://image.tmdb.org/t/p/w342${data.poster_path}` : null;
      return { ...pick, poster, runtime: Number.isFinite(data.runtime) && data.runtime > 0 ? data.runtime : null, genres: Array.isArray(data.genres) ? data.genres.slice(0, 2).map(g => g.name).filter(n => typeof n === 'string') : [], tmdbUrl: `https://www.themoviedb.org/movie/${pick.id}` };
    }));
    return { films, fetchedAt: new Date().toISOString(), attribution: true };
  });
  return result || { films: filmPicks, status: 'curated', attribution: false };
}
export async function handleApi(req, res) {
  const path = new URL(req.url || '/', 'http://localhost').pathname;
  if (path !== '/api/workbench' && path !== '/api/films') return false;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405; res.setHeader('Allow', 'GET, HEAD'); res.end(); return true;
  }
  const data = await (path === '/api/workbench' ? workbench() : filmShelf());
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const seconds = data.status === 'curated' ? 60 : path === '/api/workbench' ? 900 : 86400;
  res.setHeader('Cache-Control', `public, max-age=60, s-maxage=${seconds}, stale-while-revalidate=${seconds}`);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.statusCode = 200;
  res.end(req.method === 'HEAD' ? undefined : JSON.stringify(data));
  return true;
}
