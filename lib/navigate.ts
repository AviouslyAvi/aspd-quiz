"use client";

type StartViewTransition = (cb: () => void) => { finished: Promise<void> };

export function withViewTransition(cb: () => void) {
  if (typeof document === "undefined") return cb();
  const doc = document as Document & { startViewTransition?: StartViewTransition };
  if (typeof doc.startViewTransition === "function") {
    doc.startViewTransition(cb);
    return;
  }
  cb();
}
