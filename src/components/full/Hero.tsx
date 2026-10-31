"use client";

import { useEffect, useRef } from "react";
import { cv } from "@/data/cv";
import { gsap } from "@/lib/scroll";
import BustScene from "./BustScene";

// ARCHITECTURE.md §4.1: one pinned ScrollTrigger; its progress turns the Bust and fades the name.
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useEffect(() => {
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
        .to("[data-hero-name]", { opacity: 0 }, 0);
      return () => {
        progress.current = 0;
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative h-svh w-full overflow-hidden">
      <div className="absolute inset-0">
        <BustScene progress={progress} />
      </div>
      <div data-hero-name className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1080px] px-4 pb-8 sm:px-8">
        <h1 className="font-display text-[clamp(64px,14vw,200px)] leading-[0.95] tracking-[-0.02em]">{cv.name}</h1>
        <p className="mt-6 max-w-[640px] text-lg text-stone">{cv.headline}</p>
      </div>
    </section>
  );
}
