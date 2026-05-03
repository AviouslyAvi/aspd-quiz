"use client";

import { memo } from "react";
import type { LikertValue } from "@/lib/scoring";
import { cn } from "@/lib/cn";

type Props = {
  id: number;
  text: string;
  value: LikertValue | undefined;
  onChange: (id: number, v: LikertValue) => void;
};

const VALUES: LikertValue[] = [1, 2, 3, 4, 5];

function QuestionItemBase({ id, text, value, onChange }: Props) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white px-5 py-5 shadow-[0_1px_0_rgba(0,0,0,0.02)] sm:px-6 sm:py-6">
      <div className="flex items-baseline gap-3">
        <span className="text-sm tabular-nums text-[var(--color-muted)] w-7 shrink-0">
          {String(id).padStart(2, "0")}
        </span>
        <p className="text-[17px] leading-snug text-[var(--color-ink)] [text-wrap:pretty]">
          {text}
        </p>
      </div>

      <fieldset className="mt-5">
        <legend className="sr-only">Response for question {id}</legend>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {VALUES.map((v) => {
            const selected = value === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => onChange(id, v)}
                aria-pressed={selected}
                className={cn(
                  "chip h-11 rounded-full border text-[15px] font-medium tabular-nums",
                  "transition-[background-color,color,border-color,transform] duration-150 ease-out",
                  "active:scale-[0.94]",
                  selected
                    ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
                    : "border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                )}
              >
                {v}
              </button>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-xs text-[var(--color-muted)]">
          <span>Disagree</span>
          <span>Agree</span>
        </div>
      </fieldset>
    </div>
  );
}

export const QuestionItem = memo(QuestionItemBase);
