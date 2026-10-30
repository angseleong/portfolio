import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Lenis smooth scroll driving ScrollTrigger (ARCHITECTURE.md §4). Returns a cleanup. */
export function startScroll() {
  // Nav is 56 px tall; land anchors just below it.
  const lenis = new Lenis({ anchors: { offset: -72 } });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}
