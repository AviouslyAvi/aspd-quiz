# Project Brief

How this project was prompted into existence and what was decided along the way. Captured for posterity so anyone (including future-me) can see the trail.

## Origin

The starting point was a clinician-style markdown document containing a 30-item questionnaire derived from the DSM-5 criteria for Antisocial Personality Disorder, plus a separate document with 11 tiered written interpretations spanning 0–100% in 10-point bands. The brief: turn it into a small, private, free-to-deploy web app where someone can take the questionnaire, get their score and tier, and walk away with a downloadable Markdown copy. No accounts, no backend, no analytics. The score key must never appear in the user-facing app.

## Constraints set up front

- **Stack**: Next.js 15 App Router, React 19, Tailwind v4, TypeScript. Static prerender end-to-end.
- **Hosting**: Vercel hobby tier. No server functions.
- **Privacy**: nothing leaves the browser. Only `sessionStorage` between `/quiz` and `/results`. No `localStorage`. No analytics SDK.
- **Visual language**: monochrome, light mode only, Apple-inspired. No accent colors.
- **Scoring**: pure client-side TypeScript, unit-tested.
- **No scope creep**: no auth, no sharing, no clinician view, no i18n, no dark mode, no email-the-results flow.

## Phase 1 — Build the bones

Implemented in a single pass:

- All 30 questions encoded with the correct reverse-flag mapping (`2, 5, 11, 15, 20, 26, 30`).
- DSM-5 criterion → item-id map, with `POSITIVE_THRESHOLD = 3.5`.
- All 11 tier descriptions embedded verbatim.
- `lib/scoring.ts:computeResult` — pure function: reverse-score, sum, normalize to percentage, find tier, compute per-criterion means.
- `lib/markdown.ts` — builds the downloadable `.md` report.
- Vitest suite with 10 passing tests covering reverse-scoring, edge cases, and tier boundaries.
- Three pages: `/` landing with disclaimer + CTA, `/quiz` with all 30 questions and a sticky progress bar, `/results` with score + tier prose + criterion table + download.
- In-flight answers cached in `sessionStorage` so back/forward and refresh preserve progress within the same tab.

This phase ended with the handoff doc (`HANDOFF.md`) — production build clean, all routes static, all 10 tests passing, but visually flat.

## Phase 2 — Visual polish

Prompted with: *"Please review the handoff document and implement the visual changes."*

The handoff already enumerated the desired moves. Decisions made during execution:

- Installed `motion` (Framer Motion successor), `clsx` + `tailwind-merge` (with a `cn()` helper), `class-variance-authority` (loaded but unused — could be applied to chip variants later), and `lucide-react` for icons.
- **Landing**: staggered fade-up entrance, tighter display tracking (`-0.02em`), `Begin assessment` is a button with chevron arrow that slides on hover, `whileTap` press scale.
- **Quiz**: header fades in, first ~6 questions stagger up on mount (cap at first viewport's worth), scroll-aware sticky bar with backdrop blur + soft shadow, spring-based progress fill, `See results` press scale.
- **QuestionItem chips**: animate background/border/text color on selection (no more hard swap), spring `whileTap` press feel.
- **Results**: tighter display heading, score cards have a near-imperceptible radial gradient, raw score and percentage **count up** from 0 over ~900ms, paragraphs stagger in, criterion rows slide in left-to-right with the "Positive/Below" pills popping in last, download button has a download icon + press scale.
- **Global**: native `::view-transition-old/new(root)` crossfade with a small y-axis lift, gated behind `prefers-reduced-motion: no-preference`.

Discipline notes: no decorative graphics, no hero illustration, no gradient backgrounds beyond the score-card hint, no dark mode, no second accent color. The 80/20 rule was applied — about six moments of motion, all clarifying state changes rather than entertaining.

## Phase 3 — Performance fix

After deploying, the user reported the page felt **not very smooth** to interact with. Diagnosis (volunteered before any code changes, as a proposal):

- Every Likert chip was a `motion.button` running a JS-driven color animation. 30 questions × 5 chips = **150 motion components**. Whenever any answer changed, the whole quiz page re-rendered, every `QuestionItem` re-rendered, and motion reconciled all 150 animated buttons.
- The sticky bar's `backdrop-blur-xl` (24px) was expensive on scroll, and the scroll listener fired without RAF coalescing.

Fix (applied after explicit user approval):

1. Dropped `motion` from chip color transitions. Plain `<button>` with Tailwind `transition-colors duration-150` + `active:scale-[0.94]`. CSS handles the fill/de-fill on the GPU; no React reconciliation.
2. `React.memo`'d `QuestionItem`; passed a stable `setAnswer` via `useCallback` so answering question 7 no longer re-renders the other 29.
3. Coalesced the sticky-bar scroll listener through `requestAnimationFrame`; dropped blur from `xl` to `md`.

A separate gotcha during verification: `npm run build` had clobbered `.next` while the dev server was still serving stale chunk URLs, so React was failing to hydrate (no `__reactProps$` keys in the DOM, all clicks no-ops). Restarting the dev server fixed it. The fix itself was correct on the first try — verified live in the browser preview with chip clicks updating state, transitioning at 150ms, and the scroll-aware bar applying `backdrop-blur-md` at 12px.

## Phase 4 — Ship

- `vercel --prod` from the project directory. Auto-detected as Next.js. Build completed in ~34s, deploy in ~51s end-to-end.
- Production URL: https://aspd-quiz.vercel.app
- All 4 routes static-prerendered. ~150 KB first-load JS.

## Phase 5 — GitHub

- Initialized git, committed the tree (28 files, 4,846 lines).
- `gh repo create AviouslyAvi/aspd-quiz --private --source=. --push`.
- Flipped to public on request: `gh repo edit AviouslyAvi/aspd-quiz --visibility public`.
- Repo: https://github.com/AviouslyAvi/aspd-quiz

`.gitignore` covers `node_modules/`, `.next/`, `.vercel`, `.env*.local`, `*.tsbuildinfo`. No secrets in the tree. Vercel project ID/org ID live in `.vercel/project.json`, which is gitignored — that's expected; CI deploys would use `VERCEL_TOKEN` + the linked repo.

## Out of scope (and should stay out)

- No login, accounts, sharing, or saved history.
- No clinician-facing scoring view.
- No internationalization.
- No dark mode.
- No email-the-results-to-me flow.
- No mobile app wrapper.

## Future ideas left on the table

From the handoff's QOL list, none of these were implemented and all remain reasonable additions:

- Auto-scroll to next unanswered question on answer.
- Keyboard shortcuts (`1`–`5` to answer the focused question, `j`/`k` to move between).
- "Jump to first unanswered" button in the sticky bar.
- Confirmation dialog before "Start over".
- Print stylesheet for the results page.
- Subtle haptic feedback on answer select.
- A "review" expand on `/results` showing each question and the user's answer.
- Favicon + Open Graph image (still default Next.js).

## Source materials

- The 30-question source document and tier descriptions came from local `.md` files at `~/Downloads/`. They were embedded into `lib/questions.ts` and `lib/descriptions.ts` verbatim. Re-syncing means editing those `lib/` files directly — there is no scraping or generation step.

## Disclaimer

The whole product carries a structural disclaimer: this is a **self-reflection tool, not a clinical diagnosis**. ASPD can only be diagnosed by a qualified professional through structured interview, history, and collateral information. The disclaimer is shown on both the landing and results pages, and is included in the downloaded `.md` report.
