import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

/** Infinite horizontal ticker. Children are rendered twice for a seamless loop. */
export default function Marquee({ children, duration = 40, reverse, pauseOnHover = true, className }: MarqueeProps) {
  return (
    <div className={cn("group relative flex overflow-hidden mask-fade-x", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 animate-marquee items-center",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ "--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
