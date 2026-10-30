# Portfolio — Active Task List

> **Rule:** AI may only work on tasks in ACTIVE blocks.
> Blocks below the line (---) are backlog. Do not start them until they are moved up.
> Every block ends with a **Checkpoint**: something you can open in the browser and try.

---

## ACTIVE — Block 0: Setup

**Owner does (by hand):**
- [x] Confirm the old Apple-style code in this folder can be deleted. Deleted 30 Oct 2026.
- [ ] Import `angseleong/portfolio` on vercel.com (Add New → Project, framework preset Next.js, no env vars). The agent can't log in for you.
- [ ] Take plain screenshots of OSKM, RONDA and lafaz → `public/prints/`.
- [ ] Confirm the two **⚠ confirm** items in `docs/DATA.md`.

**Agent does:**
- [x] Write the docs (this folder), `git init`, push to `angseleong/portfolio` (public).
- [x] Delete the old code, scaffold Next.js 16 (App Router) + TypeScript strict + Tailwind 4 at the repo root.
- [x] Add tokens from `DESIGN.md` §2 to `globals.css`; load Instrument Serif, Geist, Geist Mono with `next/font/google`.
- [x] Write `src/data/cv.ts` with the types from `ARCHITECTURE.md` §2 and every value from `DATA.md` (plus `closing`). The two ⚠ items are marked in comments.

**Checkpoint:** `npm run dev` shows a black page with the owner's name in Instrument Serif. ✅ Verified 30 Oct at desktop and 375×812, no console errors, `npm run build` + `npm run lint` clean. The Vercel preview URL works: waiting on the owner's import.

## ACTIVE — Block 1: MVP — Compact Mode

- [x] `CompactPage` with every section from PRD FR-11, all text from `cv.ts`.
- [x] Shared list rows in `lists.tsx` (More Projects, Research, Recognition, Volunteering, Education, Contact).
- [x] `Nav` with anchors, CV button (links to `/cv.pdf`, 404 until Block 5), Full / Compact toggle (`mode.tsx`, ARCHITECTURE.md §3). Phones show name, CV and the toggle only; the section links are hidden under 640 px.
- [x] Phone layout at 375 px, 16 px gutter.

**Checkpoint:** At desktop size and 375×812, every piece of content in `DATA.md` is readable, every link works, and nothing scrolls sideways. ✅ Verified 30 Oct: all sections render, 11 external links + mailto, no horizontal scroll at 375 px, toggle saves to `localStorage`, reduced motion picks Compact (checked by stubbing `matchMedia`), lint + build clean. Until Block 2 both modes render CompactPage.

---

## Block 2: Full Mode — Sections
- [ ] `lib/scroll.ts` (GSAP + ScrollTrigger + Lenis) and `FullPage`, loaded with `next/dynamic`.
- [ ] `Story`: four lines, word-by-word Develop on scroll.
- [ ] `Stack`: three Lanes, CSS Marquee, opposite directions, hover pause + white, icons in `public/icons/`.
- [ ] Section entrance motion (DESIGN.md §8). Reduced motion → Compact Mode.

**Checkpoint:** Scroll from top to bottom in Full Mode: Story develops, Lanes move and pause on hover. Reduced motion lands in Compact Mode.

## Block 3: Darkroom
- [ ] Line, Clips, three Prints from `projects` with `print`.
- [ ] Sway (CSS), Wind (pointer, desktop), Develop (IntersectionObserver).
- [ ] Flip to the Back, one at a time, keyboard + Esc.
- [ ] Desktop pin with horizontal scroll; phone swipe with snap.
- [ ] Enlarger light (soft white glow from the top) and darker section background.

**Checkpoint:** On desktop the Line slides with scroll and every Print flips. On a phone the Line swipes and snaps, and every Print flips with a tap.

## Block 4: Bust
- [ ] Hero with a placeholder shape (marble material, lights from DESIGN.md §5) and the pinned scroll (ARCHITECTURE.md §4.1).
- [ ] Check Rodin Gen-2.5's data terms; report to the owner before any upload.
- [ ] Owner provides four photos; generate the raw mesh.
- [ ] `scripts/bust/finish.py` → `bust.glb` (≤ 3 MB) + `bust-lite.glb` (≤ 1 MB).
- [ ] Owner approves the likeness. If not: optional hand sculpting, or FaceBuilder (ADR-0006).
- [ ] Swap the placeholder for the real Bust; phones load `bust-lite.glb`.

**Checkpoint:** Scrolling the Hero turns the owner's Bust from front to back, smooth on a phone.

## Block 5: CV Page
- [ ] `/cv` page with print CSS (PRD FR-12), entries with `cv !== false`.
- [ ] `scripts/cv-pdf.sh` + `npm run cv` → `public/cv.pdf`.
- [ ] Check the PDF: one A4 page, text selectable, reads cleanly when pasted into a plain text editor.

**Checkpoint:** Download CV gives a one-page PDF that matches `DATA.md`.

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
