# Portfolio Architecture

## 1. Folder Structure

```
portfolio/
├── public/
│   ├── cv.pdf              # Written by `npm run cv` (§6)
│   ├── models/
│   │   ├── bust.glb        # Full Bust, Draco, ≤ 3 MB
│   │   └── bust-lite.glb   # Phone Bust, Draco, ≤ 1 MB
│   ├── prints/             # One Reel per Main Project: oskm.jpg, ronda.jpg, lafaz.jpg (tall images)
│   └── icons/              # Simple Icons SVGs for the Stack
├── scripts/
│   ├── prints/
│   │   ├── stack.py        # Stack images at one width into a Reel (needs Pillow)
│   │   ├── lafaz_reel.py   # lafaz showcase Reel: Pelita + six phone screens
│   │   └── fullpage.mjs    # Full-page screenshot of a running site (headless Chrome over CDP, no deps)
│   ├── cv-pdf.sh           # Headless Chrome: /cv → public/cv.pdf
│   └── bust/
│       └── finish.py       # Blender script: raw mesh → bust.glb + bust-lite.glb (§5)
└── src/
    ├── data/
    │   └── cv.ts           # CV Data: ALL portfolio text, typed (§2)
    ├── app/
    │   ├── layout.tsx      # Fonts, metadata
    │   ├── page.tsx        # Renders <Nav /> + <Page /> (the CV Page has no Nav)
    │   ├── cv/page.tsx     # CV Page, print CSS
    │   └── globals.css     # Tokens from DESIGN.md §2, base styles
    ├── components/
    │   ├── Nav.tsx
    │   ├── Page.tsx        # Picks FullPage (next/dynamic, ssr: false) or CompactPage from useMode()
    │   ├── mode.tsx        # useMode() / setMode(): Full / Compact via useSyncExternalStore, localStorage, reduced-motion
    │   ├── full/
    │   │   ├── FullPage.tsx    # Lenis + ScrollTrigger setup, section order
    │   │   ├── Hero.tsx        # Pin + scroll progress → BustScene
    │   │   ├── BustScene.tsx   # R3F <Canvas>, lights, GLB, useFrame reads progress
    │   │   ├── Story.tsx
    │   │   ├── Stack.tsx       # Three Lanes, CSS Marquee
    │   │   ├── Darkroom.tsx    # Pin + horizontal slide, slack Line, Drag, Wind, Develop
    │   │   └── Print.tsx       # The hanging Print: Reel window, title, notes that Open downward
    │   ├── CompactPage.tsx # Every section as a plain column
    │   └── lists.tsx       # Shared list rows: MoreProjects, Research, Recognition, Volunteering, Education, Contact
    └── lib/
        └── scroll.ts       # Registers GSAP + ScrollTrigger once, bridges Lenis
```

Full Mode code (`components/full/`, `three`, `gsap`, `lenis`) is loaded with `next/dynamic` so Compact Mode and `/cv` never download it.

## 2. CV Data (`src/data/cv.ts`)

One typed object, exported as `cv`. Text values come from `docs/DATA.md`.

```ts
type Link = { label: string; href: string };

type Project = {
  slug: string;
  title: string;
  role?: string;            // shown on the Print Back
  summary: string;          // one or two sentences
  tech: string[];
  links: Link[];            // empty for private repos
  print?: string;           // the Reel; has print → Main Project
  period?: string;
  cv?: boolean;             // false = web only, left out of the CV Page
};

type Entry = {              // Research, Recognition, Volunteering, Education rows
  title: string;
  org: string;
  period: string;
  summary?: string;
  links?: Link[];
  cv?: boolean;             // false = web only, left out of the CV Page
};

export const cv: {
  name: string; fullName: string; headline: string;
  email: string; location: string; links: Link[];
  story: { epigraph: { text: string; by: string }; statement: string; lines: string[]; photos: { src: string; alt: string }[] };  // the Story (web)
  summary: string;          // the short CV summary
  closing: string;          // the Contact closing line
  stack: { lane: string; items: { name: string; icon?: string }[] }[];
  projects: Project[];      // Main Projects first, in display order
  research: Entry[];
  recognition: { label: string; entries: Entry[] }[];  // Competitions, Certifications
  volunteering: Entry[];
  education: Entry[];
} = { /* ... */ };
```

Rules:
- Order in the arrays is display order. No sorting in components.
- A Project with `print` is a Main Project. All others go to More Projects.
- `cv: false` keeps an entry on the web but off the CV Page.

## 3. Modes

`mode.tsx` holds `"full" | "compact"`:
1. If `localStorage.mode` is set, use it.
2. Else if `prefers-reduced-motion: reduce`, use `compact`.
3. Else `full`.

The first server render is Compact Mode, so there is no flash of 3D for reduced-motion visitors and the page has real content before JS loads. Full Mode mounts after hydration.

## 4. Scroll Wiring

`lib/scroll.ts` registers `ScrollTrigger` once and drives it from Lenis (`lenis.on('scroll', ScrollTrigger.update)`, Lenis ticked by `gsap.ticker`).

### 4.1 Hero
- One ScrollTrigger: `pin: true`, `end: "+=200%"` (phone `+=120%`), `scrub: true`.
- Its progress (0–1) is written to a ref. `BustScene`'s `useFrame` reads the ref each frame and sets `bust.rotation.y = progress * Math.PI + spin` (spin grows by 0.25 rad/s, the idle turn) and `camera.position.z = 2.95 - progress * 0.75`. No React state per frame.
- The name's opacity is a GSAP tween on the same trigger.

### 4.2 Darkroom
- Desktop (≥ 768 px): ScrollTrigger `pin: true`, `scrub: true`, tweening the Line's `x` from 0 to `-(lineWidth - viewportWidth)`. `end` = that distance, so one pixel of scroll moves the Line one pixel.
- Phone: no pin. The Line is `overflow-x: auto` with `scroll-snap-type: x mandatory`.
- **Sway** is a CSS keyframe on the Print. **Wind** adds a second rotation on a wrapper element, so the two never fight: a `pointermove` handler on the Darkroom finds Prints within 200 px and sets a CSS variable `--wind` that eases back to 0.
- **Develop**: an `IntersectionObserver` adds `.developed` once; CSS does the rest.
- **Line**: an SVG `<path>` redrawn on `gsap.ticker` through the top-center of every `[data-drag]` wrapper, with a quadratic sag between points.
- **Drag**: `Draggable` (from the `gsap` package) on each `[data-drag]`, fine pointers only, `dragClickables: true`; release tweens back to 0,0. Draggable swallows the click that ends a drag, so a plain click still Opens.
- **Reel pan**: CSS only. The window is a size container (`container-type: size`); the image translates to `calc(-100% + 100cqh)` on hover or `[data-open]`. Its duration comes from a `--pan` variable set on image load from its aspect ratio.
- **Open**: one open index in `Darkroom`; the notes use a `grid-template-rows: 0fr → 1fr` transition. Esc closes. The section is laid out from the top (not centered) so an opening Print grows downward without moving the Line.

## 5. Bust Pipeline (see ADR-0006)

1. Owner takes 4 photos: front, 3/4 left, 3/4 right, profile. Neutral face, even light, hair off the forehead.
2. Check the image-to-3D service's data terms before upload (Rodin Gen-2.5 first). Generate a mesh, download GLB/OBJ.
3. `/Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/bust/finish.py -- scripts/bust/src/raw.glb scripts/bust/src/template/marble_bust_01_1k.gltf public/models`
   (`scripts/bust/src/` is git-ignored: the owner's scan and the downloaded template):
   - keep only the scan's head (cut under the chin, cap the opening);
   - the neck, shoulders, chest and plinth come from Poly Haven's Marble Bust 01 (CC0, Rico Cilliers): turned so the chest faces front and its head cut off. The scan's head is scaled to the template's head height, set on the neck and turned 35° the way the neck was carved; the top of the neck is widened to the outline of the head's cut so hair runs into neck;
   - mosaic (owner's call): fuse both with a coarse voxel remesh (0.02, which also hides the joint and turns the scan's hair sheets into solid locks), then decimate to flat facets: ~6k tris (`bust.glb`) and ~3k (`bust-lite.glb`). A fine remesh or skin smoothing ruined the hair and eyes, so neither is done;
   - strip textures; the metal material from DESIGN.md §5 is set in R3F, not in the file;
   - export glTF with Draco compression; `scripts/bust/src/preview.blend` keeps the Bust for looking at in Blender.
   - `public/draco/` holds the Draco decoder (copied from `three`) so no CDN is used.
4. Facial detail that the generator smoothed out is fixed by hand in Blender's Sculpt Mode if the owner wants it (1–3 hours). Not scripted.
5. Fallback if the likeness is poor: KeenTools FaceBuilder (one month), then the same script.

`useGLTF` loads the GLB with the Draco decoder in `public/draco/`.

## 6. CV Page and PDF
- `/cv` renders the CV Data with entries and projects where `cv !== false`, using print CSS (`@page { size: A4; margin: 12mm 14mm }`).
- Layout follows the owner's own CV (`Tech CV - Axeleon Justin (08:2026).pdf`): Times New Roman, centered uppercase name, navy (`#2e5c8a`) uppercase headings with a rule, bold title with the date on the right, bullets below. Order: Profile, Project Experience, Research, Education, Organizational Experience, Achievements & Certifications, Skills & Tools.
- ATS: one column, real text, standard headings, URLs printed as text, kerning off (Times kerns "Vo" into "V ortex" when copied). Summaries split into one bullet per sentence. Don't use Geist here: Chrome's PDF of it splits words when copied ("ROND A").
- Reading order: pypdf (content order, like most ATS parsers) keeps each date next to its title. macOS Preview's copy moves right-aligned dates to the end of a block when the bullets are short; the owner's own CV does the same.
- The white `@media print` body rule must stay after the dark `body` rule in `globals.css`; otherwise the dark background prints under the CV and shows as a gray box edge.
- The page is full: 10 pt with line height 1.2. Adding content can push it to two pages: rerun `npm run cv` and check.
- `scripts/cv-pdf.sh` runs `next build && next start -p 3123` (so it works next to `npm run dev`), then:
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer --print-to-pdf=public/cv.pdf http://localhost:3123/cv`
- Exposed as `npm run cv`. The PDF is committed so the site works as a static export.

## 6b. Capturing Reels from other projects
- `node scripts/prints/fullpage.mjs <url> <out.png> [width] [waitMs]` scrolls the page once (so reveal animations run), hides the Next.js dev badge and captures the full document height.
- The owner's `~/Documents` is synced to iCloud with storage optimisation, so older projects can have **dataless `node_modules`** (placeholders that never finish downloading). Symptom: `next dev` or even `next --version` hangs with no output. Check with `find node_modules -flags +dataless | wc -l`; fix by copying the project (without `node_modules`, `.next`, `.git`) to a temp folder and running `pnpm install` there.

## 7. Deploy
- Vercel, Git integration on `main`, default `*.vercel.app` domain.
- No environment variables, no server routes.

## 8. Commands
- `npm run dev`: dev server.
- `npm run build`: production build + type check.
- `npm run cv`: rebuild `public/cv.pdf`.
