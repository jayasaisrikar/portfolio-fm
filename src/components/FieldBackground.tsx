/** Decorative notebook sketches: orbital charts above, coastal contours below. */
export default function FieldBackground() {
  return <div className="field-background" aria-hidden="true">
    <svg className="field-orbits" viewBox="0 0 800 900" fill="none">
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="530" cy="350" r="270" /><circle cx="530" cy="350" r="220" strokeDasharray="2 10" /><circle cx="530" cy="350" r="160" />
        <ellipse cx="530" cy="350" rx="340" ry="110" transform="rotate(-38 530 350)" />
        <path d="M530 40v620M220 350h620M310 130l440 440M310 570l440-440" strokeDasharray="3 9" />
        <circle cx="342" cy="157" r="8" /><circle cx="690" cy="350" r="5" /><circle cx="530" cy="620" r="11" />
        <path d="m96 596 34-80 49 26 63-91 68 12M130 516l-4-65 83-41 33 41M179 542l28 91 72-29 31-141" />
        <g fill="currentColor"><circle cx="96" cy="596" r="3" /><circle cx="130" cy="516" r="4" /><circle cx="179" cy="542" r="3" /><circle cx="242" cy="451" r="4" /><circle cx="310" cy="463" r="3" /><circle cx="126" cy="451" r="3" /><circle cx="209" cy="410" r="3" /><circle cx="207" cy="633" r="3" /><circle cx="279" cy="604" r="3" /></g>
        <path d="M530 68v14m89-1-4 13m85 21-8 12m69 44-12 8m45 71-13 4M263 350h14m5-89 14 4m21-85 11 8m46-68 7 12m72-44 3 14" />
      </g>
    </svg>
    <svg className="field-coast" viewBox="0 0 650 1000" fill="none">
      <g stroke="currentColor" strokeWidth="1.2">
        <path d="M0 50c220 35 24 121 226 156s14 136 146 172-17 184 135 227-15 196 143 230M0 85c186 39 16 117 205 151s5 130 142 169-34 180 120 228-24 180 183 245M0 120c155 43 1 110 180 145s11 126 140 166-45 178 110 227-29 169 220 266M0 155c126 45-6 102 156 139s9 123 135 164-47 171 102 229-14 165 257 280M0 190c96 48-11 95 130 134s6 116 135 162-59 167 91 231-10 160 224 283M0 226c67 48-19 88 106 128s6 108 129 159-58 166 85 233-7 155 191 254M0 262c41 50-28 78 81 124s9 98 123 154-61 156 82 237-17 152 154 223" />
        <path d="M50 800h90m-45-45v90" /><circle cx="95" cy="800" r="34" /><path d="m95 767-8 32 8-6 8 6-8-32Z" />
      </g>
    </svg>
  </div>;
}
