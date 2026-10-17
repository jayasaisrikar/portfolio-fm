type DoodleKind = 'xwing' | 'vader' | 'r2' | 'deathstar';

const captions: Record<DoodleKind, string> = {
  xwing: 'taking the scenic route',
  vader: 'a little dark-side energy.',
  r2: 'a reliable little copilot.',
  deathstar: 'a small side project…',
};

export default function StarWarsDoodle({ kind, className = '', caption = true }: { kind: DoodleKind; className?: string; caption?: boolean }) {
  return <figure className={`star-doodle doodle-${kind} ${className}`}>
    <svg viewBox="0 0 200 180" fill="none" role="img" aria-label={`Blue-ink ${kind === 'r2' ? 'R2-D2' : kind === 'deathstar' ? 'Death Star' : kind === 'xwing' ? 'X-wing' : 'Darth Vader'} doodle`}>
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {kind === 'xwing' && <>
          <g transform="rotate(-22 100 90)"><path d="m96 24-8 85 10 29 10-29-5-85-7-6-1 6ZM91 81l-52-20-9 9 59 33m16-22 52-20 9 9-59 33M91 111l-45 31-8-6 50-38m18 13 45 31 8-6-50-38" /><path d="m30 44 4 43m125-43 4 43M36 121l4 29m119-29 4 29M94 61h10m-12 9h14m-11 46h7" /><ellipse cx="99" cy="87" rx="6" ry="12" /></g><path className="doodle-trail" d="M23 143c-29 15-10 31 28 22s40-14 55-5" strokeDasharray="3 6" strokeWidth="1.2" />
        </>}
        {kind === 'vader' && <>
          <path d="M64 72c-1-58 72-62 76-2l9 37 15 29c-17 15-39 20-64 17-26 3-47-1-64-14l16-29 12-38Z" /><path d="M97 29c-7 19-8 37-7 53m13-54c7 21 9 39 8 53M64 72l22 11 14-5 13 5 27-12M62 78l-7 35 26 15m57-49 8 32-27 17" /><path d="m65 86 22 3-9 13-17-4 4-12Zm70 0-22 3 10 13 16-4-4-12ZM99 96l-17 34 36 1-19-35Z" /><path d="m92 119 7-13 8 13m-20 17v9m8-10v12m9-12v12m8-10v9M48 134l23 9m59 0 22-9" /><path d="m35 45-9-4m21-12-5-8m111 26 12-5" strokeWidth="1.3" />
        </>}
        {kind === 'r2' && <>
          <path d="M61 74c-3-54 77-58 78-3l2 64-80 2V74Zm0 1 78-3M62 88l78-2M66 45c19 7 43 7 65-2M88 25l1 22m20-23 1 23M86 137l-4 23h34l-5-24" /><path d="m60 89-18 6-9 48-10 13 29 1 8-17m81-51 17 5 11 48 9 13-27 1-11-20M40 107l14 2m92-3 14-2M28 150h22m105-1 18-1" /><rect x="75" y="55" width="15" height="11" rx="2" /><circle cx="111" cy="60" r="7" /><path d="M78 94h48v11H78Zm8 18h28v18H86Zm7 1v16m11-16v16M70 114v13m59-14v13" /><path d="m153 47 9-5m-12-10 2-10m14 35 10 2" strokeWidth="1.3" />
        </>}
        {kind === 'deathstar' && <>
          <path d="M158 89c3 34-23 63-59 65-35 1-64-27-63-63-1-35 27-63 61-64 33-1 60 25 61 62Z" /><ellipse cx="116" cy="65" rx="21" ry="19" transform="rotate(24 116 65)" /><ellipse cx="116" cy="65" rx="12" ry="11" transform="rotate(24 116 65)" /><path d="m111 62 8 3-5 7m-74 22 114-3M39 102l116-2M71 36l-3 43m-15-26 28-1m-20 10 19-1m6 49 2 38m-40-30 37-1m7-3 49-2m-35 11 40-1m-43 12 23-1m-25-52 2-49m39 83v-8" strokeWidth="1.1" /><path d="m162 38 8-12m2 28 14-3M24 119l-10 3M26 43h-9m4-5v10" strokeWidth="1.3" />
        </>}
      </g>
    </svg>
    {caption && <figcaption className="hand-note">{captions[kind]}</figcaption>}
  </figure>;
}
