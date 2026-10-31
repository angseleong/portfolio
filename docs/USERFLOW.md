# Portfolio — User Flow

## 1. Arrival
1. Visitor opens the page. Full Mode, unless they chose Compact before or their system asks for reduced motion.
2. First screen: the owner's name large behind the Bust, the Headline below, the Nav on top.

## 2. Scrolling Full Mode

| Visitor scrolls through | What happens |
|---|---|
| Hero (~2 screens) | The Bust turns from front to back, the camera moves in, the name fades. |
| Stack | Right under the Hero, edge to edge. Three Lanes slide sideways. Hovering pauses a Lane and lights the item white. |
| Story (1 screen) | The statement Develops word by word; the four photos Develop one after another. |
| Darkroom (desktop) | The page holds still; scrolling slides the Line so each Print passes by. Prints Sway; the cursor gives them Wind; each Print Develops once. |
| Darkroom (phone) | Swipe the Line sideways; it snaps to each Print. |
| More Projects | One collapsed row under the Main Projects. Tap to open the list, tap again to close. |
| Research → Recognition → Volunteering → Education | Plain lists. Links open in a new tab. |
| Contact | Closing line, email, LinkedIn, GitHub, Download CV. |

## 3. Reading a Main Project
1. Hover a Print: its Reel pans down through the whole image.
2. Tap or click it (or focus it and press Enter/Space): the paper grows downward with role, summary, tech and links, and the Reel keeps panning.
3. Click it again or press Esc: it closes.
4. On desktop, drag a Print to pull the Line; let go and it springs back.

## 4. Switching Modes
- The Full / Compact toggle in the Nav switches at once and is remembered on the next visit.
- In Compact Mode the same toggle goes back to Full Mode.

## 5. Getting the CV
- **CV** in the Nav or **Download CV** in Contact opens `cv.pdf` in a new tab.
- `/cv` is also a plain page a visitor can print.

## 6. Nav Links
- Projects, Research and Contact scroll smoothly to their section (Lenis `scrollTo` in Full Mode, plain anchors in Compact Mode).
