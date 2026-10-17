import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Asterisk } from '../components/NotebookArt';
import StarWarsDoodle from '../components/StarWarsDoodle';

const films = [
  { title: 'Forrest Gump', year: '1994', note: 'Life is random, yet everything connects. A reminder that showing up consistently beats being the smartest in the room.' },
  { title: 'The Grand Budapest Hotel', year: '2014', note: 'Every frame is a lesson in craft and obsessive attention to detail. Style and substance can absolutely live together.' },
  { title: 'Star Wars: I–III', year: '1999–2005', note: 'The fall of Anakin is a tragedy I keep coming back to. I have a soft spot for the prequels.' },
  { title: 'Star Wars: IV–VI', year: '1977–1983', note: 'The rebellion, the imagination, the hero’s journey. The original trilogy still feels timeless.' },
  { title: 'Interstellar', year: '2014', note: 'The audacity of thinking at a cosmic scale. A reminder to dream a little bigger.' },
  { title: 'Inception', year: '2010', note: 'Layers within layers. I love a story whose architecture is part of the experience.' },
  { title: 'The Dark Knight Trilogy', year: '2005–2012', note: 'Chaos, order, and characters who make you question both. Nolan is a recurring theme on this shelf.' },
  { title: 'The Prestige', year: '2006', note: 'Obsession, sacrifice, misdirection. A story that rewards paying attention.' },
  { title: 'Oppenheimer', year: '2023', note: 'The weight of building something that changes the world. A film that stays with you.' },
  { title: 'Dunkirk', year: '2017', note: 'Tension, restraint, and a story told through intersecting timelines.' },
  { title: 'The Mandalorian', year: '2019–', note: 'Atmosphere, restraint, and earned emotion. This is the way.' },
  { title: 'Obi-Wan Kenobi', year: '2022', note: 'Ewan McGregor carrying the weight of a broken galaxy. That final duel.' },
];
const places = [
  ['Vizag', 'Home, by the Bay of Bengal.'], ['Hyderabad', 'Biryani, big tech, and late-night hackathons.'], ['Bengaluru', 'A city full of people building things.'], ['Agra', 'The Taj at sunrise.'], ['New Delhi', 'History and a little capital-city chaos.'], ['Varkala', 'Cliffs over the Arabian Sea.'], ['Trivandrum', 'A calmer rhythm down south.'], ['Jaipur', 'Pink streets, forts, and palaces.'],
];
const toolkit = [
  ['The everyday tools', 'TypeScript, JavaScript, Python, SQL, React, Next.js, Node.js, Hono, Fastify, FastAPI, Django, Electron'],
  ['The AI side', 'LLM APIs, multi-agent systems, Mastra, MCP, agent harnesses, tool calling, memory, knowledge graphs, structured outputs'],
  ['Keeping it running', 'PostgreSQL, SQLite, MySQL, TimescaleDB, Redis, BullMQ, Docker, Kubernetes, Terraform, AWS, Azure, Linux, GitHub Actions, Grafana'],
  ['Following the evidence', 'Backtesting, pairs trading, Kalman filters, risk and cost modeling, DeFi, EVM/L2s, cross-chain systems, on-chain analytics'],
];
export default function DetailedProfile() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  return <main id="main-content" className="personal-notebook page-width">
    <Link to="/" className="quiet-link back-home">← Back to my corner</Link>
    <section className="personal-intro"><div><span className="tiny-label">THE PERSON, BETWEEN THE PROJECTS</span><h1>A little less code.<br />A little more <span className="personal-me">me.</span></h1></div><span className="hand-note">Not everything<br />needs a README. <svg viewBox="0 0 120 55" aria-hidden="true"><path d="M7 5q15 43 99 34m-15-12 17 12-20 8" fill="none" stroke="currentColor" strokeWidth="2" /></svg></span></section>
    <section className="personal-letter"><div className="letter-side"><Asterisk /><span className="hand-note">Hey, I’m Jay.</span></div><div><p className="letter-lede">I grew up by the coast in Vizag. I still like things that make the world feel a little bigger.</p><p>A good film. A city I haven’t figured out yet. An idea that starts as a small question and turns into a project I can’t put down.</p><p>Engineering is how I follow that curiosity. I like the part where a rough idea meets a real constraint — where you have to make a trade-off, learn something, and try again. My projects span AI systems, market research, and productivity tools, but the thread is the same: make something useful, and care about how it works.</p><p>These days, I’m an AI Full-Stack Engineer at Blocksbridge Consulting. Before that, I worked on agentic engineering tools and cloud infrastructure at Drishya AI Labs. <Link to="/#experience">The work story is over here ↗</Link></p><span className="hand-note letter-signature">Always a work in progress,<br />Jay.</span></div></section>
    <section className="cinema-section"><div className="section-intro"><div><span className="tiny-label">THE UNOFFICIAL FILM CLUB</span><h2>Roll the credits.<br />Then talk about it.</h2></div><div className="cinema-intro-aside"><p>World-building, careful frames,<br />and stories that stick around.<br /><span className="hand-note">Yes, there’s a lot of Nolan.</span></p><StarWarsDoodle kind="vader" className="cinema-doodle" /></div></div><div className="film-shelf">{films.map((film, index) => <details className="film-row" key={film.title}><summary><span className="film-number">{String(index + 1).padStart(2, '0')}</span><span className="film-title">{film.title}</span><span className="film-year">{film.year}</span><span className="index-plus">+</span></summary><p>{film.note}</p></details>)}</div></section>
    <section className="places-section"><div><span className="tiny-label">A FEW PINS ON THE MAP</span><h2>A change<br />of scenery.</h2><p>Some places are home.<br />Others help you see it differently.</p><svg className="travel-sketch" viewBox="0 0 280 150" fill="none" aria-hidden="true"><path d="M18 114c73 57 40-144 144-52s83 19 67-3" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" /><path d="m208 30 46-15-13 45-11-20-22-10Z m22 10 24-25" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg></div><div className="place-list">{places.map(([city, note], i) => <div key={city}><span className="place-index">{String(i + 1).padStart(2, '0')}</span><h3>{city}{city === 'Vizag' && <span className="hand-note">← home</span>}</h3><p>{note}</p></div>)}</div></section>
    <section className="toolkit-section"><div className="section-intro"><div><span className="tiny-label">THE STUFF I REACH FOR</span><h2>Inside the toolbox.</h2></div><p>Tools change. Curiosity helps.</p></div>{toolkit.map(([title, tools]) => <div className="toolkit-row" key={title}><h3>{title}</h3><p>{tools}</p></div>)}</section>
    <section className="recognition-note"><Asterisk /><div><span className="tiny-label">A FEW MOMENTS ALONG THE WAY</span><h3>Good teams. Hard problems. A lot learned.</h3><p>Best Collaboration / MCP Track, ADK-TS Hackathon 2025.<br />Grand Finalist and Team Lead, Smart India Hackathon 2023.<br />Secretary, ACM JNTU-GV Student Chapter.</p><p>B.Tech in Information Technology · JNTU-GV · 2021–2025 · CGPA 8.24</p></div></section>
  </main>;
}
