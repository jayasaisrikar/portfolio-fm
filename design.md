# Design — Jay's field notes

A shared system for the homepage and personal notebook. The user selected “Playful field notebook — paper, blue ink, sketches.”

## Audience and purpose
Collaborators and people hiring Jay. Explore real work, meet the person behind it, and start a conversation. No resume downloads or public resume assets.

## Genre and structure
Editorial with playful illustrative details. Split Studio homepage: personal introduction opposite an interactive ink drawing, followed by alternating project stories. Long Document personal page: short biography, cinema notes, places, education. Masthead navigation (N6, compact and asymmetric), letter-close footer (Ft6). Both routes share the same identity.

## Theme and typography
Paper #f5f2e9, ink #252e43, accent blue #2949b8, muted ink #565d6c. Bricolage Grotesque display, DM Sans body, Caveat only for handwritten marginal notes. Headings stay upright. All tokens are in tokens.css and imported by the page stylesheet. Additional color values belong there.

## Layout
Maximum width 1320px. Fluid page gutters, strong left alignment, open whitespace and quiet rules. No stock photography, fake browser frames, glass, decorative dashboards, or 3D background scenes. Illustrations are original SVG diagrams, clearly presented as illustrations rather than screenshots.

## Motion
One short staggered introduction, subtle reveals, drawn paths, tactile link movement, an explicitly triggered idea-machine sketch. No scroll hijacking, custom cursor, autoplay audio, or continuous decorative animation. Reduced motion removes spatial movement and keeps content immediately usable.

## Interaction
Native links and disclosure elements. Visible focus outlines. Meaningful aria labels, decorative art hidden from assistive technology, no content available only on hover. Mobile nav remains visible without a menu. Contact uses email and actual social destinations.

## Content
Use verified existing professional facts and project links. Personal interests derive from the prior portfolio. Do not invent testimonials, availability, success metrics, or a likeness of Jay. The doodle is an idea machine, not a portrait.

## Exports

### CSS tokens
```css
:root {
  --color-paper: #f5f2e9;
  --color-paper-2: #ebe7db;
  --color-paper-bright: #fffcf3;
  --color-ink: #252e43;
  --color-ink-2: #565d6c;
  --color-muted: #686e7a;
  --color-rule: #cecfc8;
  --color-accent: #2949b8;
  --color-accent-ink: #faf8f0;
  --color-focus: #2949b8;
  --color-wash: #e2e8ec;
  --color-wash-deep: #cbd6e4;
  --color-art: #203f9c;
  --color-art-rule: #8a9ed4;
  --color-transparent: transparent;
  --color-shadow: #252e4310;
  --font-display: 'Bricolage Grotesque', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-outlier: 'Caveat', cursive;
  --font-sans: var(--font-body);
  --space-3xs: 0.25rem;
  --space-2xs: 0.5rem;
  --space-xs: 0.75rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4.5rem;
  --space-3xl: 7rem;
  --space-4xl: 10rem;
  --page-gutter: clamp(1.25rem, 5.5vw, 6rem);
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.75rem;
  --text-2xl: 2.5rem;
  --text-display: clamp(3.8rem, 8.2vw, 8.5rem);
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-short: 200ms;
  --dur-long: 650ms;
  --rule-hair: 1px;
  --radius-small: 4px;
  --radius-card: 10px;
  --radius-pill: 999px;
}
```

### Tailwind v4
```css
@theme {
  --color-paper: #f5f2e9;
  --color-ink: #252e43;
  --color-accent: #2949b8;
  --font-display: "Bricolage Grotesque", sans-serif;
  --font-body: "DM Sans", sans-serif;
  --spacing-md: 1.5rem;
}
```

### DTCG
```json
{"color":{"paper":{"$value":"#f5f2e9","$type":"color"},"ink":{"$value":"#252e43","$type":"color"},"accent":{"$value":"#2949b8","$type":"color"}},"font":{"display":{"$value":"Bricolage Grotesque","$type":"fontFamily"},"body":{"$value":"DM Sans","$type":"fontFamily"}}}
```

### Component variables
```css
:root {
  --background: var(--color-paper);
  --foreground: var(--color-ink);
  --primary: var(--color-accent);
  --primary-foreground: var(--color-accent-ink);
  --muted: var(--color-paper-2);
  --muted-foreground: var(--color-muted);
  --border: var(--color-rule);
  --ring: var(--color-focus);
  --radius: var(--radius-small);
}
```
