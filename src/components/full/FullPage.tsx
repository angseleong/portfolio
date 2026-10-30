"use client";

import "lenis/dist/lenis.css";
import { useEffect, useRef } from "react";
import { cv } from "@/data/cv";
import { gsap, ScrollTrigger, startScroll } from "@/lib/scroll";
import { Contact, EntryList, Intro, MoreProjects, ProjectList, Recognition, Section, mainProjects } from "../lists";
import { Stack } from "./Stack";
import { Story } from "./Story";

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
    <main ref={root} id="top" className="mx-auto w-full max-w-[1080px] px-4 pb-32 pt-14 sm:px-8">
      <Intro />
      <Story />
      <Stack />

      {/* Block 3 replaces the Main Projects list with the Darkroom. */}
      <Section id="projects" title="Projects">
        <ProjectList projects={mainProjects} />
        <MoreProjects />
      </Section>

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
    </main>
  );
}
