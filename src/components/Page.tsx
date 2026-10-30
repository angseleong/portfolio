"use client";

import dynamic from "next/dynamic";
import { CompactPage } from "./CompactPage";
import { useMode } from "./mode";

// Full Mode code (GSAP, Lenis, later three) only loads when Full Mode is on (ARCHITECTURE.md §1).
const FullPage = dynamic(() => import("./full/FullPage"), { ssr: false, loading: () => <CompactPage /> });

export function Page() {
  return useMode() === "full" ? <FullPage /> : <CompactPage />;
}
