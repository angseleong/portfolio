# Portfolio

The owner's personal portfolio: one dark page with two scroll scenes (the Hero and the Darkroom), a set of plain sections, and a CV built from the same data.

## Modes

**Full Mode**:
The default page, with the Bust, the Darkroom, the Marquee and all motion.
_Avoid_: Immersive mode, fancy mode, desktop mode

**Compact Mode**:
The same content as one plain column: no 3D, no pinned scroll, no animation. Turned on with the nav toggle or by `prefers-reduced-motion: reduce`.
_Avoid_: Lite mode, simple mode, fallback, mobile mode

## Hero

**Hero**:
The first screen. The owner's name sits large behind the Bust, the Headline below it. Pinned while the Bust turns.
_Avoid_: Banner, landing, intro

**Bust**:
The 3D marble statue of the owner's head and shoulders, made from photos (see ADR-0006).
_Avoid_: Statue model, avatar, head, 3D me

**Headline**:
The one line under the name: "Software engineer focused on security and the web."
_Avoid_: Tagline, subtitle, bio

## Sections

**Story**:
The About section: four short lines that develop word by word as you scroll.
_Avoid_: About me, bio, intro

**Stack**:
The section of tools the owner uses, shown as three Lanes.
_Avoid_: Skills, tech, tools section

**Lane**:
One row of the Stack Marquee: Languages, Frameworks, or Security & Tools.
_Avoid_: Row, track, category

**Marquee**:
The endless sideways scroll of a Lane. Pauses on hover.
_Avoid_: Ticker, carousel, slider

**Darkroom**:
The Projects section: a dark room lit from above by an enlarger's white light, where the Main Projects hang as Prints on a Line. Pinned while the Line slides sideways.
_Avoid_: Red room, gallery, projects carousel

**Line**:
The string the Prints hang from, with a Clip per Print.
_Avoid_: Rope, wire, clothesline

**Print**:
One Main Project shown as a photo print on the Line. Its front is a screenshot, its Back is the notes.
_Avoid_: Card, photo card, tile, polaroid

**Back**:
The reverse side of a Print, shown after a Flip: title, one-line role, summary, tech, links.
_Avoid_: Details panel, modal, overlay

**Sway**:
The slow side-to-side swing of a Print around its Clip.
_Avoid_: Swing, wobble, pendulum

**Wind**:
The extra push a Print gets when the cursor passes near it.
_Avoid_: Hover physics, repel

**Develop**:
The first appearance of a Print or a Story word: from faint to full, like paper in a developer tray.
_Avoid_: Fade in, reveal

**Flip**:
Turning a Print over to show its Back, and back again.
_Avoid_: Open, expand, click card

**Main Project**:
A project that hangs as a Print: OSKM ITB 2026 Website, RONDA, lafaz.
_Avoid_: Featured project, hero project

**More Projects**:
The collapsed row below the Main Projects that opens a plain list of every other project.
_Avoid_: Side projects, other work, archive

**Research**:
Written papers: the bedrock coordinates paper and the rooftop solar plan.
_Avoid_: Publications, papers, writing

**Recognition**:
Competitions and certifications in one section, as two groups.
_Avoid_: Awards, achievements, certificates

**Volunteering**:
Committee and organization roles.
_Avoid_: Experience, organizations, work history

## CV

**CV Data**:
`src/data/cv.ts`, the one file every page reads.
_Avoid_: Content file, JSON, CMS

**CV Page**:
`/cv`, a plain one-page print layout of the CV Data, exported to `public/cv.pdf`.
_Avoid_: Resume page, printable
