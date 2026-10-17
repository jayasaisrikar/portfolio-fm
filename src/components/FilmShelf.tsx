import { useEffect, useState } from 'react';
import { filmPicks } from '../data/film-picks';
import { Asterisk } from './NotebookArt';

type Film = typeof filmPicks[number] & { poster?: string | null; runtime?: number | null; genres?: string[]; tmdbUrl?: string };
export default function FilmShelf() {
  const [films, setFilms] = useState<Film[]>(filmPicks);
  const [selected, setSelected] = useState(0);
  const [attribution, setAttribution] = useState(false);
  const [failedPosters, setFailedPosters] = useState<number[]>([]);
  useEffect(() => {
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 9000);
    fetch('/api/films', { signal: abort.signal }).then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(data => {
      if (Array.isArray(data.films) && data.films.length === filmPicks.length && data.films.every((f: Film, i: number) => f.id === filmPicks[i].id)) { setFilms(data.films); setAttribution(Boolean(data.attribution)); }
    }).catch(() => {}).finally(() => clearTimeout(timer));
    return () => { clearTimeout(timer); abort.abort(); };
  }, []);
  const film = films[selected];
  return <div className="personal-film-shelf">
    <div className="film-feature">
      <div className="film-poster">{film.poster && !failedPosters.includes(film.id) ? <img src={film.poster} alt={`${film.title} film poster`} width="342" height="513" loading="lazy" onError={() => setFailedPosters(p => [...p, film.id])} /> : <div className="drawn-poster"><span className="tiny-label">JAY’S FILM CLUB</span><Asterisk className="poster-orbit" /><strong>{film.title}</strong><span>{film.year} / A PERSONAL PICK</span></div>}</div>
      <div className="film-feature-copy"><span className="tiny-label">ON THE SHELF / {String(selected + 1).padStart(2, '0')}</span><h3 aria-live="polite">{film.title}</h3><span className="film-meta">{film.year}{film.runtime ? ` · ${film.runtime} minutes` : ''}{film.genres?.length ? ` · ${film.genres.join(' / ')}` : ''}</span><span className="hand-note">Why it stays with me</span><p>{film.note}</p><button className="text-link" onClick={() => setSelected(i => (i + 1) % films.length)}>Pick another film ↻</button>{film.tmdbUrl && <a href={film.tmdbUrl} target="_blank" rel="noreferrer" className="quiet-link movie-details-link">Film details on TMDB</a>}</div>
    </div>
    <div className="film-selector" role="group" aria-label="Choose a film">{films.map((pick, i) => <button aria-pressed={selected === i} className={selected === i ? 'film-pick-active' : ''} onClick={() => setSelected(i)} key={pick.id}><span>{String(i + 1).padStart(2, '0')}</span>{pick.title}</button>)}</div>
    {attribution && <div className="tmdb-credit"><a href="https://www.themoviedb.org" target="_blank" rel="noreferrer"><img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB" width="100" height="14" /></a><p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p></div>}
  </div>;
}
