import type { Variants } from "framer-motion";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Parent/child variants for staggered lists. */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

