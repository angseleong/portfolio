# Main Project details live on the back of the Print

**Status: updated by [ADR-0009](0009-slack-line-uniform-prints-lift.md).** The Back stays, but the Print is lifted to the middle and enlarged before it turns over.

Clicking a Print flips it over to show its Back: title, role, summary, tech, links, written like notes on the back of a photo. The owner did not want the large modal panel used in Valley.

## Considered Options

- **Big panel / modal**: rejected by the owner.
- **Print unclips and drops under a loupe**: rejected. More motion, more code, and it hides the Line.
- **Expand in place**: rejected. Pushes the other Prints around inside a pinned scene.

## Consequences

- The Back has room for about 60 words. Longer stories go to a `/projects/[slug]` page (backlog), linked from the Back.
