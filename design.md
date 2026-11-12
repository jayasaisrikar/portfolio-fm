# Design — Jaya Sai Srikar

## Direction
Halftone Press: a mid-century magazine spot-illustration voice, printed in two-colour offset lithography on pale aged newsprint. This replaces the coastal photographic direction. The site reads as a composed print portfolio — ink, paper, ruled columns and cut-paper plates — rather than a motion showreel.

## Shared system
Newsprint sheet, press-blue key, press-red spot and steel screens. Homepage: magazine masthead hero with a tabletop radio plate, four project plates on an asymmetric grid, a duotone halftone portrait band, a ruled experience ledger, a printed FORK proof sheet, a repository ledger, and an ink-flood colophon footer. Profile: masthead hero with a microphone plate, halftone panorama, film shelf as a printed index, places and toolkit as ruled lists.

## Palette and tokens
Four values only, all in `tokens.css`: newsprint `#F5F0E6`, press blue `#1D3557`, press red `#E63946`, steel `#457B9D`. Every tint in the interface is a press ink screened onto the newsprint sheet, expressed with `color-mix` (`--ink-secondary`, `--ink-muted`, `--ink-hairline`, `--paper-flood`). Small text uses `--red-text`, the red ink overprinted on blue, so labels keep contrast. No third colour is introduced anywhere, including the favicon, the social card and the illustration fills.

## Typography
Instrument Serif for display, project titles and the italics that carry the red ink. Manrope for body, navigation, labels and all caps micro-type. Labels are uppercase, letterspaced and small; display lines are set tight and low. Headings stay roman; emphasis is red, not weight.

## Print language
`HalftoneArt` renders six original spot illustrations — radio, rotary telephone, semaphore signal, ticker, typewriter, microphone — as cut-paper geometry: flat blue planes, red accents, steel dot screens for shadow, and a red plate struck a few pixels off register. The registration sliver drifts further on hover. Photographs are printed as duotone halftone: grayscale multiply over a steel-to-red plate with a dot screen on top.

## Motion
Ink settling rather than interface animation. GSAP runs the title-mask entrance, one short stagger, photographic parallax and quiet scroll reveals. Hover states change ink, not geometry — underline to red, paper to red wash, registration offset. No tilt, no magnetic pull, no scroll hijacking. The global motion toggle pauses everything; reduced motion renders a still sheet.

## Content and interactions
Copy, project facts, links, the FORK demo and the repository feed are unchanged. Illustrations are conceptual, never screenshots. No invented metrics, badges or captions. Routes, prerendering, accessibility and keyboard focus are preserved; focus uses the red ink.

## Responsive
Verified at 320, 375, 414, 768 and desktop. Single column below 768px, plates crop to a near-square, masthead rows collapse to two cells, the footer stacks. Root overflow is clipped and no horizontal scroll appears at any checked width.
