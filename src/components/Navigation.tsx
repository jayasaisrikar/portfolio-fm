import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference"
    >
      <Link to="/" className="group flex items-center gap-4 hover:opacity-80 transition-opacity">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform group-hover:rotate-180 duration-700 ease-in-out">
          {/* Main Rhombus */}
          <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="currentColor" className="text-white group-hover:text-[#E0FF00] transition-colors duration-500" />
          {/* Inner Cutout */}
          <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="#0A0A0A" />
          {/* Core Core */}
          <path d="M16 13L19 16L16 19L13 16L16 13Z" fill="currentColor" className="text-white group-hover:text-[#E0FF00] transition-colors duration-500 delay-100" />
        </svg>
        <span className="text-xs font-bold tracking-[0.3em] uppercase mt-1">
          JAY
        </span>
      </Link>

      <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] font-medium uppercase items-center">
        <Link to="/#about" className="hover:text-[#E0FF00] transition-colors">About</Link>
        <Link to="/#projects" className="hover:text-[#E0FF00] transition-colors">Projects</Link>
        <Link to="/#experience" className="hover:text-[#E0FF00] transition-colors">Experience</Link>
        <a href="mailto:bjayasaisrikar2004@gmail.com" className="hover:text-[#E0FF00] transition-colors font-bold text-[#E0FF00]">Contact</a>
      </div>
    </motion.nav>
  );
}
