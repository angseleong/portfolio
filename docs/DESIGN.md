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
| Hero name | `clamp(56px, 15vw, 240px)`, tracking −0.02em, one line, behind the Bust, then in front |
| Section title | 48 / 32 px |
| Story statement | 40 / 26 px, Instrument Serif |
| Body | 17 / 16 px, line-height 1.6 |
| Label | 12 px mono, tracking 0.08em, lowercase (dates, sub-group labels, tech) |

## 4. Layout
- Content column max 1080 px; text measure max 640 px.
- Phone: full width with a 16 px gutter.
- Full Mode sections are separated by space (160 px desktop, 96 px phone), not by boxes. Compact Mode is dense: a hairline and 48 px between sections, the title in a 180 px left column on laptops.
- Lists (Research, Recognition, Volunteering, More Projects) are rows with a hairline between them: title left, date right, one line under. Hover: title turns to white Instrument Serif italic.
- More Projects is a row that opens smoothly (height and fade, 700 ms; instant with reduced motion) in both modes; in Full Mode it sits right under the Line inside the Darkroom and opens into two columns on laptops. The row looks like one more list row (label + count + a "+" that turns into "×").
- No numbered labels ("01 / about") above section titles: the title is enough. Mono labels are only for sub-groups inside a section (More projects, Competitions, Certifications).

## 5. The Bust
- Material (owner's call, 31 Oct: polished metal mosaic instead of marble): a low-poly Bust (~6k flat facets) in `MeshStandardMaterial` with `flatShading`, color `--marble`, `metalness` 1, `roughness` ~0.18, no texture. Every facet catches the light like a small mirror.
- Light: metal only shows what it reflects, so the light is a generated environment (drei `Environment` + `Lightformer`, no HDR download): a warm key panel from top-left, a soft fill from the right, and two faint cool-white rim panels behind so the silhouette reads on black.
- Background is the page black; no floor, no shadow plane.
- Framing: a close crop. The Bust fills ~90% of the height, head near the top edge, chest cut by the bottom (camera z 2.95, Bust lowered 0.22). Tall phone screens back off so the whole Bust shows.
- At load the name sits behind the Bust at 45% opacity (the canvas is transparent), so the head covers part of it. Its letters rise in on load (stagger 40 ms, `expo.out`; a CSS animation, so it starts from the HTML). The Headline is small mono at the bottom left.
- Hero scroll (CSS sticky for ~200 vh desktop, ~120 vh phone): rotation Y +π, camera z 2.95 → 2.2. The name comes forward between 20% and 70%: the dim copy fades out while a white copy in front of the canvas (`mix-blend-mode: difference`, so it inverts over the metal) fades in. Both copies are the same letters in the same place (no scale), so they never show as a double. Scrubbed, eased with `power1.inOut`.
- Load: the GLB and Draco decoder are preloaded as soon as the 3D chunk arrives, and the canvas fades in (1.2 s) once the Bust is ready, so it never pops in.
- Idle turn: the Bust also turns slowly on its own (0.25 rad/s) and never stops, even after the Hero scrolls away.

## 6. The Darkroom
- The section goes darker than the page (`#070605`) lit by an enlarger: a soft radial glow of white from the top, ~7% opacity, falling off to black at the edges. That is the only gradient on the site.
- **Line**: an SVG path through the Clips that sags between them (~40 px plus 3% of the span), `--stone` at 60%, 1.5 px. Redrawn every frame so it follows a dragged Print. **Clip**: a wooden clothespin drawn in SVG (18×58 px), handles up, in warm greys (`#DCD5C8` / `#C3BBAD` jaws, a center seam, faint grain, a steel spring and coil at the waist). The Line sits in the jaw groove and the tips grip the paper's top edge; soft drop shadow.
- **Print**: horizontal, every one the same size: 440 px wide desktop, 300 px phone. Warm white paper (`#F4F1EA`) with a 12 px margin; a 16:10 window on top, the title in Instrument Serif under it with a small mono "open"/"close" on the right. Faint 0 8px 24px black shadow, no rounded corners.
- **Reel**: the tall image behind the window. At rest it shows its top. Hover or Open pans it to the bottom, linear, ~1.2 s per window-height (min 2 s); leaving eases it back in 0.7 s.
- **Sway**: rotate ±3° around the Clip, 4.2 s ease-in-out, infinite alternate, each Print offset by −1.1 s × index.
- **Wind**: when the cursor passes within ~200 px, add up to ±8° in the direction it moved, decaying over ~1.2 s. Fine pointers only.
- **Drag**: fine pointers can drag a Print anywhere; the Line stretches with it; on release it springs back (`elastic.out(1, 0.3)`, 1.6 s).
- **Develop**: first entry only, 1 s: from `brightness(1.8) contrast(0.3)` to normal.
- **Open**: click/tap a Print → the paper grows downward (500 ms) with role (mono), summary (Geist 14 px), tech (mono) and links (underlined), all in dark ink on the paper. The Reel pans while open and the Print stops swaying. Click again or Esc to close. One open at a time.
- Screenshots are shown as they are: no grain, no tint.

## 7. Stack Marquee
- Right under the Hero, full-bleed (edge to edge), no section title and no Lane labels. Three Lanes stacked, 56 px tall each, hairline above and below.
- Lane speeds 64 s / 76 s / 68 s per loop; Lane 2 runs the opposite way. Each half of a Lane holds four copies of its items so it stays wider than a 2560 px screen (no gap).
- Item: 18 px monochrome logo in `--stone` + label in Geist. Hover: Lane pauses, logo and label turn `--light`.
- Logos are Simple Icons SVGs (CC0) copied into `public/icons/`. An item with no logo shows the label only.

## 8. Motion
- Slow and smooth: default 600–900 ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Section content appears with opacity 0 → 1 and translateY 8 px → 0, once.
- Story: one screen, no pin. The statement's words scrub from 15% to 100% while the section crosses the screen. The four photos (2×2 contact sheet, right on desktop, above the text on phones, mono frame numbers) Develop once like a Print, 250 ms apart, then rest in black and white. Hover (or a tap on phones) shows a photo in colour. The files are colour; CSS does the grey.
- Closing: the whole Bust, plinth included, beside the text (right, vertically centred, 30% wide on laptops; under the text on phones). It rises 0.3 units into place once, then turns on its plinth toward the pointer, measured from the Bust itself (yaw ±0.9 rad, pitch ±0.16 rad, quick ease); on phones it sways ±0.25 rad instead.
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
