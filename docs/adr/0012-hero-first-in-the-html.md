# The server sends the Hero and Compact Mode; an inline script picks one before paint

Supersedes the "Compact Mode is the server-rendered default" consequence of ADR-0007. The two modes, the toggle and the reduced-motion rule stay.

The server HTML was always Compact Mode, and Full Mode replaced it after hydration. On a phone, Full Mode visitors saw the plain page for 1–3 s and then a jump to the Hero, and Lighthouse put the largest paint at ~3.6 s (mobile Performance 73–81, target 85). Agreed with the owner on 31 Oct.

Now the server HTML holds both first screens: the Hero (name and Headline) and Compact Mode. An inline script in `<head>` runs the same rule as `mode.tsx` (stored choice, else reduced motion → compact, else full) and sets `<html data-mode>`; CSS shows only the matching first screen. React hydrates with the mode unknown, then keeps the Hero in place for Full Mode (no remount) or drops it for Compact Mode. The rest of Full Mode still loads with `next/dynamic`.

## Considered Options

- **Keep Compact Mode as the only server render**: rejected; the flash and the slow largest paint are the problem.
- **Prefetch the Full Mode chunk during hydration**: tried, no measurable gain; the Hero still waits for JS.
- **Server-render all of Full Mode**: more HTML and more hydration work for a page that is mostly below the fold.

## Consequences

- With JS off, or before the script runs, the page is Compact Mode as before: the Hero is hidden unless `data-mode="full"`.
- The name's rise-in is a CSS animation, so it starts from the HTML without waiting for GSAP.
- The Hero's code is in the main bundle (a few KB); GSAP, Lenis and three still load only in Full Mode.
- `<html>` has `suppressHydrationWarning`, because the script sets an attribute React did not render.
