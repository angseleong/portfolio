import type { ReactNode } from "react";
import { cv } from "@/data/cv";
import { EntryList, Group, Links } from "../lists";

const [paper, ...research] = cv.research;

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section data-reveal>
      <h2 className="mb-8 font-display text-[28px] leading-tight sm:text-4xl">{title}</h2>
      {children}
    </section>
  );
}

// Full Mode after Projects (owner, 31 Oct): the paper featured, then the rest of the record in two dense columns,
// so the page doesn't trail off in four sparse lists. Compact Mode keeps its own one-column sections.
export function Record() {
  return (
    <>
      <section id="research" className="scroll-mt-20 pt-24 sm:pt-40">
        <h2 data-reveal className="font-display text-[32px] leading-tight sm:text-5xl">
          Research
        </h2>
        <article data-reveal className="mt-8 border-t border-line pt-8 sm:mt-12">
          <p className="font-mono text-xs tracking-[0.08em] text-dust">
            {paper.org} · {paper.period}
          </p>
          <h3 className="mt-4 max-w-[30ch] font-display text-[24px] leading-tight text-light sm:text-[34px]">{paper.title}</h3>
          {paper.summary && <p className="mt-6 max-w-[640px] text-lg text-stone">{paper.summary}</p>}
          <Links links={paper.links} />
        </article>
        <div data-reveal className="mt-12">
          <EntryList entries={research} />
        </div>
      </section>

      {/* Laptops: Recognition and Education on the left, Volunteering down the right. Phones keep the PRD order. */}
      <div className="mt-24 grid gap-x-16 gap-y-20 sm:mt-40 md:grid-cols-2">
        <Column title="Recognition">
          {cv.recognition.map((g) => (
            <Group key={g.label} label={g.label}>
              <EntryList entries={g.entries} />
            </Group>
          ))}
        </Column>
        <div className="md:row-span-2">
          <Column title="Volunteering">
            <EntryList entries={cv.volunteering} />
          </Column>
        </div>
        <Column title="Education">
          <EntryList entries={cv.education} />
        </Column>
      </div>
    </>
  );
}
