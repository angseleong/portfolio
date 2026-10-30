# One CV Data file feeds the site, Compact Mode and the CV PDF

All portfolio text lives in `src/data/cv.ts`, typed. Full Mode, Compact Mode and the `/cv` page all render from it, and `public/cv.pdf` is printed from `/cv` with headless Chrome.

The owner rewrote their CV during planning and wants the web and the PDF to stay in sync without editing two places.

## Considered Options

- **Separate CV (Word/Docs/LaTeX)**: rejected. Two sources drift apart.
- **JSON + types file**: rejected. A typed `.ts` file gives the same single source with type checking and no loader.
- **A PDF library (react-pdf etc.)**: rejected. Chrome's print-to-PDF of a plain HTML page gives selectable, ATS-friendly text with no dependency.

## Consequences

- CV-only choices are flags in the data (`cv: false`), not a second copy.
- The PDF must be regenerated (`npm run cv`) after content changes and committed.
