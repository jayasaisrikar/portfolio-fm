import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilmShelf from '../components/FilmShelf';
import HalftoneArt from '../components/HalftoneArt';

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
  return <main id="main-content">
    <section className="profile-hero page-width">
      <Link className="line-link" to="/">← Back to the work</Link>
      <div className="profile-hero-grid">
        <div><span className="tiny-label" data-entrance>Jaya Sai Srikar / a little more personal</span><h1 data-entrance>More than<br /><span className="serif">the work.</span></h1></div>
        <div className="profile-plate" data-entrance><HalftoneArt kind="microphone" /></div>
      </div>
    </section>
    <section className="profile-lede page-width" data-reveal><h2>Engineer by trade.<br /><span className="serif">Curious by default.</span></h2><div><p>I grew up by the coast in Vizag. I still like things that make the world feel a little bigger: a good film, a city I haven’t figured out yet, an idea I can’t put down.</p><p>Engineering is how I follow that curiosity. I like the point where a rough idea meets a real constraint — where you have to make a trade-off, learn something, and try again.</p><p>I’m an AI Full-Stack Engineer at Blocksbridge Consulting and a co-founder of Quoril, an offline-first productivity app for macOS and Windows. Before that, I worked on engineering copilots and cloud infrastructure at Drishya AI Labs.</p><p>My independent work spans AI agents, market data, research infrastructure, and now Outspool — a self-hosted outbound platform. I care about systems people can understand, question, and trust.</p><Link className="line-link" to="/#experience">Explore my experience ↗</Link></div></section>
    <div className="profile-panorama"><img src="/images/ocean.jpg" alt="Ocean waves under soft coastal light" width="1600" height="900" loading="lazy" /><span>The coast has a way of putting things in perspective.</span></div>
    <div className="page-width">
      <section className="profile-section"><span className="tiny-label">OFF THE CLOCK / THE FILM SHELF</span><h2>For the love<br /><span className="serif">of a good story.</span></h2><p>World-building, careful frames, and films that stick around. Yes, there’s a lot of Nolan.</p><FilmShelf /><details className="complete-film-list"><summary className="line-link">Open the full watchlist +</summary><div className="film-shelf">{films.map((film, index) => <details className="film-row" key={film.title}><summary><span className="film-number">{String(index + 1).padStart(2, '0')}</span><span className="film-title">{film.title}</span><span className="film-year">{film.year}</span><span className="index-plus">+</span></summary><p>{film.note}</p></details>)}</div></details></section>
      <section className="places-section"><div><span className="tiny-label">PLACES & PERSPECTIVES</span><h2>A change<br /><span className="serif">of scenery.</span></h2><p>Some places are home.<br />Others help you see it differently.</p></div><div className="place-list">{places.map(([city, note], i) => <div key={city}><span className="place-index">{String(i + 1).padStart(2, '0')}</span><h3>{city}</h3><p>{note}</p></div>)}</div></section>
      <section className="toolkit-section profile-section"><div className="section-intro"><div><span className="tiny-label">HOW I BUILD</span><h2>Inside the <span className="serif">toolbox.</span></h2></div><p>Tools change. Curiosity helps.</p></div>{toolkit.map(([title, tools]) => <div className="toolkit-row" key={title}><h3>{title}</h3><p>{tools}</p></div>)}</section>
      <section className="recognition-note"><div><span className="tiny-label">EDUCATION & RECOGNITION</span><h3>Good teams. Hard problems.<br />A lot learned.</h3><p>Best Collaboration / MCP Track, ADK-TS Hackathon 2025.<br />Grand Finalist and Team Lead, Smart India Hackathon 2023.<br />Secretary, ACM JNTU-GV Student Chapter.</p><p>B.Tech in Information Technology · JNTU-GV · 2021–2025 · CGPA 8.24</p></div></section>
    </div>
  </main>;
}
