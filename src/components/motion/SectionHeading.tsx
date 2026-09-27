import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "./variants";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

/** Consistent eyebrow + display title + lede used at the top of every section. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      className={cn("max-w-3xl", centered && "md:mx-auto md:text-center", className)}
    >
      <motion.span
        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } } }}
        className={cn("eyebrow", tone === "dark" && "text-saffron")}
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } } }}
        className={cn(
          "mt-3 font-display text-[2.1rem] font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl md:mt-4 md:text-6xl",
          tone === "dark" ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } } }}
          className={cn(
            "mt-3 text-[0.95rem] leading-relaxed md:mt-5 md:text-lg",
            tone === "dark" ? "text-white/65" : "text-muted-foreground",
            centered && "md:mx-auto md:max-w-2xl",
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
