import type { StackLane } from "@/data/cv";
import { cv } from "@/data/cv";

// DESIGN.md §7: seconds per loop (twice the old 32/38/34, since each half is twice as long); the middle Lane runs the other way.
const speeds = [64, 76, 68];

function Items({ lane, hidden }: { lane: StackLane; hidden?: boolean }) {
  // Four copies per half: full-bleed, a half must stay wider than a 2560 px screen or the Lane shows a gap.
  const items = [...lane.items, ...lane.items, ...lane.items, ...lane.items];
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2.5 whitespace-nowrap text-stone hover:text-light">
          {item.icon && (
            <span
              aria-hidden
              className="size-[18px] shrink-0 bg-current"
              style={{
                maskImage: `url(/icons/${item.icon}.svg)`,
                WebkitMaskImage: `url(/icons/${item.icon}.svg)`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
          )}
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// Full-bleed, no title: it runs edge to edge right under the Hero.
export function Stack() {
  return (
    <section aria-label="Stack" className="w-full">
      {cv.stack.map((lane, i) => (
        <div key={lane.lane} className="group flex h-14 items-center border-t border-line last:border-b">
          <div className="overflow-hidden" aria-label={lane.lane}>
            <div
              className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
              style={{ animationDuration: `${speeds[i]}s`, animationDirection: i === 1 ? "reverse" : "normal" }}
            >
              <Items lane={lane} />
              <Items lane={lane} hidden />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
