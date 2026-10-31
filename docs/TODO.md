# Portfolio — Active Task List

> **Rule:** AI may only work on tasks in ACTIVE blocks.
> Blocks below the line (---) are backlog. Do not start them until they are moved up.
> Every block ends with a **Checkpoint**: something you can open in the browser and try.

---

## ACTIVE — Block 0: Setup

**Owner does (by hand):**
- [x] Confirm the old Apple-style code in this folder can be deleted. Deleted 30 Oct 2026.
- [ ] Import `angseleong/portfolio` on vercel.com (Add New → Project, framework preset Next.js, no env vars). The agent can't log in for you.
- [x] Screenshots of OSKM, RONDA and lafaz → `public/prints/` (taken from Valley and lafaz).
- [ ] Confirm the two **⚠ confirm** items in `docs/DATA.md`.

**Agent does:**
- [x] Write the docs (this folder), `git init`, push to `angseleong/portfolio` (public).
- [x] Delete the old code, scaffold Next.js 16 (App Router) + TypeScript strict + Tailwind 4 at the repo root.
- [x] Add tokens from `DESIGN.md` §2 to `globals.css`; load Instrument Serif, Geist, Geist Mono with `next/font/google`.
- [x] Write `src/data/cv.ts` with the types from `ARCHITECTURE.md` §2 and every value from `DATA.md` (plus `closing`). The two ⚠ items are marked in comments.

**Checkpoint:** `npm run dev` shows a black page with the owner's name in Instrument Serif. ✅ Verified 30 Oct at desktop and 375×812, no console errors, `npm run build` + `npm run lint` clean. The Vercel preview URL works: waiting on the owner's import.

## DONE — Block 1: MVP — Compact Mode

- [x] `CompactPage` with every section from PRD FR-11, all text from `cv.ts`.
- [x] Shared list rows in `lists.tsx` (More Projects, Research, Recognition, Volunteering, Education, Contact).
- [x] `Nav` with anchors, CV button (links to `/cv.pdf`, 404 until Block 5), Full / Compact toggle (`mode.tsx`, ARCHITECTURE.md §3). Phones show name, CV and the toggle only; the section links are hidden under 640 px.
- [x] Phone layout at 375 px, 16 px gutter.

**Checkpoint:** At desktop size and 375×812, every piece of content in `DATA.md` is readable, every link works, and nothing scrolls sideways. ✅ Verified 30 Oct: all sections render, 11 external links + mailto, no horizontal scroll at 375 px, toggle saves to `localStorage`, reduced motion picks Compact (checked by stubbing `matchMedia`), lint + build clean. Until Block 2 both modes render CompactPage.

## DONE — Block 2: Full Mode — Sections
- [x] `lib/scroll.ts` (GSAP 3.15 + ScrollTrigger + Lenis 1.3) and `FullPage`, loaded with `next/dynamic` (`ssr: false`) from `components/Page.tsx`.
- [x] `Story`: four lines, one per screen, word-by-word Develop scrubbed on scroll.
- [x] `Stack`: three Lanes, CSS Marquee (32/38/34 s, middle Lane reversed), hover pause + white, Simple Icons 16.36 SVGs in `public/icons/` drawn with CSS masks. Nmap has no Simple Icons logo, so it shows its label only.
- [x] Section entrance motion (DESIGN.md §8) via `[data-reveal]` + `ScrollTrigger.batch`. Reduced motion → Compact Mode.

**Checkpoint:** Scroll from top to bottom in Full Mode: Story develops, Lanes move and pause on hover. Reduced motion lands in Compact Mode. ✅ Verified 30 Oct at desktop and 375×812: Lenis active, Story develops, Lanes move and pause on hover, switching to Compact removes Lenis and the Marquee and switching back restores them, no horizontal scroll, lint + build clean.

---

## DONE — Block 3: Darkroom
- [x] Line, Clips, three Prints from `projects` with `print`. Prints: OSKM login + RONDA "protected" screens from Valley, lafaz Alif lesson captured from its dev server at 375×812 (`public/prints/*.jpg`).
- [x] Sway (CSS), Wind (pointer, `pointer: fine` only), Develop (IntersectionObserver).
- [x] Flip to the Back, one at a time, keyboard + Esc.
- [x] Desktop pin with horizontal scroll; phone swipe with snap.
- [x] Enlarger light (soft white glow from the top) and darker section background.

- [x] Rework after review (ADR-0009): slack Line you can pull, uniform polaroid Prints with logos for RONDA and lafaz, Lift instead of Flip.
- [x] OSKM Open House Unit added as a fourth Main Project (Reel from seven Valley screenshots). Reels cropped to 776 px per page so the Next.js dev badge never shows.
- [x] Second rework (ADR-0010): horizontal Prints with panning Reels (RONDA pitch deck, OSKM dashboard pages, lafaz showcase) that Open downward; Lift removed.

**Checkpoint:** On desktop the Line slides with scroll and every Print opens. On a phone the Line swipes and snaps, and every Print opens with a tap. ✅ Verified 30 Oct: pin + horizontal slide on desktop, Open + Esc (paper 320 → 477 px, Line stays put, Reel pans), Drag pulls the Line and springs back, Wind (6° then eases back), all three Prints Develop, phone swipe with snap and no pin, no horizontal page scroll, lint + build clean.

## DONE — Block 4: Bust
- [x] Hero with a placeholder shape (marble material, lights from DESIGN.md §5) and the pinned scroll (ARCHITECTURE.md §4.1). ✅ 31 Oct: pin + turn + name fade at desktop and 375×812, no horizontal scroll, lint + build clean. `Hero.tsx`, `BustScene.tsx`.
- [x] Check Rodin Gen-2.5's data terms; report to the owner before any upload. ✅ 31 Oct: reported in chat, waiting on the owner's decision.
- [x] Owner provides four photos; generate the raw mesh. ✅ 31 Oct: owner generated it on Rodin Gen-2.5.
- [x] `scripts/bust/finish.py` → `bust.glb` (≤ 3 MB) + `bust-lite.glb` (≤ 1 MB). ✅ 31 Oct: scan head on Poly Haven's Marble Bust 01 body, fused into a polished metal mosaic (ADR-0011): 96 KB + 52 KB.
- [x] Owner approves the likeness. If not: optional hand sculpting, or FaceBuilder (ADR-0006). ✅ 31 Oct: approved (metal mosaic).
- [x] Swap the placeholder for the real Bust; phones load `bust-lite.glb`. ✅ 31 Oct: desktop and 375×812 (camera backs off on tall screens), lite loads on phones, no horizontal scroll, lint + build clean.

**Checkpoint:** Scrolling the Hero turns the owner's Bust from front to back, smooth on a phone. ✅ Verified 31 Oct at desktop and 375×812.

## DONE — Block 5: CV Page
- [x] `/cv` page with print CSS (PRD FR-12), entries with `cv !== false`. The Nav moved from the layout to the home page.
- [x] Rework: the owner's CV format (Times New Roman, navy headings, dates right, bullets), Projects up to INTEL, Recognition → Achievements & Certifications (ARCHITECTURE.md §6).
- [x] `scripts/cv-pdf.sh` + `npm run cv` → `public/cv.pdf`.
- [x] Check the PDF: one A4 page, text selectable, reads cleanly when pasted into a plain text editor.

**Checkpoint:** Download CV gives a one-page PDF that matches `DATA.md`. ✅ Verified 31 Oct: one A4 page, pypdf reads every line in order, `/cv.pdf` serves from the Nav, `/cv` has no Nav and no horizontal scroll at 375×812, lint + build clean.

## Block 6: Polish & Launch
- [ ] Metadata, Open Graph image (name + Headline on black), favicon.
- [ ] Lighthouse on mobile: Performance ≥ 85, Accessibility ≥ 95.
- [ ] Final pass at 375×812, 768×1024, 1440×900.
- [ ] Production deploy on Vercel.

**Checkpoint:** The `*.vercel.app` URL is ready to put on LinkedIn.

## Backlog
- Custom domain.
- `/projects/[slug]` long-form pages for Main Projects whose Back can't hold the story (RONDA first).
- Hand-sculpted facial detail on the Bust.
