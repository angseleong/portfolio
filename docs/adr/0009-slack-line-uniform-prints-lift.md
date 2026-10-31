# Slack Line you can pull, uniform Prints, and Lift instead of Flip

**Status: partly superseded by [ADR-0010](0010-reels-and-open-downward.md).** The slack Line and Drag stay; the polaroid faces with logos and the Lift are replaced by panning Reels that open downward.

Supersedes ADR-0004 and the "flip in place" part of ADR-0005. The owner saw the first Darkroom and didn't like it: the straight Line looked stiff, the Prints were different sizes, the phone screenshots of RONDA and lafaz looked bad on black, and the flipped back was too small to read.

## What changed

- **The Line sags** between the Clips and is redrawn every frame as an SVG path through each Clip. **Prints can be dragged** (GSAP Draggable, already in the `gsap` package, no new dependency): the Line follows the Print, and on release it springs back. Fine pointers only; on touch the Line just swipes.
- **Every Print is the same size** (300×400, phone 220×293), like a polaroid: a picture on warm paper with the title along the bottom margin. Four options were compared on a test page; the owner chose "picture in color + title". The picture is a screenshot when it reads well (OSKM) and the project's **logo** on white when the screenshot doesn't (RONDA's launcher mark, lafaz's mascot Pelita).
- **Lift**: clicking a Print takes it off the Line. It flies to the middle of the screen, grows to ~440 px wide and turns over to its Back, over a dimmed page. Esc, the backdrop or "hang it back" returns it to its Clip.

## Considered Options

- **Physics rope (verlet, Matter.js)**: rejected. Real rope simulation is more code and a new dependency; a redrawn curve through draggable Clips with an elastic return looks the same at this scale.
- **Title-only Prints**: rejected by the owner in favor of pictures.
- **Bigger Prints that flip in place**: rejected. Still cramped inside a pinned, sliding scene.

## Consequences

- `print` in the CV Data is now `{ src, bg? }`; `bg` means "a logo, shown whole on this color".
- The pinned horizontal slide is unchanged. Page scroll is paused (Lenis `stop()`) while a Print is lifted.
