"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { withViewTransition } from "@/lib/navigate";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  const router = useRouter();

  function begin() {
    withViewTransition(() => router.push("/quiz"));
  }

  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
      className="mx-auto flex min-h-screen max-w-[680px] flex-col px-5 pb-16 pt-20 sm:px-6 sm:pt-32"
    >
      <motion.header className="space-y-4" variants={{}}>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]"
        >
          Personality &amp; Life Experience
        </motion.p>
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[40px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[56px]"
        >
          A questionnaire about how you relate to rules, others, and yourself.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[18px] leading-relaxed text-[var(--color-muted)] [text-wrap:pretty]"
        >
          Thirty short statements. About ten minutes. The questionnaire is derived from the
          DSM-5 criteria for Antisocial Personality Disorder and is intended for personal
          reflection only.
        </motion.p>
      </motion.header>

      <motion.section
        className="mt-10"
        variants={fadeUp}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <DisclaimerBanner />
      </motion.section>

      <motion.section
        className="mt-10 flex flex-col gap-3"
        variants={fadeUp}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.button
          type="button"
          onClick={begin}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className="group inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-[var(--color-ink)] px-7 text-[16px] font-medium text-white transition-colors hover:bg-black"
        >
          Begin assessment
          <ArrowRight
            size={16}
            strokeWidth={2.25}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </motion.button>
        <p className="text-sm text-[var(--color-muted)]">
          Your responses are never sent to a server or saved. They exist only in this browser
          tab and are cleared when you finish or close it.
        </p>
      </motion.section>

      <motion.section
        className="mt-16 space-y-3 border-t border-[var(--color-line)] pt-10"
        variants={fadeUp}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-base font-semibold text-[var(--color-ink)]">What to expect</h2>
        <ul className="space-y-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
          <li>• Each statement uses a five-point scale from Disagree to Agree.</li>
          <li>• Answer based on your general tendencies, not a single recent moment.</li>
          <li>
            • You&apos;ll see a percentage, a written description, and a per-criterion breakdown
            after submitting.
          </li>
          <li>• You can download your results as a Markdown file to keep.</li>
        </ul>
      </motion.section>
    </motion.main>
  );
}
