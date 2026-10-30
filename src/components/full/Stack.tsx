import type { StackLane } from "@/data/cv";
import { cv } from "@/data/cv";
import { Section } from "../lists";

// DESIGN.md §7: seconds per loop; the middle Lane runs the other way.
const speeds = [32, 38, 34];

function Items({ lane, hidden }: { lane: StackLane; hidden?: boolean }) {
  // Two copies of the items per half so a short Lane still fills a wide screen.
  const items = [...lane.items, ...lane.items];
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

export function Stack() {
  return (
    <Section title="Stack">
      {cv.stack.map((lane, i) => (
        <div key={lane.lane} className="group flex h-14 items-center border-t border-line last:border-b">
          <p className="hidden w-40 shrink-0 font-mono text-xs lowercase tracking-[0.08em] text-dust sm:block">
            {lane.lane}
          </p>
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
    </Section>
  );
}
