import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT, fadeUpChild, staggerParent } from "./variants";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  /** Viewport fraction that must be visible before revealing */
  amount?: number;
}

/** Fades and slides its children in once they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.8,
  amount = 0.2,
  ...rest
}: RevealProps) {
  const { x, y } = offsets[direction];
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  amount?: number;
}

export function Stagger({ children, stagger = 0.08, delay = 0, amount = 0.15, ...rest }: StaggerProps) {
  return (
    <motion.div
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: Omit<HTMLMotionProps<"div">, "children"> & { children: ReactNode }) {
  return (
    <motion.div variants={fadeUpChild} {...rest}>
      {children}
    </motion.div>
  );
}
