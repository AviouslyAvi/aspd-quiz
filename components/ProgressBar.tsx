"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  answered: number;
  total: number;
  onSubmit: () => void;
  canSubmit: boolean;
};

export function ProgressBar({ answered, total, onSubmit, canSubmit }: Props) {
  const pct = Math.round((answered / total) * 100);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    let queued = false;
    const sample = () => {
      queued = false;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(sample);
    };
    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={cn(
        "sticky bottom-0 z-10 transition-all duration-300",
        "bg-white/85 backdrop-blur-md",
        scrolled
          ? "border-t border-[var(--color-line)] shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.08)]"
          : "border-t border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[760px] items-center gap-4 px-5 py-3 sm:px-6">
        <div className="flex-1">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-[var(--color-muted)] tabular-nums">
              {answered} / {total} answered
            </span>
            <span className="text-[var(--color-muted)] tabular-nums">{pct}%</span>
          </div>
          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[var(--color-line)]">
            <motion.div
              className="h-full rounded-full bg-[var(--color-ink)]"
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            />
          </div>
        </div>
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          whileTap={canSubmit ? { scale: 0.97 } : undefined}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "h-11 shrink-0 rounded-full px-6 text-[15px] font-medium transition-colors",
            canSubmit
              ? "bg-[var(--color-ink)] text-white hover:bg-black"
              : "cursor-not-allowed bg-[var(--color-line)] text-[var(--color-muted)]"
          )}
        >
          See results
        </motion.button>
      </div>
    </div>
  );
}
