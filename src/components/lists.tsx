import type { ReactNode } from "react";
import { cv, type Entry, type Link, type Project } from "@/data/cv";

// Shared by Compact Mode now and Full Mode later (ARCHITECTURE.md §1).

export function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 pt-24 sm:pt-40">
      <h2 className="font-display text-[32px] leading-tight sm:text-5xl">{title}</h2>
      <div className="mt-8 sm:mt-12">{children}</div>
    </section>
  );
}

export function Links({ links }: { links?: Link[] }) {
  if (!links?.length) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noopener" className="text-stone underline-offset-4 hover:text-light hover:underline">
            {l.label} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}

function Tech({ tech }: { tech: string[] }) {
  return <p className="mt-3 font-mono text-xs tracking-[0.04em] text-dust">{tech.join(" · ")}</p>;
}

function Row({ title, meta, children }: { title: string; meta?: string; children: ReactNode }) {
  return (
    <li className="group border-t border-line py-6 last:border-b">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <h3 className="text-lg leading-7 text-marble group-hover:font-display group-hover:text-[21px] group-hover:italic group-hover:text-light">
          {title}
        </h3>
        {meta && <p className="shrink-0 font-mono text-xs text-dust">{meta}</p>}
      </div>
      <div className="max-w-[640px]">{children}</div>
    </li>
  );
}

export function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul>
      {entries.map((e) => (
        <Row key={e.title + e.org} title={e.title} meta={e.period}>
          <p className="mt-1 text-stone">{e.org}</p>
          {e.summary && <p className="mt-2 text-stone">{e.summary}</p>}
          <Links links={e.links} />
        </Row>
      ))}
    </ul>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul>
      {projects.map((p) => (
        <Row key={p.slug} title={p.title} meta={p.role}>
          <p className="mt-2 text-stone">{p.summary}</p>
          <Tech tech={p.tech} />
          <Links links={p.links} />
        </Row>
      ))}
    </ul>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-16 first:mt-0">
      <h3 className="mb-6 font-mono text-xs lowercase tracking-[0.08em] text-dust">{label}</h3>
      {children}
    </div>
  );
}

export const mainProjects = cv.projects.filter((p) => p.print);
export const moreProjects = cv.projects.filter((p) => !p.print);

// Collapsed row that continues the Main Projects list; native <details>, no JS.
export function MoreProjects() {
  return (
    <details className="group/more">
      <summary className="group flex cursor-pointer list-none items-center justify-between border-b border-line py-6 [&::-webkit-details-marker]:hidden">
        <span className="text-lg leading-7 text-stone group-hover:font-display group-hover:text-[21px] group-hover:italic group-hover:text-light">
          More projects <span className="font-mono text-xs not-italic text-dust">{moreProjects.length}</span>
        </span>
        <span aria-hidden className="inline-block text-xl text-dust transition-transform group-open/more:rotate-45 group-hover:text-light">
          +
        </span>
      </summary>
      <div className="[&>ul>li:first-child]:border-t-0">
        <ProjectList projects={moreProjects} />
      </div>
    </details>
  );
}

export function Recognition() {
  return (
    <Section title="Recognition">
      {cv.recognition.map((g) => (
        <Group key={g.label} label={g.label}>
          <EntryList entries={g.entries} />
        </Group>
      ))}
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-[16ch] font-display text-[40px] leading-[1.05] sm:text-7xl">{cv.closing}</p>
      <ul className="mt-12 flex flex-col gap-3 text-lg sm:flex-row sm:flex-wrap sm:gap-x-8">
        <li>
          <a href={`mailto:${cv.email}`} className="text-marble underline-offset-4 hover:text-light hover:underline">
            {cv.email}
          </a>
        </li>
        {cv.links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noopener" className="text-stone underline-offset-4 hover:text-light hover:underline">
              {l.label} ↗
            </a>
          </li>
        ))}
        <li>
          <a href="/cv.pdf" target="_blank" rel="noopener" className="text-stone underline-offset-4 hover:text-light hover:underline">
            Download CV ↗
          </a>
        </li>
      </ul>
    </Section>
  );
}
