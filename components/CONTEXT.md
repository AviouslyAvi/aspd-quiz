# components/ — reusable UI

Small, focused React components. No business logic — that's in `lib/`.

## Load

- `QuestionItem.tsx` — single question + 5 Likert chips. `React.memo`'d.
- `ProgressBar.tsx` — sticky scroll-aware progress bar with backdrop blur.
- `AnimatedNumber.tsx` — count-up number used on `/results`.
- `DisclaimerBanner.tsx` — shared disclaimer block.
- `DownloadButton.tsx` — triggers the markdown download.

## Skip

`.next/`, `node_modules/`.

## Performance rules (these came from a real perf fix — don't regress)

- **Do not** wrap each Likert chip in a `motion` component. With 30 questions × 5 chips that's 150 motion nodes reconciling on every keystroke. Use plain `<button>` + Tailwind `transition-colors duration-150` + `active:scale-[0.94]`.
- Keep `QuestionItem` `React.memo`'d. Pass `setAnswer` as a `useCallback`-stable reference from the parent so answering one question doesn't re-render the other 29.
- Coalesce any scroll listener through `requestAnimationFrame`. `backdrop-blur-md` is the ceiling — `xl` was too expensive.

## Visual rules

- Monochrome only. No accent colors. No dark mode.
- Press feel via `active:scale-[0.94]`, not JS animation.
- Use the `cn()` helper from `lib/cn.ts` for class merging.

## Skills/MCP

None required.
