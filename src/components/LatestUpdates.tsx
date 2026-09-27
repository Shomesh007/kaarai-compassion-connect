import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { useLatestUpdates } from "@/hooks/use-cms";
import SectionHeading from "@/components/motion/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import SwipeRow from "@/components/motion/SwipeRow";
import { cn } from "@/lib/utils";

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

/** News & announcements as an editorial bento grid, newest first. */
const LatestUpdates = () => {
  const { data: updates } = useLatestUpdates();
  const items = updates ?? [];

  if (items.length === 0) return null;

  return (
    <section id="latest-updates" className="relative overflow-hidden bg-secondary/40 py-14 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-kolam opacity-40 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Latest updates"
            title={
              <>
                News from the <em className="text-accent">ground</em>.
              </>
            }
            description="Milestones, partnerships and moments from our journey of compassion."
          />
          <span className="hidden items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary md:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Live
          </span>
        </div>

        <Reveal className="mt-8 md:mt-14">
        <SwipeRow
          desktopClassName="md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3"
          itemWidth="w-[84%]"
          getItemClassName={(i) => (i === 0 ? "md:col-span-2 lg:row-span-2" : undefined)}
        >
          {items.map((update, idx) => {
            const featured = idx === 0;
            const isAccent = update.badge_color === "accent";
            const Wrapper = update.link_url ? "a" : "div";
            return (
              <div key={update.id} className="h-full">
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 24 }} className="h-full">
                  <Wrapper
                    {...(update.link_url ? { href: update.link_url, target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={cn(
                      "group relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-3xl p-6 transition-shadow sm:p-8",
                      featured
                        ? "bg-primary text-primary-foreground shadow-[var(--shadow-strong)]"
                        : "surface hover:shadow-[var(--shadow-hover)]",
                    )}
                  >
                    {featured && !update.image_url && (
                      <span aria-hidden="true" className="pointer-events-none absolute -bottom-6 -right-4 select-none text-[11rem] leading-none opacity-20 transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110 sm:text-[14rem]">
                        {update.badge_text.match(/\p{Extended_Pictographic}/u)?.[0] ?? "✦"}
                      </span>
                    )}
                    {featured && (
                      <>
                        <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-60" />
                        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-saffron/30 blur-3xl" />
                      </>
                    )}
                    {update.image_url && (
                      <div className={cn("relative -mx-7 -mt-7 mb-6 overflow-hidden sm:-mx-8 sm:-mt-8", featured ? "h-56" : "h-40")}>
                        <img
                          src={update.image_url}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="relative flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-bold tracking-wide",
                          featured ? "bg-white/15 text-white" : isAccent ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary",
                        )}
                      >
                        {update.badge_text}
                      </span>
                      <span className={cn("flex items-center gap-1.5 text-xs", featured ? "text-white/70" : "text-muted-foreground")}>
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(update.published_at)}
                      </span>
                    </div>
                    {featured && <div className="hidden flex-1 lg:block" />}
                    <h3
                      className={cn(
                        "relative mt-4 font-display md:mt-6 font-medium leading-tight tracking-tight",
                        featured ? "text-2xl sm:text-4xl lg:text-5xl" : "text-xl md:text-2xl",
                      )}
                    >
                      {update.title}
                    </h3>
                    <p className={cn("relative mt-3 line-clamp-3 leading-relaxed md:mt-4 md:line-clamp-none", featured ? "text-sm text-white/80 md:text-lg" : "text-sm text-muted-foreground")}>
                      {update.summary}
                    </p>
                    <div className="relative mt-auto flex justify-end pt-6">
                      <span
                        className={cn(
                          "grid h-11 w-11 place-items-center rounded-full transition-all duration-300 group-hover:rotate-45",
                          featured ? "bg-white text-primary" : "border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-white",
                        )}
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                  </Wrapper>
                </motion.div>
              </div>
            );
          })}
        </SwipeRow>
        </Reveal>
      </div>
    </section>
  );
};

export default LatestUpdates;
