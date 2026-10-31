"use client";

import { useEffect, useRef } from "react";
import { cv } from "@/data/cv";
import { gsap } from "@/lib/scroll";

const { epigraph, statement, lines, photos } = cv.story;

// DESIGN.md §8: one screen, no pin. The statement Develops word by word while the section crosses the screen;
// the contact sheet Develops once, frame after frame.
export function Story() {
  const root = useRef<HTMLElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 70%", end: "center 45%", scrub: true },
        },
      );
    }, root);
    // Frames Develop 250 ms apart. Timers, not transition-delay, so hovering to colour never lags.
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll("figure").forEach((f, i) =>
          timers.push(window.setTimeout(() => (f.dataset.developed = ""), i * 250)),
        );
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    if (sheet.current) io.observe(sheet.current);
    return () => {
      ctx.revert();
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      ref={root}
      aria-label="About"
      className="grid min-h-svh content-center gap-12 py-24 md:grid-cols-[1fr_minmax(0,420px)] md:items-center md:gap-16"
    >
      <div className="md:order-2">
        <div ref={sheet} className="grid grid-cols-2 gap-3">
          {photos.map((photo, i) => (
            <figure key={photo.src}>
              {/* eslint-disable-next-line @next/next/no-img-element -- static photo, Develops with CSS */}
              <img
                src={photo.src}
                alt={photo.alt}
                width={540}
                height={720}
                loading="lazy"
                className="about-photo aspect-[3/4] w-full object-cover"
                // Phones have no hover: a tap toggles colour.
                onClick={(e) => e.currentTarget.toggleAttribute("data-color")}
              />
              <figcaption className="mt-1.5 font-mono text-xs tracking-[0.08em] text-dust">
                {String(i + 1).padStart(2, "0")}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="min-w-0 max-w-[640px]">
        <p className="font-mono text-xs tracking-[0.08em] text-dust">
          &ldquo;{epigraph.text}&rdquo; &mdash; {epigraph.by}
        </p>
        <p className="mt-6 font-display text-[26px] leading-tight sm:text-[40px]">
          {statement.split(" ").map((word, i) => (
            <span key={i}>
              <span data-word>{word}</span>{" "}
            </span>
          ))}
        </p>
        {lines.map((line) => (
          <p key={line} className="mt-6 text-stone">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
