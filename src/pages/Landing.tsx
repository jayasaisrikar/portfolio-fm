import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects } from '../data/portfolio';
import Experience from '../components/Experience';
import Workbench from '../components/Workbench';
import ForkPlayground from '../components/ForkPlayground';
import ProjectVisual from '../components/ProjectVisual';
import HalftoneArt from '../components/HalftoneArt';

const selectedIds = ['outspool', 'crosswake', 'fork', 'quoril'];
const summaries: Record<string, string> = {
  outspool: 'From a company’s website to the right conversation. Self-hosted outbound with an AI copilot, your own models, and a human in control.',
  crosswake: 'Market data you can replay. Research you can question. A platform for causal backtests and auditable paper signals.',
  fork: 'A deliberate pause between an agent’s proposal and its action. Simulate the options, approve one plan, trace every decision.',
  quoril: 'A quieter place to get things done. An offline-first desktop workspace for tasks, focus, and the rhythm of a working day.',
};
export default function Landing() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0, behavior: 'instant' }); return; }
    let target: HTMLElement | null = null;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
    const timer = window.setTimeout(() => target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }), 100);
    return () => clearTimeout(timer);
  }, [hash]);
  return <main id="main-content">
    <section className="press-hero">
      <div className="hero-masthead page-width" data-entrance>
        <span>Jaya Sai Srikar</span>
        <span>Vizag, India · Bay of Bengal</span>
        <span>AI full-stack engineer</span>
      </div>
      <div className="hero-grid page-width">
        <div className="hero-type">
          <h1 aria-label="Engineering, with intent.">
            <span className="title-mask"><span data-title-line>Engineering,</span></span>
            <span className="title-mask"><span data-title-line>with <em>intent.</em></span></span>
          </h1>
          <div className="hero-lede" data-entrance>
            <span className="hero-hairline" aria-hidden="true" />
            <p>I turn complex ideas into software that works. AI systems, thoughtful products, and the infrastructure that holds it all together.</p>
          </div>
          <div className="hero-end" data-entrance>
            <a href="#projects" className="hero-explore">Explore selected work <span><ArrowDown size={16} /></span></a>
            <div className="hero-roles">AI Full-Stack Engineer · Blocksbridge<br /><a href="https://quoril.in" target="_blank" rel="noreferrer">Co-founder · Quoril <ArrowUpRight size={11} /></a></div>
            <span className="hero-edition">From the coast.<br />For the curious.</span>
          </div>
        </div>
        <figure className="hero-plate" data-entrance><HalftoneArt kind="radio" /></figure>
      </div>
      <div className="hero-folio page-width" aria-hidden="true">
        <span>Vizag, India · Engineer &amp; builder</span>
        <span>A study in curiosity &amp; craft</span>
      </div>
    </section>

    <div className="discipline-ribbon" aria-label="AI systems, product engineering, market infrastructure"><div className="discipline-track" aria-hidden="true">{[0, 1].map(i => <span key={i}>AI systems <i>◆</i> Product engineering <i>◆</i> Market infrastructure <i>◆</i> Independent thinking <i>◆</i></span>)}</div></div>
    <section id="projects" className="selected-work page-width">
      <div className="work-heading" data-reveal><div><span className="tiny-label">Selected work / 2025—26</span><h2>Built from<br /><span className="serif">curiosity.</span></h2></div><div><p>Independent products. Uncomfortable questions.<br />Ideas taken all the way to working software.</p><a className="line-link" href="https://github.com/jayasaisrikar" target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={16} /></a></div></div>
      <div className="portfolio-grid">{selectedIds.map((id, index) => {
        const project = projects.find(p => p.id === id)!;
        return <article id={id} className={`portfolio-project project-${id}`} key={id} data-reveal>
          <a className="project-art-link" href={project.demoLink || project.repoLink!} target="_blank" rel="noreferrer" aria-label={`Explore ${project.title}`}><ProjectVisual kind={id} /><span className="project-open"><ArrowUpRight size={20} /></span>{id === 'outspool' && <span className="project-wip"><i /> Currently building</span>}</a>
          <div className="project-title-row"><h3>{project.title}</h3><span>{String(index + 1).padStart(2, '0')} / {id === 'quoril' ? 'Co-founder' : id === 'outspool' ? 'Work in progress' : 'Independent project'}</span></div>
          <p>{summaries[id]}</p><div className="project-bottom-row"><span>{project.tech.slice(0, 3).join(' / ')}</span><div>{project.repoLink && <a href={project.repoLink} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`}>Source <ArrowUpRight size={12} /></a>}{project.demoLink && <a href={project.demoLink} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}>Visit <ArrowUpRight size={12} /></a>}</div></div>
          <details className="project-notes"><summary>Behind the build <span>+</span></summary><p>{project.fullDescription}</p>{id === 'fork' && <a className="line-link" href="#fork-playground">Try the interactive example <ArrowDown size={14} /></a>}</details>
        </article>;
      })}</div>
      <div className="project-archive"><span className="tiny-label">More explorations</span>{projects.filter(p => !selectedIds.includes(p.id)).map(p => <a key={p.id} href={p.repoLink!} target="_blank" rel="noreferrer"><span>{p.title}</span><span>{p.badge}</span><ArrowUpRight size={18} /></a>)}</div>
    </section>

    <section id="about" className="home-about">
      <div className="page-width about-grid"><div className="about-image"><img src="/images/ocean.jpg" alt="Ocean waves under soft coastal light" loading="lazy" width="900" height="1100" data-parallax /><span>By the coast. Always curious.</span></div><div className="about-editorial" data-reveal><span className="tiny-label">The person behind the projects</span><h2>Depth in the work.<br /><span className="serif">Room to wander.</span></h2><p>I’m Jay — an engineer, co-founder, and curious person from Vizag, on India’s east coast.</p><p>I enjoy the messy space between an idea and something useful. My work moves between AI agents, market research, and product engineering. The thread is the same: understand the problem, care about the details, and build it properly.</p><p>Away from the keyboard: good films, new places, and the occasional Star Wars rabbit hole.</p><Link className="line-link" to="/profile">A little more about me <ArrowRight size={17} /></Link></div></div>
    </section>
    <Experience />
    <ForkPlayground />
    <Workbench />
    <section className="closing-note page-width"><span className="tiny-label">A constant through all of it</span><p>Stay curious.<br />Make things <span className="serif">that matter.</span></p><Link className="line-link" to="/profile">Outside the work <ArrowUpRight size={17} /></Link></section>
  </main>;
}
