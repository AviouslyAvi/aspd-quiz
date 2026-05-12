# app/ — Next.js App Router pages

Three routes plus root layout. All static-prerendered.

## Load

- `layout.tsx` — root layout, fonts, `<html>` shell.
- `page.tsx` — `/` landing: disclaimer, "Begin assessment" CTA.
- `quiz/page.tsx` — `/quiz`: 30 questions, sticky progress bar, sessionStorage cache.
- `results/page.tsx` — `/results`: score + tier prose + per-criterion table + markdown download.
- `globals.css` — Tailwind v4 entrypoint + the view-transition crossfade.

## Skip

`.next/`, `node_modules/`, `.vercel/`.

## Pipeline

1. User lands on `/` → clicks CTA → navigates to `/quiz`.
2. `/quiz` reads/writes answers in `sessionStorage` keyed by question id.
3. "See results" → `/results` reads the same sessionStorage, runs `computeResult` from `lib/scoring.ts`, renders.
4. Download → `lib/markdown.ts` builds the `.md` blob client-side.

## Rules

- Pages stay thin. Logic belongs in `lib/`. Visuals belong in `components/`.
- No data fetching, no server actions, no API routes — this is a static site.
- Use `next/link` for `/quiz` ↔ `/results` so the native view-transition fires.
- `prefers-reduced-motion` must gate any decorative motion (CSS-level is fine).

## Skills/MCP

None required.
