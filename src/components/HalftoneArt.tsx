import { useRef, type ReactElement } from 'react';
import { useVisualMotion } from './VisualMotion';
import { usePlateMotion } from './plateMotion';

/**
 * Mid-century spot illustrations, drawn as cut-paper geometry and printed in two
 * inks. Every plate: flat press-blue planes, press-red accents, steel dot screens
 * for shadow, and a small red registration sliver where the inks meet.
 * Decorative only — each figure is exposed through its section's own copy.
 */

type Kind = 'radio' | 'telephone' | 'signal' | 'ticker' | 'typewriter' | 'microphone';

const BLUE = 'var(--press-blue)';
const RED = 'var(--press-red)';
const STEEL = 'var(--press-steel)';
const PAPER = 'var(--press-newsprint)';

function Screen({ id, ink, pitch = 6, r = 1.5 }: { id: string; ink: string; pitch?: number; r?: number }) {
  return <pattern id={id} width={pitch} height={pitch} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <circle cx={pitch / 2} cy={pitch / 2} r={r} fill={ink} />
  </pattern>;
}

function Defs({ k }: { k: Kind }) {
  return <defs>
    <Screen id={`${k}-steel`} ink={STEEL} />
    <Screen id={`${k}-steel-soft`} ink={STEEL} r={0.9} />
    <Screen id={`${k}-red`} ink={RED} r={1.2} />
    <Screen id={`${k}-blue`} ink={BLUE} r={1.1} />
  </defs>;
}

/** Shadow pooled under a plate: three screens, densest at the contact point. */
function Shadow({ k, cx = 202, cy = 318, rx = 118, ry = 12 }: { k: Kind; cx?: number; cy?: number; rx?: number; ry?: number }) {
  return <g className="p-shadow" data-origin={`${cx} ${cy}`}>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${k}-steel-soft)`} opacity=".55" />
    <ellipse cx={cx} cy={cy} rx={rx * 0.72} ry={ry * 0.78} fill={`url(#${k}-steel)`} opacity=".6" />
    <ellipse cx={cx} cy={cy} rx={rx * 0.4} ry={ry * 0.5} fill={`url(#${k}-blue)`} opacity=".5" />
  </g>;
}

const plateProps = { viewBox: '0 0 400 400', role: 'presentation' as const, focusable: 'false' as const };

function Radio({ k }: { k: Kind }) {
  const grille = Array.from({ length: 5 }, (_, i) => 208 + i * 15);
  const ticks = Array.from({ length: 12 }, (_, i) => 88 + i * 20);
  return <svg {...plateProps}>
    <Defs k={k} />
    <Shadow k={k} cy={318} rx={124} ry={11} />

    {/* registration: the red plate struck a hair above and right */}
    <g className="reg" fill={RED}>
      <rect x="66" y="126" width="270" height="176" rx="6" />
      <path d="M326 126l24-52 6 3-22 54z" />
    </g>

    {/* aerial */}
    <path d="M327 128l24-54" stroke={BLUE} strokeWidth="3" />
    <circle className="p-blink" cx="352" cy="70" r="6" fill={RED} />

    {/* bakelite case */}
    <rect x="64" y="128" width="272" height="170" rx="6" fill={BLUE} />
    <rect x="78" y="142" width="244" height="38" fill={PAPER} />
    <g stroke={BLUE} strokeWidth="1.5">
      {ticks.map((x, i) => <line key={x} x1={x} y1={i % 3 === 0 ? 149 : 154} x2={x} y2={172} />)}
    </g>
    <g className="p-needle"><rect x="208" y="146" width="3" height="30" fill={RED} />
    <circle cx="209.5" cy="146" r="4" fill={RED} /></g>

    {/* speaker: cut-paper grille bars */}
    <rect x="78" y="194" width="150" height="88" fill={PAPER} />
    {grille.map((y, i) => <rect className="p-grille" key={y} x="86" y={y} width={i % 2 ? 126 : 134} height="8" rx="4" fill={BLUE} />)}

    {/* dial and control knobs */}
    <rect x="240" y="194" width="82" height="88" fill={`url(#${k}-steel-soft)`} />
    <g className="p-knob" data-origin="281 220"><circle cx="281" cy="220" r="19" fill={BLUE} />
    <circle cx="281" cy="220" r="7" fill={RED} /><rect x="279.5" y="203" width="3" height="9" fill={PAPER} /></g>
    <circle cx="281" cy="258" r="12" fill={BLUE} />
    <rect x="275" y="256.5" width="12" height="3" fill={PAPER} />
    <rect x="279.5" y="252" width="3" height="12" fill={PAPER} />

    {/* feet */}
    <path d="M88 296h26l-4 12H84z" fill={BLUE} />
    <path d="M286 296h26l4 12h-26z" fill={BLUE} />
  </svg>;
}

function Telephone({ k }: { k: Kind }) {
  const holes = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
    return { x: 202 + Math.cos(angle) * 17, y: 248 + Math.sin(angle) * 17 };
  });
  const speaker = [0, 1, 2].flatMap(r => [0, 1, 2].map(c => ({ x: 118 + c * 10, y: 156 + r * 10 })));
  return <svg {...plateProps}>
    <Defs k={k} />
    <Shadow k={k} cy={318} cx={202} rx={134} ry={12} />

    <g className="reg" fill={RED}>
      <path d="M72 292h260l12 20H60z" />
      <rect x="94" y="200" width="216" height="92" />
    </g>

    {/* coiled handset cord */}
    <path className="p-cord" d="M292 196c12 4 12 14 0 18s-12 14 0 18 12 14 0 18 12 14 0 18" stroke={RED} strokeWidth="2.6" fill="none" strokeLinecap="round" />

    {/* plinth and body */}
    <path d="M72 292h260l12 20H60z" fill={BLUE} />
    <rect x="94" y="200" width="216" height="92" fill={BLUE} />
    <rect x="94" y="286" width="216" height="4" fill={PAPER} opacity=".5" />

    {/* rotary dial */}
    <circle cx="202" cy="248" r="30" fill={PAPER} />
    <circle cx="202" cy="248" r="30" fill="none" stroke={BLUE} strokeWidth="2" />
    <g className="p-dial" data-origin="202 248">{holes.map((h, i) => <circle key={i} cx={h.x} cy={h.y} r="3.2" fill={BLUE} />)}</g>
    <circle cx="202" cy="248" r="9" fill={RED} />
    <path d="M202 239a9 9 0 0 1 7 13" stroke={PAPER} strokeWidth="2.4" fill="none" />

    {/* handset: a curved bar with an ear and mouth cup at each end */}
    <g className="p-handset" data-origin="202 196">
    <path d="M134 170q68 22 136 0" stroke={RED} strokeWidth="30" fill="none" strokeLinecap="round" />
    <g transform="rotate(-16 132 168)"><rect x="102" y="136" width="60" height="60" rx="24" fill={RED} /></g>
    <g transform="rotate(16 272 168)"><rect x="242" y="136" width="60" height="60" rx="24" fill={RED} /></g>
    {speaker.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="1.8" fill={PAPER} opacity=".8" />)}
    <rect x="258" y="158" width="26" height="3.4" rx="1.7" fill={PAPER} opacity=".8" />
    <rect x="258" y="167" width="26" height="3.4" rx="1.7" fill={PAPER} opacity=".8" />
    <rect x="258" y="176" width="26" height="3.4" rx="1.7" fill={PAPER} opacity=".8" />
    </g>
    <g className="p-ring" stroke={RED} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0"><path d="M84 126a44 44 0 0 0-12 34" /><path d="M70 112a62 62 0 0 0-16 48" /><path d="M320 126a44 44 0 0 1 12 34" /><path d="M334 112a62 62 0 0 1 16 48" /></g>
  </svg>;
}

function Signal({ k }: { k: Kind }) {
  return <svg {...plateProps}>
    <Defs k={k} />
    <Shadow k={k} cy={324} cx={180} rx={96} ry={11} />

    <g className="reg" fill={RED}>
      <rect x="128" y="112" width="18" height="196" />
      <path d="M104 300h64l12 18H92z" />
      <path d="M146 152l134-38 6 22-134 38z" />
    </g>

    {/* base and post */}
    <path d="M104 300h64l12 18H92z" fill={BLUE} />
    <rect x="128" y="112" width="18" height="192" fill={BLUE} />
    <rect x="132" y="236" width="10" height="34" fill={PAPER} opacity=".55" />

    {/* lamp head */}
    <rect x="120" y="96" width="34" height="18" fill={BLUE} />
    <circle className="p-blink" cx="137" cy="86" r="12" fill={RED} />
    <circle cx="137" cy="86" r="4.5" fill={PAPER} opacity=".6" />

    {/* semaphore arm, raised */}
    <g className="p-arm" data-origin="137 164"><g transform="rotate(-16 137 164)">
      <rect x="137" y="150" width="134" height="26" fill={RED} />
      <rect x="243" y="150" width="20" height="26" fill={PAPER} />
      <rect x="206" y="150" width="10" height="26" fill={PAPER} opacity=".45" />
    </g></g>
    <circle cx="137" cy="164" r="10" fill={BLUE} />
    <circle cx="137" cy="164" r="4" fill={PAPER} />

    {/* counterweight behind the pivot */}
    <rect x="120" y="182" width="16" height="30" fill={BLUE} />
    <circle cx="146" cy="204" r="12" fill={BLUE} />
  </svg>;
}

function Ticker({ k }: { k: Kind }) {
  const column = Array.from({ length: 6 }, (_, i) => 112 + i * 15);
  return <svg {...plateProps}>
    <Defs k={k} />
    <Shadow k={k} cy={306} cx={176} rx={104} ry={11} />

    <g className="reg" fill={RED}>
      <rect x="88" y="176" width="172" height="104" rx="4" />
      <path d="M254 186c60-10 96 12 88 54-6 30-26 44-22 74" stroke={RED} strokeWidth="26" fill="none" strokeLinecap="butt" />
    </g>

    {/* the tape runs out of the machine and down the plate */}
    <path d="M252 186c60-10 96 12 88 54-6 30-26 44-22 74" stroke={BLUE} strokeWidth="30" fill="none" strokeLinecap="butt" />
    <path d="M252 186c60-10 96 12 88 54-6 30-26 44-22 74" stroke={PAPER} strokeWidth="25" fill="none" strokeLinecap="butt" />
    <g className="p-tape" fill={RED}>
      <rect x="262" y="176" width="16" height="4" transform="rotate(-8 262 176)" />
      <rect x="296" y="176" width="22" height="4" transform="rotate(-2 296 176)" />
      <rect x="326" y="192" width="16" height="4" transform="rotate(18 326 192)" />
      <rect x="330" y="222" width="20" height="4" transform="rotate(48 330 222)" />
      <rect x="318" y="254" width="18" height="4" transform="rotate(70 318 254)" />
      <rect x="300" y="286" width="14" height="4" transform="rotate(84 300 286)" />
    </g>

    {/* glass dome over the mechanism */}
    <path d="M136 176a38 38 0 0 1 76 0z" fill={`url(#${k}-steel)`} />
    <path d="M136 176a38 38 0 0 1 76 0" fill="none" stroke={BLUE} strokeWidth="2" />

    {/* body */}
    <rect x="88" y="176" width="172" height="104" rx="4" fill={BLUE} />
    <rect x="98" y="204" width="110" height="56" fill={PAPER} />
    <g fill={RED}>
      {column.map((x, i) => <rect className="p-bar" key={x} x={x} y={i % 3 === 0 ? 214 : 220} width="8" height={i % 3 === 0 ? 34 : 28} />)}
    </g>

    {/* dial and crank */}
    <circle cx="232" cy="238" r="17" fill={PAPER} />
    <circle cx="232" cy="238" r="17" fill="none" stroke={BLUE} strokeWidth="2" />
    <g className="p-knob" data-origin="232 238"><rect x="224" y="236.5" width="16" height="3" fill={BLUE} />
    <rect x="230.5" y="229" width="3" height="18" fill={BLUE} /></g>
    <circle cx="232" cy="238" r="4" fill={RED} />
    <circle cx="88" cy="204" r="11" fill={PAPER} stroke={BLUE} strokeWidth="2" />
    <rect x="82" y="202.5" width="12" height="3" fill={BLUE} />

    {/* feet */}
    <rect x="106" y="280" width="18" height="10" fill={BLUE} />
    <rect x="226" y="280" width="18" height="10" fill={BLUE} />
  </svg>;
}

function Typewriter({ k }: { k: Kind }) {
  const rowA = Array.from({ length: 11 }, (_, i) => 118 + i * 17);
  const rowB = Array.from({ length: 10 }, (_, i) => 126 + i * 17);
  return <svg {...plateProps}>
    <Defs k={k} />
    <Shadow k={k} cy={320} rx={122} ry={11} />

    <g className="reg" fill={RED}>
      <path d="M98 224h220l16 84H82z" />
      <rect x="132" y="200" width="152" height="24" rx="5" />
    </g>

    {/* sheet */}
    <g className="p-sheet"><g transform="rotate(-2 200 156)">
      <rect x="148" y="86" width="124" height="128" fill={PAPER} stroke={BLUE} strokeWidth="1.4" />
      <g fill={RED}>
        <rect className="p-line" x="162" y="108" width="86" height="3.4" />
        <rect className="p-line" x="162" y="122" width="96" height="3.4" />
        <rect className="p-line" x="162" y="136" width="72" height="3.4" />
        <rect className="p-line" x="162" y="150" width="92" height="3.4" />
      </g>
      <rect className="p-blink" x="162" y="168" width="3" height="12" fill={BLUE} />
    </g></g>

    {/* platen */}
    <rect x="132" y="200" width="152" height="24" rx="5" fill={RED} />
    <rect x="288" y="203" width="14" height="18" rx="4" fill={BLUE} />
    <rect x="114" y="203" width="14" height="18" rx="4" fill={BLUE} />

    {/* body with two key banks */}
    <path d="M98 224h220l16 84H82z" fill={BLUE} />
    <rect x="106" y="224" width="204" height="9" fill={PAPER} />
    {rowA.map(x => <circle className="p-key" key={`a${x}`} cx={x} cy="252" r="5.5" fill={PAPER} />)}
    {rowB.map(x => <circle className="p-key" key={`b${x}`} cx={x} cy="274" r="5.5" fill={PAPER} />)}
    <rect x="140" y="290" width="120" height="7" fill={`url(#${k}-red)`} />
  </svg>;
}

function Microphone({ k }: { k: Kind }) {
  return <svg {...plateProps}>
    <Defs k={k} />
    <Shadow k={k} cy={332} cx={200} rx={94} ry={10} />

    <g className="reg" fill={RED}>
      <rect x="166" y="88" width="68" height="118" rx="34" />
      <path d="M194 254h12v58h-12z" />
      <ellipse cx="200" cy="320" rx="62" ry="11" />
    </g>

    {/* yoke */}
    <g className="p-mic" data-origin="200 250">
    <path d="M154 134v82a46 46 0 0 0 92 0v-82" fill="none" stroke={BLUE} strokeWidth="10" />

    {/* capsule */}
    <rect x="166" y="88" width="68" height="118" rx="34" fill={BLUE} />
    <rect x="166" y="140" width="68" height="56" rx="26" fill={`url(#${k}-steel)`} opacity=".85" />
    <g stroke={PAPER} strokeWidth="1.5" opacity=".8">
      <line x1="174" y1="106" x2="226" y2="106" />
      <line x1="172" y1="118" x2="228" y2="118" />
      <line x1="170" y1="130" x2="230" y2="130" />
    </g>
    <rect x="166" y="176" width="68" height="10" fill={RED} />
    </g>

    {/* stand */}
    <rect x="194" y="254" width="12" height="66" fill={BLUE} />
    <circle cx="200" cy="250" r="9" fill={BLUE} />
    <ellipse cx="200" cy="320" rx="62" ry="11" fill={BLUE} />
    <ellipse cx="200" cy="320" rx="36" ry="6" fill={`url(#${k}-steel-soft)`} />
  </svg>;
}

const plates: Record<Kind, (props: { k: Kind }) => ReactElement> = {
  radio: Radio, telephone: Telephone, signal: Signal, ticker: Ticker, typewriter: Typewriter, microphone: Microphone,
};

export default function HalftoneArt({ kind, className = '' }: { kind: Kind; className?: string }) {
  const Plate = plates[kind];
  const ref = useRef<HTMLDivElement>(null);
  const { paused } = useVisualMotion();
  usePlateMotion(ref, kind, paused);
  return <div ref={ref} className={`halftone-art ${className}`} data-kind={kind} aria-hidden="true"><Plate k={kind} /></div>;
}

export type HalftoneArtKind = Kind;
