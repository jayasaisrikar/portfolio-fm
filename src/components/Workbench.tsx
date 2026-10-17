import { useEffect, useState } from 'react';
import { projects } from '../data/portfolio';
import Reveal from './Reveal';

type Repo = { name: string; description: string; url: string; language: string | null; stars: number | null; pushedAt: string | null };
type Feed = { repos: Repo[]; status: 'curated' | 'fresh' | 'stale'; fetchedAt?: string | null };
const fallback: Feed = { status: 'curated', repos: projects.filter(p => p.repoLink).slice(0, 4).map(p => ({ name: p.title, description: p.description, url: p.repoLink!, language: null, stars: null, pushedAt: null })) };
const date = (value: string) => new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });

export default function Workbench() {
  const [feed, setFeed] = useState<Feed>(fallback);
  useEffect(() => {
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 9000);
    fetch('/api/workbench', { signal: abort.signal }).then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(data => {
      if (Array.isArray(data.repos) && data.repos.length && ['fresh', 'stale', 'curated'].includes(data.status)) setFeed(data);
    }).catch(() => {}).finally(() => clearTimeout(timeout));
    return () => { clearTimeout(timeout); abort.abort(); };
  }, []);
  return <section id="workbench" className="live-workbench page-width">
    <Reveal><div className="section-intro"><div><span className="tiny-label">THE WORKBENCH / PUBLIC EXPERIMENTS</span><h2>Still making.<br />Still figuring it out.</h2></div><div className="workbench-status"><span className="hand-note">A peek at what’s moving.</span><p>{feed.status === 'fresh' ? 'Recently pushed public repositories.' : feed.status === 'stale' ? 'A saved look at my public repositories.' : 'A few selected public projects.'}</p>{feed.fetchedAt && <span>Checked {date(feed.fetchedAt)}</span>}</div></div>
    <div className="repo-ledger">{feed.repos.map((repo, i) => <a className="repo-entry" href={repo.url} key={repo.url} target="_blank" rel="noreferrer"><span className="repo-number">{String(i + 1).padStart(2, '0')}</span><div><h3>{repo.name.replace(/-/g, ' ')}</h3><p>{repo.description}</p><div className="repo-facts">{repo.language && <span>{repo.language}</span>}{repo.pushedAt && <span>Pushed {date(repo.pushedAt)}</span>}{repo.stars !== null && <span>{repo.stars} {repo.stars === 1 ? 'star' : 'stars'}</span>}</div></div><span className="repo-arrow" aria-hidden="true">↗</span></a>)}</div>
    <a className="text-link workbench-github" href="https://github.com/jayasaisrikar" target="_blank" rel="noreferrer">Wander through my GitHub</a></Reveal>
  </section>;
}
