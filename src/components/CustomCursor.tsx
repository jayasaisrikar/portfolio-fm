import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cursorX = useSpring(x, { stiffness: 420, damping: 32 });
  const cursorY = useSpring(y, { stiffness: 420, damping: 32 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setHovered(Boolean((event.target as HTMLElement).closest('a, button, [role="button"]')));
    };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
    };
  }, [x, y, reducedMotion]);

  if (reducedMotion) return null;
  return <motion.div aria-hidden="true"
    className="custom-cursor fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[150]"
    style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%', borderColor: hovered ? '#E0FF00' : '#ffffff60' }}
    animate={{ scale: hovered ? 1.65 : 1, opacity: visible ? 0.7 : 0 }}
    transition={{ type: 'spring', stiffness: 350, damping: 25 }} />;
}
