"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cv } from "@/data/cv";

const BustScene = dynamic(() => import("./BustScene"), { ssr: false });

const link = "underline-offset-4 hover:text-light hover:underline";

// Full Mode's last screen (owner, 31 Oct): no section title, a few words, the email large, and the whole Bust beside
// them, watching the reader. Compact Mode keeps the plain Contact section.
export function Closing() {
  const root = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);

  // The Bust's canvas mounts only when the closing is close, so it costs nothing at the start.
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "50% 0px" },
    );
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} id="contact" aria-label="Contact" className="relative flex min-h-svh flex-col overflow-hidden">
      <div className="mx-auto w-full max-w-[1080px] px-4 pt-32 sm:px-8 md:flex md:min-h-svh md:flex-col md:justify-center md:pt-0">
        <div data-reveal className="relative z-10 max-w-[560px]">
          <h2 className="font-display text-[44px] leading-[1.02] sm:text-7xl">{cv.closing}</h2>
          {cv.closingLines.map((line) => (
            <p key={line} className="mt-6 text-lg text-stone">
              {line}
            </p>
          ))}
          <p className="mt-12 font-mono text-xs tracking-[0.08em] text-dust">email</p>
          <a
            href={`mailto:${cv.email}`}
            className="mt-2 inline-block border-b border-line pb-1 text-2xl text-marble hover:border-light hover:text-light sm:text-3xl"
          >
            {cv.email}
          </a>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-stone">
            {cv.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener" className={link}>
                  {l.label} ↗
                </a>
              </li>
            ))}
            <li>
              <a href="/cv.pdf" target="_blank" rel="noopener" className={link}>
                Download CV ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div aria-hidden className="relative mb-12 mt-8 h-[46svh] w-full md:absolute md:right-[6%] md:top-1/2 md:m-0 md:h-[64svh] md:w-[30%] md:-translate-y-1/2">
        {near && <BustScene peek />}
      </div>
    </section>
  );
}
