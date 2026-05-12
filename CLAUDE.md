# Aspd-Quiz — router (Layer 1)

Static Next.js 15 / React 19 / Tailwind v4 / TS app: a 30-item DSM-5 ASPD self-reflection questionnaire. Pure client-side scoring, no backend, no analytics, no auth. Deployed on Vercel hobby. Public repo: `AviouslyAvi/aspd-quiz`.

This is a **self-reflection tool, not a clinical diagnosis** — disclaimer copy must stay on `/`, `/results`, and inside the downloaded `.md` report.

## Floor plan

| Folder         | What lives there                                                              | Room file                |
| -------------- | ----------------------------------------------------------------------------- | ------------------------ |
| `app/`         | Next.js App Router pages: `/` landing, `/quiz`, `/results`, layout, globals   | `app/CONTEXT.md`         |
| `components/`  | Reusable UI: `QuestionItem`, `ProgressBar`, `AnimatedNumber`, etc.            | `components/CONTEXT.md`  |
| `lib/`         | Pure logic: questions, scoring, tier descriptions, markdown builder + tests   | `lib/CONTEXT.md`         |
| `public/`      | Static assets served as-is                                                    | —                        |

Root-level files: `BRIEF.md` (origin + decisions), `HANDOFF.md` (resume-from-here), `README.md`, `package.json`, `next.config.ts`, `vitest.config.ts`, `tsconfig.json`, `postcss.config.mjs`.

## Routing table

| Task                                          | Read                                                          | Skip                          |
| --------------------------------------------- | ------------------------------------------------------------- | ----------------------------- |
| Edit a page or layout                         | `app/CONTEXT.md`, the relevant `app/<route>/page.tsx`         | `node_modules/`, `.next/`     |
| Tweak a chip / progress / number animation    | `components/CONTEXT.md`                                       | `.next/`, `.vercel/`          |
| Change questions, scoring math, or tier copy  | `lib/CONTEXT.md`, `lib/scoring.ts`, `lib/questions.ts`        | `app/`, `components/`         |
| Run / add tests                               | `lib/CONTEXT.md`, `lib/__tests__/`                            | everything else               |
| Resume from a prior chat                      | `HANDOFF.md` (then router → relevant room)                    | everything else               |
| Understand original constraints / history     | `BRIEF.md`                                                    | —                             |

## Naming conventions

- Pages: `app/<route>/page.tsx`; shared layout at `app/layout.tsx`.
- Components: PascalCase `.tsx` in `components/`.
- Pure logic: lowerCamelCase `.ts` in `lib/`; tests co-located in `lib/__tests__/*.test.ts`.
- `cn()` helper (clsx + tailwind-merge) lives at `lib/cn.ts`.

## Hard rules

- No backend, no analytics SDK, no `localStorage`. In-flight answers go to `sessionStorage` only.
- Light mode only, monochrome, Apple-inspired. No accent colors, no dark mode.
- Scoring key never appears in the user-facing UI.
- All routes must remain static-prerenderable. No server functions.
- Reverse-flagged items: `2, 5, 11, 15, 20, 26, 30`. `POSITIVE_THRESHOLD = 3.5`.

## Commands

```bash
npm run dev      # local dev
npm run build    # production build (clobbers .next — restart dev server after)
npm test         # vitest run
```
