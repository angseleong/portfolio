"use client";

import dynamic from "next/dynamic";
import { CompactPage } from "./CompactPage";
import { Hero } from "./full/Hero";
import { useMode } from "./mode";

// Full Mode code (GSAP, Lenis, three) only loads when Full Mode is on (ARCHITECTURE.md §1).
const FullPage = dynamic(() => import("./full/FullPage"), { ssr: false });

// ADR-0012: the HTML holds both first screens and CSS shows the one the layout's script picked.
// After hydration the Hero stays in place for Full Mode, so it never remounts.
export function Page() {
  const mode = useMode();
  return (
    <main id="top" className="w-full">
      {mode !== "compact" && <Hero mode={mode} />}
      {mode === "full" ? <FullPage /> : <CompactPage first={!mode} />}
    </main>
  );
}
