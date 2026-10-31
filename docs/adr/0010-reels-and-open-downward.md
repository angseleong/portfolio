# Prints show a panning Reel and open downward

Supersedes the Print face and Lift parts of ADR-0009 (the slack Line you can pull stays). The owner pointed at the project cards on dhanesworo.site and asked for the same feel inside the Darkroom.

## What changed

- **Reel**: every Print is horizontal, a 16:10 window on warm paper with the title under it. Behind the window sits one tall image (a Reel). Hovering, or opening the Print, pans the Reel from top to bottom at about 1.2 s per window-height, then it eases back when you leave.
  - RONDA: the team's pitch deck, slides stacked (the slide that is only a YouTube player is left out).
  - OSKM: five pages of the dashboard stacked (login, event management, assignments, materials, assignment list). Pages that show student names or emails are left out.
  - lafaz: a showcase made for it, Pelita and the wordmark on light green, then six phone screens three per row (home path, new letter, quiz, letters, ayah map, daily missions), captured from the dev server.
- **Open**: clicking a Print grows its paper downward to show role, summary, tech and links. Click again or Esc to close. One open at a time, and an open Print stops swaying. The Line stays where it is; the paper grows into the space below.
- **Lift is gone**, and so is the 3D turn-over.

## Considered Options

- **A slideshow (crossfade) instead of a pan**: rejected. The owner asked for the moving image they saw; a pan also needs no timers.
- **Video**: rejected. Heavier, needs recording, and a still Reel already reads as motion.

## Update 30 Oct: full-page Reels

Stacked one-screen screenshots looked cut, unlike the continuous full-page captures on the reference site. `scripts/prints/fullpage.mjs` now captures a whole page with headless Chrome. OHU's Reel is the full Lembaga page (its home is still a placeholder in the repo). The OSKM dashboard has no long page (every screen is one viewport, tables scroll inside), and a fresh capture without its backend shows empty tables, so it keeps the Valley screenshots, now separated by a thin dark gap so the breaks read as deliberate.

## Consequences

- `print` in the CV Data is back to a plain path: the Reel.
- Reels are built by `scripts/prints/stack.py` (stack images at one width) and `scripts/prints/lafaz_reel.py` (the lafaz showcase).
- The OSKM entry is now titled **OSKM ITB 2026 Dashboard**: the owner's screenshots and repo are the internal dashboard, not the public site.
