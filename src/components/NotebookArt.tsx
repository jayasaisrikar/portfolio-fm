import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export function Asterisk({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden="true"><path d="M30 3 29 57M7 16l46 28M7 44l46-28" stroke="currentColor" strokeWidth="6" strokeLinecap="round" /></svg>;
}

export function IdeaMachine() {
  const [idea, setIdea] = useState(0);
  const reduced = useReducedMotion();
  const notes = ['what if we built it?', 'okay, one more idea…', 'less talk. more making.', 'a work in progress. like me.'];
  return <div className="idea-machine">
    <span className="hand-note sketch-caption">a peek inside my head ↓</span>
    <button className="idea-button" onClick={() => setIdea(i => i + 1)} aria-label="Poke the idea machine for another thought">
      <motion.svg viewBox="0 0 440 410" fill="none" aria-hidden="true" animate={reduced ? undefined : { rotate: idea % 2 ? -3 : 2 }} transition={{ type: 'spring', stiffness: 140, damping: 12 }}>
        <g className="sketch-faint" stroke="currentColor" strokeWidth="1.2">
          <ellipse cx="225" cy="202" rx="185" ry="114" transform="rotate(-30 225 202)" strokeDasharray="5 8" />
          <path d="M44 89h30m-15-15v30M367 289h26m-13-13v26M352 67l6 11 13 2-10 9 2 14-12-7-12 7 3-14-10-9 14-2Z" />
          <circle cx="63" cy="278" r="9" /><circle cx="330" cy="347" r="4" /><circle cx="394" cy="162" r="4" />
        </g>
        <path d="M141 320c-8 16-21 24-36 25m224-45c13 6 24 3 33-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <g stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path className="machine-body" d="M132 128c14-16 143-20 165-4 17 13 23 131 4 149-20 19-139 24-160 5-18-17-27-130-9-150Z" />
          <path d="M143 144c24-11 116-16 138-7 12 7 16 94 3 108-18 12-110 17-128 6-12-10-23-94-13-107Z" />
          <path d="M174 177c-9 0-14 9-12 16m78-20c9-1 16 6 16 14" />
          <path d={idea % 2 ? 'M183 218q21 20 45-4' : 'M186 212q16 18 36-2'} strokeWidth="3.5" />
          <path d="m197 120-6-35 24-18m-25 19-15-10" /><circle cx="219" cy="63" r="6" />
          <path d="m128 188-18 3 4 35 19 1m174-49 18-1 3 34-18 5M169 285l-3 28m100-31 4 27m-117 7 25-1m80-2 25-1" />
          <path d="m170 267 9-1m55-3 38-3" /><circle cx="205" cy="264" r="3" />
          <path d="m94 134-19-13m240 2 20-18M225 42l5-16M159 69l-9-12" strokeWidth="2" />
        </g>
        <g className="idea-spark" key={idea} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="m327 218 23 3m-12-26 16-10m-29 55 14 13M104 166l-18-8" />
        </g>
        <path d="M89 363c65 14 202 17 263-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </motion.svg>
    </button>
    <span key={idea} className="hand-note idea-thought" aria-live="polite">{notes[idea % notes.length]}</span>
    <span className="tiny-label sketch-instruction">Psst. Give the little guy a poke.</span>
  </div>;
}

export function ProjectArt({ kind }: { kind: string }) {
  if (kind === 'fork') return <div className="project-art art-fork" aria-hidden="true">
    <span className="art-eyebrow">ONE DECISION. EVERY POSSIBILITY.</span>
    <svg viewBox="0 0 600 360" fill="none"><g stroke="currentColor" strokeWidth="1.5"><path d="M87 182h91q24 0 24-24v-42q0-24 24-24h110M202 181h134M202 181v68q0 24 24 24h110" /><circle cx="76" cy="182" r="11" /><rect x="337" y="66" width="172" height="51" rx="3" /><rect x="337" y="155" width="172" height="51" rx="3" /><rect x="337" y="247" width="172" height="51" rx="3" /><path d="m470 87 7 7 13-15" strokeWidth="2.5" /><path d="m350 167 143 27m-143 62 143 27" strokeDasharray="3 5" /></g><g fill="currentColor" fontSize="13" fontFamily="var(--font-body)"><text x="357" y="96">PLAN A</text><text x="357" y="186">PLAN B</text><text x="357" y="278">PLAN C</text><text x="42" y="217">what if?</text></g></svg>
    <span className="art-name">FORK<span>↗</span></span><span className="hand-note art-note">Think first. Execute second.</span>
  </div>;
  if (kind === 'crosswake') return <div className="project-art art-crosswake" aria-hidden="true"><span className="art-eyebrow">A SIGNAL THROUGH THE NOISE</span><svg viewBox="0 0 600 360" fill="none"><g stroke="currentColor" className="chart-grid" strokeWidth="0.6"><path d="M60 90h480M60 150h480M60 210h480M60 270h480M120 60v240M210 60v240M300 60v240M390 60v240M480 60v240" /></g><path d="M60 250c24 0 32-98 60-98s33 70 57 70 25-30 48-30 30 44 56 44 30-134 61-134 26 87 58 87 31-43 61-43 42 51 79-40" stroke="currentColor" strokeWidth="3" /><path d="M60 239c88-5 101-47 159-34s95-20 135-45 122 7 186-42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" /><circle cx="342" cy="102" r="7" fill="var(--color-paper-bright)" stroke="currentColor" strokeWidth="2" /></svg><span className="art-name">Crosswake</span><span className="hand-note art-note">Evidence over a lucky guess.</span></div>;
  return <div className="project-art art-quoril" aria-hidden="true"><span className="art-eyebrow">A LITTLE SPACE TO GET THINGS DONE</span><div className="quoril-pages"><div className="quoril-sheet back-sheet" /><div className="quoril-sheet"><span className="hand-note">one thing at a time.</span><p><span className="drawn-check">✓</span> Make something useful</p><p><span className="drawn-check">✓</span> Find a little focus</p><p><span className="empty-check" /> Leave room to wander</p><div className="sheet-doodle">✳</div></div></div><span className="art-name">Quoril</span><span className="hand-note art-note">Your space. Your pace.</span></div>;
}
