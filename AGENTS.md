# AGENTS.md

## Cursor Cloud specific instructions

This repository contains a single React + Vite portfolio app located in the `proyecto/`
subfolder (there is no package manifest at the repo root). Run all commands from `proyecto/`.

- **Stack**: React 19 + Vite 8 (JavaScript), TailwindCSS v4 (via the `@tailwindcss/vite`
  plugin — configured in `proyecto/vite.config.js`, theme tokens in
  `proyecto/src/styles/index.css`, no `tailwind.config.js`), Framer Motion, `@emailjs/browser`,
  `lucide-react`.
- **Commands** (see `proyecto/package.json`): `npm run dev` (Vite dev server, defaults to
  `http://localhost:5173`), `npm run build`, `npm run preview`, `npm run lint` (oxlint).
- **Linting**: `npm run lint` uses **oxlint** (not ESLint). Keep shared non-component exports
  (motion variants, nav constants) in `src/utils/` or `src/data/` files, not in component
  files, to avoid `react/only-export-components` fast-refresh warnings.
- **Icons**: `lucide-react` no longer exports brand icons (`Github`, `Linkedin`). Inline brand
  SVGs live in `src/components/BrandIcons.jsx` — use those instead of importing brand names.
- **Default language is Spanish** by design. Content lives in `src/data/translations.js` with a
  Spanish fallback via `getContent()`. Do not add browser-language auto-detection.
- **EmailJS is optional**: without `VITE_EMAILJS_*` env vars (see `proyecto/.env.example`) the
  contact form runs in "demo mode" (validates, logs to console, shows a demo notice) and does
  not break. Provide real vars in `proyecto/.env` to actually send email.
- **Placeholder assets** (SVG logos/favicon in `src/assets/logo/`, the CV PDF in
  `src/assets/cv/`, project images) are intentional placeholders; missing project images fall
  back to a visual grid/bracket placeholder in `ProjectCard.jsx`, so the app never breaks.
- **Vercel deploy**: set Root Directory to `proyecto` (build `npm run build`, output `dist`).
