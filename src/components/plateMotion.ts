import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Brings each halftone plate to life: the parts are "printed" onto the page as the
 * plate scrolls in, then a small mechanical loop runs while it is on screen
 * (the phone rings, the dial turns, the ticker prints). Hovering a plate speeds it up.
 * Everything is reverted when motion is paused or the user prefers reduced motion.
 */
export function usePlateMotion(ref: RefObject<HTMLElement | null>, kind: string, paused: boolean) {
  useEffect(() => {
    const root = ref.current;
    if (!root || paused) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const svg = root.querySelector('svg');
      if (!svg) return;
      const origin = (el: Element | null) => el?.getAttribute('data-origin') ?? undefined;
      const parts = Array.from(svg.children).filter(el => el.tagName !== 'defs' && !el.classList.contains('reg') && !el.classList.contains('p-shadow') && !el.classList.contains('p-ring'));

      /* ---------- entrance: plates struck one ink at a time ---------- */
      const intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
      intro
        .from(q('.p-shadow'), { scaleX: 0.2, opacity: 0, svgOrigin: origin(root.querySelector('.p-shadow')), duration: 1.2 }, 0)
        .from(parts, { y: -26, opacity: 0, duration: 1, stagger: { each: 0.035, from: 'start' }, ease: 'back.out(1.7)' }, 0.05)
        .from(q('.reg'), { x: 22, y: -22, opacity: 0, duration: 1.4, ease: 'elastic.out(1, 0.6)' }, 0.35);

      /* ---------- idle loop, per machine ---------- */
      const loop = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: 'sine.inOut' } });
      const float = gsap.to(svg, { y: -6, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true });
      const shadow = root.querySelector('.p-shadow');
      const breathe = shadow ? gsap.to(shadow, { scaleX: 0.9, opacity: 0.75, svgOrigin: origin(shadow), duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true }) : null;

      if (kind === 'telephone') {
        const handset = root.querySelector('.p-handset');
        const o = origin(handset);
        loop
          .to(handset, { y: -16, duration: 0.35, ease: 'power3.out' }, 0.6)
          .to(handset, { rotation: 4, svgOrigin: o, duration: 0.06, repeat: 9, yoyo: true, ease: 'none' }, 0.65)
          .fromTo(q('.p-ring path'), { opacity: 0, scale: 0.8, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1.08, duration: 0.25, stagger: 0.05, repeat: 3, yoyo: true }, 0.65)
          .to(handset, { y: 0, rotation: 0, svgOrigin: o, duration: 0.7, ease: 'bounce.out' }, 1.35)
          .set(q('.p-ring'), { opacity: 1 }, 0.6)
          .to(q('.p-dial'), { rotation: -288, svgOrigin: origin(root.querySelector('.p-dial')), duration: 1.1, ease: 'power2.inOut' }, 2.2)
          .to(q('.p-dial'), { rotation: 0, svgOrigin: origin(root.querySelector('.p-dial')), duration: 1.6, ease: 'power1.out' }, 3.4)
          .to(q('.p-cord'), { scaleY: 1.06, transformOrigin: '50% 0%', duration: 0.5, yoyo: true, repeat: 1 }, 0.6)
          .to({}, { duration: 1.2 });
      } else if (kind === 'signal') {
        const arm = root.querySelector('.p-arm');
        loop
          .to(arm, { rotation: 22, svgOrigin: origin(arm), duration: 1.1, ease: 'power3.inOut' }, 0.4)
          .to(q('.p-blink'), { opacity: 0.25, duration: 0.18, repeat: 5, yoyo: true, ease: 'steps(1)' }, 0.6)
          .to(arm, { rotation: 0, svgOrigin: origin(arm), duration: 1.4, ease: 'elastic.out(1, 0.45)' }, 2.4)
          .to({}, { duration: 1 });
      } else if (kind === 'ticker') {
        const bars = q('.p-bar');
        loop
          .to(bars, { scaleY: () => gsap.utils.random(0.35, 1.15), transformOrigin: '50% 100%', duration: 0.45, stagger: { each: 0.06, from: 'random' }, ease: 'power2.inOut', repeat: 5, yoyo: true, repeatRefresh: true }, 0)
          .to(q('.p-tape rect'), { opacity: 0.2, duration: 0.2, stagger: 0.12, repeat: 1, yoyo: true }, 0.2)
          .to(q('.p-knob'), { rotation: 360, svgOrigin: origin(root.querySelector('.p-knob')), duration: 2.7, ease: 'none' }, 0);
      } else if (kind === 'typewriter') {
        const lines = q('.p-line');
        const keys = q('.p-key');
        gsap.set(lines, { scaleX: 0, transformOrigin: '0% 50%' });
        lines.forEach((line, i) => {
          loop.to(line, { scaleX: 1, duration: 0.8, ease: 'steps(12)' }, i * 0.9)
            .to(gsap.utils.shuffle([...keys]).slice(0, 6), { y: 2.5, duration: 0.07, stagger: 0.12, yoyo: true, repeat: 1, ease: 'power1.in' }, i * 0.9);
        });
        loop
          .to(q('.p-sheet'), { y: -8, duration: 3.6, ease: 'steps(4)' }, 0)
          .to(q('.p-blink'), { opacity: 0, duration: 0.3, repeat: 5, yoyo: true, ease: 'steps(1)' }, 3.6)
          .to(lines, { scaleX: 0, duration: 0.3, stagger: 0.05, ease: 'power2.in' }, 5.2)
          .to(q('.p-sheet'), { y: 0, duration: 0.5, ease: 'power3.out' }, 5.3);
      } else if (kind === 'radio') {
        loop
          .to(q('.p-needle'), { x: 92, duration: 2.4, ease: 'power2.inOut' }, 0)
          .to(q('.p-knob'), { rotation: 220, svgOrigin: origin(root.querySelector('.p-knob')), duration: 2.4, ease: 'power2.inOut' }, 0)
          .to(q('.p-grille'), { scaleX: 0.86, transformOrigin: '0% 50%', duration: 0.18, stagger: { each: 0.05, repeat: 7, yoyo: true } }, 0.4)
          .to(q('.p-needle'), { x: 0, duration: 2.4, ease: 'power2.inOut' }, 2.8)
          .to(q('.p-knob'), { rotation: 0, svgOrigin: origin(root.querySelector('.p-knob')), duration: 2.4, ease: 'power2.inOut' }, 2.8)
          .to(q('.p-blink'), { opacity: 0.2, duration: 0.25, yoyo: true, repeat: 3, ease: 'steps(1)' }, 1);
      } else if (kind === 'microphone') {
        const mic = root.querySelector('.p-mic');
        loop
          .to(mic, { rotation: -6, svgOrigin: origin(mic), duration: 1.6 }, 0)
          .to(mic, { rotation: 5, svgOrigin: origin(mic), duration: 2 }, 1.6)
          .to(mic, { rotation: 0, svgOrigin: origin(mic), duration: 1.4 }, 3.6);
      }

      const idle = [loop, float, breathe].filter(Boolean) as gsap.core.Animation[];
      const play = () => idle.forEach(a => a.play());
      const pause = () => idle.forEach(a => a.pause());

      ScrollTrigger.create({
        trigger: root,
        start: 'top 88%',
        end: 'bottom top',
        onEnter: () => { intro.play(); intro.eventCallback('onComplete', play); },
        onEnterBack: play,
        onLeave: pause,
        onLeaveBack: pause,
      });

      /* ---------- hover: the machine works harder ---------- */
      const host = root.closest('a, .project-visual') ?? root;
      const tilt = gsap.quickTo(svg, 'rotation', { duration: 0.6, ease: 'power3.out' });
      const enter = () => { gsap.to(idle, { timeScale: 1.9, duration: 0.4 }); gsap.to(q('.reg'), { x: 7, y: -7, duration: 0.6, ease: 'power3.out' }); };
      const leave = () => { gsap.to(idle, { timeScale: 1, duration: 0.6 }); gsap.to(q('.reg'), { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }); tilt(0); };
      const move = (e: Event) => {
        const { left, width } = (host as HTMLElement).getBoundingClientRect();
        tilt(((((e as PointerEvent).clientX - left) / width) - 0.5) * 4);
      };
      host.addEventListener('pointerenter', enter);
      host.addEventListener('pointerleave', leave);
      host.addEventListener('pointermove', move);
      return () => {
        host.removeEventListener('pointerenter', enter);
        host.removeEventListener('pointerleave', leave);
        host.removeEventListener('pointermove', move);
      };
    }, root);

    return () => ctx.revert();
  }, [ref, kind, paused]);
}
