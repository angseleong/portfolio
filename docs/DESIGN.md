# Portfolio — Design Rules

## 1. Philosophy
Quiet and simple. Black space does most of the work. Two moments get a visual idea of their own: the Bust in the Hero and the Darkroom. Everything else is clean type in a list. Monochrome: the only accent is pure white, used sparingly against the softer marble text (ADR-0008).

## 2. Color

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0B0B0B` | Page background |
| `--ink-2` | `#141414` | Raised surfaces (Print Back, nav on scroll) |
| `--line` | `#262626` | Hairlines, list dividers |
| `--marble` | `#E9E4DA` | Primary text, the Bust's base color |
| `--stone` | `#A8A39A` | Secondary text |
| `--dust` | `#6E6A63` | Dates, labels, captions |
| `--light` | `#FFFFFF` | The one accent: hover and active states, the Darkroom's enlarger light, Stack hover |

Rules: no hues at all, only warm greys and white. White is a state (hover, active, lit), never a large fill except the Darkroom light. Dark only, no light theme.

**Hover language** (because white alone is close to `--marble`, every hover also changes shape):
- List row title: Geist → Instrument Serif italic, slightly larger, white. Line height stays fixed so rows don't jump.
- Links and nav: white + underline (offset 4–6 px).
- Buttons: white text + white border.

## 3. Typography
- **Display**: Instrument Serif (regular + italic). Only for the Hero name and section titles.
- **Body**: Geist, weights 300 and 400.
- **Labels**: Geist Mono for dates, sub-group labels, tech tags.
- All three load with `next/font/google`.

| Role | Size (desktop / phone) |
|---|---|
| Hero name | `clamp(64px, 14vw, 200px)`, tracking −0.02em |
| Section title | 48 / 32 px |
| Story line | 40 / 26 px, Instrument Serif |
| Body | 17 / 16 px, line-height 1.6 |
| Label | 12 px mono, tracking 0.08em, lowercase (dates, sub-group labels, tech) |

## 4. Layout
- Content column max 1080 px; text measure max 640 px.
- Phone: full width with a 16 px gutter.
- Sections are separated by space (160 px desktop, 96 px phone), not by boxes.
- Lists (Research, Recognition, Volunteering, More Projects) are rows with a hairline between them: title left, date right, one line under. Hover: title turns to white Instrument Serif italic.
- More Projects is a native `<details>`: its summary looks like one more list row (label + count + a "+" that turns into "×"), so the rows read as one continuous list.
- No numbered labels ("01 / about") above section titles: the title is enough. Mono labels are only for sub-groups inside a section (More projects, Competitions, Certifications).

## 5. The Bust
- Material: `MeshPhysicalMaterial`, color `--marble`, roughness ~0.55, no texture, a faint clearcoat. Carved hair stays in the mesh, not in a texture.
- Light: one warm key light from top-left, soft fill, and a faint cool-white rim light from behind so the silhouette reads on black.
- Background is the page black; no floor, no shadow plane.
- Hero scroll (pinned ~200 vh desktop, ~120 vh phone): rotation Y 0 → π, camera z 6 → 3.5, name opacity 1 → 0. Scrubbed, eased with `power1.inOut`.

## 6. The Darkroom
- The section goes darker than the page (`#070605`) lit by an enlarger: a soft radial glow of white from the top, ~7% opacity, falling off to black at the edges. That is the only gradient on the site.
- **Line**: 1 px `--stone` at 40% opacity across the full width. **Clip**: a small wooden-peg shape, 10×26 px, `--dust`.
- **Print**: 300×225 px desktop, 240×180 phone, white 10 px border like photo paper, no rounded corners, no shadow except a faint 0 8px 24px black.
- **Sway**: rotate ±3° around the Clip, 4.2 s ease-in-out, infinite alternate, each Print offset by −1.1 s × index.
- **Wind**: when the cursor passes within ~200 px, add up to ±8° in the direction it moved, decaying over ~1.2 s. Desktop only.
- **Develop**: first entry only, 1 s: from `brightness(1.8) contrast(0.3)` to normal.
- **Flip**: 600 ms rotateY with `backface-visibility: hidden`. The Back is `--ink-2` paper with the notes in Geist, tech in mono, links white with underline.
- Screenshots are shown as they are: no grain, no tint.

## 7. Stack Marquee
- Three Lanes stacked, 56 px tall each, hairline above and below.
- Lane speeds 32 s / 38 s / 34 s per loop; Lane 2 runs the opposite way.
- Item: 18 px monochrome logo in `--stone` + label in Geist. Hover: Lane pauses, logo and label turn `--light`.
- Logos are Simple Icons SVGs (CC0) copied into `public/icons/`. An item with no logo shows the label only.

## 8. Motion
- Slow and smooth: default 600–900 ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Section content appears with opacity 0 → 1 and translateY 8 px → 0, once.
- Story: each word scrubs from `--marble` at 15% to 100% as the line crosses the middle of the screen.
- `prefers-reduced-motion: reduce` → Compact Mode (no animation at all).

## 9. Do / Don't

**Do**
- Keep white rare. At rest, nothing is pure white except the Hero name; white means "you are pointing at this".
- Use real text for everything, including the Hero name.

**Don't**
- Don't use cards with rounded corners and borders for lists.
- Don't add grain, noise or film filters to screenshots.
- Don't use skill bars, percentages or star ratings.
- Don't use emoji or icon decoration in body text.
