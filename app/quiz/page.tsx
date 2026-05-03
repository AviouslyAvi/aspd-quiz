"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { QUESTIONS, SCALE_LABELS } from "@/lib/questions";
import { computeResult, isAnswersComplete, type LikertValue } from "@/lib/scoring";
import { QuestionItem } from "@/components/QuestionItem";
import { ProgressBar } from "@/components/ProgressBar";
import { withViewTransition } from "@/lib/navigate";

const RESULT_KEY = "aspd-result";
const ANSWERS_KEY = "aspd-answers";

type AnswersDraft = Partial<Record<number, LikertValue>>;

function readAnswersDraft(): AnswersDraft {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(ANSWERS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") return parsed as AnswersDraft;
  } catch {
    // fall through
  }
  return {};
}

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AnswersDraft>({});
  const [hydrated, setHydrated] = useState(false);

  // Restore in-flight answers from sessionStorage so back/forward and refresh preserve progress.
  // Also clear any stale computed result from a prior session.
  useEffect(() => {
    sessionStorage.removeItem(RESULT_KEY);
    setAnswers(readAnswersDraft());
    setHydrated(true);
  }, []);

  // Mirror answers to sessionStorage on every change. Skip until hydration so we don't
  // overwrite a saved draft with an empty initial state.
  useEffect(() => {
    if (!hydrated) return;
    if (Object.keys(answers).length === 0) {
      sessionStorage.removeItem(ANSWERS_KEY);
      return;
    }
    sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  }, [answers, hydrated]);

  const grouped = useMemo(() => {
    const parts: Record<1 | 2 | 3, typeof QUESTIONS> = { 1: [], 2: [], 3: [] };
    for (const q of QUESTIONS) parts[q.part].push(q);
    return parts;
  }, []);

  const answered = Object.values(answers).filter((v) => v !== undefined).length;
  const canSubmit = answered === QUESTIONS.length;

  const setAnswer = useCallback((id: number, value: LikertValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  function handleSubmit() {
    if (!isAnswersComplete(answers)) return;
    const result = computeResult(answers);
    sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
    sessionStorage.removeItem(ANSWERS_KEY);
    withViewTransition(() => router.push("/results"));
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-[760px] flex-col px-5 pb-32 pt-12 sm:px-6 sm:pt-16">
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-muted)] underline-offset-4 hover:underline"
        >
          <ChevronLeft size={14} strokeWidth={2.25} />
          Back
        </Link>
        <h1 className="text-[28px] font-semibold tracking-[-0.01em] text-[var(--color-ink)] sm:text-[36px]">
          The Questionnaire
        </h1>
        <p className="text-[15px] text-[var(--color-muted)] [text-wrap:pretty]">
          For each statement, choose the number that best describes your general tendency.
          There are no right or wrong answers.
        </p>
      </motion.header>

      <div className="mt-6 rounded-2xl border border-[var(--color-line)] bg-white px-5 py-4 text-[14px] text-[var(--color-muted)]">
        <div className="grid grid-cols-5 gap-2 text-center">
          {([1, 2, 3, 4, 5] as const).map((v) => (
            <div key={v} className="flex flex-col items-center gap-1">
              <span className="text-[var(--color-ink)] font-medium tabular-nums">{v}</span>
              <span className="text-[12px] leading-tight">{SCALE_LABELS[v]}</span>
            </div>
          ))}
        </div>
      </div>

      {([1, 2, 3] as const).map((part, partIdx) => (
        <section key={part} className="mt-10">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
            Part {part}
          </h2>
          <div className="space-y-3">
            {grouped[part].map((q, idx) => {
              const flatIdx = partIdx * 10 + idx;
              const stagger = flatIdx < 6;
              return (
                <motion.div
                  key={q.id}
                  initial={stagger ? { opacity: 0, y: 10 } : false}
                  animate={stagger ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                    delay: stagger ? 0.1 + flatIdx * 0.04 : 0,
                  }}
                >
                  <QuestionItem
                    id={q.id}
                    text={q.text}
                    value={answers[q.id]}
                    onChange={setAnswer}
                  />
                </motion.div>
              );
            })}
          </div>
        </section>
      ))}

      <ProgressBar
        answered={answered}
        total={QUESTIONS.length}
        canSubmit={canSubmit}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
