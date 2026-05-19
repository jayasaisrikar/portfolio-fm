import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Pulse stroke width as you scroll
  const strokeWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["1px", "4px", "1px"]);

  return (
    <footer ref={containerRef} className="relative overflow-hidden">
      <div className="px-6 md:px-12 py-24 md:py-32 relative z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-[10px] font-bold tracking-widest text-[#E0FF00] uppercase">Connect</span>
            <h2 className="text-[10vw] md:text-[100px] leading-[0.85] font-bold uppercase tracking-tighter mb-4">
              Let's Build <br />
              <motion.span 
                className="stroke-text inline-block !text-transparent"
                style={{ WebkitTextStrokeWidth: strokeWidth }}
              >
                The Future.
              </motion.span>
            </h2>
            
            <div 
              className="mt-8 relative inline-flex items-center justify-center rounded-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Ripple Radiating Effects */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[#E0FF00]/50 pointer-events-none"
                initial={false}
                animate={isHovered ? { scale: 1.6, opacity: 0 } : { scale: 1, opacity: 0 }}
                transition={isHovered ? { duration: 1.5, repeat: Infinity, ease: "easeOut" } : { duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-[#E0FF00]/30 pointer-events-none"
                initial={false}
                animate={isHovered ? { scale: 1.6, opacity: 0 } : { scale: 1, opacity: 0 }}
                transition={isHovered ? { duration: 1.5, delay: 0.5, repeat: Infinity, ease: "easeOut" } : { duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-[#E0FF00]/10 pointer-events-none"
                initial={false}
                animate={isHovered ? { scale: 1.6, opacity: 0 } : { scale: 1, opacity: 0 }}
                transition={isHovered ? { duration: 1.5, delay: 1, repeat: Infinity, ease: "easeOut" } : { duration: 0.3 }}
              />

              <a 
                href="mailto:bjayasaisrikar2004@gmail.com"
                className="relative z-10 font-mono text-xs tracking-widest uppercase hover:text-black transition-colors bg-[#0A0A0A] hover:bg-[#E0FF00] px-8 py-4 rounded-full border border-white/10 hover:border-[#E0FF00] shadow-[0_0_0_rgba(224,255,0,0)] hover:shadow-[0_0_30px_rgba(224,255,0,0.3)] duration-300"
              >
                bjayasaisrikar2004@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-6 md:px-12 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 text-[9px] tracking-[0.2em] uppercase font-medium text-white/40">
        <div>© {new Date().getFullYear()} JAYASAISRIKAR PORTFOLIO</div>
        <div className="flex gap-8">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#E0FF00]">Github</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#E0FF00]">LinkedIn</a>
          <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="hover:text-[#E0FF00]">LeetCode</a>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#E0FF00] rounded-full animate-pulse"></span>
          AVAILABLE FOR NEW PROJECTS
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E0FF00]/5 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
}
