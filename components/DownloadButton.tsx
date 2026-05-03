"use client";

import { motion } from "motion/react";
import { ArrowDownToLine } from "lucide-react";
import type { Result } from "@/lib/scoring";
import { buildReportMarkdown, reportFilename } from "@/lib/markdown";

export function DownloadButton({ result }: { result: Result }) {
  function handleDownload() {
    const md = buildReportMarkdown(result);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = reportFilename();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <motion.button
      type="button"
      onClick={handleDownload}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 text-[15px] font-medium text-white transition-colors hover:bg-black"
    >
      <ArrowDownToLine size={16} strokeWidth={2.25} />
      Download as Markdown
    </motion.button>
  );
}
