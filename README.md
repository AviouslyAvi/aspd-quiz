# ASPD Self-Assessment

An interactive self-reflection questionnaire derived from the DSM-5 ASPD criteria. Built with Next.js 15, React 19, and Tailwind v4. Designed for free-tier Vercel deployment.

## Privacy

- Responses live only in browser memory and `sessionStorage`.
- Nothing is sent to a server.
- The result entry is cleared on tab close, on "Start over", and when re-entering the quiz.

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # vitest scoring suite
npm run build        # production build
```

## Deploy

```bash
npx vercel --prod
```

Or connect the repo on the Vercel dashboard. No environment variables required.

## Project structure

```
app/        Pages: /, /quiz, /results
lib/        Questions, scoring, descriptions, markdown report builder
components/ Reusable UI pieces
```

## Disclaimer

This is an educational and self-reflection tool. It is not a clinical diagnosis. ASPD is diagnosed only by qualified professionals through structured interview, history, and collateral information.
