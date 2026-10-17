import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

import { useStaticDocument } from '../lib/rendering';

const tags = { div: motion.div, section: motion.section };

export default function Reveal({ children, className = '', from = 'up', as = 'div' }: { children: ReactNode; className?: string; from?: 'up' | 'left' | 'right'; as?: keyof typeof tags }) {
  const reduced = useReducedMotion();
  const staticDocument = useStaticDocument();
  const x = reduced ? 0 : from === 'left' ? -72 : from === 'right' ? 72 : 0;
  const y = reduced || from !== 'up' ? 0 : 64;
  const [seen, setSeen] = useState(staticDocument);
  const Tag = tags[as];
  return <Tag className={`${className} reveal-stagger${seen ? ' is-revealed' : ''}`} initial={staticDocument ? false : { opacity: 0, x, y, scale: reduced ? 1 : 0.97 }} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }} onViewportEnter={() => setSeen(true)} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0.1 : 1, ease: [0.22, 1, 0.36, 1] }}>{children}</Tag>;
}
