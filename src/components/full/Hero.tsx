"use client";

import { useEffect, useRef } from "react";
import { cv } from "@/data/cv";
import { gsap } from "@/lib/scroll";
import BustScene from "./BustScene";

// ARCHITECTURE.md §4.1: one pinned ScrollTrigger; its progress turns the Bust, widens and fades the name.
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    // The name's letters rise in once on load.
    const intro = gsap.from("[data-letter]", {
      yPercent: 40,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.04,
      delay: 0.2,
    });
    const mm = gsap.matchMedia();
    mm.add({ phone: "(max-width: 767px)", desktop: "(min-width: 768px)" }, (ctx) => {
      const { phone } = ctx.conditions as { phone: boolean };
      const state = { p: 0 };
      gsap
        .timeline({
          defaults: { ease: "power1.inOut" },
          scrollTrigger: { trigger: root.current, start: "top top", end: phone ? "+=120%" : "+=200%", pin: true, scrub: true },
        })
        .to(state, { p: 1, onUpdate: () => (progress.current = state.p) }, 0)
        .to("[data-hero-name]", { letterSpacing: "0.1em", opacity: 0 }, 0)
        .to("[data-hero-headline]", { opacity: 0 }, 0);
      return () => {
        progress.current = 0;
      };
    });
    return () => {
      intro.revert();
      mm.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative h-svh w-full overflow-hidden">
      {/* Behind the Bust: the canvas is transparent, so the head covers part of the name. */}
      <h1
        data-hero-name
        aria-label={cv.name}
        className="absolute inset-x-0 top-[24%] whitespace-nowrap text-center font-display text-[clamp(56px,15vw,240px)] leading-none tracking-[-0.02em] text-light"
      >
        {[...cv.name].map((ch, i) => (
          <span key={i} data-letter aria-hidden className="inline-block whitespace-pre">
            {ch}
          </span>
        ))}
      </h1>
      <div className="absolute inset-0">
        <BustScene progress={progress} />
      </div>
      <p
        data-hero-headline
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1080px] px-4 pb-8 font-mono text-xs tracking-[0.08em] text-stone [text-shadow:0_0_12px_var(--ink)] sm:px-8"
      >
        {cv.headline}
      </p>
    </section>
  );
}
