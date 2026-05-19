import { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useInView, useTransform } from 'motion/react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import VaderHelmet from '../components/VaderHelmet';
import DeathStar from '../components/DeathStar';
import { startLightsaberHum, stopLightsaberHum, playVaderBreath, initAudio } from '../lib/audio';

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const IconPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconCpu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);
const IconGrad = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const IconTrophy = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
  </svg>
);
const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconCompass = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);
const IconMusic = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
  </svg>
);
const IconChain = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconFilm = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
    <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/>
    <line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/>
    <line x1="17" y1="7" x2="22" y2="7"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconScrollDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PLACES = [
  { city: "Vizag", country: "India", desc: "Home. Waking up to the Bay of Bengal. Beach road at 6am before the world is awake.", color: "#00d4ff" },
  { city: "Hyderabad", country: "India", desc: "The city of Biryani and Big Tech. Conference halls & late-night hackathons.", color: "#ff0000" },
  { city: "Bengaluru", country: "India", desc: "The Silicon Valley of India. Where OPL happened and the career began.", color: "#00ff88" },
  { city: "Agra", country: "India", desc: "The Taj at sunrise — nothing prepares you for it. Architecture that makes you question your ambitions.", color: "#ffaa00" },
  { city: "New Delhi", country: "India", desc: "The capital chaos. History on every corner, the future being built right next to it.", color: "#9900ff" },
  { city: "Varkala", country: "India", desc: "Cliffs over the Arabian Sea. The kind of place where you reset completely.", color: "#00ff88" },
  { city: "Trivandrum", country: "India", desc: "The southernmost edge. A city with its own rhythm — calm, old, and quietly brilliant.", color: "#00d4ff" },
  { city: "Jaipur", country: "India", desc: "The Pink City. Forts, palaces, and the feeling that empires were once built here.", color: "#ff3333" },
];

const MOVIES = [
  { title: "Forrest Gump", year: "1994", director: "Robert Zemeckis", why: "Life is random, yet everything connects. A reminder that showing up consistently beats being the smartest in the room.", genre: "Drama", color: "#00d4ff", fav: true },
  { title: "The Grand Budapest Hotel", year: "2014", director: "Wes Anderson", why: "Proof that style and substance aren't opposites. Every frame is a lesson in craft and obsessive attention to detail.", genre: "Comedy", color: "#ffaa00", fav: true },
  { title: "Star Wars: I–III", year: "1999–2005", director: "George Lucas", why: "The fall of Anakin is one of the greatest tragedy arcs ever written. People sleep on the prequels — I don't.", genre: "Sci-Fi Epic", color: "#ff0000" },
  { title: "Star Wars: IV–VI", year: "1977–1983", director: "George Lucas", why: "The original trilogy defined my imagination. The Force, the rebellion, the hero's journey — timeless.", genre: "Sci-Fi Epic", color: "#00ff88" },
  { title: "The Mandalorian", year: "2019–", director: "Jon Favreau", why: "This is the way. Stripped back, atmospheric, and genuinely earned emotion. Star Wars at its best post-Lucas.", genre: "Series", color: "#9900ff" },
  { title: "Obi-Wan Kenobi", year: "2022", director: "Deborah Chow", why: "Ewan McGregor carrying the weight of a broken galaxy on his shoulders. That final duel hits every time.", genre: "Series", color: "#00d4ff" },
  { title: "Interstellar", year: "2014", director: "Christopher Nolan", why: "The audacity of thinking at a cosmic scale. A blueprint for dreaming bigger than you think is possible.", genre: "Sci-Fi", color: "#00d4ff" },
  { title: "Inception", year: "2010", director: "Christopher Nolan", why: "Layers within layers. Every system I build has this energy — architecture that folds in on itself.", genre: "Sci-Fi", color: "#9900ff" },
  { title: "The Dark Knight Trilogy", year: "2005–2012", director: "Christopher Nolan", why: "Chaos as philosophy, order as illusion. The Joker taught me more about systems than any textbook.", genre: "Thriller", color: "#ff0000" },
  { title: "Oppenheimer", year: "2023", director: "Christopher Nolan", why: "The weight of building something world-changing. Hits different when you work on AI every day.", genre: "Drama", color: "#ff3333" },
  { title: "Dunkirk", year: "2017", director: "Christopher Nolan", why: "No score, no dialogue — just pure dread. Proof that restraint is the most powerful tool a director has.", genre: "War", color: "#ffaa00" },
  { title: "The Prestige", year: "2006", director: "Christopher Nolan", why: "Obsession, sacrifice, misdirection. Every magic trick has three parts — so does every great product.", genre: "Mystery", color: "#00ff88" },
];

const FACTS = [
  { label: "Based in",         value: "Vizag, India",                 Icon: IconPin     },
  { label: "Currently hacking", value: "Agentic AI + Web3 @ Blocksbridge",   Icon: IconCpu     },
  { label: "Education",        value: "B.Tech Information Technology",       Icon: IconGrad    },
  { label: "Hackathon - Team Lead",        value: "SIH 2023 National Finalist",    Icon: IconTrophy  },
  { label: "First language",   value: "Typescript (still the GOAT)",       Icon: IconCode    },
  { label: "Superpower",       value: "Shipping at 3am without pills",  Icon: IconZap     },
  { label: "Philosophy",       value: "Build the unbuildable",         Icon: IconCompass },
  { label: "Web3 focus",       value: "DeFi, Arbitrage, On-chain AI",  Icon: IconChain   },
  { label: "Mood",             value: "Always in flow state",          Icon: IconMusic   },
  { label: "Current obsession", value: "AI × Blockchain convergence",  Icon: IconZap     },
];

// ─── UI HELPERS ───────────────────────────────────────────────────────────────
function RevealText({ text, className, delay = 0, forceAnimate = false }: { text: string; className?: string; delay?: number; forceAnimate?: boolean }) {
  return (
    <span className={`overflow-hidden inline-block ${className ?? ''}`}>
      {forceAnimate ? (
        <motion.span
          initial={{ y: "110%", rotate: 2 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
          className="inline-block"
        >{text}</motion.span>
      ) : (
        <motion.span
          initial={{ y: "110%", rotate: 2 }}
          whileInView={{ y: "0%", rotate: 0 }}
          viewport={{ once: true, margin: "-10px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
          className="inline-block"
        >{text}</motion.span>
      )}
    </span>
  );
}

function MagneticButton({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseEnter={startLightsaberHum}
      onMouseLeave={() => { x.set(0); y.set(0); stopLightsaberHum(); }}
      onClick={onClick} className={className}>
      {children}
    </motion.button>
  );
}

function PlaceCard({ place, index }: { place: typeof PLACES[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      onMouseEnter={startLightsaberHum}
      onMouseLeave={stopLightsaberHum}
      className="group relative p-6 md:p-8 border border-white/10 hover:border-white/30 transition-all duration-500 cursor-default overflow-hidden"
      style={{ "--card-color": place.color } as React.CSSProperties}
    >
      <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(circle at 50% 0%, ${place.color}15, transparent 70%)` }} />
      <div className="mb-4 text-white/25 group-hover:text-[color:var(--card-color)] transition-colors duration-400"><IconGlobe /></div>
      <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-1 group-hover:text-[color:var(--card-color)] transition-colors duration-400">{place.city}</h3>
      <p className="text-[10px] tracking-widest text-white/40 uppercase mb-4">{place.country}</p>
      <p className="text-white/60 text-sm leading-relaxed">{place.desc}</p>
      <motion.div className="absolute bottom-0 left-0 h-[2px] origin-left" style={{ background: place.color }}
        initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 + 0.4 }} />
    </motion.div>
  );
}

function MovieCard({ movie, index }: { movie: typeof MOVIES[0]; index: number }) {
  const ref = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="relative cursor-pointer w-full" onClick={() => setFlipped(f => !f)}
      onMouseEnter={startLightsaberHum}
      onMouseLeave={stopLightsaberHum}
      style={{ perspective: "1000px", height: "clamp(220px, 40vw, 260px)" }}
    >
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%", position: "relative" }}>
        <div className="absolute inset-0 border border-white/10 p-6 flex flex-col justify-between hover:border-white/30 transition-colors"
          style={{ backfaceVisibility: "hidden" }}>
          {movie.fav && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase" style={{ background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.4)", color: "#ffd700" }}>
              <span>★</span><span>All-Time Fav</span>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 mb-2" style={{ color: movie.color }}>
              <IconFilm />
              <span className="text-[10px] tracking-widest uppercase">{movie.genre}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-tight">{movie.title}</h3>
            <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">{movie.year} · {movie.director}</p>
          </div>
          <p className="text-white/25 text-[10px] uppercase tracking-widest">Tap for Jay's take</p>
          <motion.div className="absolute bottom-0 left-0 h-[2px] origin-left"
            style={{ background: movie.color, width: "30%" }}
            whileHover={{ width: "100%" }} transition={{ duration: 0.5 }} />
        </div>
        <div className="absolute inset-0 border p-6 flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderColor: movie.color + "50", background: movie.color + "08" }}>
          <p className="text-white/80 text-sm leading-relaxed italic">"{movie.why}"</p>
          <p className="text-[10px] tracking-widest uppercase mt-4" style={{ color: movie.color }}>— Jay</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function DetailedProfile() {
  const { scrollYProgress } = useScroll();
  
  // Parallax transformations
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const aboutY = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  
  const navigate = useNavigate();

  const { hash } = useLocation();

  useEffect(() => {
    // Initial audio context prompt / interactions might be restricted by browser until click,
    // but try to play anyway. The user likely clicked to get to this profile.
    playVaderBreath();

    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const onClose = () => navigate('/');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#080808]"
    >
      {/* Scroll progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00d4ff] via-[#9900ff] to-[#ff0000] origin-left z-[110]" style={{ scaleX }} />

      {/* Close/Back button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
        onClick={onClose}
        onMouseEnter={startLightsaberHum}
        onMouseLeave={stopLightsaberHum}
        className="fixed top-4 right-4 md:top-8 md:right-12 z-[120] flex items-center gap-2 md:gap-3 text-[10px] tracking-[0.25em] uppercase font-bold text-white/50 hover:text-white transition-colors group"
      >
        <span className="group-hover:text-[#00d4ff] transition-colors">Abort</span>
        <motion.span className="w-8 h-8 border border-white/20 group-hover:border-[#00d4ff]/50 flex items-center justify-center transition-colors"
          whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
          <IconClose />
        </motion.span>
      </motion.button>

      <div className="relative">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative w-full min-h-screen overflow-hidden flex items-center">
          {/* Vader canvas — covers right half as a fixed background layer */}
          <div className="absolute inset-0 md:left-[35%] opacity-30 md:opacity-100">
            {/* Radial vignette on the left edge of canvas */}
            <div className="absolute inset-y-0 left-0 w-64 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #080808 20%, transparent)" }} />
            {/* Floor glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-32 pointer-events-none z-10"
              style={{ background: "radial-gradient(ellipse, #00d4ff30 0%, #ff000010 70%, transparent 100%)", filter: "blur(24px)" }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: heroY }}
              className="w-full h-full"
            >
              <VaderHelmet />
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
              style={{ opacity: heroOpacity }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] text-white/15 uppercase whitespace-nowrap z-20 pointer-events-none">
              Drag to rotate
            </motion.p>
          </div>

          {/* Dark gradient so text stays readable */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 100% at 20% 50%, #080808 30%, transparent 100%)" }} />

          {/* Text — left side */}
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 flex flex-col justify-center px-6 md:pl-12 lg:pl-16 w-full md:w-[65%] lg:w-[60%] pt-24 md:pt-0"
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[10px] font-bold tracking-[0.5em] text-[#00d4ff] uppercase mb-6 flex items-center gap-4"
            >
              <span className="w-12 h-[1px] bg-[#00d4ff]" />Balance In The Force
            </motion.span>

            <h1 className="text-[12vw] md:text-[85px] lg:text-[100px] font-bold uppercase tracking-tighter leading-[0.85] mb-8">
              <RevealText forceAnimate text="More" delay={0.1} /> <RevealText forceAnimate text="Than" className="text-[#00d4ff]" delay={0.2} /><br />
              <RevealText forceAnimate text="Just" delay={0.3} /> <RevealText forceAnimate text="Code." className="text-[#ff0000]" delay={0.4} />
            </h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }}
              className="max-w-md text-white/60 text-sm md:text-base leading-relaxed font-light mb-10 border-l border-white/10 pl-6">
              This is Jay — unfiltered. Movies that shaped his thinking, places that built his perspective, and raw facts nobody puts on a resume.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              className="flex items-center gap-3 text-white/40 hover:text-[#00d4ff] transition-colors text-[10px] uppercase tracking-widest cursor-pointer w-max"
              onMouseEnter={startLightsaberHum}
              onMouseLeave={stopLightsaberHum}
              onClick={() => {
                 const el = document.getElementById('quick-facts');
                 if(el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                <IconScrollDown />
              </motion.span>
              <span>Scroll to explore</span>
            </motion.div>
          </motion.div>
        </section>

        {/* ── QUICK FACTS ─────────────────────────────────────── */}
        <section id="quick-facts" className="px-4 md:px-16 py-16 md:py-32 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#00d4ff] uppercase">Holocron Records</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight mt-4">
                  The <span className="text-[#00d4ff]">Raw</span> Data
                </h2>
              </div>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                A quick scan of the core attributes and stats powering this unit.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border border-white/10">
              {FACTS.map(({ label, value, Icon }, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ backgroundColor: "rgba(0,212,255,0.06)", borderColor: "rgba(0,212,255,0.3)" }}
                  className="p-6 md:p-8 border-r border-b border-white/10 last:border-r-0 group cursor-default transition-all duration-300"
                  onMouseEnter={startLightsaberHum}
                  onMouseLeave={stopLightsaberHum}
                >
                  <span className="mb-3 block text-white/25 group-hover:text-[#00d4ff] transition-colors"><Icon /></span>
                  <p className="text-[10px] tracking-widest text-white/30 uppercase mb-2">{label}</p>
                  <p className="text-white font-medium text-sm group-hover:text-[#00d4ff] transition-colors">{value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO IS JAY ──────────────────────────────────────── */}
        <section className="px-4 md:px-12 lg:px-16 py-16 md:py-40 relative overflow-hidden">
          <motion.div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-[1px] bg-gradient-to-r from-transparent via-[#ff0000]/30 to-transparent origin-left"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
          
          {/* Subtle background text for Parallax */}
          <motion.div style={{ y: useTransform(scrollYProgress, [0.3, 0.6], [100, -100]) }} className="absolute top-40 left-10 pointer-events-none opacity-[0.12]">
            <h2 className="text-[60px] sm:text-[100px] md:text-[250px] font-bold uppercase leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #00d4ff" }}>FORCE</h2>
            <h2 className="text-[60px] sm:text-[100px] md:text-[250px] font-bold uppercase leading-none tracking-tighter ml-8 sm:ml-16 md:ml-32 text-transparent" style={{ WebkitTextStroke: "2px #ff0000" }}>WIELDER</h2>
          </motion.div>

          <div className="max-w-6xl mx-auto align-top relative z-10">
            <div className="mb-16">
              <motion.span initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="text-[10px] font-bold tracking-widest text-[#00d4ff] uppercase mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#00d4ff]" />The Force Wielder
              </motion.span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight leading-[0.9] mb-8 flex flex-col gap-2">
                <div><RevealText text="Engineer" delay={0} /> <RevealText text="by Logic," className="text-[#00d4ff]" delay={0.1} /></div>
                <div><RevealText text="Artist by" delay={0.2} /> <RevealText text="Chaos" className="text-[#ff0000]" delay={0.3} /></div>
              </h2>
            </div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
              className="flex flex-col md:flex-row gap-8 md:gap-10 text-white/70 text-base md:text-xl md:leading-relaxed font-light">
              <div className="flex-1 flex flex-col gap-10">
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 35 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                  className="relative pl-6 md:pl-8 border-l-2 border-[#00d4ff]/20 hover:border-[#00d4ff] transition-colors duration-500 py-2">
                  Jay grew up on the coast of Vizag — waking up to the Bay of Bengal, a city that shaped his sense of scale and ambition. From a young age, he was the kid who wanted to know how things worked under the hood.
                </motion.p>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 35 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                  className="relative pl-6 md:pl-8 border-l-2 border-[#9900ff]/20 hover:border-[#9900ff] transition-colors duration-500 py-2">
                  His professional journey started at OPL (One Paper Lane) in Bengaluru — building OCR pipelines, AWS infrastructure, and Generative AI tooling. That first script that automated something boring lit a fire that hasn't gone out since.
                </motion.p>
              </div>
              <div className="flex-1 flex flex-col gap-10">
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 35 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                  className="relative pl-6 md:pl-8 border-l-2 border-[#ff0000]/20 hover:border-[#ff0000] transition-colors duration-500 py-2">
                  What drives him isn't the technology itself — it's the idea that software can be genuinely elegant. That an AI agent can think, that a UI can feel alive, that a system can be both powerful and beautiful. He chases that feeling obsessively.
                </motion.p>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 35 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                  className="relative pl-6 md:pl-8 border-l-2 border-[#00ff88]/20 hover:border-[#00ff88] transition-colors duration-500 py-2">
                  Parallel to AI, he's gone deep into <strong className="text-white">Web3</strong> — writing smart contracts, studying DeFi mechanics, building crypto arbitrage strategies, and wiring up wallet infrastructure. He believes the next paradigm shift isn't AI or blockchain alone, it's both operating together on-chain.
                </motion.p>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 35 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                  className="relative pl-6 md:pl-8 border-l-2 border-white/10 hover:border-white transition-colors duration-500 py-2">
                  Off the screen: he's a cinephile (Nolan is non-negotiable), an occasional overthinker about the cosmos, and someone who believes the best conversations happen at 2am over chai.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PLACES ──────────────────────────────────────────── */}
        <section className="px-4 md:px-16 py-16 md:py-32 relative">
          <motion.div className="absolute top-0 left-4 right-4 md:left-16 md:right-16 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 50, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }} className="mb-16">
              <span className="text-[10px] font-bold tracking-widest text-[#00d4ff] uppercase">Coordinates</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight mt-4">
                Systems <span className="text-[#00d4ff]">I've</span> Visited
              </h2>
              <p className="text-white/40 mt-4 text-sm">Every planet left a mark. Here's what they taught.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {PLACES.map((p, i) => <PlaceCard key={i} place={p} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── MOVIES ──────────────────────────────────────────── */}
        <section className="px-4 md:px-16 py-16 md:py-32 relative">
          <motion.div className="absolute top-0 left-4 right-4 md:left-16 md:right-16 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 50, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }} className="mb-6">
              <span className="text-[10px] font-bold tracking-widest text-[#ff0000] uppercase">Holovids</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight mt-4">
                Visions That <span className="text-white text-opacity-50">Shaped</span> Me
              </h2>
              <p className="text-white/40 mt-4 text-sm">Tap any card to read the transmission.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {MOVIES.map((m, i) => <MovieCard key={i} movie={m} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────── */}
        <section className="px-4 md:px-16 py-16 md:py-48 relative overflow-hidden h-screen flex items-center justify-center">
          <DeathStar />
          <div className="max-w-4xl mx-auto text-center relative z-10 pointer-events-none">
            <motion.h2
              initial={{ opacity: 0, y: 80, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] md:text-[100px] font-bold uppercase tracking-tighter leading-[0.85] mb-12">
              Bring <span className="text-[#00d4ff] drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">Balance</span><br />To The <span className="text-[#ff0000] drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">Force</span>.
            </motion.h2>
            <div className="pointer-events-auto flex justify-center">
              <MagneticButton onClick={onClose}
                className="inline-flex items-center gap-6 border border-white/10 hover:border-[#00d4ff]/50 px-10 py-5 text-sm md:text-base font-bold tracking-[0.2em] uppercase text-white hover:text-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-300 group backdrop-blur-sm bg-black/20">
                <IconArrowLeft />
                <span>Return to Base</span>
                <span className="w-2 h-2 rounded-full bg-[#ff0000] group-hover:bg-[#00d4ff] transition-colors" />
              </MagneticButton>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
