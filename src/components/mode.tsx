"use client";

import { useSyncExternalStore } from "react";

export type Mode = "full" | "compact";

const KEY = "mode";
const EVENT = "modechange";
const reducedMotion = "(prefers-reduced-motion: reduce)";

// ARCHITECTURE.md §3: stored choice, else reduced motion → compact, else full.
function read(): Mode {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === "full" || stored === "compact") return stored;
  } catch {}
  return matchMedia(reducedMotion).matches ? "compact" : "full";
}

function subscribe(onChange: () => void) {
  const media = matchMedia(reducedMotion);
  media.addEventListener("change", onChange);
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function setMode(mode: Mode) {
  try {
    localStorage.setItem(KEY, mode);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/** Server render (and the first client render) is always Compact Mode. */
export function useMode(): Mode {
  return useSyncExternalStore(subscribe, read, () => "compact");
}
