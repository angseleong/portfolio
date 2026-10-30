# Portfolio - Core Project Rules

**You are working on the owner's personal portfolio: a dark, quiet one-page site.**
It opens on a marble Bust of the owner that turns as you scroll. Projects hang as Prints on a Line in an amber-lit Darkroom. A Compact Mode shows the same content as a plain page with no motion.
**Follow these rules for the whole project.**

## Context Documents
Read these before you make a design decision or start a task:
- **`GLOSSARY.md`**: The domain language. Use these terms in code, commits and docs.
- **`docs/PRD.md`**: The source of truth for scope and requirements.
- **`docs/ARCHITECTURE.md`**: Folder layout, the data file, scroll wiring, the Bust pipeline.
- **`docs/DESIGN.md`**: Colors, type, layout, motion.
- **`docs/USERFLOW.md`**: What a visitor can do, section by section.
- **`docs/DATA.md`**: Every piece of portfolio text, as agreed with the owner. The CV Data file is built from it.
- **`docs/TODO.md`**: The active task list. Only work on tasks in an ACTIVE block.
- **`docs/adr/`**: Decisions that were made on purpose. Do not undo one without writing a new ADR that supersedes it.

## 1. Tech Stack
- **App**: Next.js (App Router) + TypeScript (strict) + Tailwind CSS. Static export is fine; nothing needs a server (see ADR-0001).
- **3D**: React Three Fiber + drei, only for the Bust in the Hero.
- **Scroll**: GSAP ScrollTrigger for the two pinned scenes (Hero, Darkroom) and Lenis for smooth scroll. Everything else (Sway, Marquee, Develop, Flip) is plain CSS.
- **Content**: All portfolio text lives in `src/data/cv.ts` (see ADR-0003). Never hard-code portfolio text in components.
- **Dependencies**: Only the ones above plus `three`. No shadcn/ui, no Framer Motion, no UI kit. Ask the owner before you add another one.

## 2. Content Rules
- The web page, Compact Mode and the CV Page all read `src/data/cv.ts`. A content change must show up in all three with no component change.
- Writing is English, plain, no buzzwords ("passionate", "leverage", "seamless"). Keep the owner's own phrasing from `docs/DATA.md` where it exists.
- Never invent facts: numbers, dates, roles or results that are not in `docs/DATA.md`. Ask the owner.
- Private repos (Valley, ngeBEDAHkuy) get no link.

## 3. Workflow & Scope
- **Follow TODO.md**: Only do tasks in an ACTIVE block. Do not build features from a later block early.
- **Simplest thing that works**: No speculative abstractions, config or theme systems. One component per section.
- **Grow in layers**: Each block ends with something you can open in the browser. Do not start the next block while the current checkpoint fails.
- **Compact Mode first**: Every section must be readable in Compact Mode before it gets its Full Mode treatment.
- **Mobile is a target**: Every interaction must work with a tap. No hover-only content.

## 4. Verifying Work
- Run `npm run dev` and check the change at desktop size and at 375×812.
- Check it again with `prefers-reduced-motion: reduce`: it must land in Compact Mode.
- Run `npm run build` before you mark a task done. TypeScript or lint errors block the task.
