"use client";

import type { Project } from "@/data/cv";

// A wooden clothespin in warm greys, handles up: steel spring at the waist, the Line sitting in the
// jaw groove (y 40.5 of 52, placed on the Clip point), the tips gripping the paper.
function Clip() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 52"
      className="absolute -top-[45.5px] left-1/2 z-10 h-[58.5px] w-[18px] -translate-x-1/2 drop-shadow-[0_3px_3px_rgba(0,0,0,0.55)]"
    >
      <path d="M3 4.5Q3 0 8 0Q13 0 13 4.5V17Q13.8 21 13 25L12.6 47.5Q12.6 52 8 52Q3.4 52 3.4 47.5L3 25Q2.2 21 3 17Z" fill="#dcd5c8" />
      <path d="M8 0Q13 0 13 4.5V17Q13.8 21 13 25L12.6 47.5Q12.6 52 8 52Z" fill="#c3bbad" />
      <path d="M5.4 5v10M5.6 27v17M10.6 6v9M10.4 28v15" stroke="#b3ab9c" strokeWidth="0.35" strokeLinecap="round" />
      <path d="M8 1v51" stroke="#8f887c" strokeWidth="0.45" />
      <ellipse cx="8" cy="40.5" rx="4.6" ry="1.1" fill="#6e6a63" opacity="0.55" />
      <rect x="1.6" y="18.3" width="12.8" height="5.4" rx="2.7" fill="#8a857c" />
      <path d="M2.6 20.1h10.8" stroke="#cfcac0" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M2.6 22h10.8" stroke="#5f5b54" strokeWidth="0.5" strokeLinecap="round" />
      <circle cx="8" cy="21" r="3.6" fill="none" stroke="#6e6a63" strokeWidth="0.9" />
    </svg>
  );
}

// One Main Project on the Line (DESIGN.md §6, ADR-0010). Drag moves [data-drag]; Wind and Sway rotate inside it.
// Hover or open: the Reel pans through its whole height. Click: the paper grows downward with the notes.
export function Print({
  project,
  index,
  open,
  onToggle,
}: {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="shrink-0 snap-center" data-print>
      <div data-drag className="relative">
        <div data-wind className="origin-top">
          <div
            className="origin-top animate-sway"
            style={{ animationDelay: `${-index * 1.1}s`, animationPlayState: open ? "paused" : undefined }}
          >
            <Clip />
            <article
              data-open={open || undefined}
              className="group/print w-[300px] bg-[#f4f1ea] p-3 shadow-[0_8px_24px_#000] sm:w-[440px]"
            >
              <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={`notes-${project.slug}`}
                className="block w-full cursor-grab text-left active:cursor-grabbing"
              >
                <span className="print-photo relative block aspect-[16/10] overflow-hidden bg-ink [container-type:size]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static Reel, panned with CSS */}
                  <img
                    src={project.print}
                    alt={`${project.title} preview`}
                    draggable={false}
                    onLoad={(e) => {
                      // Long Reels pan slower: about 1.2 s per 16:10 frame of image.
                      const img = e.currentTarget;
                      img.style.setProperty("--pan", `${Math.max(2, (img.naturalHeight / img.naturalWidth) * 1.6 * 1.2)}s`);
                    }}
                    className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-700 ease-in-out group-hover/print:translate-y-[calc(-100%+100cqh)] group-hover/print:duration-[var(--pan)] group-hover/print:ease-linear group-data-open/print:translate-y-[calc(-100%+100cqh)] group-data-open/print:duration-[var(--pan)] group-data-open/print:ease-linear"
                  />
                </span>
                <span className="flex items-baseline justify-between gap-4 pt-3">
                  <span className="font-display text-2xl leading-none text-[#1a1a1a]">{project.title}</span>
                  <span aria-hidden className="font-mono text-xs text-[#6e6a63]">
                    {open ? "close" : "open"}
                  </span>
                </span>
              </button>
              <div
                id={`notes-${project.slug}`}
                className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-data-open/print:grid-rows-[1fr]"
              >
                <div className="overflow-hidden">
                  <div className="pb-1 pt-4 text-[#2a2826]">
                    {project.role && <p className="font-mono text-xs text-[#6e6a63]">{project.role}</p>}
                    <p className="mt-2 text-sm leading-relaxed">{project.summary}</p>
                    <p className="mt-3 font-mono text-[11px] text-[#6e6a63]">{project.tech.join(" · ")}</p>
                    {project.links.length > 0 && (
                      <p className="mt-3 flex gap-5 text-sm">
                        {project.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener"
                            tabIndex={open ? 0 : -1}
                            className="underline underline-offset-4 hover:text-black"
                          >
                            {l.label} ↗
                          </a>
                        ))}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </li>
  );
}
