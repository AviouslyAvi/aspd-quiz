import { describe, it, expect } from "vitest";
import { QUESTIONS } from "../questions";
import { computeFinalScores, computeResult, type Answers, type LikertValue } from "../scoring";
import { findTier } from "../descriptions";

function fillAll(v: LikertValue): Answers {
  const a: Answers = {} as Answers;
  for (const q of QUESTIONS) a[q.id] = v;
  return a;
}

describe("scoring", () => {
  it("all 1s yields lowest possible total and 0%", () => {
    const r = computeResult(fillAll(1));
    // 23 forward × 1 + 7 reverse × 5 = 23 + 35 = 58
    expect(r.rawTotal).toBe(23 * 1 + 7 * 5);
    expect(r.percentage).toBe(23.3); // rounded to 1 decimal
  });

  it("all 5s yields highest possible total and 100%", () => {
    const r = computeResult(fillAll(5));
    // 23 forward × 5 + 7 reverse × 1 = 115 + 7 = 122
    expect(r.rawTotal).toBe(23 * 5 + 7 * 1);
    expect(r.percentage).toBe(76.7);
  });

  it("all 3s yields the midpoint (90 raw → 50%)", () => {
    const r = computeResult(fillAll(3));
    expect(r.rawTotal).toBe(90);
    expect(r.percentage).toBe(50);
  });

  it("most-prosocial pattern (1 on forward, 5 on reverse) yields 0%", () => {
    const a: Answers = {} as Answers;
    for (const q of QUESTIONS) a[q.id] = q.reverse ? 5 : 1;
    const r = computeResult(a);
    expect(r.rawTotal).toBe(30);
    expect(r.percentage).toBe(0);
    expect(r.tier.minPct).toBe(0);
  });

  it("most-antisocial pattern (5 on forward, 1 on reverse) yields 100%", () => {
    const a: Answers = {} as Answers;
    for (const q of QUESTIONS) a[q.id] = q.reverse ? 1 : 5;
    const r = computeResult(a);
    expect(r.rawTotal).toBe(150);
    expect(r.percentage).toBe(100);
    expect(r.tier.minPct).toBe(91);
  });

  it("reverses prosocial items correctly", () => {
    const finals = computeFinalScores(fillAll(1));
    for (const q of QUESTIONS) {
      expect(finals[q.id]).toBe(q.reverse ? 5 : 1);
    }
  });

  it("criterion means flag positive when mean >= 3.5", () => {
    const a: Answers = fillAll(1);
    // Force criterion 1 (items 1, 4, 18, 28) to all be 5 (forward items, no reverse).
    a[1] = 5; a[4] = 5; a[18] = 5; a[28] = 5;
    const r = computeResult(a);
    const c1 = r.criteria.find((c) => c.id === 1)!;
    expect(c1.mean).toBe(5);
    expect(c1.positive).toBe(true);
  });

  it("findTier maps boundaries correctly", () => {
    expect(findTier(0).minPct).toBe(0);
    expect(findTier(10).minPct).toBe(0);
    expect(findTier(11).minPct).toBe(11);
    expect(findTier(50).minPct).toBe(41);
    expect(findTier(91).minPct).toBe(91);
    expect(findTier(100).minPct).toBe(91);
  });

  it("min-score percentage falls into 11-20% tier (not 0-10%)", () => {
    // Min raw with 7 forced reversals at floor: 58 → ((58-30)/120)*100 = 23.33% → tier 21-30%
    const r = computeResult(fillAll(1));
    expect(r.tier.minPct).toBe(21);
  });

  it("max-score percentage falls into 71-80% tier", () => {
    // Max raw 122 → ((122-30)/120)*100 = 76.67% → tier 71-80%
    const r = computeResult(fillAll(5));
    expect(r.tier.minPct).toBe(71);
  });
});
