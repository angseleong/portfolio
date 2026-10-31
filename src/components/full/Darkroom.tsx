"use client";

import { useEffect, useRef, useState } from "react";
import { Draggable, gsap, ScrollTrigger } from "@/lib/scroll";
import { mainProjects, MoreProjects } from "../lists";
import { Print } from "./Print";

// The Line dips this far (px) between two points, plus a little per px of span.
const SAG = 40;

// Projects in Full Mode: Prints on a slack Line under an enlarger (DESIGN.md §6, ARCHITECTURE.md §4.2, ADR-0009, ADR-0010).
export function Darkroom() {
  const root = useRef<HTMLElement>(null);
  const runway = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const rope = useRef<SVGPathElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const section = root.current!;
    const line = track.current!;
    // Held here, not read from the ref at cleanup: React has already cleared refs by then.
    const way = runway.current!;
    const clips = gsap.utils.toArray<HTMLElement>("[data-drag]", section);

    // Develop each Print the first time it is on screen.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.developed = "";
          io.unobserve(e.target);
        }),
      { threshold: 0.4 },
    );
    section.querySelectorAll("[data-print]").forEach((el) => io.observe(el));

    // Redraw the Line every frame through each Clip, so it follows a dragged Print.
    const draw = () => {
      const t = line.getBoundingClientRect();
      const pts = [
        { x: 0, y: 0 },
        ...clips.map((c) => {
          const r = c.getBoundingClientRect();
          return { x: r.left + r.width / 2 - t.left, y: r.top - t.top };
        }),
        { x: t.width, y: 0 },
      ];
      let d = `M${pts[0].x},${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        d += ` Q${(a.x + b.x) / 2},${Math.max(a.y, b.y) + SAG + Math.abs(b.x - a.x) * 0.03} ${b.x},${b.y}`;
      }
      rope.current?.setAttribute("d", d);
    };
    gsap.ticker.add(draw);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: the room is CSS sticky over a runway as long as the Line's travel, and that scroll slides the Line.
      // Not a GSAP pin: re-measuring a pin takes the room out of the page and back, which restarted every Print's
      // CSS sway (owner saw it reset when opening More Projects, 31 Oct).
      mm.add("(min-width: 768px)", () => {
        // From layout boxes, not scrollWidth: Safari leaves the end padding out of scrollWidth, so the Line stopped short.
        const distance = () => {
          const last = line.querySelector<HTMLElement>("[data-print]:last-child")!;
          const end = last.offsetLeft + last.offsetWidth + parseFloat(getComputedStyle(line).paddingRight);
          return Math.max(0, end - document.documentElement.clientWidth);
        };
        const size = () => {
          way.style.height = `${distance()}px`;
        };
        size();
        gsap.to(line, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: way.parentElement,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
            onRefreshInit: size,
          },
        });
        return () => {
          way.style.height = "";
        };
      });

      // Fine pointers: drag a Print to pull the Line; the cursor passing by gives Wind.
      mm.add("(pointer: fine)", () => {
        const drags = clips.map((el) =>
          Draggable.create(el, {
            type: "x,y",
            dragClickables: true,
            onRelease() {
              gsap.to(this.target, { x: 0, y: 0, duration: 1.6, ease: "elastic.out(1, 0.3)" });
            },
          })[0],
        );

        const winds = gsap.utils.toArray<HTMLElement>("[data-wind]", section);
        const onMove = (e: PointerEvent) => {
          if (e.buttons) return;
          winds.forEach((el) => {
            const r = el.getBoundingClientRect();
            const near = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
            if (near > 200 || !e.movementX) return;
            gsap.to(el, {
              rotation: gsap.utils.clamp(-8, 8, e.movementX * 0.4),
              duration: 0.3,
              overwrite: true,
              onComplete: () => {
                gsap.to(el, { rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.35)" });
              },
            });
          });
        };
        section.addEventListener("pointermove", onMove);
        return () => {
          drags.forEach((d) => d.kill());
          section.removeEventListener("pointermove", onMove);
        };
      });
    }, section);

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);

    return () => {
      io.disconnect();
      gsap.ticker.remove(draw);
      ctx.revert();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div>
      <section
        ref={root}
        id="projects"
        className="flex flex-col overflow-hidden bg-[#070605] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(255,255,255,0.07),transparent)] py-24 md:sticky md:top-0 md:min-h-svh md:pt-[14svh]"
      >
        <div className="mx-auto w-full max-w-[1080px] px-4 sm:px-8">
          <h2 className="font-display text-[32px] leading-tight sm:text-5xl">Projects</h2>
        </div>
        <div className="mt-10 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] md:overflow-visible">
          <div ref={track} className="relative w-max px-4 pb-16 pt-16 sm:px-[max(2rem,calc((100vw-1080px)/2+2rem))]">
            <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              <path ref={rope} fill="none" stroke="var(--stone)" strokeOpacity="0.6" strokeWidth="1.5" />
            </svg>
            <ul className="flex items-start gap-16 sm:gap-28">
              {mainProjects.map((p, i) => (
                <Print
                  key={p.slug}
                  project={p}
                  index={i}
                  open={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              ))}
            </ul>
          </div>
        </div>
        {/* More Projects folds out right under the Line, inside the same room (owner, 31 Oct). Once it has settled,
            everything below re-measures; with no pin on the page that no longer disturbs the Prints. */}
        <div className="mx-auto w-full max-w-[1080px] px-4 sm:px-8">
          <MoreProjects className="md:grid md:grid-cols-2 md:gap-x-16" onSettled={() => ScrollTrigger.refresh()} />
        </div>
      </section>
      {/* The scroll that slides the Line on desktop; its height is set to the Line's travel. */}
      <div ref={runway} aria-hidden />
    </div>
  );
}
