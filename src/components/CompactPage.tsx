import { cv } from "@/data/cv";
import { Contact, EntryList, Intro, MoreProjects, ProjectList, Recognition, Section, mainProjects } from "./lists";

// PRD FR-11: every section in one plain column, no motion.
export function CompactPage({ first }: { first?: boolean }) {
  return (
    <div data-first={first ? "compact" : undefined} className="mx-auto w-full max-w-[1080px] px-4 pb-24 pt-14 sm:px-8">
      <Intro />

      <Section title="About">
        <p className="max-w-[640px] text-lg leading-relaxed text-stone">{cv.summary}</p>
      </Section>

      <Section title="Stack">
        <dl className="grid gap-8 sm:grid-cols-3">
          {cv.stack.map((lane) => (
            <div key={lane.lane}>
              <dt className="font-mono text-xs lowercase tracking-[0.08em] text-dust">{lane.lane}</dt>
              <dd>
                <ul className="mt-3 space-y-1.5 text-stone">
                  {lane.items.map((item) => (
                    <li key={item.name}>{item.name}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="projects" title="Projects">
        <ProjectList projects={mainProjects} />
        <MoreProjects />
      </Section>

      <Section id="research" title="Research">
        <EntryList entries={cv.research} />
      </Section>

      <Recognition />

      <Section title="Volunteering">
        <EntryList entries={cv.volunteering} />
      </Section>

      <Section title="Education">
        <EntryList entries={cv.education} />
      </Section>

      <Contact />
    </div>
  );
}
