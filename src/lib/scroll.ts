import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, Draggable);

export { Draggable, gsap, ScrollTrigger };

/** Lenis smooth scroll driving ScrollTrigger (ARCHITECTURE.md §4). Returns a cleanup. */
export function startScroll() {
  // Nav is 56 px tall; land anchors just below it.
  const smooth = new Lenis({ anchors: { offset: -72 } });
  smooth.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => smooth.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    smooth.destroy();
  };
}
