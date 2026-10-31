"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cv } from "@/data/cv";
import type { Mode } from "../mode";

const loadBust = () => import("./BustScene");
// three.js is its own chunk, so the Hero text paints before the 3D code has loaded. The Bust fades in when ready.
const BustScene = dynamic(loadBust, { ssr: false });

const letters = [...cv.name];
const nameClass =
  "absolute inset-x-0 top-[24%] whitespace-nowrap text-center font-display text-[clamp(56px,15vw,240px)] leading-none tracking-[-0.02em]";

// ARCHITECTURE.md §4.1: the scroll progress through the Hero turns the Bust and brings the name forward.
// The Hero is in the server HTML (ADR-0012): before hydration `mode` is null and CSS decides whether it shows.
export function Hero({ mode }: { mode: Mode | null }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [bust, setBust] = useState(false);
  const active = mode === "full";

  // After the Hero text has painted, parse three.js, then mount the canvas once the browser is idle: two short
  // pauses instead of one long one, which a phone felt as a stutter at the start.
  useEffect(() => {
    if (!active) return;
    let gone = false;
    const idle = (fn: () => void) => ("requestIdleCallback" in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));
    const frame = requestAnimationFrame(() => loadBust().then(() => idle(() => !gone && setBust(true))));
    return () => {
      gone = true;
      cancelAnimationFrame(frame);
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    let gone = false;
    let undo: (() => void) | undefined;
    // GSAP stays out of the main bundle, so Compact Mode never downloads it.
    import("@/lib/scroll").then(({ gsap, ScrollTrigger }) => {
      if (gone) return;
      const state = { p: 0 };
      const tl = gsap
        .timeline({
          defaults: { ease: "power1.inOut" },
          // No GSAP pin: the section is CSS sticky, so it holds still even while the main thread is busy.
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true },
        })
        .to(state, { p: 1, duration: 1, ease: "none", onUpdate: () => (progress.current = state.p) }, 0)
        // The name comes forward: the dim copy behind the Bust fades as the bright copy in front fades in. Same
        // letters in the same place, so over black the two add up to one name instead of showing a double.
        .to("[data-hero-name]", { opacity: 0, duration: 0.5 }, 0.2)
        .to("[data-hero-front]", { opacity: 1, duration: 0.5 }, 0.2)
        .to("[data-hero-headline]", { opacity: 0, duration: 0.4 }, 0);
      ScrollTrigger.refresh();
      undo = () => {
        tl.scrollTrigger?.kill();
        tl.revert();
        progress.current = 0;
      };
    });
    return () => {
      gone = true;
      undo?.();
    };
  }, [active]);

  return (
    // The scroll room: one screen plus 120% (phones) or 200% of scrolling while the section sticks.
    <div ref={root} data-first={mode ? undefined : "full"} className="relative h-[220svh] md:h-[300svh]">
      <section className="sticky top-0 h-svh w-full overflow-hidden">
        {/* Behind the Bust and dim: the canvas is transparent, so the head covers part of the name. */}
        <h1 data-hero-name aria-label={cv.name} className={`${nameClass} text-light opacity-45`}>
          {/* The letters rise in once, in CSS, so they start from the HTML without waiting for JS. */}
          {letters.map((ch, i) => (
            <span key={i} aria-hidden className="inline-block animate-rise whitespace-pre" style={{ animationDelay: `${0.2 + i * 0.04}s` }}>
              {ch}
            </span>
          ))}
        </h1>
        <div className="absolute inset-0">
          {bust && <BustScene progress={progress} />}
        </div>
        {/* In front: inverts over the metal, so it reads over the face and over the black alike. */}
        <p data-hero-front aria-hidden className={`${nameClass} pointer-events-none text-white opacity-0 mix-blend-difference`}>
          {letters.map((ch, i) => (
            <span key={i} className="inline-block whitespace-pre">
              {ch}
            </span>
          ))}
        </p>
        <p
          data-hero-headline
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-full max-w-[1080px] px-4 pb-8 font-mono text-xs tracking-[0.08em] text-stone [text-shadow:0_0_12px_var(--ink)] sm:px-8"
        >
          {cv.headline}
        </p>
      </section>
    </div>
  );
}
