"use client";

import "lenis/dist/lenis.css";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, startScroll } from "@/lib/scroll";
import { Closing } from "./Closing";
import { Darkroom } from "./Darkroom";
import { Record } from "./Record";
import { Stack } from "./Stack";
import { Story } from "./Story";

const column = "mx-auto w-full max-w-[1080px] px-4 sm:px-8";

export default function FullPage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stop = startScroll();
    const ctx = gsap.context(() => {
      // DESIGN.md §8: section titles and content rise in once.
      gsap.set("[data-reveal]", { opacity: 0, y: 8 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.08 }),
      });
    }, root);
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => {
      ctx.revert();
      stop();
    };
  }, []);

  return (
    // The Hero is rendered by Page, above this (ADR-0012).
    <div ref={root}>
      <Stack />
      <div className={column}>
        <Story />
      </div>

      {/* Full width: the Darkroom has its own light and pins the whole screen. */}
      <div className="mt-24 sm:mt-40">
        <Darkroom />
      </div>

      <div className={column}>
        <Record />
      </div>

      {/* Full width: the head rises from the bottom edge of the last screen. */}
      <Closing />
    </div>
  );
}
