"use client";

import { useEffect, useRef } from "react";
import { cv } from "@/data/cv";
import { gsap } from "@/lib/scroll";

// DESIGN.md §8: each word Develops from 15% to full as its line crosses the middle of the screen.
export function Story() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line) => {
        gsap.fromTo(
          line.querySelectorAll("span"),
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: line, start: "top 70%", end: "bottom 45%", scrub: true },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-label="About">
      {cv.story.map((line) => (
        <p
          key={line}
          data-line
          className="flex min-h-svh max-w-[760px] flex-wrap content-center font-display text-[26px] leading-tight sm:text-[40px]"
        >
          {line.split(" ").map((word, i) => (
            <span key={i}>{word}&nbsp;</span>
          ))}
        </p>
      ))}
    </section>
  );
}
