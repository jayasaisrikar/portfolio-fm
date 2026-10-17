import StarWarsDoodle from './StarWarsDoodle';
import Reveal from './Reveal';

export default function Experience() {
  return <section id="experience" className="experience-notes page-width">
    <div className="experience-layout experience-expanded">
      <Reveal className="experience-heading">
        <span className="tiny-label">EXPERIENCE / THE WORK BEHIND THE WORK</span>
        <h2>A few chapters<br />in the making.</h2>
        <p>Co-founding Quoril, building engineering copilots, and shipping publishing pipelines and event platforms. Here’s where I’ve been putting the pieces together.</p>
        <StarWarsDoodle kind="r2" />
        <span className="hand-note career-margin-note">Build it. Learn from it.<br />Make it better.</span>
      </Reveal>
      <div className="career-list career-timeline">

        <Reveal className="career-entry career-chapter">
          <div className="career-chapter-top"><span className="career-dates">NOV 2025 — PRESENT</span><span className="career-current">CURRENT CHAPTER</span></div>
          <h3>Blocksbridge Consulting</h3>
          <p className="career-role">AI Full-Stack Engineer</p>
          <span className="career-location">Remote · New York, USA</span>
          <p className="career-overview">I build the systems around the story — how energy news becomes researched content, and how an industry event becomes a connected platform.</p>
          <div className="career-contributions">
            <div><h4>From breaking news to publication</h4><p>Built AI research and publishing harnesses for The Energy Mag, connecting source discovery, feeds, agent-driven research, article generation, and automated publication.</p><p className="career-outcome"><strong>Under 20 seconds</strong> from breaking news to a researched, structured article.</p></div>
            <div><h4>An event platform, end to end</h4><p>Own the full-stack architecture for Energy Investors Forum 2027: accounts, ticketing, networking, attendee and company directories, meetings, messaging, and admin workflows.</p><p>Designed authentication, email verification, entitlements, sessions, versioned APIs, and background jobs. Connected Pretix through authenticated webhooks, idempotent sync, reconciliation, and admin recovery paths.</p></div>
            <div><h4>Keeping production honest</h4><p>Operate Next.js frontends, WordPress, APIs, and Linux/Docker services. Debug feed regressions, data-freshness issues, and stale caches, with integration and lifecycle tests supporting the platform.</p></div>
          </div>
          <div className="career-tools" aria-label="Technologies used"><span>Next.js</span><span>TypeScript</span><span>PostgreSQL</span><span>Redis / BullMQ</span><span>Docker / AWS</span><span>Pretix</span></div>
          <a className="text-link career-project-link" href="https://theenergymag.com" target="_blank" rel="noreferrer">The Energy Mag</a>
        </Reveal>
        <Reveal className="career-entry career-chapter career-founder">
          <div className="career-chapter-top"><span className="career-dates">BUILDING A PRODUCT OF OUR OWN</span><span className="career-current">CO-FOUNDER</span></div>
          <h3>Quoril</h3>
          <p className="career-role">Co-founder</p>
          <span className="career-location">Offline-first productivity · macOS &amp; Windows</span>
          <p className="career-overview">Co-founding Quoril means taking the product from an idea to something people can use: a quieter place for tasks, focus sessions, activity analysis, and workspaces.</p>
          <div className="career-contributions">
            <div><h4>Building the product, not just a feature</h4><p>Co-founded and built a cross-platform desktop app that brings everyday productivity into one workspace, with local persistence and synchronization.</p></div>
            <div><h4>Local first, by design</h4><p>Built with React, Electron, and SQLite so the core experience works offline, with synchronization connecting the wider experience.</p></div>
          </div>
          <div className="career-tools" aria-label="Technologies used"><span>React</span><span>Electron</span><span>SQLite</span><span>Synchronization</span></div>
          <a className="text-link career-project-link" href="https://quoril.in" target="_blank" rel="noreferrer">Meet Quoril</a>
        </Reveal>
        <Reveal className="career-entry career-chapter">
          <div className="career-chapter-top"><span className="career-dates">JAN — OCT 2025</span><span className="career-chapter-number">THE PREVIOUS CHAPTER</span></div>
          <h3>Drishya AI Labs</h3>
          <p className="career-role">Junior Software Engineer</p>
          <span className="career-location">Vizianagaram, India</span>
          <p className="career-overview">Worked where industrial engineering meets AI — connecting documents, data, and cloud services so the right information could find its way to the right workflow.</p>
          <div className="career-contributions">
            <div><h4>A copilot for engineering knowledge</h4><p>Contributed to Junior, Drishya’s agentic engineering copilot, with knowledge-graph-backed workflows that surface relationships across industrial documents and engineering data.</p></div>
            <div><h4>Connecting the platform</h4><p>Developed TypeScript and Python cloud-adapter libraries, plus Django backend services integrating data sources, APIs, and platform services for AI and industrial analytics.</p></div>
            <div><h4>Making deployment repeatable</h4><p>Built infrastructure with Terraform and contributed to the Azure/Kubernetes migration, authoring manifests and containerizing services. Automated builds and deployments with GitHub Actions, Docker, and Azure AKS.</p><p className="career-outcome"><strong>90% less deployment time</strong> compared with the previous manual process.</p></div>
          </div>
          <div className="career-tools" aria-label="Technologies used"><span>TypeScript / Python</span><span>Django</span><span>Knowledge graphs</span><span>Terraform</span><span>Azure AKS</span><span>GitHub Actions</span></div>
        </Reveal>
        <Reveal className="career-education"><span className="tiny-label">WHERE IT STARTED</span><h3>B.Tech, Information Technology</h3><p>JNTU-GV · 2021–2025 · CGPA 8.24</p><p>Secretary, ACM Student Chapter · Team Lead, SIH 2023 Grand Finalist</p></Reveal>
      </div>
    </div>
  </section>;
}
