"use client";

import { useEffect, useState } from "react";
import { animate, useMotionValue, useTransform, motion } from "motion/react";

type Props = {
  value: number;
  decimals?: number;
  durationMs?: number;
  className?: string;
};

export function AnimatedNumber({ value, decimals = 0, durationMs = 800, className }: Props) {
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => v.toFixed(decimals));
  const [text, setText] = useState((0).toFixed(decimals));

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = display.on("change", (v) => setText(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, durationMs, mv, display]);

  return <motion.span className={className}>{text}</motion.span>;
}
