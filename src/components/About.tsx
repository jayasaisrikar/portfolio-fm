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
    <section id="about" ref={containerRef} className="px-6 md:px-12 py-16 md:py-24 relative overflow-hidden">
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

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 relative z-10">
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
              I'm <strong className="text-white font-medium">Jaya Sai Srikar, an AI Full-Stack Engineer</strong>. I build the systems around AI: agent harnesses, reliable data pipelines, product interfaces, and the infrastructure that keeps them running.
            </p>
          </motion.div>
          
          <motion.div variants={paragraphVariants} className="relative group">
            <span className="absolute -left-6 top-3 w-2 h-2 bg-[#E0FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <p className="pl-4 border-l border-white/5 group-hover:border-[#E0FF00]/30 transition-colors duration-500">
              At <strong className="text-white font-medium">Blocksbridge Consulting</strong>, I engineer research and publishing automation for The Energy Mag, including a pipeline that turns breaking energy news into structured articles in under 20 seconds. I also own the full-stack architecture for Energy Investors Forum 2027.
            </p>
          </motion.div>
          
          <motion.div variants={paragraphVariants} className="relative group">
            <span className="absolute -left-6 top-3 w-2 h-2 bg-[#E0FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <p className="pl-4 border-l border-white/5 group-hover:border-[#E0FF00]/30 transition-colors duration-500">
              My independent work spans <span className="text-[#E0FF00]">FORK, Crosswake, and Quoril</span>: governed agent execution, reproducible market research, and an offline-first productivity app. I care about explicit permissions, verifiable state, and software that holds up beyond a demo.
            </p>
          </motion.div>

          <motion.div variants={paragraphVariants} className="relative group">
            <span className="absolute -left-6 top-3 w-2 h-2 bg-[#E0FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <p className="pl-4 border-l border-white/5 group-hover:border-[#E0FF00]/30 transition-colors duration-500">
              I graduated with a <strong className="text-white font-medium">B.Tech in Information Technology from JNTU-GV (2021–2025), CGPA 8.24</strong>. I served as ACM Student Chapter Secretary and led a Smart India Hackathon 2023 grand-finalist team. When I believe in an idea, I challenge assumptions and keep iterating until it works in the real world.
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
