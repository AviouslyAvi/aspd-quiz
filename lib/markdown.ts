import type { Result } from "./scoring";

export function buildReportMarkdown(result: Result, dateISO: string = new Date().toISOString().slice(0, 10)): string {
  const { rawTotal, percentage, tier, criteria } = result;

  const breakdown = criteria
    .map(
      (c) =>
        `| ${c.id}. ${c.name} | ${c.mean.toFixed(2)} | ${c.positive ? "Yes" : "No"} |`,
    )
    .join("\n");

  return `# Personality and Life Experience Questionnaire — Results

**Date:** ${dateISO}
**Raw score:** ${rawTotal} / 150
**Percentage:** ${percentage.toFixed(1)}%

## Result tier

### ${tier.title}

${tier.body}

## DSM-5 criterion breakdown

| Criterion | Mean (1–5) | Positive (≥ 3.5) |
|---|---|---|
${breakdown}

---

*This is a self-reflection tool, not a clinical diagnosis. ASPD can only be diagnosed by a qualified professional through a structured interview, history, and collateral information.*
`;
}

export function reportFilename(dateISO: string = new Date().toISOString().slice(0, 10)): string {
  return `aspd-results-${dateISO}.md`;
}
