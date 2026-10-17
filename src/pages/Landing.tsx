import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { Asterisk, IdeaMachine, ProjectArt } from '../components/NotebookArt';
import { projects } from '../data/portfolio';
import Experience from '../components/Experience';
import StarWarsDoodle from '../components/StarWarsDoodle';
import Reveal from '../components/Reveal';

const projectStories = [
  { id: 'fork', label: '01 / AI THAT KNOWS ITS BOUNDARIES', heading: 'Giving agents a little accountability.', body: 'What happens between “the AI suggested it” and “the system did it”? FORK makes that gap explicit. Simulate the options, review the consequences, approve one plan. Then execute.', detail: 'Signed intent plans, policy-checked MCP calls, single-use capabilities, and an append-only ledger. Tested with 154 unit/integration tests, 14 Playwright tests, and 5 live ArmorIQ tests. Sandbox treasury, not real payments.', tags: 'TypeScript / Next.js / Hono / MCP' },
  { id: 'crosswake', label: '02 / FOLLOW THE EVIDENCE', heading: 'Less market noise. More honest research.', body: 'I wanted research I could replay, question, and trust. Crosswake brings live market data, backtesting, and paper signals together, with a record of how each conclusion was reached.', detail: 'Durable journals, typed Parquet datasets, freshness checks, walk-forward validation, realistic cost models, and a hash-chained signal log. A Mastra research harness coordinates specialist agents. No live-money trading.', tags: 'TypeScript / Mastra / Parquet / Linux' },
  { id: 'quoril', label: '03 / A PRODUCT CLOSE TO HOME', heading: 'Making room for a little more focus.', body: 'Some projects start with a big technical question. This one starts with an ordinary day. I co-founded Quoril to bring tasks, focus sessions, and workspaces into one offline-first desktop app.', detail: 'Built for macOS and Windows with React, Electron, and SQLite. Local persistence keeps the core experience available offline, with synchronization across workspaces.', tags: 'React / Electron / SQLite' },
];
const heroItem: Variants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const films = ['The Grand Budapest Hotel', 'Forrest Gump', 'Interstellar', 'Star Wars: IV–VI', 'The Prestige', 'Inception'];

export default function Landing() {
  const { hash } = useLocation();
  const reduced = useReducedMotion();
  const [film, setFilm] = useState(0);
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0, behavior: 'instant' }); return; }
    const timer = setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }), 80);
    return () => clearTimeout(timer);
  }, [hash, reduced]);
  return <main id="main-content">
    <section className="notebook-hero page-width">
      <motion.div className="hero-writing" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } } }}>
        <motion.span className="tiny-label hero-kicker" variants={heroItem}><span className="ink-dot" /> ENGINEER BY TRADE. CURIOUS BY DEFAULT.</motion.span>
        <motion.h1 variants={heroItem}>Hi, I’m Jay.<br />I build things<br />I <span className="wish-word">wish<svg viewBox="0 0 250 20" preserveAspectRatio="none" aria-hidden="true"><motion.path initial={{ pathLength: reduced ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: reduced ? 0 : 0.9, ease: [0.65, 0, 0.35, 1] }} d="M5 13Q90 1 242 9M15 18Q135 7 229 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span> existed.</motion.h1>
        <motion.p className="hero-intro" variants={heroItem}>AI systems, thoughtful software, and ideas that won’t leave me alone. I’m Jaya Sai Srikar — an engineer who likes turning “what if” into something you can use.</motion.p>
        <motion.a className="text-link hero-work-link" variants={heroItem} href="#projects">Come see what I’m making <span>↓</span></motion.a>
      </motion.div>
      <motion.div className="hero-sketch" initial={{ opacity: 0, rotate: reduced ? 0 : 4, scale: reduced ? 1 : 0.96 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={reduced ? { duration: 0.1 } : { type: 'spring', stiffness: 90, damping: 16, delay: 0.25 }}><IdeaMachine /></motion.div>
      <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: reduced ? 0 : 0.8 }}><span>Currently building at <a href="#experience">Blocksbridge Consulting</a></span><span className="hand-note">Part engineer, part “wait, what if…”</span><span>SCROLL TO WANDER ↓</span></motion.div>
    </section>

    <section id="projects" className="work-section page-width">
      <Reveal className="section-intro"><div><span className="tiny-label">THINGS I’VE PUT INTO THE WORLD</span><h2>A few ideas<br />that became real.</h2></div><div className="work-intro-aside"><StarWarsDoodle kind="xwing" className="work-margin-doodle" /><p>Independent projects, stubborn questions,<br className="desktop-break" /> and plenty of figuring it out along the way.<br /><span className="hand-note">Selected work, in no particular orbit.</span></p></div></Reveal>
      <div className="project-stories">{projectStories.map((story, index) => {
        const project = projects.find(p => p.id === story.id)!;
        return <Reveal from={index % 2 ? 'right' : 'left'} className={`project-story ${index % 2 ? 'story-reversed' : ''}`} key={story.id}>
          <a className="project-picture" href={project.demoLink!} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}><ProjectArt kind={story.id} /><span className="picture-action">Take a look</span></a>
          <div className="project-writing"><span className="tiny-label">{story.label}</span><h3>{story.heading}</h3><p>{story.body}</p><details className="project-detail"><summary>A little under the hood <span>+</span></summary><p>{story.detail}</p></details><span className="project-stack">{story.tags}</span><div className="project-links"><a className="text-link" href={project.demoLink!} target="_blank" rel="noreferrer">Visit {project.title}</a>{project.repoLink && <a className="quiet-link" href={project.repoLink} target="_blank" rel="noreferrer">Source code</a>}</div></div>
        </Reveal>;
      })}</div>
      <Reveal className="more-work"><div className="more-work-heading"><Asterisk /><h3>More rabbit holes.</h3><span className="hand-note">Because one project is never enough.</span></div>{projects.slice(3).map(p => <details className="work-index-row" key={p.id}><summary><span>{p.title}</span><span className="work-index-category">{p.badge}</span><span className="index-plus">+</span></summary><div className="work-index-content"><p>{p.fullDescription}</p><a className="text-link" href={p.repoLink!} target="_blank" rel="noreferrer">Explore on GitHub</a></div></details>)}</Reveal>
    </section>

    <section id="about" className="about-note page-width"><Reveal className="about-note-inner"><div className="note-margin"><span className="tiny-label">A NOTE ABOUT THE PERSON</span><StarWarsDoodle kind="vader" /><span className="hand-note">There’s a person<br />behind the commits.</span></div><div className="about-note-copy"><h2>I like the messy bit<br />between idea and reality.</h2><p>The part where you have to ask better questions, change your mind, and make something actually work. That’s where I feel most at home.</p><p>I’m based in Vizag, on India’s east coast. My work lives somewhere between AI, product engineering, and infrastructure. Away from the screen, I’m usually thinking about films, finding a new place to wander, or going down another rabbit hole.</p><Link className="text-link" to="/profile">A little more about me</Link></div></Reveal></section>

    <Experience />

    <section className="off-clock page-width"><Reveal className="off-clock-inner"><div><StarWarsDoodle kind="deathstar" className="off-clock-doodle" /><span className="tiny-label">CLOSE THE LAPTOP FOR A SECOND</span><h2>There’s more<br />to the plot.</h2><p>Films with a little world-building. Places with a different pace. A good story, in almost any form.</p><Link className="text-link" to="/profile">Open my personal notebook</Link></div><div className="film-note"><div className="ticket-top"><span>JAY’S WATCHLIST</span><span>ADMIT ONE</span></div><div className="ticket-body"><span className="hand-note">If you’re picking a film tonight…</span><AnimatePresence mode="wait" initial={false}><motion.h3 key={film} aria-live="polite" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -10 }} transition={{ duration: 0.25 }}>{films[film]}</motion.h3></AnimatePresence><button className="text-link" onClick={() => setFilm(f => (f + 1) % films.length)}>Another one? <span>↻</span></button></div><div className="ticket-bottom"><span>NO SPOILERS. JUST GOOD STORIES.</span><span><Asterisk className="ticket-star" /></span></div></div></Reveal></section>
  </main>;
}
