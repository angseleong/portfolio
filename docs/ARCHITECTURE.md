# Portfolio Architecture

## 1. Folder Structure

```
portfolio/
├── public/
│   ├── cv.pdf              # Written by `npm run cv` (§6)
│   ├── models/
│   │   ├── bust.glb        # Full Bust, Draco, ≤ 3 MB
│   │   └── bust-lite.glb   # Phone Bust, Draco, ≤ 1 MB
│   ├── prints/             # One screenshot per Main Project (oskm.png, ronda.png, lafaz.png)
│   └── icons/              # Simple Icons SVGs for the Stack
├── scripts/
│   ├── cv-pdf.sh           # Headless Chrome: /cv → public/cv.pdf
│   └── bust/
│       └── finish.py       # Blender script: raw mesh → bust.glb + bust-lite.glb (§5)
└── src/
    ├── data/
    │   └── cv.ts           # CV Data: ALL portfolio text, typed (§2)
    ├── app/
    │   ├── layout.tsx      # Fonts, metadata, <Mode> provider, Nav
    │   ├── page.tsx        # Picks FullPage or CompactPage from the mode
    │   ├── cv/page.tsx     # CV Page, print CSS
    │   └── globals.css     # Tokens from DESIGN.md §2, base styles
    ├── components/
    │   ├── Nav.tsx
    │   ├── mode.tsx        # Mode context: Full / Compact, localStorage, reduced-motion
    │   ├── full/
    │   │   ├── FullPage.tsx    # Lenis + ScrollTrigger setup, section order
    │   │   ├── Hero.tsx        # Pin + scroll progress → BustScene
    │   │   ├── BustScene.tsx   # R3F <Canvas>, lights, GLB, useFrame reads progress
    │   │   ├── Story.tsx
    │   │   ├── Stack.tsx       # Three Lanes, CSS Marquee
    │   │   ├── Darkroom.tsx    # Pin + horizontal Line, Wind, Develop observer
    │   │   └── Print.tsx       # Front/Back, Sway, Flip
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
  print?: string;           // /prints/x.png → this is a Main Project
  period?: string;
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
  story: string[];          // the four Story lines (web)
  summary: string;          // the short CV summary
  closing: string;          // the Contact closing line
  stack: { lane: string; items: { name: string; icon?: string }[] }[];
  projects: Project[];      // Main Projects first, in display order
  research: Entry[];
  recognition: Entry[];
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
- Its progress (0–1) is written to a ref. `BustScene`'s `useFrame` reads the ref each frame and sets `bust.rotation.y = progress * Math.PI` and `camera.position.z = 6 - progress * 2.5`. No React state per frame.
- The name's opacity is a GSAP tween on the same trigger.

### 4.2 Darkroom
- Desktop (≥ 768 px): ScrollTrigger `pin: true`, `scrub: true`, tweening the Line's `x` from 0 to `-(lineWidth - viewportWidth)`. `end` = that distance, so one pixel of scroll moves the Line one pixel.
- Phone: no pin. The Line is `overflow-x: auto` with `scroll-snap-type: x mandatory`.
- **Sway** is a CSS keyframe on the Print. **Wind** adds a second rotation on a wrapper element, so the two never fight: a `pointermove` handler on the Darkroom finds Prints within 200 px and sets a CSS variable `--wind` that eases back to 0.
- **Develop**: an `IntersectionObserver` adds `.developed` once; CSS does the rest.
- **Flip**: the Print is a `<button aria-pressed>`; state lives in `Darkroom` (one flipped index or none).

## 5. Bust Pipeline (see ADR-0006)

1. Owner takes 4 photos: front, 3/4 left, 3/4 right, profile. Neutral face, even light, hair off the forehead.
2. Check the image-to-3D service's data terms before upload (Rodin Gen-2.5 first). Generate a mesh, download GLB/OBJ.
3. `blender -b -P scripts/bust/finish.py -- raw.glb`:
   - cut below the shoulders into a bust shape, close the hole;
   - voxel remesh + smooth to remove scan noise;
   - strip textures, apply the marble material from DESIGN.md §5 (the real look is set in R3F, Blender only sets a neutral base);
   - decimate to ~60k tris (`bust.glb`) and ~15k tris (`bust-lite.glb`);
   - export glTF with Draco compression.
4. Facial detail that the generator smoothed out is fixed by hand in Blender's Sculpt Mode if the owner wants it (1–3 hours). Not scripted.
5. Fallback if the likeness is poor: KeenTools FaceBuilder (one month), then the same script.

`useGLTF` loads the GLB with drei's default Draco decoder.

## 6. CV Page and PDF
- `/cv` renders the CV Data with entries where `cv !== false`, using print CSS (`@page { size: A4; margin: 14mm }`).
- `scripts/cv-pdf.sh` runs `next build && next start`, then:
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer --print-to-pdf=public/cv.pdf http://localhost:3000/cv`
- Exposed as `npm run cv`. The PDF is committed so the site works as a static export.

## 7. Deploy
- Vercel, Git integration on `main`, default `*.vercel.app` domain.
- No environment variables, no server routes.

## 8. Commands
- `npm run dev`: dev server.
- `npm run build`: production build + type check.
- `npm run cv`: rebuild `public/cv.pdf`.
