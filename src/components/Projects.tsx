import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, X, Github, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

const projects = [
  {
    id: "wayflo",
    title: "Wayflo",
    badge: "PRODUCTION · LIVE",
    description: "AI travel planner that connects real destinations, trip windows, budgets & pace into calm, reusable itineraries.",
    fullDescription: "Wayflo is a production-grade AI-powered travel planning platform. It lets users search live destinations, anchor trips around real arrival/departure windows, shape plans around an actual budget, and keep the itinerary, map view, and trip notes together so the plan stays usable after you close the tab. Built with a focus on calm UX — minimal inputs, smart timing, and route flow that doesn't feel like paperwork.",
    tech: ["Next.js", "TypeScript", "AI", "Maps API", "Supabase"],
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop",
    demoLink: "https://wayflo.jayasaisrikar.xyz",
    repoLink: "https://wayflo.jayasaisrikar.xyz"
  },
  {
    id: "onchain-agent",
    title: "On-Chain Analysis Agent",
    award: "Winner – MCP Track, ADK-TS Hackathon",
    description: "Production-grade multi-agent AI system for automated Web3 & cryptocurrency analysis with real-time market data.",
    fullDescription: "A comprehensive multi-agent system built to analyze Web3 on-chain data in real-time. Four specialized sub-agents run in parallel gathering token data, market metrics, and web intelligence. The root agent orchestrates research and analysis phases via the IQAI ADK, synthesising results into structured markdown reports with risk assessments and investment recommendations. Integrates CoinGecko and Tavily Search APIs.",
    tech: ["TypeScript", "Next.js", "IQAI ADK", "CoinGecko API", "Tavily API"],
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop",
    demoLink: "https://onchain-analysis-agent.vercel.app/",
    repoLink: "https://github.com/jayasaisrikar"
  },
  {
    id: "otc-voice",
    title: "OTC Voice Assistant",
    description: "Voice-activated OTC trading system spanning OKX, Bybit, Deribit & Binance with real-time WebSocket updates.",
    fullDescription: "A production-ready voice-activated trading assistant that handles complete OTC order flow through natural conversation. Supports OKX, Bybit, Deribit, and Binance APIs with live price feeds. Features contextual re-prompting for incomplete inputs, natural correction handling, visual progress indicators, robust error handling for API failures, and a beautiful real-time UI powered by WebSockets.",
    tech: ["TypeScript", "WebSockets", "OKX API", "Bybit API", "Deribit API", "Binance API"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    demoLink: "https://github.com/jayasaisrikar/otc-voice-assistant",
    repoLink: "https://github.com/jayasaisrikar/otc-voice-assistant"
  },
  {
    id: "code-architect",
    title: "AI Code Architecture Agent",
    description: "AI-powered tool for automated analysis and interactive visualization of GitHub repositories.",
    fullDescription: "Developed an AI-powered tool (SPoC) that automatically ingests GitHub repositories or ZIP uploads, analyzes their folder structures, and enables natural language Q&A over the codebase. It provides architecture suggestions, feature placement guidance, and interactive diagrams. Features multi-model fallback between OpenAI and Gemini for robust insights.",
    tech: ["Python", "FastAPI", "React", "Gemini API", "SQLite"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop",
    demoLink: "https://spoc-agent.vercel.app/",
    repoLink: "https://github.com/jayasaisrikar"
  },
  {
    id: "face-recog",
    title: "Face Recognition Attendance",
    description: "Comprehensive attendance system with authentication, role-based access, and real-time facial recognition.",
    fullDescription: "A seamless access control and attendance management system leveraging edge-based facial recognition. Includes a robust Django backend with role-based access control (RBAC), real-time monitoring dashboards, and exportable analytics for administrators. Supports multi-camera input and handles liveness detection.",
    tech: ["Python", "Django", "OpenCV", "Face Recognition API"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    demoLink: "https://github.com/jayasaisrikar/student_attendance",
    repoLink: "https://github.com/jayasaisrikar/student_attendance"
  },
  {
    id: "gemini-chat",
    title: "Gemini AI Chatbot",
    description: "AI chatbot with dashboard for product/article context injection via live web scraping.",
    fullDescription: "A versatile conversational agent powered by Gemini AI with custom web-scraping capabilities. Users can input product URLs or articles, and the system uses BeautifulSoup to scrape, clean, and inject the context directly into the LLM prompt, enabling highly specific, context-aware responses beyond the model's training data.",
    tech: ["Python", "Gemini AI", "BeautifulSoup", "FastAPI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    demoLink: "https://github.com/jayasaisrikar/chatbot",
    repoLink: "https://github.com/jayasaisrikar/chatbot"
  },
  {
    id: "finance-tracker",
    title: "Finance Tracker",
    description: "JWT auth, OAuth2, real-time expense ratio monitoring, and financial health insights.",
    fullDescription: "A comprehensive personal finance dashboard offering real-time expense ratio tracking, budget forecasting, and tailored financial advice. Built with FastAPI and Streamlit, it features seamless OAuth2 integration, JWT-secured endpoints, and Plotly for highly interactive data visualization. Tracks spending patterns and surfaces actionable insights.",
    tech: ["FastAPI", "Streamlit", "Plotly", "OAuth2", "JWT"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    demoLink: "https://github.com/jayasaisrikar/finance-tracker",
    repoLink: "https://github.com/jayasaisrikar/finance-tracker"
  },
  {
    id: "ityukta",
    title: "ITyukta 2K24",
    description: "Official website for JNTUGV's annual tech fest — built for thousands of students and participants.",
    fullDescription: "Designed and developed the official website for ITyukta 2K24, the annual technical festival of JNTU Vizianagaram. The site handled event registrations, schedule management, and real-time updates for thousands of student participants across multiple technical and non-technical events.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    demoLink: "https://ityukta2k24.jntugv.in/",
    repoLink: "https://github.com/jayasaisrikar"
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
  
  // Parallax tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const translateX = useTransform(springX, [0, 1], ["-5%", "5%"]);
  const translateY = useTransform(springY, [0, 1], ["-5%", "5%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
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
          style={{ x: translateX, y: translateY, scale: 1.15 }} // Extra scale to allow panning without showing edges
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
            0{index + 1} / {project.badge ? project.badge : project.award ? 'AWARDED' : 'WORK'}
          </span>
          
          <motion.div 
            animate={{ 
              opacity: isHovered ? 1 : 0, 
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
              height: isHovered ? 'auto' : 0,
              opacity: isHovered ? 1 : 0,
              marginTop: isHovered ? 16 : 0
            }}
            className="overflow-hidden"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isHovered ? "visible" : "hidden"}
            >
              {(project.award || project.badge) && (
                <motion.div variants={fadeUpItem} className="text-[10px] text-[#E0FF00] uppercase tracking-widest mb-4">
                  {project.badge || project.award}
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
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
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Image Section */}
              <div className="w-full lg:w-1/2 h-[40vh] lg:h-auto min-h-[40vh] relative overflow-hidden">
                <motion.img
                  layoutId={`image-${selectedProject.id}`}
                  src={selectedProject.image}
                  className="w-full h-full object-cover grayscale mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent lg:hidden" />
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                <motion.h2 
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
                  {(selectedProject.award || selectedProject.badge) && (
                    <div className="inline-flex items-start">
                      <span className="text-[10px] uppercase tracking-widest border border-[#E0FF00]/50 text-[#E0FF00] px-3 py-1.5 bg-[#E0FF00]/10">
                        {selectedProject.badge || selectedProject.award}
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
                     <a href={selectedProject.demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#E0FF00] transition-colors group">
                         <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                         Live Demo
                     </a>
                     <a href={selectedProject.repoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#E0FF00] transition-colors group">
                         <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                         Repository
                     </a>
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
