# Full Mode and Compact Mode, English only

The page has two modes: Full (Bust, Darkroom, Marquee, motion) and Compact (one plain column, no 3D, no scroll scenes). A Nav toggle switches them, like the Full/Compact switch on the portfolios the owner likes. `prefers-reduced-motion` starts in Compact Mode. The site is English only.

## Consequences

- Compact Mode is built first (Block 1) and is the server-rendered default, so content never depends on WebGL or JS.
- No language toggle; recruiters for the target roles read English.
- No contact form and no analytics: the email is a `mailto:` link, and nothing tracks visitors.
