import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scaleTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const paragraphVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
    }
  };

  const titleLines = ["Who The", "Hell Is", "Jay?"];

  return (
    <section id="about" ref={containerRef} className="px-6 md:px-12 py-32 md:py-48 relative overflow-hidden">
      {/* Background Parallax Element */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[#E0FF00]/5 blur-[120px] pointer-events-none"
        style={{ y: yTransform, opacity: opacityTransform, scale: scaleTransform }}
      />

      {/* Top Border Indicator with sweep animation */}
      <motion.div 
        className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-[1px] bg-gradient-to-r from-transparent via-[#E0FF00]/40 to-transparent origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 relative z-10">
        <div className="md:w-1/3 md:shrink-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.span 
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-[10px] font-bold tracking-widest text-[#E0FF00] uppercase mb-8 block flex items-center gap-4"
            >
              <span className="w-12 h-[1px] bg-[#E0FF00] inline-block" />
              About
            </motion.span>
            
            <h2 className="text-[12vw] md:text-[80px] font-bold uppercase tracking-tighter leading-[0.85] flex flex-col">
              {titleLines.map((line, i) => (
                <span key={i} className="flex overflow-hidden">
                  <motion.span
                    variants={{
                      hidden: { y: "100%", rotate: 5, filter: 'blur(5px)' },
                      visible: { y: "0%", rotate: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className={`inline-block origin-bottom-left ${i === 2 ? 'stroke-text !text-transparent' : ''}`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
          </motion.div>
        </div>

        <motion.div 
          className="md:w-2/3 flex flex-col gap-10 text-white/70 text-lg md:text-2xl font-light leading-relaxed tracking-wide pt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div variants={paragraphVariants} className="relative group">
            <span className="absolute -left-6 top-3 w-2 h-2 bg-[#E0FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <p className="pl-4 border-l border-white/5 group-hover:border-[#E0FF00]/30 transition-colors duration-500">
              I'm an <strong className="text-white font-medium">AI Founding Engineer</strong> obsessed with bridging the gap between raw AI capabilities and production-ready applications. My core focus is on architecting Agentic Systems and Scalable Data Pipelines that don't just demo well, but deliver real value at scale.
            </p>
          </motion.div>
          
          <motion.div variants={paragraphVariants} className="relative group">
            <span className="absolute -left-6 top-3 w-2 h-2 bg-[#E0FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <p className="pl-4 border-l border-white/5 group-hover:border-[#E0FF00]/30 transition-colors duration-500">
              Whether it's orchestrating complex multi-agent workflows in <span className="text-[#E0FF00] hover:text-white transition-colors cursor-crosshair">Python</span>, building realtime low-latency architectures in <span className="text-[#E0FF00] hover:text-white transition-colors cursor-crosshair">TypeScript/Node.js</span>, or fine-tuning models for niche use-cases, I build robust systems designed to thrive in the chaotic real world.
            </p>
          </motion.div>
          
          <motion.div variants={paragraphVariants} className="relative group">
            <span className="absolute -left-6 top-3 w-2 h-2 bg-[#E0FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <p className="pl-4 border-l border-white/5 group-hover:border-[#E0FF00]/30 transition-colors duration-500">
              Currently pushing boundaries as an AI Founding Engineer at <strong className="text-white hover:text-[#E0FF00] transition-colors cursor-pointer">Blocksbridge Consulting</strong>, I am continuously exploring the absolute edges of where AI meets massive infrastructural scale. When I'm not coding, I'm usually over-analyzing design architectures or experimenting with emerging open-source LLM frameworks. Let's build the unbuildable.
            </p>
          </motion.div>

          <motion.div variants={paragraphVariants} className="relative group">
            <span className="absolute -left-6 top-3 w-2 h-2 bg-[#E0FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <p className="pl-4 border-l border-white/5 group-hover:border-[#E0FF00]/30 transition-colors duration-500">
              Beyond AI, I'm deep into <span className="text-[#E0FF00] hover:text-white transition-colors cursor-crosshair">Web3</span> — building on-chain systems, writing smart contracts, exploring crypto arbitrage strategies, and integrating wallet infrastructure. The convergence of AI agents and decentralised networks is where I think the next frontier lives.
            </p>
          </motion.div>

          <motion.div variants={paragraphVariants} className="pt-8">
            <Link 
              to="/profile"
              className="inline-flex items-center gap-4 group hover:gap-6 transition-all duration-300"
            >
              <span className="text-xs tracking-[0.2em] uppercase font-bold text-white group-hover:text-[#E0FF00] transition-colors">
                More about Jay
              </span>
              <span className="w-12 h-[1px] bg-white group-hover:bg-[#E0FF00] transition-colors group-hover:w-16 duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
