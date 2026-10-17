import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const tags = { div: motion.div, section: motion.section };

export default function Reveal({ children, className = '', from = 'up', as = 'div' }: { children: ReactNode; className?: string; from?: 'up' | 'left' | 'right'; as?: keyof typeof tags }) {
  const reduced = useReducedMotion();
  const x = reduced ? 0 : from === 'left' ? -32 : from === 'right' ? 32 : 0;
  const y = reduced || from !== 'up' ? 0 : 28;
  const [seen, setSeen] = useState(false);
  const Tag = tags[as];
  return <Tag className={`${className} reveal-stagger${seen ? ' is-revealed' : ''}`} initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} onViewportEnter={() => setSeen(true)} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduced ? 0.1 : 0.8, ease: [0.22, 1, 0.36, 1] }}>{children}</Tag>;
}
