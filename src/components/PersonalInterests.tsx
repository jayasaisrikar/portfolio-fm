import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const places = [
  "New York, USA", "Vizianagaram, India", "Hyderabad, India", "Bangalore, India" // guessing these based on experience
];

const movies = [
  { title: "Interstellar", review: "The visualization of tesseracts and relativity still blows my mind. Peak gravitational engineering concept." },
  { title: "Dark Knight", review: "A masterclass in tension and chaos. Reminds me that systems are only as strong as their weakest node." },
  { title: "Inception", review: "Recursive dreaming maps perfectly to recursive algorithms and infinite loops." },
  { title: "Oppenheimer", review: "The ultimate intersection of devastating physics and the burden of intellectual creation." },
  { title: "Dune", review: "Scale, architecture, and world-building on a level that inspires massive infrastructure design." },
  { title: "Baahubali", review: "Epic storytelling and unabashed scale. Proof that vision and execution can transcend boundaries." }
];

const MovieCard = ({ movie }: { movie: typeof movies[0] }) => {
  return (
    <div className="group h-48 w-full [perspective:1000px] cursor-pointer">
      <div className="relative h-full w-full rounded-xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] border border-white/10">
        {/* Front */}
        <div className="absolute inset-0 flex items-center justify-center p-6 backface-hidden bg-[#0A0A0A] rounded-xl text-center">
          <span className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white/80 group-hover:text-white transition-colors">{movie.title}</span>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 flex items-center justify-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-[#E0FF00]/5 border border-[#E0FF00]/20 rounded-xl text-center">
          <p className="text-white/70 text-sm md:text-base font-light italic">"{movie.review}"</p>
        </div>
      </div>
    </div>
  );
};

export default function PersonalInterests() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="interests" className="px-6 md:px-12 py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16" ref={containerRef}>
        
        {/* Places Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col gap-8"
        >
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#E0FF00] uppercase mb-4 block">Coordinates</span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">Places I've Been</h2>
          </div>
          
          <ul className="flex flex-wrap gap-4">
            {places.map((place, i) => (
              <motion.li 
                key={i}
                variants={itemVariants}
                className="px-6 py-3 rounded-full border border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest hover:border-[#E0FF00]/50 hover:bg-[#E0FF00]/10 hover:text-[#E0FF00] transition-all cursor-crosshair group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#E0FF00] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out z-0" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300 font-bold">{place}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Movies Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
          }}
          className="flex flex-col gap-8 md:col-span-2 mt-16"
        >
          <div className="text-center">
            <span className="text-[10px] font-bold tracking-widest text-[#E0FF00] uppercase mb-4 block">Cinematography</span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4">Movies That Shaped Me</h2>
            <p className="text-white/50 text-sm italic font-mono mb-12">Tap / Hover to decrypt perspective</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie, i) => (
              <motion.div key={i} variants={itemVariants}>
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
