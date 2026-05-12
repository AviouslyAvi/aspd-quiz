# ASPD Self-Reflection Quiz

An interactive web version of a 30-item self-reflection questionnaire derived from the DSM-5 criteria for Antisocial Personality Disorder. Built with Next.js 15, React 19, Tailwind v4, and TypeScript. Designed for free-tier Vercel deployment.

**Live:** https://aspd-quiz.vercel.app

The user takes 30 Likert (1–5) questions on a single scrollable page, gets a raw score (30–150), a percentage (0–100), one of 11 written tier descriptions, and a per-DSM-5-criterion breakdown. Results can be downloaded as a Markdown file.

## Privacy

- Responses live only in browser memory and `sessionStorage`.
- Nothing is sent to a server. No analytics, no cookies, no `localStorage`.
- The result is cleared on tab close, on "Start over", and when re-entering the quiz.
- All scoring is pure, client-side TypeScript.

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # vitest scoring suite (10 tests)
npm run build        # production build
```

## Deploy

```bash
vercel --prod
```

The whole site is statically prerendered (no server functions), so it sits comfortably on the Vercel hobby tier indefinitely. No environment variables required.

## Project structure

```
app/          Next.js App Router pages: /, /quiz, /results, layout, globals.css
components/   Reusable UI (QuestionItem, ProgressBar, AnimatedNumber, etc.)
lib/          Pure logic: questions, scoring, tier descriptions, markdown builder + tests
public/       Static assets
```

For the full routing map (which folder does what, where to read for a given task), see `CLAUDE.md` at the repo root and the per-folder `CONTEXT.md` files. `BRIEF.md` captures origin + design decisions; `HANDOFF.md` is the resume-from-here doc.

## How scoring works

1. Reverse-score items 2, 5, 11, 15, 20, 26, 30 using `final = 6 - raw` (these are prosocial-anchor items).
2. Raw total = sum of all 30 final scores. Range: 30–150.
3. Percentage = `((rawTotal - 30) / 120) * 100`. Rounded to 1 decimal.
4. Tier = the band in `lib/descriptions.ts` whose `[minPct, maxPct]` contains the percentage.
5. Criterion breakdown: for each of the 7 DSM-5 criteria, take the mean of the items mapped to it; flag positive if mean ≥ 3.5.

See `lib/scoring.ts:computeResult`.

## Tech and design choices

- **Monochrome only** (Apple-inspired): `#1d1d1f` ink, `#fbfbfd` background, `#d2d2d7` lines, `#6e6e73` muted. No accent colors.
- **System font stack**: SF Pro / system-ui.
- **Motion library**: `motion` (Framer Motion successor) for entrance staggers, score countup, criterion pill stagger, and `whileTap` press feedback on CTAs.
- **CSS-only chip transitions** for the 150 Likert buttons — fast, no per-button motion components.
- **`React.memo` + `useCallback`** so answering one question does not re-render the other 29.
- **Native View Transitions API** for crossfading between `/`, `/quiz`, and `/results`.
- **RAF-coalesced scroll listener** on the sticky progress bar.

## Disclaimer

This is an educational and self-reflection tool. It is **not** a clinical diagnosis. ASPD can only be diagnosed by a qualified professional through structured interview, history, and collateral information.
