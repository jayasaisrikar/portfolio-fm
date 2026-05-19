import { motion } from 'motion/react';

function Lightsaber() {
  return (
    <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -rotate-12 h-screen w-[100px] flex flex-col justify-center items-center z-0 pointer-events-none opacity-40 mix-blend-screen scale-150 origin-center">
      {/* Blade */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "50vh", opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        className="w-[8px] bg-white rounded-t-full relative origin-bottom"
        style={{
          boxShadow: `
            0 0 10px #fff,
            0 0 20px #fff,
            0 0 30px #A020F0,
            0 0 50px #A020F0,
            0 0 80px #A020F0,
            0 0 120px #A020F0
          `
        }}
      >
        <motion.div 
          animate={{ opacity: [0.8, 1, 0.8] }} 
          transition={{ repeat: Infinity, duration: 0.1, ease: "linear" }}
          className="absolute inset-0 bg-white blur-[2px] rounded-t-full"
        />
      </motion.div>
      
      {/* Hilt */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="w-[18px] h-[120px] bg-gradient-to-r from-gray-700 via-gray-400 to-gray-800 rounded-sm relative flex flex-col items-center justify-start shrink-0"
      >
        <div className="w-[22px] h-[12px] bg-black rounded-t-sm" />
        <div className="w-[14px] h-[4px] bg-gray-900 my-1" />
        <div className="w-[14px] h-[4px] bg-gray-900 mb-1" />
        <div className="w-[14px] h-[4px] bg-gray-900 mb-1" />
        <div className="w-[14px] h-[4px] bg-gray-900 mb-4" />
        <div className="w-[20px] h-[16px] bg-gray-300 border border-gray-500 rounded-sm" />
        <div className="w-[6px] h-[6px] bg-red-500 rounded-full mt-2 self-start ml-2 shadow-[0_0_5px_red]" />
        <div className="w-[22px] h-[8px] bg-black absolute bottom-0 rounded-b-sm" />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const titleLines = [
    { text: "Building", className: "" },
    { text: "Agentic", className: "stroke-text" },
    { text: "Systems.", className: "" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-12 overflow-hidden">
      {/* Side Label */}
      <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] tracking-[0.5em] text-white/30 uppercase whitespace-nowrap">
        AI Engineer / Web3 Builder / Creative Developer
      </div>

      <div className="max-w-6xl mx-auto lg:mx-0 lg:ml-12 relative z-10 w-full">
        <div className="flex flex-col gap-6">
          <motion.h1 
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-[12vw] md:text-[140px] leading-[0.85] font-bold tracking-tighter uppercase mb-4 flex flex-col"
          >
            {titleLines.map((line, i) => (
              <span key={i} className={`flex overflow-hidden ${line.className}`}>
                {line.text.split('').map((char, j) => (
                  <motion.span key={j} variants={letterVariants} className="inline-block">
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row gap-8 md:gap-16 mt-12 items-start w-full"
          >
            <div className="md:w-64">
              <p className="text-[11px] leading-relaxed text-white/60 tracking-wide">
                I build production-grade multi-agent systems, AI-powered platforms, scalable data pipelines, and Web3 infrastructure — wallets, DeFi arbitrage, and on-chain automation. Founding Engineer at <span className="text-white">Blocksbridge Consulting</span>.
              </p>
            </div>
            <div className="hidden md:block h-[1px] w-24 bg-white/20 mt-3"></div>
            <div className="flex flex-col gap-2 pt-4 md:pt-0 w-full md:w-auto">
              <span className="text-[10px] font-bold tracking-widest text-[#E0FF00] uppercase">Primary Expertise</span>
              <p className="text-xl font-light italic tracking-tight">TypeScript, Python, Multi-Agent AI, Web3</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightsaber Background Element */}
      <Lightsaber />

      {/* Atmospheric Background Elements */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] rounded-full bg-[#E0FF00]/10 blur-[120px] pointer-events-none" />
    </section>
  );
}
