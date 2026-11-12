import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useVisualMotion } from './VisualMotion';

/** All motion is progressive enhancement; server-rendered content is fully visible. */
export default function PortfolioMotion() {
  const { pathname } = useLocation();
  const { paused } = useVisualMotion();
  const entrancePath = useRef<string | null>(null);
  useEffect(() => {
    if (paused) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const enter = entrancePath.current !== pathname;
      entrancePath.current = pathname;
      if (enter) gsap.from('[data-title-line]', { yPercent: 115, rotation: 2, duration: 1.5, stagger: .14, delay: .15, ease: 'power4.out', clearProps: 'all' });
      gsap.to('.scroll-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .2 } });
      if (enter) gsap.from('[data-entrance]', { y: 36, opacity: 0, duration: 1.15, stagger: 0.12, ease: 'power3.out', clearProps: 'all' });
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el => {
        gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.from(el, { y: 28, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true }, clearProps: 'transform' });
      });
    });
    let active = true;
    document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); };
  }, [pathname, paused]);
  return <div className="scroll-progress" aria-hidden="true" />;
}
