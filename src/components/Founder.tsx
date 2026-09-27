import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Quote } from "lucide-react";
import { useSiteSettings, useTeamMembers } from "@/hooks/use-cms";
import { EASE_OUT } from "@/components/motion/variants";
import { Reveal } from "@/components/motion/Reveal";

const Founder = () => {
  const { data: settings } = useSiteSettings();
  const { data: team } = useTeamMembers();
  const [expanded, setExpanded] = useState(false);

  const founderName = settings?.founder_name ?? "Dr.E.Vishnuvarthan";
  const founderRole = team?.find((m) => m.name === founderName)?.role ?? "Founder";

  const message = settings?.founder_message ?? [];
  const [greeting, ...rest] = message;
  const preview = rest.slice(0, 1);
  const more = rest.slice(1);

  return (
    <section id="founder" className="relative overflow-hidden bg-ink py-14 text-white md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-primary/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal direction="right" className="hidden md:block lg:sticky lg:top-28 lg:col-span-5">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-3 rounded-t-[14rem] rounded-b-[2rem] border border-white/15" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[14rem] rounded-b-[2rem] bg-white/5">
              <img
                src={settings?.founder_image_url ?? "/img/founder.jpg"}
                alt={founderName}
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 20%" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-center backdrop-blur-xl">
              <p className="font-display text-xl font-medium">{founderName}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron">{founderRole}</p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            {/* Phone profile row replaces the large portrait */}
            <div className="mb-8 flex items-center gap-4 md:hidden">
              <img
                src={settings?.founder_image_url ?? "/img/founder.jpg"}
                alt={founderName}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-saffron ring-offset-2 ring-offset-ink"
                style={{ objectPosition: "center 20%" }}
                loading="lazy"
              />
              <div>
                <p className="font-display text-lg font-medium">{founderName}</p>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-saffron">{founderRole}</p>
              </div>
            </div>
            <span className="eyebrow text-saffron">Founder’s message</span>
            <div className="relative mt-6">
              <Quote className="absolute -left-3 -top-12 hidden md:block h-14 w-14 text-saffron/25" />
              <blockquote className="relative font-display text-[2rem] font-medium leading-[1.1] tracking-tight text-balance sm:text-5xl md:text-6xl">
                {settings?.founder_quote ?? "When compassion becomes action, humanity blossoms."}
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-6 space-y-4 text-base leading-relaxed text-white/70 md:mt-10 md:space-y-5 md:text-lg">
            {greeting && <p className="font-semibold text-white">{greeting}</p>}
            {preview.map((p, i) => (
              <p key={i} className={expanded ? "" : "line-clamp-4 md:line-clamp-none"}>
                {p}
              </p>
            ))}
          </Reveal>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="overflow-hidden"
              >
                <div className="space-y-4 pt-4 text-base leading-relaxed text-white/70 md:space-y-5 md:pt-5 md:text-lg">
                  {more.map((p, i) =>
                    i === more.length - 1 ? (
                      <p key={i} className="border-l-2 border-saffron pl-5 font-display text-xl italic text-white md:text-2xl">
                        {p}
                      </p>
                    ) : (
                      <p key={i}>{p}</p>
                    ),
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {more.length > 0 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 md:mt-8 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : "Read the full message"}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Founder;
