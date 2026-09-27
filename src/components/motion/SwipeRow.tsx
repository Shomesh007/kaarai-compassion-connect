import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SwipeRowProps {
  children: ReactNode;
  /** Layout applied from the `md` breakpoint up, e.g. "md:grid-cols-3" */
  desktopClassName?: string;
  /** Width of each card on phones */
  itemWidth?: string;
  itemClassName?: string;
  /** Per-item classes, e.g. desktop column spans for a featured card */
  getItemClassName?: (index: number) => string | undefined;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Phones get a native, snap-scrolling card row with progress dots;
 * from `md` up the same children fall back into a regular grid.
 */
export default function SwipeRow({
  children,
  desktopClassName = "md:grid-cols-2 lg:grid-cols-3",
  itemWidth = "w-[82%]",
  itemClassName,
  getItemClassName,
  tone = "light",
  className,
}: SwipeRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + 12;
      setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / step)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const goTo = (i: number) => {
    const el = ref.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (el && target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft - 20, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div
        ref={ref}
        className={cn(
          "no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-1",
          "md:mx-0 md:grid md:snap-none md:gap-5 md:overflow-visible md:px-0 md:pb-0",
          desktopClassName,
        )}
      >
        {items.map((child, i) => (
          <div key={i} className={cn("shrink-0 snap-start md:w-auto", itemWidth, itemClassName, getItemClassName?.(i))}>
            {child}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-1.5 md:hidden" role="tablist" aria-label="Carousel position">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to item ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6" : "w-1.5",
                tone === "dark"
                  ? i === active ? "bg-saffron" : "bg-white/25"
                  : i === active ? "bg-primary" : "bg-foreground/15",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
