# Portfolio — Content

Every piece of text agreed with the owner (grilling session, 30 Oct 2026). `src/data/cv.ts` is built from this file. When the two disagree, ask the owner, then fix both.

Items marked **⚠ confirm** are assumptions the owner has not confirmed yet.

## 1. Identity

| Field | Value |
|---|---|
| Name (web) | Axeleon Justin |
| Full name (CV) | Axeleon Justin Algianto |
| Headline | Software engineer focused on security and the web. |
| Target roles | Security, Software Engineering, Frontend |
| Email | axeleonjustin148@gmail.com |
| Location | Bandung, Indonesia |
| LinkedIn | https://www.linkedin.com/in/axeleon-justin-algianto-b89127261/ |
| GitHub | https://github.com/angseleong |
| Phone | Not on the web. Optional on the CV, owner adds it if wanted. |

## 2. Story (web)

Rewritten with the owner, 31 Oct 2026 (built from their own answers and the Minecraft paper in §7):

- Epigraph: "Nature loves to hide." — Heraclitus
- Statement: Every leap forward leaves something exposed. I want to be the one who finds it first.
- Line: Once, a single screenshot of bedrock gave away a hidden Minecraft base. What hides still leaves a trace. I read traces. (Owner picked this more poetic version, 31 Oct.)
- Line: I don't stay up for the code. I stay up because what I ship might reach a lot of people, so I sweat the details no one will notice. Every night I try to prove, once more, that I can. (Owner added attention to detail and self-efficacy, dropped the "talking with them" sentence, 31 Oct.)
- Photos (contact sheet, in order): talking a problem through with two friends over a laptop; holding an ITB Informatics student flag; holding a flag on the steps under the yellow HMIF ITB banners (replaced the Faculty of Medicine photo, 31 Oct); this portfolio's code on the owner's monitor. Files `public/about-1..4.jpg`.

The Story is Full Mode only. **Compact Mode** shows the Summary (§3) as its About instead.

## 3. Summary (CV + Compact Mode About)

> Second-year Informatics student at Institut Teknologi Bandung (GPA 3.90/4.00) focused on security and web engineering. I want to become an ethical technologist who builds systems that work, stay secure and can be trusted, while I keep learning and give back to the communities I work with. I bring care and attention to detail to every project, from web apps to security tools. My strength is adapting across technical domains; my growth area is depth, which I work on by setting focused learning goals in cybersecurity.

Adjusted from the profile in the owner's own Tech CV (31 Oct 2026).

## 4. Stack

| Lane | Items |
|---|---|
| Languages | TypeScript, JavaScript, Python, Kotlin, Java, C |
| Frameworks | React, Next.js, Tailwind CSS, shadcn/ui, Jetpack Compose, Flask |
| Security & Tools | Burp Suite, Nmap, Wireshark, Firebase, Git, Figma |

Removed on purpose: C# (no project shows it), NumPy / Pandas / GeoPandas (data science is not a target), Blender, Luau, Phaser, Vite, QEMU, soft skills.

## 5. Main Projects (Prints, in this order)

On the CV, Project Experience lists only RONDA, lafaz and INTEL. The two OSKM projects are covered by the OSKM role under Organizational Experience (`cv: false`).

### OSKM ITB 2026 Dashboard
- Role: Frontend Developer
- Summary: Frontend developer for the internal dashboard of OSKM ITB 2026, ITB's annual new-student orientation, used by the committee and mentors.
- Note: the owner's work is the internal dashboard (repo `frontend-dashboard-oskm`), not the public site.
- Tech: Next.js, TypeScript, Tailwind CSS, shadcn/ui
- Links: none (organization repo)
- Reel: `/prints/oskm.jpg`, five dashboard pages from Valley stacked with a 14 px dark gap (login, event management, assignments, materials, assignment list); pages with student names left out. Dashboard pages are one screen tall, so there is no single long page to capture.

### OSKM Open House Unit
- Role: Frontend Developer
- Summary: Open house website where new ITB students found student clubs, the stage rundown and an interactive venue map. On the frontend team I built the club (UKM) directory: the category pages and the club cards that lead to each club's page. (From the owner's Valley write-up.)
- Tech: Next.js, TypeScript, Tailwind CSS
- Links: none (organization repo `KAT-ITB-2026/frontend-ohu`)
- Reel: `/prints/ohu.jpg`, one continuous full-page capture of the Lembaga page (UKM, BSO, HMPS, footer), taken from the running site

### RONDA
- Summary: An Android app that catches scam APKs the moment they're installed and alerts a trusted guardian, who can uninstall or whitelist them remotely. Top 30, HackNusa 2026.
- Role: not shown (owner's choice).
- Tech: Kotlin, Jetpack Compose, Firebase
- Links: GitHub https://github.com/angseleong/RONDA
- Reel: `/prints/ronda.jpg`, the HackNusa pitch deck slides stacked (slide 8, the YouTube player, left out)

### lafaz
- Summary: A web app for learning to read the Qur'an by voice. Speech recognition (Whisper) runs entirely in the browser, so recordings never leave the device. Built with a friend, in development.
- Tech: Next.js, TypeScript, Transformers.js
- Links: GitHub https://github.com/adnankurniawann/lafaz
- Reel: `/prints/lafaz.jpg`, Pelita + wordmark, then six phone screens three per row

## 6. More Projects

On the CV only INTEL is listed; the rest are web only (`cv: false`).

| Title | One line | Tech | Link |
|---|---|---|---|
| INTEL | Interactive map that estimates when places on Java's north coast fall below high tide, from satellite-measured land subsidence. | React, MapLibre, Python | https://github.com/angseleong/INTEL |
| SecurityNewsScraper | Autonomous threat-intelligence and vulnerability monitoring platform. | Python, Flask, Next.js | https://github.com/angseleong/SecurityNewsScraper |
| YapnCap | CLI that fact-checks YouTube videos and podcasts against real-world data with AI. | Python | https://github.com/angseleong/YapnCap |
| MalikBOSKami | A 32-bit x86 operating system with a user-mode shell, a file system and multitasking (OS course, team). | C, QEMU | https://github.com/dhanesmd3/MalikBOSKami **⚠ confirm the repo is public** |
| Valley | A portfolio that looks and plays like Stardew Valley. | TypeScript, Phaser | none (private) |
| ngeBEDAHkuy | Co-op Roblox surgery game for 1–4 players. | Luau, Blender | none (private) |

## 7. Research

1. **Implementation of Binary Matrix Operations and the Sliding Window Algorithm for Reverse Engineering Spatial Coordinates in Minecraft Java Edition 1.12.2**
   - Venue: Discrete Mathematics (IF1220) paper, ITB · Jun 2026
   - Summary: Recovers a "hidden" Minecraft base location from one screenshot of the bedrock floor by reversing Java's LCG and matching binary patterns with a sliding window.
   - Links: Paper https://informatika.stei.itb.ac.id/~rinaldi.munir/Matdis/2025-2026/Makalah2026/13525074_Axeleon%20Justin%20A_Implementasi%20Operasi%20Matriks%20Biner%20dan%20Algoritma%20Sliding%20Window%20untuk%20Reverse%20Engineering%20Koordinat%20Spasial%20Minecraft%201.12.pdf · Code https://github.com/angseleong/bedrockfinder · Demo https://youtu.be/qhCnO69BHlY
   - CV: yes
2. **Planning a 356 kWp Rooftop Solar Plant for PT Karunia Berca Indonesia**
   - Venue: High school final paper, SMA Labschool Kebayoran · 2024–2025
   - Summary: Designed an on-grid rooftop solar plant in Helioscope (792 panels) that covers 37% of the factory's daily use and cuts its yearly bill by 26%, and checked it with power-flow, short-circuit and economic analysis.
   - Links: Paper (PDF, Indonesian) `/research/plts-pt-kbi.pdf` — 98 pages, compressed to 3 MB; the appendix scan of PT KBI's January 2022 electricity bill is left out (owner, 31 Oct).
   - CV: no (web only)

## 8. Recognition

One section, two groups: **Competitions** (Vortex, HackNusa) and **Certifications** (CyberWarFare Labs, Cisco). The CV titles it **Achievements & Certifications**.

| Title | Issuer | Date | Link | CV |
|---|---|---|---|---|
| Finalist, geothermal case study competition | Vortex ITB 2026 | 2026 | none (certificate pending) | yes |
| Top 30, Human-Centric Security track | HackNusa 2026 | 2026 | none | yes |
| Cyber Security Analyst | CyberWarFare Labs | Oct 2026 | https://labs.cyberwarfare.live/credential/achievement/6ae165557bd2ad9065482598 | yes |
| Introduction to Cybersecurity | Cisco | May 2026 | none | yes |

## 9. Volunteering (web shows all, CV shows the first 4)

| Organization | Role | Period | One line |
|---|---|---|---|
| Inkubator IT | Media Intelligence Associate | Aug 2026 – Oct 2026 | Wrote copy for Inkubator IT's Instagram content. |
| OSKM ITB 2026 | Frontend Developer | Jul 2026 – Sep 2026 | Built the frontend of the internal dashboard for ITB's annual new-student orientation, used by the committee and mentors. Built the club (UKM) directory of the Open House Unit site: the category pages and the club cards that lead to each club's page. |
| GDGoC ITB | AI Explorer | Jun 2026 – Present | Hands-on AI learning track. |
| Aku Masuk ITB 2026 | Event Organizer | Dec 2025 – Feb 2026 | Managed the execution and alignment of MoUs with partners. |
| STEI-K ITB 2025 | Internal Relation Staff | Aug 2025 – Jun 2026 | Handled internal public relations for the cohort. |
| Parade Wisuda ITB | Band Audition Liaison Officer | Oct 2025, Oct 2026 **⚠ confirm the 2026 role** | Liaison for two bands: itinerary and hospitality. |

## 10. Education

| School | Program | Period | Note |
|---|---|---|---|
| Institut Teknologi Bandung | Informatics Engineering (STEI) | Sep 2025 – 2029 (expected) | GPA 3.90/4.00 |

High school is not listed (owner's choice).

## 11. Contact

- Closing line: "Let's build something safe."
- ⚠ confirm — two lines under it on the Full Mode closing screen (drafted 31 Oct from the Story's own lines):
  - I build for the web, and then I look for where it breaks.
  - If something you run has to hold, or you would rather find its weak spot before someone else does, write to me.
- Email, LinkedIn, GitHub, Download CV. No "Contact" title in Full Mode (owner, 31 Oct).

## 12. Still Needed From the Owner
- Four photos for the Bust (ARCHITECTURE.md §5).
- The two **⚠ confirm** items above.
