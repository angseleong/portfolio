import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cv, type Link } from "@/data/cv";

// CV Page (PRD FR-12): one A4 page in the owner's CV format, single column, real text.
// `npm run cv` prints it to public/cv.pdf.

export const metadata: Metadata = {
  title: `${cv.fullName} — CV`,
  description: cv.summary,
};

const onCV = <T extends { cv?: boolean }>(e: T) => e.cv !== false;
// One bullet per sentence, in the owner's wording from cv.ts.
const sentences = (text?: string) => (text ? text.split(/(?<=\.)\s+(?=[A-Z])/) : []);

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-[7pt]">
      <h2 className="border-b border-black text-[12pt] font-bold uppercase text-[#2e5c8a]">{title}</h2>
      {children}
    </section>
  );
}

// Bold title with the date on the right, bullets below.
function Item({ title, meta, bullets }: { title: string; meta?: string; bullets: ReactNode[] }) {
  return (
    <div className="mt-[3pt] break-inside-avoid">
      <div className="flex justify-between gap-6 font-bold">
        <h3>{title}</h3>
        {meta && <p className="shrink-0">{meta}</p>}
      </div>
      <ul className="list-disc pl-[22pt]">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

// URLs are printed as text so the PDF still reads when pasted into a plain editor.
const bare = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
const urls = (links: Link[]) =>
  links.map((l) => (
    <span key={l.href}>
      {" | "}
      <a href={l.href}>{bare(l.href)}</a>
    </span>
  ));

export default function CVPage() {
  return (
    <main className="flex-1 bg-white text-black">
      <article className="mx-auto max-w-[210mm] px-4 py-8 font-['Times_New_Roman',Times,serif] text-[10pt] leading-[1.2] [font-kerning:none] sm:p-[14mm] print:max-w-none print:p-0">
        <header className="text-center">
          <h1 className="text-[18pt] font-bold uppercase">{cv.fullName}</h1>
          <p className="text-[9.5pt]">
            {cv.location} | <a href={`mailto:${cv.email}`}>{cv.email}</a>
            {urls(cv.links)}
          </p>
        </header>

        <Block title="Profile">
          <p className="mt-[2pt]">{cv.summary}</p>
        </Block>

        <Block title="Project Experience">
          {cv.projects.filter(onCV).map((p) => (
            <Item
              key={p.slug}
              title={p.role ? `${p.title} – ${p.role}` : p.title}
              meta={p.period}
              bullets={[
                ...sentences(p.summary),
                <>
                  Tech: {p.tech.join(", ")}
                  {urls(p.links)}
                </>,
              ]}
            />
          ))}
        </Block>

        <Block title="Research">
          {cv.research.filter(onCV).map((e) => (
            <Item
              key={e.title}
              title={e.title}
              meta={e.period}
              bullets={[
                <>
                  {e.org}
                  {e.links?.map((l) => (
                    <span key={l.href}>
                      {" | "}
                      <a href={l.href} className="underline">
                        {l.label}
                      </a>
                    </span>
                  ))}
                </>,
                ...sentences(e.summary),
              ]}
            />
          ))}
        </Block>

        <Block title="Education">
          {cv.education.filter(onCV).map((e) => (
            <Item key={e.title} title={e.org} meta={e.period} bullets={[e.summary ? `${e.title}, ${e.summary}` : e.title]} />
          ))}
        </Block>

        <Block title="Organizational Experience">
          {cv.volunteering.filter(onCV).map((e) => (
            <Item key={e.title + e.org} title={`${e.org} – ${e.title}`} meta={e.period} bullets={sentences(e.summary)} />
          ))}
        </Block>

        <Block title="Achievements & Certifications">
          <ul className="mt-[2pt]">
            {cv.recognition.map((g) => (
              <li key={g.label}>
                <strong>{g.label}:</strong>{" "}
                {g.entries
                  .filter(onCV)
                  .map((e) => `${e.title}, ${e.org} (${e.period})`)
                  .join("; ")}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Skills & Tools">
          <ul className="mt-[2pt]">
            {cv.stack.map((lane) => (
              <li key={lane.lane}>
                <strong>{lane.lane}:</strong> {lane.items.map((i) => i.name).join(", ")}
              </li>
            ))}
          </ul>
        </Block>
      </article>
    </main>
  );
}
