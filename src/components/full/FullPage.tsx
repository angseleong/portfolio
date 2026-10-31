"use client";

import "lenis/dist/lenis.css";
import { useEffect, useRef } from "react";
import { cv } from "@/data/cv";
import { gsap, ScrollTrigger, startScroll } from "@/lib/scroll";
import { Contact, EntryList, MoreProjects, Recognition, Section } from "../lists";
import { Darkroom } from "./Darkroom";
import { Hero } from "./Hero";
import { Stack } from "./Stack";
import { Story } from "./Story";

const column = "mx-auto w-full max-w-[1080px] px-4 sm:px-8";

export default function FullPage() {
  const root = useRef<HTMLElement>(null);

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
    <main ref={root} id="top" className="w-full pb-32">
      <Hero />
      <div className={column}>
        <Story />
        <Stack />
      </div>

      {/* Full width: the Darkroom has its own light and pins the whole screen. */}
      <div className="mt-24 sm:mt-40">
        <Darkroom />
      </div>

      <div className={column}>
        <div className="mt-12 border-t border-line">
          <MoreProjects />
        </div>

        <Section id="research" title="Research">
          <EntryList entries={cv.research} />
        </Section>

        <Recognition />

        <Section title="Volunteering">
          <EntryList entries={cv.volunteering} />
        </Section>

        <Section title="Education">
          <EntryList entries={cv.education} />
        </Section>

        <Contact />
      </div>
    </main>
  );
}
