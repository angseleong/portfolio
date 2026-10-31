"use client";

import { useId, useState, type ReactNode } from "react";
import { cv, type Entry, type Link, type Project } from "@/data/cv";

// Rows and lists are shared by both modes; Section, Intro and Contact are Compact Mode's (ARCHITECTURE.md §1).

export function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    // Compact Mode reads like a CV (owner, 31 Oct): on laptops the title sits in a narrow left column.
    <section id={id} className="mt-12 grid scroll-mt-20 gap-6 border-t border-line pt-8 md:grid-cols-[180px_1fr] md:gap-12">
      <h2 className="font-display text-[28px] leading-tight md:text-[32px]">{title}</h2>
      <div className="min-w-0">{children}</div>
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

export function ProjectList({ projects, className }: { projects: Project[]; className?: string }) {
  return (
    <ul className={className}>
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

// Name + Headline. Full Mode replaces this with the Bust Hero in Block 4.
export function Intro() {
  return (
    <header className="pb-4 pt-16 sm:pt-24">
      <h1 className="font-display text-[clamp(52px,10vw,120px)] leading-[0.95] tracking-[-0.02em]">{cv.name}</h1>
      <p className="mt-4 max-w-[640px] text-lg text-stone">{cv.headline}</p>
    </header>
  );
}

export function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-10 first:mt-0">
      <h3 className="mb-6 font-mono text-xs lowercase tracking-[0.08em] text-dust">{label}</h3>
      {children}
    </div>
  );
}

export const mainProjects = cv.projects.filter((p) => p.print);
export const moreProjects = cv.projects.filter((p) => !p.print);

// Collapsed row that continues the Main Projects list. It opens with a height transition (owner, 31 Oct), then
// calls onSettled so a page with scroll scenes can re-measure.
export function MoreProjects({ className, onSettled }: { className?: string; onSettled?: () => void }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="group/more" data-open={open || undefined}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="group flex w-full cursor-pointer items-center justify-between border-b border-line py-6 text-left"
      >
        <span className="text-lg leading-7 text-stone group-hover:font-display group-hover:text-[21px] group-hover:italic group-hover:text-light">
          More projects <span className="font-mono text-xs not-italic text-dust">{moreProjects.length}</span>
        </span>
        <span aria-hidden className="inline-block text-xl text-dust transition-transform group-hover:text-light group-data-open/more:rotate-45">
          +
        </span>
      </button>
      <div
        id={id}
        onTransitionEnd={(e) => e.target === e.currentTarget && e.propertyName === "grid-template-rows" && onSettled?.()}
        className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-open/more:grid-rows-[1fr] group-data-open/more:opacity-100 motion-reduce:transition-none"
      >
        <div inert={!open} className="min-h-0 overflow-hidden [&>ul>li:first-child]:border-t-0">
          <ProjectList projects={moreProjects} className={className} />
        </div>
      </div>
    </div>
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
      <p className="font-display text-[32px] leading-[1.05] sm:text-5xl">{cv.closing}</p>
      <ul className="mt-8 flex flex-col gap-3 text-lg sm:flex-row sm:flex-wrap sm:gap-x-8">
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
