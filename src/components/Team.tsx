import { useState } from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTeamMembers } from "@/hooks/use-cms";
import SectionHeading from "@/components/motion/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Monogram from the most significant word of a name (skips titles/initials). */
const monogram = (name: string) => {
  const words = name.split(/[\s.,]+/).filter((w) => w.length > 2 && !/^(mrs?|miss|guru)$/i.test(w));
  return (words[words.length - 1] ?? name).charAt(0).toUpperCase();
};

const gradients = [
  "from-primary to-primary-glow",
  "from-accent to-saffron",
  "from-ink to-primary",
  "from-saffron to-accent",
];

const Team = () => {
  const { data: members } = useTeamMembers();
  const all = members ?? [];
  const leadership = all.filter((m) => m.category === "leadership");
  const advisors = all.filter((m) => m.category === "advisor");
  const ecMembers = all.filter((m) => m.category === "ec_member");
  const [head, ...leaders] = leadership;

  const [tab, setTab] = useState<"leaders" | "advisors" | "ec">("leaders");

  if (all.length === 0) return null;

  const tabs = [
    { id: "leaders" as const, label: "Office bearers", count: leaders.length },
    { id: "advisors" as const, label: "Advisors", count: advisors.length },
    { id: "ec" as const, label: "EC", count: ecMembers.length },
  ].filter((t) => t.count > 0);

  return (
    <section id="team" className="relative overflow-hidden bg-secondary/40 py-14 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-kolam opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our people"
          title={
            <>
              The hands behind <em className="text-primary">the work</em>.
            </>
          }
          description="Office bearers, advisors and executive committee members who give their time to serve."
        />

        {/* Phones: compact president card + tabs */}
        <div className="mt-8 md:hidden">
          {head && (
            <Reveal>
              <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl bg-primary p-4 text-primary-foreground">
                <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-60" />
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15 text-saffron">
                  <Crown className="h-5 w-5" />
                </span>
                <div className="relative min-w-0">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/70">{head.role}</p>
                  <p className="mt-0.5 font-display text-base font-medium leading-snug">{head.name}</p>
                </div>
              </div>
            </Reveal>
          )}

          <div role="tablist" className="mt-5 grid grid-cols-3 gap-1 rounded-full border border-border/70 bg-card p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn("relative rounded-full py-2 text-xs font-semibold", tab === t.id ? "text-primary-foreground" : "text-muted-foreground")}
              >
                {tab === t.id && <motion.span layoutId="team-tab" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="relative">
                  {t.label} <span className="opacity-60">{t.count}</span>
                </span>
              </button>
            ))}
          </div>

          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-4">
            {tab === "leaders" ? (
              <div className="no-scrollbar -mx-5 grid snap-x snap-mandatory auto-cols-[78%] grid-flow-col grid-rows-2 gap-2.5 overflow-x-auto scroll-px-5 px-5">
                {leaders.map((m, i) => (
                  <div key={m.id} className="surface flex snap-start items-center gap-3 rounded-2xl p-3">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br font-display text-lg font-semibold text-white ${gradients[i % gradients.length]}`}>
                      {monogram(m.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[0.62rem] font-bold uppercase tracking-[0.14em] text-accent">{m.role}</p>
                      <p className="truncate text-sm font-semibold text-foreground">{m.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {(tab === "advisors" ? advisors : ecMembers).map((m) => (
                  <li
                    key={m.id}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-sm font-medium",
                      tab === "advisors" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent",
                    )}
                  >
                    {m.name}
                  </li>
                ))}
              </ul>
            )}
            {tab === "leaders" && <p className="mt-3 text-center text-xs text-muted-foreground">Swipe to see all office bearers →</p>}
          </motion.div>
        </div>

        {/* Tablet & desktop */}
        <div className="hidden md:block">
        {head && (
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-[var(--shadow-strong)] sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-60" />
              <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-saffron/40 blur-3xl" />
              <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/15 text-saffron">
                <Crown className="h-6 w-6" />
              </span>
              <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.25em] text-white/70">{head.role}</p>
              <p className="relative mt-3 font-display text-2xl font-medium leading-snug sm:text-3xl">{head.name}</p>
            </div>
          </Reveal>
        )}

        <Stagger stagger={0.05} className="mt-8 flex flex-wrap justify-center gap-4">
          {leaders.map((m, i) => (
            <StaggerItem key={m.id} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] xl:w-[calc(25%-0.75rem)]">
              <div className="surface group flex h-full items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br font-display text-xl font-semibold text-white transition-transform duration-500 group-hover:rotate-6 ${gradients[i % gradients.length]}`}
                >
                  {monogram(m.name)}
                </span>
                <div className="min-w-0">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-accent">{m.role}</p>
                  <p className="mt-1 font-semibold leading-snug text-foreground">{m.name}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {[
            { title: "Advisors", list: advisors, tone: "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground" },
            { title: "EC Members", list: ecMembers, tone: "bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground" },
          ]
            .filter((g) => g.list.length > 0)
            .map((group, gi) => (
              <Reveal key={group.title} delay={gi * 0.1} className="surface p-7 sm:p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-medium text-foreground">{group.title}</h3>
                  <span className="font-mono text-sm text-muted-foreground">{String(group.list.length).padStart(2, "0")}</span>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.list.map((m) => (
                    <li key={m.id} className={`cursor-default rounded-full px-4 py-2 text-sm font-medium transition-colors ${group.tone}`}>
                      {m.name}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
        </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
