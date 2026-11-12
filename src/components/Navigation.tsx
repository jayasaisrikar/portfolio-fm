import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { useVisualMotion } from './VisualMotion';

export default function Navigation() {
  const { pathname } = useLocation();
  const { paused, systemReduced, toggle } = useVisualMotion();
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = header.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      // Condensed state once the page moves; reversible, independent of motion pause.
      const condense = ScrollTrigger.create({ start: 24, end: 'max', onToggle: self => el.classList.toggle('is-condensed', self.isActive) });
      if (paused) return () => condense.kill();

      gsap.from(q('.wordmark-inner'), { yPercent: 110, duration: 1.1, ease: 'expo.out', delay: 0.1, clearProps: 'transform' });
      gsap.from(q('.nav-item'), { y: -14, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'power3.out', delay: 0.25, clearProps: 'all' });

      // Hide on scroll down, reveal on scroll up.
      const show = gsap.quickTo(el, 'yPercent', { duration: 0.55, ease: 'power3.out' });
      const hide = ScrollTrigger.create({
        start: 140, end: 'max',
        onUpdate: self => show(self.direction === 1 ? -105 : 0),
        onLeaveBack: () => show(0),
      });

      // Ink underline that wipes in from the pointer side.
      const cleanups = q('.nav-link').map(link => {
        const line = link.querySelector('.nav-underline');
        const enter = (e: PointerEvent) => {
          const r = link.getBoundingClientRect();
          gsap.fromTo(line, { scaleX: 0, transformOrigin: e.clientX - r.left < r.width / 2 ? 'left' : 'right' }, { scaleX: 1, duration: 0.45, ease: 'expo.out' });
        };
        const leave = (e: PointerEvent) => {
          const r = link.getBoundingClientRect();
          gsap.to(line, { scaleX: 0, transformOrigin: e.clientX - r.left < r.width / 2 ? 'left' : 'right', duration: 0.4, ease: 'expo.out' });
        };
        link.addEventListener('pointerenter', enter);
        link.addEventListener('pointerleave', leave);
        return () => { link.removeEventListener('pointerenter', enter); link.removeEventListener('pointerleave', leave); };
      });

      // Magnetic call-to-action.
      const cta = el.querySelector<HTMLElement>('.nav-contact');
      let ctaCleanup = () => {};
      if (cta) {
        const x = gsap.quickTo(cta, 'x', { duration: 0.5, ease: 'power3.out' });
        const y = gsap.quickTo(cta, 'y', { duration: 0.5, ease: 'power3.out' });
        const move = (e: PointerEvent) => { const r = cta.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * 0.25); y((e.clientY - r.top - r.height / 2) * 0.35); };
        const out = () => { x(0); y(0); };
        cta.addEventListener('pointermove', move);
        cta.addEventListener('pointerleave', out);
        ctaCleanup = () => { cta.removeEventListener('pointermove', move); cta.removeEventListener('pointerleave', out); };
      }

      return () => { condense.kill(); hide.kill(); cleanups.forEach(c => c()); ctaCleanup(); };
    }, el);
    return () => ctx.revert();
  }, [paused]);

  const toggleLabel = systemReduced ? 'Animations reduced by device preference' : paused ? 'Resume animations' : 'Pause animations';

  return <header ref={header} className="portfolio-header">
    <div className="page-width navigation-inner">
      <Link className="portfolio-wordmark" to="/" aria-label="Jay — home">
        <span className="wordmark-mask" aria-hidden="true"><span className="wordmark-inner">
          <span className="wordmark-letter">j</span><span className="wordmark-letter">a</span><span className="wordmark-letter">y</span><span className="wordmark-letter brand-dot">.</span>
        </span></span>
      </Link>
      <span className="nav-descriptor nav-item">Engineer &amp; builder</span>
      <nav aria-label="Primary navigation">
        <Link className="nav-link nav-item" to="/#projects">Work<span className="nav-underline" aria-hidden="true" /></Link>
        <Link className="nav-link nav-item" to="/profile" aria-current={pathname === '/profile' ? 'page' : undefined}>About<span className="nav-underline" aria-hidden="true" /></Link>
        <a className="nav-contact nav-item" href="mailto:bjayasaisrikar2004@gmail.com"><span className="nav-contact-label">Let’s talk</span><span className="nav-arrow"><ArrowUpRight size={14} aria-hidden="true" /></span></a>
        <button type="button" className="motion-toggle nav-item" onClick={toggle} disabled={systemReduced} aria-label={toggleLabel} aria-pressed={paused} title={toggleLabel}>{paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}</button>
      </nav>
    </div>
  </header>;
}
