import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Hackathons from '../components/Hackathons';
import ScrollBall from '../components/ScrollBall';

export default function Landing() {
  const { hash } = useLocation();
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
      className="w-full"
    >
      <motion.div aria-hidden="true" className="fixed top-0 left-0 right-0 h-0.5 bg-[#E0FF00] origin-left z-[80]" style={{ scaleX: reducedMotion ? scrollYProgress : progress }} />
      {!reducedMotion && <ScrollBall />}
      <Hero />
      <About />
      <Experience />
      <Hackathons />
      <Projects />
      <Skills />
    </motion.div>
  );
}
