# ASPD Quiz — Handoff

**Last updated:** 2026-05-03
**Status:** Working locally. Tests pass. Production build clean. Not yet deployed to Vercel.
**Local URL:** http://localhost:3000 (when `npm run dev` is running)

---

## What this is

An interactive web version of the "Personality and Life Experience Questionnaire" — a 30-item DSM-5-aligned ASPD self-reflection screener. Built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind v4. Designed for free-tier Vercel deployment.

The user takes 30 Likert questions on a single scrollable page, gets a raw score (30–150), a percentage (0–100), one of 11 written tier descriptions, and a per-DSM-5-criterion breakdown. They can download the result as a Markdown file.

**No data ever leaves the browser.** No backend, no analytics, no `localStorage`. Only the computed result lives in `sessionStorage` between the quiz and results pages, and it is cleared on tab close, "Start over", or re-entering the quiz.

---

## Repo layout

```
aspd-quiz/
├── app/
│   ├── layout.tsx          Root layout (light bg, system font)
│   ├── page.tsx            Landing page with disclaimer + Begin CTA
│   ├── quiz/page.tsx       30-question form, sticky progress bar
│   ├── results/page.tsx    Score + percentage + tier + criterion breakdown + download
│   └── globals.css         Tailwind v4 + monochrome design tokens
├── lib/
│   ├── questions.ts        30 items (id, text, part 1/2/3, reverse: bool)
│   ├── criteria.ts         DSM-5 criterion → item-id map
│   ├── descriptions.ts     11 tier objects (verbatim from source doc) + findTier()
│   ├── scoring.ts          Pure scoring (reverse + total + percentage + criterion means)
│   ├── markdown.ts         Builds the .md report for download
│   └── __tests__/
│       └── scoring.test.ts Vitest suite, 10 passing
├── components/
│   ├── QuestionItem.tsx    One question + 1–5 Likert chip row
│   ├── DisclaimerBanner.tsx
│   ├── ProgressBar.tsx     Sticky bottom bar w/ "See results" CTA
│   └── DownloadButton.tsx  Client-side Blob → .md download
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── vitest.config.ts
├── README.md
└── HANDOFF.md              ← this file
```

---

## How to run it

```bash
cd /Users/aviouslyavi/Claude/Personal/aspd-quiz

npm install              # one-time
npm run dev              # http://localhost:3000
npm test                 # run the 10 scoring tests
npm run build            # production build (verifies everything compiles)
```

**Note about npx in this directory:** `npx create-next-app` failed earlier because npm couldn't find a `package.json` in the parent path. The project was scaffolded manually instead. Once `aspd-quiz/package.json` exists, `npm` and `npx` work normally inside the project directory.

---

## How scoring works (one minute of reading)

1. **Reverse-score** items 2, 5, 11, 15, 20, 26, 30 using `final = 6 - raw`. (These are prosocial-anchor items — agreeing with them is a prosocial signal, so they need to be flipped before summing.)
2. **Raw total** = sum of all 30 final scores. Range: 30–150.
3. **Percentage** = `((rawTotal - 30) / 120) * 100`. Range: 0–100, rounded to 1 decimal.
4. **Tier** = the band in `lib/descriptions.ts` whose `[minPct, maxPct]` contains the percentage. 11 bands at 10-point intervals (0–10, 11–20, …, 91–100).
5. **Criterion breakdown:** for each of the 7 DSM-5 criteria, take the mean of the items mapped to it; flag positive if mean ≥ 3.5.

All computation is client-side and pure. See `lib/scoring.ts:computeResult`.

**Subtle thing worth knowing:** because of the reverse-scored items, "answer 1 to everything" yields 23.3%, not 0%. To score 0% you'd answer "1" to all forward items and "5" to all reverse items (i.e., consistently prosocial per-item). This is correct behavior — it's how the questionnaire is designed.

---

## Privacy guarantees and where they're enforced

| Guarantee | Where enforced |
|---|---|
| No backend persistence | No API routes, no server actions, no fetches |
| No long-term storage | Only `sessionStorage`, never `localStorage` |
| In-flight answers are cached in `sessionStorage` | `app/quiz/page.tsx` mirrors `answers` to key `aspd-answers` so back/forward and refresh preserve progress within the same tab. Cleared on submit + Start over + tab close. |
| Computed result is stored separately | `app/quiz/page.tsx` writes `computeResult(answers)` to key `aspd-result` on submit |
| Cleared on tab close | `beforeunload` handler in `quiz/page.tsx` and `results/page.tsx` |
| Cleared on "Start over" | `handleStartOver` in `app/results/page.tsx` |
| Cleared on re-entering the quiz | `useEffect` in `app/quiz/page.tsx` |
| No analytics SDK | None installed; do not add `@vercel/analytics` or similar |

If you ever add features, do not introduce: a database, an API route that touches answers, `localStorage`, third-party analytics, or any `fetch` to a non-CDN origin.

---

## Design system

Strictly monochrome, light mode, Apple-inspired. Defined as Tailwind v4 `@theme` tokens in `app/globals.css`:

| Token | Value |
|---|---|
| `--color-bg` | `#fbfbfd` (Apple off-white background) |
| `--color-surface` | `#ffffff` (cards) |
| `--color-ink` | `#1d1d1f` (primary text + selected/primary buttons) |
| `--color-muted` | `#6e6e73` (secondary text) |
| `--color-line` | `#d2d2d7` (dividers + borders) |
| Font | `-apple-system, SF Pro Text, system-ui, sans-serif` |

No accent color. Selected state = filled black chip. Primary CTA = black pill. Hover = `bg-black`. That is the entire palette.

Container widths: 680px for prose pages, 760px for the quiz.

---

## What's done

- [x] Scaffolded Next.js 15 + React 19 + Tailwind v4 + TypeScript
- [x] All 30 questions encoded with correct reverse-flag mapping
- [x] All 7 DSM-5 criteria → item-id map
- [x] All 11 tier descriptions embedded verbatim
- [x] Scoring + tier-finder + markdown builder (pure functions, unit-tested)
- [x] Landing page with disclaimer + Begin CTA
- [x] Quiz page with all 30 questions, scale legend, sticky progress bar
- [x] Results page with score, percentage, tier prose, criterion table, download, start-over
- [x] Vitest suite — 10 tests, all passing
- [x] Production build clean (all 3 routes prerender as static)
- [x] Manual smoke test — all routes return 200, landing + quiz markup verified
- [x] In-flight answers cached in `sessionStorage` so back/forward/refresh preserve progress

## What's not done

- [ ] Deployed to Vercel (the user has an account; just hasn't run `npx vercel --prod` yet)
- [ ] Custom domain (if desired)
- [ ] Favicon / OG image (only default Next.js favicon present)
- [ ] Any visual QA in real browsers beyond curl + build success

## Suggested QOL improvements (not yet implemented)

Easy wins for whoever picks this up next. Pick what fits, drop the rest.

- **Auto-scroll to next unanswered question** after picking an answer. Smooths the rhythm without forcing pagination. `scrollIntoView({ behavior: 'smooth', block: 'center' })` on the next item.
- **Keyboard shortcuts.** `1`–`5` to answer the focused question, `Tab`/`Shift+Tab` already work; consider `j`/`k` for next/prev question.
- **"Jump to first unanswered" button** in the sticky bar once any answer exists — useful on mobile after scrolling away.
- **Confirmation dialog before "Start over"** — small Apple-style alert; it's destructive enough to deserve one tap of friction.
- **Loading skeleton on `/results`** instead of the bare "Loading…" text. Match the final layout so there's no jump.
- **Print stylesheet (`@media print`)** for the results page so users can save a clean PDF in addition to the `.md`.
- **Better mobile tap targets.** Likert chips are 44px tall, which meets Apple HIG, but the gap between them is tight on small phones. Consider 12–14px row gap on `< 380px` widths.
- **Subtle haptic feedback on answer select** (mobile only): `navigator.vibrate?.(8)`. Cheap, deniable on devices that ignore it.
- **A "review" expand on `/results`** that shows each question's text + the user's answer side-by-side (computed from the criterion breakdown). Optional — it adds value but pushes UI weight.
- **Error states for malformed sessionStorage** — currently `JSON.parse` errors fall through to a redirect, which is fine, but a one-line "Something went wrong, starting over" would be friendlier.
- **Favicon + Open Graph image.** Right now it's the default Next.js favicon. A simple monochrome glyph would finish the look.

---

## Visual polish — make it feel impeccable

The current build is correct and clean but visually flat. The user explicitly wants Apple-grade polish: tasteful animation, considered transitions, and the kind of micro-interaction that makes a static form feel alive. **Do not over-decorate.** Apple's design language is restrained — use motion to clarify state changes, never to entertain.

### Tools to install

- **`motion`** (the new name for Framer Motion) — `npm i motion`. Used for entrance animations, layout transitions, gesture-driven interactions. The single best motion library for React. Use `<motion.div>` and the `AnimatePresence` primitive.
- **`tailwind-merge` + `clsx`** — `npm i clsx tailwind-merge`. Wrap them in a `cn()` helper. Lets you compose conditional class strings without the giant ternary blobs currently in components.
- **`class-variance-authority` (cva)** — `npm i class-variance-authority`. Define button/chip variants once, use them everywhere. Cleaner than the inline string concatenation in `QuestionItem.tsx` and `ProgressBar.tsx`.
- **Native View Transitions API** (no install needed). Wrap router pushes in `document.startViewTransition(() => router.push(...))` to get free, GPU-accelerated cross-page fades for `/` → `/quiz` → `/results`. Works in all evergreen browsers; degrades silently elsewhere.
- **`next/font`** — replace the system-font CSS with `import { SF_Pro_Display } from 'next/font/local'` (or use Inter as a fallback web font with proper preloading). Eliminates FOUT.
- **`lucide-react`** for any icon needs — `npm i lucide-react`. Single icon per use; the bundle stays small. Avoid icon-heavy designs; one or two well-placed icons (download arrow, back chevron) are enough.

### Animation moves to consider

These are the moves that make a quiz feel premium without crossing into gimmicky:

1. **Stagger-in on quiz mount.** Each question fades up with a 30–40ms delay between siblings. `motion`'s `staggerChildren` on the parent + `initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}` on the children. Cap at the first viewport's-worth — don't animate offscreen items.
2. **Likert chip selection.** When a chip is tapped, the previously selected chip should *de-fill* and the new one should *fill* with a 150ms transform — currently it's a hard swap. Use `layout` animations or simply animate `background-color` with `motion.button`.
3. **Progress bar fill.** Currently transitions via Tailwind's `transition-all`. Switch to a `motion.div` with a spring (`type: "spring", stiffness: 300, damping: 30`) for a more tactile feel.
4. **Page transitions** via View Transitions API (above). On `/` → `/quiz`, the heading should crossfade and the content beneath it should slide up subtly. On `/quiz` → `/results`, the entire page can fade through.
5. **Results reveal.** Stagger the score block, tier title, prose paragraphs, and criterion table in sequence (200–400ms). The first time the user sees their result is the emotional moment — give it presence.
6. **Number countup on score and percentage.** Animate `0 → rawTotal` and `0 → percentage` over ~700ms with an easing curve. Use a `useMotionValue` + `useTransform` or a small custom hook. Tabular nums prevent layout shift.
7. **Criterion pills.** When the table renders, animate each pill in left-to-right with a 60ms stagger. The "Positive" pills (filled black) should arrive last — it draws the eye to what matters.
8. **Hover/focus polish on the primary CTAs.** Apple buttons have a near-imperceptible scale-on-press (`whileTap={{ scale: 0.98 }}`). Add it to "Begin assessment", "See results", "Download as Markdown", "Start over".
9. **Sticky-bar shadow lift on scroll.** When the quiz body scrolls behind the bottom bar, soften the bar with a subtle backdrop blur + a 1px top border that fades in. It's already partway there — finish it.

### Typography

- Use the SF Pro stack (already configured) but tighten letter-spacing on display headings: `tracking-tight` is fine; for the `/results` tier title, try `tracking-[-0.02em]`.
- Body text uses `[text-wrap:pretty]` on the results page already — propagate that to landing copy.
- Display weights: 600 (semibold) for the largest headings, 500 (medium) for buttons, 400 for body. Avoid 700 — it reads as Microsoft-y, not Apple-y.

### Color (stay disciplined)

The brief was monochrome. Resist adding accent colors even when animations make them tempting. If a single accent is ever introduced, use it for at most one element per page (e.g., the percentage figure), and keep it desaturated — `#0071e3` (Apple's interaction blue) only if the whole page feels too gray.

### Don't

- Do not add a hero illustration, abstract shapes, or any decorative graphic. The content carries the page; visuals would cheapen it.
- Do not add gradient backgrounds anywhere except potentially behind the score block on `/results`, and only if it's near-imperceptible (e.g., `radial-gradient(circle at top, #fff, #fbfbfd)`).
- Do not add a dark mode unless the user asks. The brief was light only.
- Do not animate everything. The 80/20 rule applies hard here — pick 5–6 moments of motion and make them perfect.

### Reference

For the look-and-feel target, study:
- **apple.com** product pages (entrance staggers, scroll-driven content reveals)
- **linear.app** (typography rhythm, monochrome restraint, tasteful motion)
- **vercel.com** documentation pages (clean light-mode density)
- **stripe.com** checkout (form polish — exactly what this quiz needs)

---

## Out of scope (and should stay out)

- No login, accounts, sharing, or saved history
- No clinician-facing scoring view; the scoring key is internal-only
- No internationalization, no dark mode (light only by request)
- No email-the-results-to-me
- No mobile app wrapper

---

## How to deploy

From inside `aspd-quiz/`:

```bash
npx vercel --prod
```

…or push the directory to a Git repo and connect it via the Vercel dashboard. Framework preset: Next.js. No environment variables required. No build configuration needed beyond defaults.

The whole site is static (no server functions are invoked), so it sits comfortably on the Vercel hobby/free tier indefinitely.

---

## Verification checklist (before declaring it shipped)

1. `npm test` → 10/10 passing
2. `npm run build` → succeeds, all routes marked `○ (Static)`
3. `npm run dev`, then in a real browser:
   - Landing renders, disclaimer visible, "Begin assessment" navigates to `/quiz`
   - Quiz: scroll all 30 questions, see Part 1 / 2 / 3 headings
   - "See results" stays disabled until all 30 answered
   - Submit → results page shows score, percentage, tier prose, 7-row breakdown
   - Download button produces `aspd-results-YYYY-MM-DD.md`
   - Open the .md file — header, score, tier title + body, criterion table, disclaimer
   - "Start over" returns to `/`; visiting `/results` directly afterward redirects to `/`
4. DevTools → Application → `sessionStorage` is empty after Start over and after closing the tab
5. (After deploy) hit the production URL on mobile + desktop, repeat steps 3–4

---

## Files to touch for common changes

| Want to… | Edit |
|---|---|
| Change a question's wording | `lib/questions.ts` |
| Re-tune which items are reverse-scored | `lib/questions.ts` (the `REVERSE_IDS` set) |
| Adjust criterion → item mapping | `lib/criteria.ts` |
| Change tier descriptions | `lib/descriptions.ts` |
| Change positive-criterion threshold (currently 3.5) | `lib/criteria.ts:POSITIVE_THRESHOLD` |
| Tweak the .md report layout | `lib/markdown.ts` |
| Restyle the quiz | `components/QuestionItem.tsx` + `app/globals.css` tokens |
| Change copy on landing | `app/page.tsx` |

---

## Source materials (for reference, not bundled)

- `/Users/aviouslyavi/Downloads/ASPD_Clinical_Assessment (1).md` — original 30-question doc + clinician scoring key. **The scoring key must never appear in the user-facing app.**
- `/Users/aviouslyavi/Downloads/ASPD_Result_Descriptions.md` — the 11 tier descriptions, embedded verbatim into `lib/descriptions.ts`.

If either source doc is updated in the future, the corresponding `lib/` file is the only thing to re-sync.
