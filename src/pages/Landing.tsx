import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Asterisk, IdeaMachine, ProjectArt } from '../components/NotebookArt';
import { projects } from '../data/portfolio';

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 0, y: reduced ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0.1 : 0.65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

const projectStories = [
  { id: 'fork', label: '01 / AI THAT KNOWS ITS BOUNDARIES', heading: 'Giving agents a little accountability.', body: 'What happens between “the AI suggested it” and “the system did it”? FORK makes that gap explicit. Simulate the options, review the consequences, approve one plan. Then execute.', detail: 'Signed intent plans, policy-checked MCP calls, single-use capabilities, and an append-only ledger. Tested with 154 unit/integration tests, 14 Playwright tests, and 5 live ArmorIQ tests. Sandbox treasury, not real payments.', tags: 'TypeScript / Next.js / Hono / MCP' },
  { id: 'crosswake', label: '02 / FOLLOW THE EVIDENCE', heading: 'Less market noise. More honest research.', body: 'I wanted research I could replay, question, and trust. Crosswake brings live market data, backtesting, and paper signals together, with a record of how each conclusion was reached.', detail: 'Durable journals, typed Parquet datasets, freshness checks, walk-forward validation, realistic cost models, and a hash-chained signal log. A Mastra research harness coordinates specialist agents. No live-money trading.', tags: 'TypeScript / Mastra / Parquet / Linux' },
  { id: 'quoril', label: '03 / A PRODUCT CLOSE TO HOME', heading: 'Making room for a little more focus.', body: 'Some projects start with a big technical question. This one starts with an ordinary day. I co-founded Quoril to bring tasks, focus sessions, and workspaces into one offline-first desktop app.', detail: 'Built for macOS and Windows with React, Electron, and SQLite. Local persistence keeps the core experience available offline, with synchronization across workspaces.', tags: 'React / Electron / SQLite' },
];
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
      <motion.div className="hero-writing" initial={{ opacity: 0, y: reduced ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.1 : 0.7 }}>
        <span className="tiny-label hero-kicker"><span className="ink-dot" /> ENGINEER BY TRADE. CURIOUS BY DEFAULT.</span>
        <h1>Hi, I’m Jay.<br />I build things<br />I <span className="wish-word">wish<svg viewBox="0 0 250 20" preserveAspectRatio="none" aria-hidden="true"><path d="M5 13Q90 1 242 9M15 18Q135 7 229 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span> existed.</h1>
        <p className="hero-intro">AI systems, thoughtful software, and ideas that won’t leave me alone. I’m Jaya Sai Srikar — an engineer who likes turning “what if” into something you can use.</p>
        <a className="text-link hero-work-link" href="#projects">Come see what I’m making <span>↓</span></a>
      </motion.div>
      <motion.div className="hero-sketch" initial={{ opacity: 0, rotate: reduced ? 0 : 4 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: reduced ? 0.1 : 0.8, delay: reduced ? 0 : 0.15 }}><IdeaMachine /></motion.div>
      <div className="hero-bottom"><span>Currently building at <a href="#experience">Blocksbridge Consulting ↗</a></span><span className="hand-note">Part engineer, part “wait, what if…”</span><span>SCROLL TO WANDER ↓</span></div>
    </section>

    <section id="projects" className="work-section page-width">
      <Reveal className="section-intro"><div><span className="tiny-label">THINGS I’VE PUT INTO THE WORLD</span><h2>A few ideas<br />that became real.</h2></div><p>Independent projects, stubborn questions,<br className="desktop-break" /> and plenty of figuring it out along the way.<br /><span className="hand-note">Selected work, in no particular orbit.</span></p></Reveal>
      <div className="project-stories">{projectStories.map((story, index) => {
        const project = projects.find(p => p.id === story.id)!;
        return <Reveal className={`project-story ${index % 2 ? 'story-reversed' : ''}`} key={story.id}>
          <a className="project-picture" href={project.demoLink!} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}><ProjectArt kind={story.id} /><span className="picture-action">Take a look ↗</span></a>
          <div className="project-writing"><span className="tiny-label">{story.label}</span><h3>{story.heading}</h3><p>{story.body}</p><details className="project-detail"><summary>A little under the hood <span>+</span></summary><p>{story.detail}</p></details><span className="project-stack">{story.tags}</span><div className="project-links"><a className="text-link" href={project.demoLink!} target="_blank" rel="noreferrer">Visit {project.title} ↗</a>{project.repoLink && <a className="quiet-link" href={project.repoLink} target="_blank" rel="noreferrer">Source code ↗</a>}</div></div>
        </Reveal>;
      })}</div>
      <Reveal className="more-work"><div className="more-work-heading"><Asterisk /><h3>More rabbit holes.</h3><span className="hand-note">Because one project is never enough.</span></div>{projects.slice(3).map(p => <details className="work-index-row" key={p.id}><summary><span>{p.title}</span><span className="work-index-category">{p.badge}</span><span className="index-plus">+</span></summary><div className="work-index-content"><p>{p.fullDescription}</p><a className="text-link" href={p.repoLink!} target="_blank" rel="noreferrer">Explore on GitHub ↗</a></div></details>)}</Reveal>
    </section>

    <section id="about" className="about-note page-width"><Reveal className="about-note-inner"><div className="note-margin"><span className="tiny-label">A NOTE ABOUT THE PERSON</span><Asterisk /><span className="hand-note">There’s a person<br />behind the commits.</span></div><div className="about-note-copy"><h2>I like the messy bit<br />between idea and reality.</h2><p>The part where you have to ask better questions, change your mind, and make something actually work. That’s where I feel most at home.</p><p>I’m based in Vizag, on India’s east coast. My work lives somewhere between AI, product engineering, and infrastructure. Away from the screen, I’m usually thinking about films, finding a new place to wander, or going down another rabbit hole.</p><Link className="text-link" to="/profile">A little more about me ↗</Link></div></Reveal></section>

    <section id="experience" className="experience-notes page-width"><Reveal className="experience-layout"><div className="experience-heading"><span className="tiny-label">WHERE I’VE BEEN BUILDING</span><h2>Learning<br />by doing.</h2><p>Working on real systems, with real constraints, and learning something every time.</p><span className="hand-note">The journey, so far →</span></div><div className="career-list"><article className="career-entry"><span className="career-dates">NOV 2025 — NOW</span><h3>Blocksbridge Consulting</h3><p className="career-role">AI Full-Stack Engineer · Remote</p><p>I build across The Energy Mag ecosystem, from AI research and publishing automation to the platform behind Energy Investors Forum 2027.</p><details><summary>What that looks like <span>+</span></summary><p>Research-to-publication turnaround under 20 seconds. Full-stack event architecture for accounts, ticketing, directories, meetings, and messaging. Next.js, PostgreSQL, Redis, BullMQ, and Pretix, with authenticated webhooks and idempotent sync workers.</p></details></article><article className="career-entry"><span className="career-dates">JAN — OCT 2025</span><h3>Drishya AI Labs</h3><p className="career-role">Junior Software Engineer · Vizianagaram</p><p>Worked on Junior, an agentic engineering copilot, plus cloud-adapter libraries and the infrastructure that supported them.</p><details><summary>A few things I worked on <span>+</span></summary><p>Knowledge-graph-backed workflows for industrial documents, TypeScript/Python cloud adapters, and Django services. Terraform, Docker, and Azure/Kubernetes infrastructure. Automated deployments cut deployment time by 90% versus the prior manual process.</p></details></article><div className="career-footnote">B.Tech, Information Technology · JNTU-GV · 2021–2025<br />CGPA 8.24 / ACM Student Chapter Secretary</div></div></Reveal></section>

    <section className="off-clock page-width"><Reveal className="off-clock-inner"><div><span className="tiny-label">CLOSE THE LAPTOP FOR A SECOND</span><h2>There’s more<br />to the plot.</h2><p>Films with a little world-building. Places with a different pace. A good story, in almost any form.</p><Link className="text-link" to="/profile">Open my personal notebook ↗</Link></div><div className="film-note"><div className="ticket-top"><span>JAY’S WATCHLIST</span><span>ADMIT ONE</span></div><div className="ticket-body"><span className="hand-note">If you’re picking a film tonight…</span><h3 key={film} aria-live="polite">{films[film]}</h3><button className="text-link" onClick={() => setFilm(f => (f + 1) % films.length)}>Another one? <span>↻</span></button></div><div className="ticket-bottom"><span>NO SPOILERS. JUST GOOD STORIES.</span><span>✳</span></div></div></Reveal></section>
  </main>;
}
