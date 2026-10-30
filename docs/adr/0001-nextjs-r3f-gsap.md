# Next.js + React Three Fiber + GSAP, no Framer and no shadcn

The site is Next.js (App Router) + TypeScript + Tailwind, with React Three Fiber for the Bust and GSAP ScrollTrigger + Lenis for the two pinned scenes. Everything else is CSS.

## Considered Options

- **Framer (the site builder)**: rejected. 3D only through third-party marketplace components, no code export, no git, and a custom domain needs a paid plan. The owner's workflow is docs + git.
- **Framer Motion (Motion)**: rejected. It has no pin, and its 3D package was deprecated in Feb 2025. With R3F we read scroll progress in `useFrame` ourselves anyway, so it would add a library without adding anything.
- **shadcn/ui**: rejected for now. Almost every part of this site is custom (Bust, Darkroom, Marquee); a component kit would cover one or two buttons. Easy to add later if a real need appears.
- **Plain CSS scroll-driven animations**: rejected. Pinning plus scrubbing a WebGL value is still uneven across mobile browsers.

## Consequences

- GSAP is free (no-charge license, not MIT) since 2025.
- Full Mode code is loaded with `next/dynamic` so Compact Mode and `/cv` stay light.
