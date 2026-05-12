# lib/ — pure logic + data

No React, no DOM. Plain TS that's unit-testable in Node via vitest.

## Load

- `questions.ts` — all 30 questions verbatim, with reverse-score flags on items `2, 5, 11, 15, 20, 26, 30`.
- `criteria.ts` — DSM-5 criterion → question-id map. `POSITIVE_THRESHOLD = 3.5`.
- `descriptions.ts` — the 11 tier descriptions (0–100% in 10-point bands), verbatim.
- `scoring.ts` — `computeResult(answers)`: reverse-score, sum, normalize to %, find tier, compute per-criterion means.
- `markdown.ts` — builds the downloadable `.md` report.
- `cn.ts` — class-merging helper (`clsx` + `tailwind-merge`).
- `navigate.ts` — small client-side navigation helpers.
- `__tests__/scoring.test.ts` — 10 vitest cases covering reverse-scoring, edge cases, tier boundaries.

## Skip

`node_modules/`, anywhere else.

## Pipeline

1. UI collects answers (1–5) into `Record<number, number>`.
2. `computeResult` does it all in one pass: reverse-flag → raw sum → percentage → tier lookup → criterion means.
3. `markdown.ts` consumes the result + answers to render the downloadable report.

## Rules

- Re-syncing question text or tier copy means editing `questions.ts` / `descriptions.ts` directly. There is no scraping or generation step.
- `scoring.ts` must stay a pure function. No side effects, no Date.now, no Math.random.
- Add a test for any new tier boundary or edge case before changing the math.

## Commands

```bash
npm test            # vitest run
npm run test:watch  # watch mode
```

## Skills/MCP

None required.
