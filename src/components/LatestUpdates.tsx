import { useRef, useState, useEffect } from "react";
import { useLatestUpdates } from "@/hooks/use-cms";
import { Sparkles, ArrowRight, Clock } from "lucide-react";

/**
 * LatestUpdates — A visually striking news/announcements section
 * featuring an animated vertical timeline with staggered reveal,
 * glowing accent orbs, and a "pulse" live indicator.
 */
const LatestUpdates = () => {
  const { data: updates } = useLatestUpdates();
  const items = updates ?? [];
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  // Intersection observer for staggered reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const cards = el.querySelectorAll("[data-update-card]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.updateCard);
            setVisibleItems((prev) => new Set(prev).add(idx));
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    cards.forEach((card) => obs.observe(card));
    return () => obs.disconnect();
  }, [items.length]);

  if (items.length === 0) return null;

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    } catch {
      return "";
    }
  };

  return (
    <section
      ref={sectionRef}
      id="latest-updates"
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(170deg, hsl(178 50% 42% / 0.04) 0%, hsl(30 25% 98%) 30%, hsl(18 80% 58% / 0.03) 70%, hsl(38 45% 88% / 0.15) 100%)",
      }}
    >
      {/* Decorative orbs */}
      <div className="absolute top-16 -left-20 w-72 h-72 rounded-full bg-primary/8 blur-[100px] animate-float pointer-events-none" />
      <div
        className="absolute bottom-10 -right-16 w-64 h-64 rounded-full bg-accent/10 blur-[80px] animate-float pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      {/* Geometric accent — diagonal stripe */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-[0.035]"
        style={{
          background:
            "repeating-linear-gradient(135deg, hsl(178 50% 42%), hsl(178 50% 42%) 2px, transparent 2px, transparent 24px)",
        }}
      />

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              Live Updates
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4 relative inline-block">
            <Sparkles className="absolute -top-3 -left-8 w-6 h-6 text-accent/60 animate-pulse" />
            Latest from Kaarai Karangal
            <div className="absolute -bottom-3 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto">
            Stay connected with our journey of compassion
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-accent/20 to-transparent md:-translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {items.map((update, idx) => {
              const isLeft = idx % 2 === 0;
              const isVisible = visibleItems.has(idx);

              return (
                <div
                  key={update.id}
                  data-update-card={idx}
                  className={`relative flex items-start gap-4 md:gap-0 transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-[3px] transition-all duration-500 ${
                        isVisible
                          ? "border-primary bg-primary/20 scale-100 shadow-[0_0_12px_hsl(178_50%_42%/0.4)]"
                          : "border-border bg-background scale-75"
                      }`}
                    />
                  </div>

                  {/* Card — alternating sides on desktop */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <div
                      className={`group relative rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 cursor-default ${
                        update.badge_color === "accent"
                          ? "border-accent/20 hover:border-accent/40 bg-gradient-to-br from-card via-card to-accent/5"
                          : "border-primary/20 hover:border-primary/40 bg-gradient-to-br from-card via-card to-primary/5"
                      }`}
                      style={{
                        boxShadow: isVisible
                          ? "0 4px 24px hsl(178 50% 42% / 0.06), 0 1px 4px hsl(0 0% 0% / 0.04)"
                          : "none",
                      }}
                    >
                      {/* Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                            update.badge_color === "accent"
                              ? "bg-accent/15 text-accent"
                              : "bg-primary/15 text-primary"
                          }`}
                        >
                          {update.badge_text}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatDate(update.published_at)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
                        {update.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {update.summary}
                      </p>

                      {/* Hover arrow indicator */}
                      {update.link_url && (
                        <a
                          href={update.link_url}
                          className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-primary hover:text-accent transition-colors"
                        >
                          Read more <ArrowRight className="w-3 h-3" />
                        </a>
                      )}

                      {/* Decorative corner accent */}
                      <div
                        className={`absolute top-0 ${
                          isLeft ? "right-0 rounded-tr-2xl rounded-bl-xl" : "left-0 rounded-tl-2xl rounded-br-xl"
                        } w-12 h-1 ${
                          update.badge_color === "accent"
                            ? "bg-gradient-to-r from-accent/40 to-transparent"
                            : "bg-gradient-to-r from-primary/40 to-transparent"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;
