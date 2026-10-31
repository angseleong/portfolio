# Prints Sway with CSS, Wind is a small pointer handler, no physics engine

**Status: partly superseded by [ADR-0009](0009-slack-line-uniform-prints-lift.md).** Sway and Wind stay; Prints can now be dragged.

The hanging style comes from the owner's Valley Project Panel mockup: a CSS keyframe rotating each item ±3.5° around its clip, offset per item. The Darkroom keeps that and adds Wind: a pointer handler that pushes nearby Prints a few degrees and lets them ease back.

## Considered Options

- **Rope/cloth physics (Matter.js, verlet, Rapier)**: rejected. Real dragging looks great but costs far more code, behaves badly on phones, and fights the pinned horizontal scroll.

## Consequences

- Sway and Wind live on two nested elements so their rotations add up instead of overwriting each other.
- No dragging Prints off the Line.
