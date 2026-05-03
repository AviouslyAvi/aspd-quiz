"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import type { Result } from "@/lib/scoring";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { DownloadButton } from "@/components/DownloadButton";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { withViewTransition } from "@/lib/navigate";
import { cn } from "@/lib/cn";

const RESULT_KEY = "aspd-result";
const ANSWERS_KEY = "aspd-answers";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem(RESULT_KEY);
    if (!raw) {
      router.replace("/");
      return;
    }
    try {
      setResult(JSON.parse(raw) as Result);
    } catch {
      router.replace("/");
      return;
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const handler = () => {
      sessionStorage.removeItem(RESULT_KEY);
      sessionStorage.removeItem(ANSWERS_KEY);
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  function handleStartOver() {
    sessionStorage.removeItem(RESULT_KEY);
    sessionStorage.removeItem(ANSWERS_KEY);
    withViewTransition(() => router.push("/"));
  }

  if (loading || !result) {
    return (
      <main className="mx-auto flex min-h-screen max-w-[680px] items-center justify-center px-5">
        <motion.p
          className="text-[var(--color-muted)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          Loading…
        </motion.p>
      </main>
    );
  }

  const { rawTotal, percentage, tier, criteria } = result;
  const paragraphs = tier.body.split(/\n\n+/);

  return (
    <main className="mx-auto flex min-h-screen max-w-[720px] flex-col px-5 pb-24 pt-12 sm:px-6 sm:pt-20">
      <motion.header
        className="space-y-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
      >
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
          Your Results
        </p>
        <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[44px]">
          {tier.title}
        </h1>
      </motion.header>

      <motion.section
        className="mt-8 grid grid-cols-2 gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: 0.15 }}
      >
        <div
          className="rounded-2xl border border-[var(--color-line)] px-5 py-4"
          style={{
            background:
              "radial-gradient(120% 120% at 0% 0%, #ffffff 0%, #fbfbfd 100%)",
          }}
        >
          <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
            Raw score
          </div>
          <div className="mt-1 text-[32px] font-semibold tabular-nums text-[var(--color-ink)]">
            <AnimatedNumber value={rawTotal} decimals={0} durationMs={900} />
            <span className="text-[var(--color-muted)] text-[20px] font-normal"> / 150</span>
          </div>
        </div>
        <div
          className="rounded-2xl border border-[var(--color-line)] px-5 py-4"
          style={{
            background:
              "radial-gradient(120% 120% at 100% 0%, #ffffff 0%, #fbfbfd 100%)",
          }}
        >
          <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
            Percentage
          </div>
          <div className="mt-1 text-[32px] font-semibold tabular-nums text-[var(--color-ink)]">
            <AnimatedNumber value={percentage} decimals={1} durationMs={900} />
            <span className="text-[var(--color-muted)] text-[20px] font-normal">%</span>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="mt-10 space-y-4"
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
        }}
      >
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease }}
            className="text-[17px] leading-[1.7] text-[var(--color-ink)] [text-wrap:pretty]"
          >
            {p}
          </motion.p>
        ))}
      </motion.section>

      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.55 }}
      >
        <h2 className="text-base font-semibold text-[var(--color-ink)]">
          DSM-5 criterion breakdown
        </h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Each criterion is the average of the items mapped to it. A mean of 3.5 or higher is
          flagged as positive.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white">
          {criteria.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                ease,
                delay: 0.7 + i * 0.06,
              }}
              className={cn(
                "flex items-center justify-between gap-4 px-5 py-3.5",
                i > 0 && "border-t border-[var(--color-line)]"
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="text-[15px] text-[var(--color-ink)]">
                  <span className="text-[var(--color-muted)] tabular-nums mr-2">{c.id}.</span>
                  {c.name}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[15px] tabular-nums text-[var(--color-ink)]">
                  {c.mean.toFixed(2)}
                </div>
              </div>
              <div className="shrink-0">
                <motion.span
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.35,
                    ease,
                    delay: 0.9 + i * 0.06,
                  }}
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                    c.positive
                      ? "bg-[var(--color-ink)] text-white"
                      : "bg-[var(--color-line)] text-[var(--color-muted)]"
                  )}
                >
                  {c.positive ? "Positive" : "Below threshold"}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: 1.1 }}
      >
        <DisclaimerBanner />
      </motion.section>

      <motion.section
        className="mt-8 flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 1.2 }}
      >
        <DownloadButton result={result} />
        <motion.button
          type="button"
          onClick={handleStartOver}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className="h-11 rounded-full border border-[var(--color-line)] bg-white px-6 text-[15px] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
        >
          Start over
        </motion.button>
      </motion.section>
    </main>
  );
}
