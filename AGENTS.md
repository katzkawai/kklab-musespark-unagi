# AGENTS.md

## Project
Hamanako eel (浜名湖うなぎ) promo site — pure static HTML/CSS/JS, Japanese (`lang="ja"`). No framework, no bundler, no `package.json`.

## Structure
- `index.html` — single-page site, all sections in one file
- `css/style.css` — design tokens in `:root` (`--ink`, `--paper`, `--gold`, etc.)
- `js/script.js` — IIFE: header scroll, hamburger toggle, shop filter
- `.nojekyll` — must stay (disables Jekyll on Pages; empty file)
- `.github/workflows/pages.yml` — deploy pipeline

## Commands
```bash
python3 -m http.server 8000  # preview at http://localhost:8000 — no build/install step
```
No tests, lint, typecheck, or package manager. Verify changes visually in browser.

## JS Behavior (`js/script.js:1`)
- Header: toggles `is-scrolled` on `scrollY > 10`, toggles `is-open`/`aria-expanded` on hamburger click; nav links remove `is-open`.
- Shop filter: `.filter__btn[data-filter]` vs `.shop[data-area]` (space-separated areas like `hamamatsu view`). `is-active` on button, `is-hidden` on shop. `all` shows everything.
- Smooth scroll is CSS-only (`html { scroll-behavior: smooth }`), not JS.

## CSS Notes (`css/style.css:1`)
- Tokens, layout, and components all in one file. No preprocessor.
- Responsive breakpoints: `960px` (nav collapses to hamburger, multi-col grids → fewer cols) and `600px` (single column). Check both when editing layout.
- Fonts: `Noto Serif JP`, `Shippori Mincho`, `Zen Kaku Gothic New` via Google Fonts.

## Deploy
- Push to `main` triggers `.github/workflows/pages.yml` (`upload-pages-artifact` with `path: "."` → `deploy-pages@v4`). Manual runs via `workflow_dispatch` are also supported (`.github/workflows/pages.yml:5`).
- Repo setting required: **Settings → Pages → Source = GitHub Actions** (or `Deploy from a branch` fallback noted in `README.md:27`).
- Pages URL: `https://<user>.github.io/<repo>/` — keep asset paths relative (`./css/style.css`, `./js/script.js`) so subpath works.

## Conventions
- Keep it build-free: do not introduce npm/webpack/vite unless explicitly requested.
- Preserve relative paths and `.nojekyll`.
- Content is Japanese; maintain existing tone/sections (story/feature/menu/shops/buy/access).
- Demo data: shop cards and pricing are sample/fictional — the top `.demo-bar` notice and footer disclose this.
