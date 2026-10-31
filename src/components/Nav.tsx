"use client";

import { cv } from "@/data/cv";
import { setMode, useMode } from "./mode";

const sections = [
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const mode = useMode();
  const next = mode === "full" ? "compact" : "full";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink">
      <nav className="mx-auto flex h-14 max-w-[1080px] items-center gap-6 px-4 text-sm sm:px-8">
        <a href="#top" className="mr-auto font-display text-xl text-marble hover:text-light">
          {cv.name}
        </a>
        <ul className="hidden gap-6 sm:flex">
          {sections.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="text-stone underline-offset-[6px] hover:text-light hover:underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener"
          className="border border-line px-3 py-1.5 text-marble hover:border-light hover:text-light"
        >
          CV
        </a>
        <button
          type="button"
          onClick={() => setMode(next)}
          aria-label={`Switch to ${next} mode`}
          className="font-mono text-xs lowercase tracking-[0.08em] text-dust hover:text-light"
        >
          <span className={mode === "full" ? "text-marble" : undefined}>full</span>
          {" / "}
          <span className={mode === "compact" ? "text-marble" : undefined}>compact</span>
        </button>
      </nav>
    </header>
  );
}
