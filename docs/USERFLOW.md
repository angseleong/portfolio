# Portfolio — User Flow

## 1. Arrival
1. Visitor opens the page. Full Mode, unless they chose Compact before or their system asks for reduced motion.
2. First screen: the owner's name large behind the Bust, the Headline below, the Nav on top.

## 2. Scrolling Full Mode

| Visitor scrolls through | What happens |
|---|---|
| Hero (~2 screens) | The Bust turns from front to back, the camera moves in, the name fades. |
| Story (4 screens) | Each line Develops word by word as it reaches the middle. |
| Stack | Three Lanes slide sideways. Hovering pauses a Lane and lights the item amber. |
| Darkroom (desktop) | The page holds still; scrolling slides the Line so each Print passes by. Prints Sway; the cursor gives them Wind; each Print Develops once. |
| Darkroom (phone) | Swipe the Line sideways; it snaps to each Print. |
| More Projects → Research → Recognition → Volunteering → Education | Plain lists. Links open in a new tab. |
| Contact | Closing line, email, LinkedIn, GitHub, Download CV. |

## 3. Reading a Main Project
1. Tap or click a Print (or focus it and press Enter/Space).
2. It Flips to its Back: title, role, summary, tech, links.
3. Tap it again, tap another Print, or press Esc: it flips back.

## 4. Switching Modes
- The Full / Compact toggle in the Nav switches at once and is remembered on the next visit.
- In Compact Mode the same toggle goes back to Full Mode.

## 5. Getting the CV
- **CV** in the Nav or **Download CV** in Contact opens `cv.pdf` in a new tab.
- `/cv` is also a plain page a visitor can print.

## 6. Nav Links
- Projects, Research and Contact scroll smoothly to their section (Lenis `scrollTo` in Full Mode, plain anchors in Compact Mode).
