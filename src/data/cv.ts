// CV Data: every piece of portfolio text (ADR-0003). Values come from docs/DATA.md.
// Array order is display order.

export type Link = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  role?: string;
  summary: string;
  tech: string[];
  links: Link[];
  /** A Project with a print is a Main Project. A tall Reel image that pans inside a 16:10 frame. */
  print?: string;
  period?: string;
  /** false = web only, left out of the CV Page. */
  cv?: boolean;
};

export type Entry = {
  title: string;
  org: string;
  period: string;
  summary?: string;
  links?: Link[];
  /** false = web only, left out of the CV Page. */
  cv?: boolean;
};

export type StackLane = { lane: string; items: { name: string; icon?: string }[] };

export type CV = {
  name: string;
  fullName: string;
  headline: string;
  email: string;
  location: string;
  links: Link[];
  /** The About in Full Mode (DATA.md §2). Compact Mode and the CV use `summary`. */
  story: {
    epigraph: { text: string; by: string };
    statement: string;
    lines: string[];
    photos: { src: string; alt: string }[];
  };
  summary: string;
  closing: string;
  closingLines: string[]; // Full Mode closing screen, under the closing line
  stack: StackLane[];
  projects: Project[];
  research: Entry[];
  /** One section, grouped (Competitions, Certifications). */
  recognition: { label: string; entries: Entry[] }[];
  volunteering: Entry[];
  education: Entry[];
};

const gh = (repo: string): Link => ({ label: "GitHub", href: `https://github.com/${repo}` });

export const cv: CV = {
  name: "Axeleon Justin",
  fullName: "Axeleon Justin Algianto",
  headline: "Software engineer focused on security and the web.",
  email: "axeleonjustin148@gmail.com",
  location: "Bandung, Indonesia",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/axeleon-justin-algianto-b89127261/" },
    { label: "GitHub", href: "https://github.com/angseleong" },
  ],

  story: {
    epigraph: { text: "Nature loves to hide.", by: "Heraclitus" },
    statement: "Every leap forward leaves something exposed. I want to be the one who finds it first.",
    lines: [
      "Once, a single screenshot of bedrock gave away a hidden Minecraft base. What hides still leaves a trace. I read traces.",
      "I don't stay up for the code. I stay up because what I ship might reach a lot of people, so I sweat the details no one will notice. Every night I try to prove, once more, that I can.",
    ],
    photos: [
      { src: "/about-1.jpg", alt: "Talking through a problem with two friends over a laptop." },
      { src: "/about-2.jpg", alt: "Holding an ITB Informatics student flag, a mountain behind." },
      { src: "/about-3.jpg", alt: "Holding a flag on the steps under the yellow banners of HMIF ITB." },
      { src: "/about-4.jpg", alt: "This portfolio's code on my monitor." },
    ],
  },
  summary:
    "Second-year Informatics student at Institut Teknologi Bandung (GPA 3.90/4.00) focused on security and web engineering. I want to become an ethical technologist who builds systems that work, stay secure and can be trusted, while I keep learning and give back to the communities I work with. I bring care and attention to detail to every project, from web apps to security tools. My strength is adapting across technical domains; my growth area is depth, which I work on by setting focused learning goals in cybersecurity.",
  closing: "Let's build something safe.",
  // Drafted 31 Oct from the Story's own lines; ⚠ confirm with the owner.
  closingLines: [
    "I build for the web, and then I look for where it breaks.",
    "If something you run has to hold, or you would rather find its weak spot before someone else does, write to me.",
  ],

  stack: [
    {
      lane: "Languages",
      items: [
        { name: "TypeScript", icon: "typescript" },
        { name: "JavaScript", icon: "javascript" },
        { name: "Python", icon: "python" },
        { name: "Kotlin", icon: "kotlin" },
        { name: "Java", icon: "openjdk" },
        { name: "C", icon: "c" },
      ],
    },
    {
      lane: "Frameworks",
      items: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextdotjs" },
        { name: "Tailwind CSS", icon: "tailwindcss" },
        { name: "shadcn/ui", icon: "shadcnui" },
        { name: "Jetpack Compose", icon: "jetpackcompose" },
        { name: "Flask", icon: "flask" },
      ],
    },
    {
      lane: "Security & Tools",
      items: [
        { name: "Burp Suite", icon: "burpsuite" },
        { name: "Nmap" }, // no Simple Icons logo
        { name: "Wireshark", icon: "wireshark" },
        { name: "Firebase", icon: "firebase" },
        { name: "Git", icon: "git" },
        { name: "Figma", icon: "figma" },
      ],
    },
  ],

  projects: [
    {
      slug: "oskm",
      cv: false, // on the CV it sits under the OSKM role in Organizational Experience
      title: "OSKM ITB 2026 Dashboard",
      role: "Frontend Developer",
      summary:
        "Frontend developer for the internal dashboard of OSKM ITB 2026, ITB's annual new-student orientation, used by the committee and mentors.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      links: [],
      print: "/prints/oskm.jpg",
    },
    {
      slug: "ohu",
      cv: false,
      title: "OSKM Open House Unit",
      role: "Frontend Developer",
      summary:
        "Open house website where new ITB students found student clubs, the stage rundown and an interactive venue map. On the frontend team I built the club (UKM) directory: the category pages and the club cards that lead to each club's page.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      links: [],
      print: "/prints/ohu.jpg",
    },
    {
      slug: "ronda",
      title: "RONDA",
      summary:
        "An Android app that catches scam APKs the moment they're installed and alerts a trusted guardian, who can uninstall or whitelist them remotely. Top 30, HackNusa 2026.",
      tech: ["Kotlin", "Jetpack Compose", "Firebase"],
      links: [gh("angseleong/RONDA")],
      print: "/prints/ronda.jpg",
    },
    {
      slug: "lafaz",
      title: "lafaz",
      summary:
        "A web app for learning to read the Qur'an by voice. Speech recognition (Whisper) runs entirely in the browser, so recordings never leave the device. Built with a friend, in development.",
      tech: ["Next.js", "TypeScript", "Transformers.js"],
      links: [gh("adnankurniawann/lafaz")],
      print: "/prints/lafaz.jpg",
    },
    {
      slug: "intel",
      title: "INTEL",
      summary:
        "Interactive map that estimates when places on Java's north coast fall below high tide, from satellite-measured land subsidence.",
      tech: ["React", "MapLibre", "Python"],
      links: [gh("angseleong/INTEL")],
    },
    {
      slug: "security-news-scraper",
      cv: false,
      title: "SecurityNewsScraper",
      summary: "Autonomous threat-intelligence and vulnerability monitoring platform.",
      tech: ["Python", "Flask", "Next.js"],
      links: [gh("angseleong/SecurityNewsScraper")],
    },
    {
      slug: "yapncap",
      cv: false,
      title: "YapnCap",
      summary: "CLI that fact-checks YouTube videos and podcasts against real-world data with AI.",
      tech: ["Python"],
      links: [gh("angseleong/YapnCap")],
    },
    {
      slug: "malikboskami",
      cv: false,
      title: "MalikBOSKami",
      summary:
        "A 32-bit x86 operating system with a user-mode shell, a file system and multitasking (OS course, team).",
      tech: ["C", "QEMU"],
      // ⚠ confirm (DATA.md §6): add gh("dhanesmd3/MalikBOSKami") once the repo is confirmed public.
      links: [],
    },
    {
      slug: "valley",
      cv: false,
      title: "Valley",
      summary: "A portfolio that looks and plays like Stardew Valley.",
      tech: ["TypeScript", "Phaser"],
      links: [],
    },
    {
      slug: "ngebedahkuy",
      cv: false,
      title: "ngeBEDAHkuy",
      summary: "Co-op Roblox surgery game for 1–4 players.",
      tech: ["Luau", "Blender"],
      links: [],
    },
  ],

  research: [
    {
      title: "Implementation of Binary Matrix Operations and the Sliding Window Algorithm for Reverse Engineering Spatial Coordinates in Minecraft Java Edition 1.12.2",
      org: "Discrete Mathematics (IF1220) paper, ITB",
      period: "Jun 2026",
      summary:
        'Recovers a "hidden" Minecraft base location from one screenshot of the bedrock floor by reversing Java\'s LCG and matching binary patterns with a sliding window.',
      links: [
        {
          label: "Paper",
          href: "https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2025-2026/Makalah2026/13525074_Axeleon%20Justin%20A_Implementasi%20Operasi%20Matriks%20Biner%20dan%20Algoritma%20Sliding%20Window%20untuk%20Reverse%20Engineering%20Koordinat%20Spasial%20Minecraft%201.12.pdf",
        },
        { label: "Code", href: "https://github.com/angseleong/bedrockfinder" },
        { label: "Demo", href: "https://youtu.be/qhCnO69BHlY" },
      ],
    },
    {
      title: "Planning a 356 kWp Rooftop Solar Plant for PT Karunia Berca Indonesia",
      org: "High school final paper, SMA Labschool Kebayoran",
      period: "2024–2025",
      summary:
        "Designed an on-grid rooftop solar plant in Helioscope (792 panels) that covers 37% of the factory's daily use and cuts its yearly bill by 26%, and checked it with power-flow, short-circuit and economic analysis.",
      // The appendix page with PT KBI's real electricity bill is left out of the public copy (owner, 31 Oct).
      links: [{ label: "Paper (PDF, Indonesian)", href: "/research/plts-pt-kbi.pdf" }],
      cv: false,
    },
  ],

  recognition: [
    {
      label: "Competitions",
      entries: [
        { title: "Finalist, geothermal case study competition", org: "Vortex ITB 2026", period: "2026" },
        { title: "Top 30, Human-Centric Security track", org: "HackNusa 2026", period: "2026" },
      ],
    },
    {
      label: "Certifications",
      entries: [
        {
          title: "Cyber Security Analyst",
          org: "CyberWarFare Labs",
          period: "Oct 2026",
          links: [
            {
              label: "Credential",
              href: "https://labs.cyberwarfare.live/credential/achievement/6ae165557bd2ad9065482598",
            },
          ],
        },
        { title: "Introduction to Cybersecurity", org: "Cisco", period: "May 2026" },
      ],
    },
  ],

  volunteering: [
    {
      title: "Media Intelligence Associate",
      org: "Inkubator IT",
      period: "Aug 2026 – Oct 2026",
      summary: "Wrote copy for Inkubator IT's Instagram content.",
    },
    {
      title: "Frontend Developer",
      org: "OSKM ITB 2026",
      period: "Jul 2026 – Sep 2026",
      summary:
        "Built the frontend of the internal dashboard for ITB's annual new-student orientation, used by the committee and mentors. Built the club (UKM) directory of the Open House Unit site: the category pages and the club cards that lead to each club's page.",
    },
    {
      title: "AI Explorer",
      org: "GDGoC ITB",
      period: "Jun 2026 – Present",
      summary: "Hands-on AI learning track.",
    },
    {
      title: "Event Organizer",
      org: "Aku Masuk ITB 2026",
      period: "Dec 2025 – Feb 2026",
      summary: "Managed the execution and alignment of MoUs with partners.",
    },
    {
      title: "Internal Relation Staff",
      org: "STEI-K ITB 2025",
      period: "Aug 2025 – Jun 2026",
      summary: "Handled internal public relations for the cohort.",
      cv: false,
    },
    {
      title: "Band Audition Liaison Officer",
      org: "Parade Wisuda ITB",
      // ⚠ confirm (DATA.md §9): the 2026 role.
      period: "Oct 2025, Oct 2026",
      summary: "Liaison for two bands: itinerary and hospitality.",
      cv: false,
    },
  ],

  education: [
    {
      title: "Informatics Engineering (STEI)",
      org: "Institut Teknologi Bandung",
      period: "Sep 2025 – 2029 (expected)",
      summary: "GPA 3.90/4.00",
    },
  ],
};
