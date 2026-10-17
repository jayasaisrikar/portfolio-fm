import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { useRef } from 'react';

const experiences = [
  {
    "role": "AI Full-Stack Engineer",
    "company": "Blocksbridge Consulting",
    "location": "Remote \u00b7 New York, USA",
    "period": "Nov 2025 \u2013 Present",
    "description": [
      "Engineer production systems across The Energy Mag ecosystem: publishing, research automation, Next.js frontends, WordPress, APIs, and Linux/Docker services.",
      "Built AI research and publishing harnesses that turn breaking energy news into researched, structured articles with sub-20-second end-to-end turnaround.",
      "Operate ingestion-to-publication pipelines, resolving feed regressions, data freshness issues, and stale Next.js caches in production.",
      "Own full-stack architecture for Energy Investors Forum 2027: accounts, ticketing, networking, directories, meetings, messaging, and admin workflows.",
      "Designed auth, verification, entitlements, versioned APIs, and background jobs with Next.js, PostgreSQL, Redis, and BullMQ. Integrated Pretix using authenticated webhooks, idempotent sync workers, reconciliation, and recovery paths."
    ]
  },
  {
    "role": "Junior Software Engineer",
    "company": "Drishya AI Labs",
    "location": "Vizianagaram, India",
    "period": "Jan 2025 \u2013 Oct 2025",
    "description": [
      "Contributed to Junior, an agentic engineering copilot, with knowledge-graph-backed workflows connecting industrial documents and engineering data.",
      "Developed TypeScript/Python cloud-adapter libraries and Django services integrating data sources, APIs, and platform services.",
      "Built repeatable infrastructure with Terraform and contributed to the Azure/Kubernetes migration with manifests and containerized services.",
      "Automated builds and deployment with GitHub Actions, Docker, and Azure AKS, cutting deployment time by 90% versus the prior manual process."
    ]
  }
];

const ExperienceItem = ({ exp, index }: { exp: typeof experiences[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: 20, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 group py-8 md:py-14 hover:bg-white/[0.02] transition-colors px-6 md:px-12 -mx-6 md:-mx-12 overflow-hidden"
    >
      {/* Background Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E0FF00]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      
      {/* Connection Indicator */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
        className="absolute left-0 md:left-auto md:right-[calc(66.666%+1rem)] top-16 w-3 h-3 rounded-full bg-[#0A0A0A] border-2 border-[#E0FF00] hidden md:block z-20 group-hover:scale-150 group-hover:bg-[#E0FF00] transition-all duration-500 shadow-[0_0_15px_rgba(224,255,0,0.5)]"
      />

      {/* Left Column (Role & Company) */}
      <motion.div variants={leftColumnVariants} className="flex flex-col gap-2 relative z-10 md:pr-8 md:text-right">
        <p className="text-[10px] tracking-widest text-[#E0FF00] uppercase mb-4 opacity-80">{exp.period}</p>
        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight group-hover:text-[#E0FF00] transition-colors duration-500">{exp.role}</h3>
        <p className="text-white/60 text-sm uppercase tracking-wider flex md:justify-end items-center gap-2">
          {exp.company}
          <span className="w-1 h-1 rounded-full bg-white/30 hidden md:inline-block" />
          <span className="hidden md:inline-block">{exp.location}</span>
        </p>
        <p className="text-white/60 text-sm uppercase tracking-wider md:hidden">{exp.location}</p>
      </motion.div>
      
      {/* Right Column (Description) */}
      <ul className="flex flex-col gap-6 relative z-10 md:pl-8 md:border-l border-white/10">
        {exp.description.map((item, i) => (
          <motion.li 
            key={i} 
            variants={bulletVariants} 
            whileHover={{ x: 10, color: "rgba(255,255,255,1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex gap-4 items-start text-white/70 leading-relaxed text-sm md:text-base cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E0FF00]/50 mt-2 shrink-0 group-hover:bg-[#E0FF00] group-hover:shadow-[0_0_10px_#E0FF00] transition-all duration-300" />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function Experience() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="px-6 md:px-12 py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mb-12 flex flex-col items-center justify-center text-center gap-4 relative z-10"
        >
          <span className="text-[10px] font-bold tracking-widest text-[#E0FF00] uppercase">Trajectory</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
            Experience
          </h2>
        </motion.div>

        <div className="relative border-t border-white/10 pt-12">
          {/* Animated SVG line on desktop */}
          <div className="absolute left-0 md:left-[33.333%] top-12 bottom-0 w-[1px] hidden md:block">
             <div className="absolute inset-0 bg-white/10" />
             <motion.div 
                className="absolute top-0 w-full bg-gradient-to-b from-[#E0FF00] to-[#E0FF00]/10 origin-top shadow-[0_0_15px_#E0FF00]"
                style={{ height: useTransform(pathLength, [0, 1], ["0%", "100%"]) }}
             />
          </div>

          <div className="flex flex-col">
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
