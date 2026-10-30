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
  /** A Project with a print is a Main Project. */
  print?: string;
  period?: string;
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
  story: string[];
  summary: string;
  closing: string;
  stack: StackLane[];
  projects: Project[];
  research: Entry[];
  recognition: Entry[];
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

  story: [
    "Every leap forward leaves something exposed.",
    "Security is the price of progress, and I want to be the one who pays it carefully.",
    "I don't stay up for the code. I stay up because what I ship might help a lot of people.",
    "When I'm not building, I'm telling stories, or learning something new.",
  ],
  summary:
    "Informatics student at ITB (GPA 3.90/4.00) focused on security and web engineering. Builds software for real users, from an Android app that flags scam APKs to a trusted guardian, to the OSKM ITB 2026 orientation website.",
  closing: "Let's build something safe.",

  stack: [
    {
      lane: "Languages",
      items: [
        { name: "TypeScript" },
        { name: "JavaScript" },
        { name: "Python" },
        { name: "Kotlin" },
        { name: "Java" },
        { name: "C" },
      ],
    },
    {
      lane: "Frameworks",
      items: [
        { name: "React" },
        { name: "Next.js" },
        { name: "Tailwind CSS" },
        { name: "shadcn/ui" },
        { name: "Jetpack Compose" },
        { name: "Flask" },
      ],
    },
    {
      lane: "Security & Tools",
      items: [
        { name: "Burp Suite" },
        { name: "Nmap" },
        { name: "Wireshark" },
        { name: "Firebase" },
        { name: "Git" },
        { name: "Figma" },
      ],
    },
  ],

  projects: [
    {
      slug: "oskm",
      title: "OSKM ITB 2026 Website",
      role: "Frontend Developer",
      summary:
        "Frontend developer for the official website of OSKM ITB 2026, ITB's annual new-student orientation.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      links: [],
      print: "/prints/oskm.png",
    },
    {
      slug: "ronda",
      title: "RONDA",
      summary:
        "An Android app that catches scam APKs the moment they're installed and alerts a trusted guardian, who can uninstall or whitelist them remotely. Top 30, HackNusa 2026.",
      tech: ["Kotlin", "Jetpack Compose", "Firebase"],
      links: [gh("angseleong/RONDA")],
      print: "/prints/ronda.png",
    },
    {
      slug: "lafaz",
      title: "lafaz",
      summary:
        "A web app for learning to read the Qur'an by voice. Speech recognition (Whisper) runs entirely in the browser, so recordings never leave the device. Built with a friend, in development.",
      tech: ["Next.js", "TypeScript", "Transformers.js"],
      links: [gh("adnankurniawann/lafaz")],
      print: "/prints/lafaz.png",
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
      title: "SecurityNewsScraper",
      summary: "Autonomous threat-intelligence and vulnerability monitoring platform.",
      tech: ["Python", "Flask", "Next.js"],
      links: [gh("angseleong/SecurityNewsScraper")],
    },
    {
      slug: "yapncap",
      title: "YapnCap",
      summary: "CLI that fact-checks YouTube videos and podcasts against real-world data with AI.",
      tech: ["Python"],
      links: [gh("angseleong/YapnCap")],
    },
    {
      slug: "malikboskami",
      title: "MalikBOSKami",
      summary:
        "A 32-bit x86 operating system with a user-mode shell, a file system and multitasking (OS course, team).",
      tech: ["C", "QEMU"],
      // ⚠ confirm (DATA.md §6): add gh("dhanesmd3/MalikBOSKami") once the repo is confirmed public.
      links: [],
    },
    {
      slug: "valley",
      title: "Valley",
      summary: "A portfolio that looks and plays like Stardew Valley.",
      tech: ["TypeScript", "Phaser"],
      links: [],
    },
    {
      slug: "ngebedahkuy",
      title: "ngeBEDAHkuy",
      summary: "Co-op Roblox surgery game for 1–4 players.",
      tech: ["Luau", "Blender"],
      links: [],
    },
  ],

  research: [
    {
      title: "Reverse-Engineering World Coordinates from a Single Screenshot",
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
      cv: false,
    },
  ],

  recognition: [
    { title: "Finalist, geothermal case study competition", org: "Vortex ITB 2026", period: "2026" },
    { title: "Top 30, Human-Centric Security track", org: "HackNusa 2026", period: "2026" },
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

  volunteering: [
    {
      title: "Media Intelligence Associate",
      org: "Inkubator IT",
      period: "Aug 2026 – Present",
      summary: "Writes copy for Inkubator IT's Instagram content.",
    },
    {
      title: "Frontend Developer",
      org: "OSKM ITB 2026",
      period: "Jul 2026 – Present",
      summary: "Builds the frontend of the orientation website.",
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
