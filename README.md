# Portfolio — Juliet Ada Adue

Personal portfolio and landing page. React + TypeScript + Vite, no UI framework
and no runtime dependencies beyond React itself.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # type-checks, then builds to dist/
npm run preview    # serve the production build
```

## Deploy (Vercel)

Vercel auto-detects Vite. Framework preset **Vite**, build command
`npm run build`, output directory `dist`.

## Structure

- `src/lib/content.ts` — all page copy and typed content, so text edits never touch JSX
- `src/lib/hooks.ts` — theme, scroll-reveal, sticky nav and active-section hooks
- `src/components/` — presentational components
- `src/styles.css` — design tokens and layout

## Notes

- Light and dark themes: follows the system by default, and remembers an explicit choice.
- Smooth in-page scrolling, automatically disabled under `prefers-reduced-motion`.
- Scroll-reveal animations are skipped entirely for reduced-motion users.
