import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { ArrowUpRight, X, Github, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

const projects = [
  {
    "id": "fork",
    "title": "FORK",
    "description": "Governed agent execution: simulate competing decisions, approve one plan, and execute with a verifiable audit trail.",
    "fullDescription": "A generalizable agent harness that simulates LLM-proposed financial decisions against a frozen ledger snapshot. A human approves exactly one plan before deterministic execution. ArmorIQ signed intents and policy-checked MCP calls enforce ALLOW/HOLD/BLOCK decisions. SHA-256 plan binding, single-use capabilities, idempotency, and append-only double-entry postings guard against stale approvals and replay. Includes a decision studio, SSE execution timeline, and prompt-injection scenarios. Validated with 154 unit/integration, 14 Playwright, and 5 live ArmorIQ tests. Sandbox treasury, not real payments.",
    "tech": [
      "TypeScript",
      "Next.js",
      "Hono",
      "Drizzle",
      "SQLite",
      "MCP",
      "ArmorIQ"
    ],
    "demoLink": "https://fork-dun.vercel.app/",
    "repoLink": "https://github.com/jayasaisrikar/fork",
    "badge": "GOVERNED EXECUTION",
    "image": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1000&q=80"
  },
  {
    "id": "crosswake",
    "title": "Crosswake",
    "description": "Live crypto market research, durable data infrastructure, causal backtests, and auditable paper signals.",
    "fullDescription": "A market-data, research, backtesting, and paper-signal platform with 24/7 processes, a live dashboard, and Telegram delivery. Durable trade/quote journals, checksum-verified imports, typed Parquet datasets, freshness checks, and deterministic replay keep research reproducible. Causal backtests use walk-forward selection, one-use holdouts, and fee/slippage/funding models. A Mastra AgentController harness coordinates permission-aware specialist agents with persistent sessions. Signals are recorded in an append-only SHA-256 hash-chained log. No live-money trading.",
    "tech": [
      "TypeScript",
      "Next.js",
      "Mastra",
      "Parquet",
      "Linux"
    ],
    "demoLink": "https://project-crosswake.vercel.app/",
    "repoLink": "https://github.com/jayasaisrikar/project-crosswake",
    "badge": "RESEARCH \u00b7 PAPER SIGNALS",
    "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80"
  },
  {
    "id": "quoril",
    "title": "Quoril",
    "description": "An offline-first productivity desktop app for tasks, focus sessions, activity analysis, and workspaces.",
    "fullDescription": "Co-founded and built a cross-platform productivity product for macOS and Windows. Quoril brings tasks, focus sessions, activity analysis, and workspaces into an offline-first desktop app with SQLite persistence and synchronization.",
    "tech": [
      "React",
      "Electron",
      "SQLite",
      "Sync"
    ],
    "demoLink": "https://quoril.in",
    "repoLink": null,
    "badge": "CO-FOUNDER",
    "image": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=80"
  },
  {
    "id": "onchain-agent",
    "title": "On-Chain Analysis Agent",
    "description": "Multi-agent crypto research combining token detection, market data, web research, and structured synthesis.",
    "fullDescription": "An IQAI ADK sequential pipeline with shared session state for structured handoffs between token detection, real-time market data, web research, and synthesis. Integrates CoinGecko and Tavily tools. Winner of Best Collaboration / MCP Track at ADK-TS Hackathon 2025.",
    "tech": [
      "TypeScript",
      "IQAI ADK",
      "CoinGecko",
      "Tavily"
    ],
    "demoLink": null,
    "repoLink": "https://github.com/jayasaisrikar/on-chain-analysis-agent",
    "badge": "ADK-TS 2025 \u00b7 TRACK WINNER",
    "image": "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1000&q=80"
  },
  {
    "id": "stat-arb",
    "title": "Statistical Arbitrage",
    "description": "Market-neutral pairs research with rigorous out-of-sample validation and paper-trading ledgers.",
    "fullDescription": "A crypto pairs research engine using cointegration/ADF testing, multiple-testing control, Kalman-filter hedge ratios, and rolling z-scores. Walk-forward validation evaluates out-of-sample behavior. Includes scheduled asset screening, pair invalidation, paper-trading ledgers, protected REST/WebSocket endpoints, and asynchronous workers.",
    "tech": [
      "TypeScript",
      "Fastify",
      "TimescaleDB",
      "Redis",
      "BullMQ"
    ],
    "demoLink": null,
    "repoLink": "https://github.com/jayasaisrikar/stat-arb",
    "badge": "QUANT RESEARCH",
    "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80"
  },
  {
    "id": "code-architect",
    "title": "AI Code Architecture Agent",
    "description": "Multi-model repository analysis, architecture diagrams, and guidance on where new features belong.",
    "fullDescription": "A repository analysis tool with multi-model reasoning, architecture diagrams, and feature-placement guidance, built with FastAPI, React, and Mem0.",
    "tech": [
      "Python",
      "FastAPI",
      "React",
      "Mem0"
    ],
    "demoLink": null,
    "repoLink": "https://github.com/jayasaisrikar/spoc-agent",
    "badge": "DEVELOPER TOOLS",
    "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80"
  },
  {
    "id": "gridflex",
    "title": "GridFlex",
    "description": "Energy verification with versioned evidence and auditable proof chains.",
    "fullDescription": "An energy verification platform using versioned evidence, append-only provenance, canonical hashing, and auditable proof chains.",
    "tech": [
      "Evidence versioning",
      "Canonical hashing",
      "Provenance"
    ],
    "demoLink": null,
    "repoLink": "https://github.com/jayasaisrikar/gridflex",
    "badge": "ENERGY SYSTEMS",
    "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=80"
  }
];

function ProjectCard({
  project,
  index,
  onClick
}: {
  project: typeof projects[0];
  index: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  // Parallax tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const translateX = useTransform(springX, [0, 1], ["-5%", "5%"]);
  const translateY = useTransform(springY, [0, 1], ["-5%", "5%"]);

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Staggered variants
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onPointerMove={handleMouseMove}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title}`}
      onFocus={() => setIsHovered(true)}
      onBlur={handleMouseLeave}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onClick(); } }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      onClick={onClick}
      className={`group relative overflow-hidden flex flex-col justify-end bg-white/[0.02] cursor-pointer ${
        index === 0 ? "md:col-span-2 lg:col-span-2 h-[400px] md:h-[500px]" : "h-[400px]"
      }`}
    >
      {/* Thumbnail Background */}
      <div className="absolute inset-0 z-0 border border-white/10 overflow-hidden">
        <motion.img
          layoutId={`image-${project.id}`}
          src={project.image}
          alt=""
          loading="lazy"
          style={{ x: reducedMotion ? 0 : translateX, y: reducedMotion ? 0 : translateY, scale: 1.15 }} // Extra scale to allow panning without showing edges
          animate={{
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)'
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover opacity-50 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
      </div>        {/* Content */}
      <div className="relative z-10 p-8 flex flex-col w-full h-full justify-between">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-mono tracking-widest px-3 py-1.5 rounded bg-black/50 backdrop-blur-md border border-white/10 uppercase">
            0{index + 1} / {project.badge || 'WORK'}
          </span>

          <motion.div
            animate={{
              opacity: 1,
              scale: isHovered ? 1 : 0.8,
              y: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 bg-[#E0FF00] rounded-full flex items-center justify-center text-black shadow-[0_0_20px_#E0FF00/30] hover:bg-white hover:shadow-white/30 transition-colors pointer-events-auto"
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.div>
        </div>

        <div className="pointer-events-none">
          {/* Title is always visible */}
          <motion.h3 layoutId={`title-${project.id}`} className="text-2xl md:text-3xl font-semibold uppercase tracking-tight transition-colors duration-300 text-white group-hover:text-[#E0FF00]">
            {project.title}
          </motion.h3>

          {/* Staggered container for description details */}
          <motion.div
            initial={false}
            animate={{
              height: 'auto',
              opacity: 1,
              marginTop: 16
            }}
            className="overflow-hidden"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {(project.badge) && (
                <motion.div variants={fadeUpItem} className="text-[10px] text-[#E0FF00] uppercase tracking-widest mb-4">
                  {project.badge}
                </motion.div>
              )}

              <motion.div variants={fadeUpItem}>
                <p className="text-sm opacity-80 leading-relaxed font-mono text-[11px] uppercase tracking-wide">
                  {project.description}
                </p>
              </motion.div>

              <motion.div variants={fadeUpItem} className="flex flex-wrap gap-2 mt-6">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-[9px] uppercase tracking-widest border border-white/20 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#E0FF00] group-hover:text-black group-hover:border-[#E0FF00]"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
      if (event.key === 'Tab') {
        const elements = Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"] button, [role="dialog"] a[href]'));
        const first = elements[0]; const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKey);
      document.querySelector<HTMLButtonElement>('[aria-label="Close project"]')?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
      if (selectedProject) previousFocus?.focus();
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="px-6 md:px-12 py-16 md:py-24 relative z-20 mix-blend-normal flex flex-col items-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center justify-center text-center gap-4"
        >
          <span className="text-[10px] font-bold tracking-widest text-[#E0FF00] uppercase">Showcase</span>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
            Selected Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12 bg-[#0A0A0A]/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-title"
              layoutId={`project-${selectedProject.id}`}
              className="w-full max-w-6xl bg-[#0A0A0A] border border-white/10 flex flex-col lg:flex-row relative cursor-default shadow-2xl my-auto min-h-[60vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4 lg:top-8 lg:right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-[#E0FF00] hover:text-black hover:border-[#E0FF00] transition-colors"
                aria-label="Close project"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Image Section */}
              <div className="w-full lg:w-1/2 h-[40vh] lg:h-auto min-h-[40vh] relative overflow-hidden">
                <motion.img
                  layoutId={`image-${selectedProject.id}`}
                  alt=""
                  src={selectedProject.image}
                  className="w-full h-full object-cover grayscale mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent lg:hidden" />
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                <motion.h2 id="project-title"
                  layoutId={`title-${selectedProject.id}`}
                  className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8 text-[#E0FF00]"
                >
                  {selectedProject.title}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col gap-8"
                >
                  {(selectedProject.badge) && (
                    <div className="inline-flex items-start">
                      <span className="text-[10px] uppercase tracking-widest border border-[#E0FF00]/50 text-[#E0FF00] px-3 py-1.5 bg-[#E0FF00]/10">
                        {selectedProject.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-4 pb-2 border-b border-white/10">
                      About the Project
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-sans mb-8">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-4 pb-2 border-b border-white/10">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map(t => (
                        <span key={t} className="px-3 py-1.5 border border-white/10 bg-white/[0.02] text-[10px] font-medium tracking-widest uppercase hover:text-[#E0FF00] transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-white/10">
                     {selectedProject.demoLink && <a href={selectedProject.demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#E0FF00] transition-colors group">
                         <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                         Live Site
                     </a>}
                     {selectedProject.repoLink && <a href={selectedProject.repoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#E0FF00] transition-colors group">
                         <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                         Repository
                     </a>}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
