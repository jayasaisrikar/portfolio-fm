import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export default function Hackathons() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="hackathons" className="px-6 md:px-12 py-16 md:py-24 relative bg-white/[0.01]">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col gap-4 relative z-10"
        >
          <span className="text-[10px] font-bold tracking-widest text-[#E0FF00] uppercase flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#E0FF00] inline-block" />
            Competitive Coding
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
            Hackathons & <br/> <span className="stroke-text">Innovations</span>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden border border-white/10 group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#E0FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="p-8 md:p-12 relative z-10 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold uppercase tracking-tight text-white group-hover:text-[#E0FF00] transition-colors duration-500 mb-2">Smart India Hackathon</h3>
                <p className="text-white/60 uppercase tracking-widest text-xs font-mono mb-8">Participant & Developer</p>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest px-4 py-2 bg-white/5 border border-white/10 rounded-full self-start inline-flex group-hover:border-[#E0FF00]/50 transition-colors">
                National Level
              </div>
            </div>
            
            <div className="flex flex-col gap-6 text-white/70">
              <p className="text-lg font-light leading-relaxed">
                Participated in the Smart India Hackathon (SIH), one of the world's largest open innovation models. Collaborated with a team of developers under intense time constraints to architect and deliver a robust solution addressing a complex, real-world problem statement provided by a central ministry.
              </p>
              <p className="text-sm border-l-2 border-[#E0FF00]/50 pl-4">
                <strong className="text-white">Core Focus:</strong> Developing scalable pipelines, integrating automated AI analysis features, and ensuring a seamless, low-latency user experience.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
