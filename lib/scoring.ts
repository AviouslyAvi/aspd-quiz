import { QUESTIONS } from "./questions";
import { CRITERIA, POSITIVE_THRESHOLD } from "./criteria";
import { findTier, type Tier } from "./descriptions";

export type LikertValue = 1 | 2 | 3 | 4 | 5;
export type Answers = Record<number, LikertValue>;

export type CriterionResult = {
  id: number;
  name: string;
  mean: number;
  positive: boolean;
};

export type Result = {
  rawTotal: number;
  percentage: number;
  tier: Tier;
  criteria: CriterionResult[];
};

export function isAnswersComplete(answers: Partial<Answers>): answers is Answers {
  return QUESTIONS.every((q) => {
    const v = answers[q.id];
    return v === 1 || v === 2 || v === 3 || v === 4 || v === 5;
  });
}

export function computeFinalScores(answers: Answers): Record<number, number> {
  const out: Record<number, number> = {};
  for (const q of QUESTIONS) {
    const raw = answers[q.id];
    out[q.id] = q.reverse ? 6 - raw : raw;
  }
  return out;
}

export function computeResult(answers: Answers): Result {
  const finals = computeFinalScores(answers);
  const rawTotal = Object.values(finals).reduce((a, b) => a + b, 0);
  const percentage = ((rawTotal - 30) / 120) * 100;
  const tier = findTier(percentage);

  const criteria: CriterionResult[] = CRITERIA.map((c) => {
    const sum = c.itemIds.reduce((acc, id) => acc + finals[id], 0);
    const mean = sum / c.itemIds.length;
    return {
      id: c.id,
      name: c.name,
      mean,
      positive: mean >= POSITIVE_THRESHOLD,
    };
  });

  return {
    rawTotal,
    percentage: Math.round(percentage * 10) / 10,
    tier,
    criteria,
  };
}
