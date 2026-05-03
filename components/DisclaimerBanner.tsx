export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div
      role="note"
      className={
        "rounded-2xl border border-[var(--color-line)] bg-white/60 text-[var(--color-muted)] " +
        (compact ? "px-4 py-3 text-sm" : "px-5 py-4 text-[15px] leading-relaxed")
      }
    >
      <strong className="text-[var(--color-ink)] font-medium">
        This is a self-reflection tool, not a clinical diagnosis.
      </strong>{" "}
      ASPD can only be diagnosed by a qualified professional through a structured interview,
      history, and collateral information. Do not use these results in place of professional
      evaluation.
    </div>
  );
}
