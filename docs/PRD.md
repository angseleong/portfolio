# Project Requirements Document (PRD)

## 1. Project Overview

### 1.1 Purpose
The owner's personal portfolio and CV in one place. A recruiter should know who the owner is and what they built within one scroll, and leave with a one-page CV.

### 1.2 Background
The owner is an Informatics student at ITB targeting **security, software engineering and frontend** roles. The site borrows ideas from three portfolios they like (fathurwithyou.com, farrel.me, wisee.info) but has its own identity: a black, quiet page, a marble Bust of the owner, and a darkroom where projects hang as photo prints. It replaces the old Apple-style portfolio in this folder.

### 1.3 Scope
**In scope**
- One page in **Full Mode** with the sections in §4, and a **Compact Mode** with the same content and no motion.
- A 3D Bust made from the owner's photos.
- A **CV Page** (`/cv`) and a one-page PDF built from the same CV Data.
- Desktop and mobile. English only. Dark only.
- Deploy on Vercel (free subdomain to start).

**Out of scope (for now)**
- Light mode, a language toggle, a blog.
- A contact form, a backend, a CMS.
- Analytics and cookies.
- A custom domain (backlog).

## 2. Stakeholders
- **Owner**: writes the content, provides photos and screenshots, approves the Bust.
- **Recruiter**: skims for 30 seconds on a laptop, often downloads the CV.
- **Peer**: a student or engineer who explores the page on a phone.

## 3. Goals
1. Name, Headline and the three target roles are clear on the first screen.
2. A visitor reaches the Main Projects within three scrolls.
3. The CV PDF is one page, plain, and parses cleanly in an ATS.
4. The owner updates everything by editing `src/data/cv.ts`.
5. The page feels calm: slow motion, lots of black space, one accent color.

## 4. Functional Requirements

### FR-1 — Nav
- Fixed, minimal: the owner's name on the left; Projects · Research · Contact; on the right a **CV** button (opens `cv.pdf`) and the **Full / Compact** toggle.
- The toggle choice is remembered per visitor (`localStorage`). `prefers-reduced-motion: reduce` starts in Compact Mode.

### FR-2 — Hero
- The owner's name, very large, behind the Bust. The Headline under it.
- The Hero is pinned for about two screens of scroll. Over that scroll the Bust turns ~180° (front → profile → back), the camera moves in, and the name fades out.
- On phones the scroll is shorter and the Bust uses a lighter model.
- Until the real Bust exists, a placeholder shape stands in (Block 4).

### FR-3 — Story
- Four lines from `docs/DATA.md` §2, one per screen height. Each line Develops word by word as it scrolls into the middle of the screen.

### FR-4 — Stack
- Three Lanes (Languages, Frameworks, Security & Tools), 6 items each, in a Marquee. Neighbouring Lanes run in opposite directions.
- Each item: monochrome logo + label. Hover: the Lane pauses, the item's logo turns amber.
- No skill levels, bars or percentages.

### FR-5 — Darkroom (Projects)
- The three Main Projects hang as Prints on one Line under an amber light.
- Prints Sway out of phase. The cursor passing near a Print gives it Wind.
- Each Print Develops the first time it enters the screen (~1 s), then stays a plain screenshot.
- Tap or click Flips a Print to its Back: title, role, summary, tech, links. Tapping again flips it back. Only one Print is flipped at a time.
- Desktop: the Darkroom is pinned and vertical scroll slides the Line sideways. Phone: the Line is a horizontal swipe with snap, not pinned.
- **More Projects** follows as a plain list: title, one line, tech, link.

### FR-6 — Research
- A list: title, venue and date, one-line summary, links (paper, code, demo).

### FR-7 — Recognition
- One list for competitions and certifications: name, issuer, date, credential link if any.

### FR-8 — Volunteering
- A list: organization, role, period, one line.

### FR-9 — Education
- ITB, Informatics Engineering, period, GPA.

### FR-10 — Contact
- A large closing line, then email (mailto), LinkedIn, GitHub, and **Download CV**.

### FR-11 — Compact Mode
- Every section above in one centered column in this order: name + Headline → Story (as one paragraph) → Stack (as three wrapped lists) → Projects (Main Projects first, then More Projects) → Research → Recognition → Volunteering → Education → Contact.
- No 3D, no GSAP, no Lenis are loaded in Compact Mode.

### FR-12 — CV Page and PDF
- `/cv`: one A4 page, black on white, one sans-serif font, single column, no icons or images, real text (selectable, ATS-parseable).
- It uses the CV-only choices in `docs/DATA.md` (Research #1 only, top 4 Volunteering, the short summary).
- `npm run cv` writes `public/cv.pdf` from `/cv` with headless Chrome.

## 5. Non-Functional Requirements
- **Performance**: Bust GLB ≤ 3 MB (Draco). LCP ≤ 2.5 s on a mid-range phone. The 3D bundle loads only in Full Mode.
- **Accessibility**: real text everywhere (no text in images), visible focus, keyboard Flip (Enter/Space), contrast ≥ 4.5:1 for body text.
- **Mobile**: works at 375 px wide with a 16 px gutter and no horizontal page scroll.
- **Privacy**: no trackers. The owner's photos for the Bust go only to the service chosen in ADR-0006.
