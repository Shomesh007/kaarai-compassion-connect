import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HandHeart, Minus, Plus, Scale, ShieldCheck, Users } from "lucide-react";
import { useImpactCategories, useServices, useSiteSettings, useSponsors, useTeamMembers } from "@/hooks/use-cms";
import SectionHeading from "@/components/motion/SectionHeading";
import CountUp from "@/components/motion/CountUp";
import { EASE_OUT } from "@/components/motion/variants";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const pillars = [
  { icon: HandHeart, title: "Dignity for all", text: "Every person deserves care and opportunity, whatever their circumstances." },
  { icon: Users, title: "Community first", text: "Real change happens when neighbours come together in service." },
  { icon: Scale, title: "Full transparency", text: "Every contribution goes directly toward serving those in need." },
];

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: settings } = useSiteSettings();
  const { data: services } = useServices();
  const { data: team } = useTeamMembers();
  const { data: sponsors } = useSponsors();
  const { data: categories } = useImpactCategories();

  const expanded = settings?.about_expanded ?? [];
  const photo = categories?.[2]?.images[0]?.url ?? "/img/elder1.jpg";

  const stats = [
    { value: services?.length ?? 0, suffix: "", label: "Core programs" },
    { value: team?.length ?? 0, suffix: "", label: "Team members & advisors" },
    { value: sponsors?.length ?? 0, suffix: "", label: "Supporting sponsors" },
    { value: 2, suffix: "", label: "States served" },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Left: heading + photo */}
        <div className="lg:col-span-5">
          <SectionHeading
            align="left"
            eyebrow="Who we are"
            title={
              <>
                A family bound by <em className="text-primary">compassion</em>.
              </>
            }
          />
          <Reveal delay={0.1} className="relative mt-10 hidden lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-3xl shadow-[var(--shadow-strong)]">
              <img src={photo} alt="Volunteers with an elderly community member" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 font-display text-2xl italic text-white">
                “{settings?.about_motto ?? "Together, we make compassion visible."}”
              </p>
            </div>
            <div className="absolute -right-6 -top-6 grid h-28 w-28 animate-spin-slow place-items-center rounded-full bg-saffron text-ink">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <defs>
                  <path id="circle-text" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                </defs>
                <text className="fill-current text-[10.5px] font-bold uppercase tracking-[0.18em]">
                  <textPath href="#circle-text">Karaikal · Since 2025 · Karaikal · Since 2025 ·</textPath>
                </text>
              </svg>
              <HandHeart className="h-8 w-8" />
            </div>
          </Reveal>
        </div>

        {/* Right: story */}
        <div className="lg:col-span-7 lg:pt-24">
          <Reveal>
            <p className="font-display text-xl leading-snug text-foreground sm:text-[1.75rem] sm:leading-[1.4]">
              {settings?.about_intro}
            </p>
          </Reveal>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="more"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="overflow-hidden"
              >
                <div className="space-y-5 pt-8">
                  {expanded.map((paragraph, idx) =>
                    idx === expanded.length - 1 ? (
                      <div key={idx} className="flex gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-5">
                        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                        <p className="leading-relaxed text-foreground/80">{paragraph}</p>
                      </div>
                    ) : (
                      <p key={idx} className="text-lg leading-relaxed text-muted-foreground">
                        {paragraph}
                      </p>
                    ),
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {expanded.length > 0 && (
            <Reveal delay={0.1}>
              <button
                onClick={() => setIsExpanded((v) => !v)}
                className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-foreground"
                aria-expanded={isExpanded}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-foreground/20 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
                {isExpanded ? "Show less" : "Read our story"}
              </button>
            </Reveal>
          )}

          <Stagger className="mt-14 grid gap-4 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title} className="surface group p-6 transition-shadow hover:shadow-[var(--shadow-hover)]">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-20 max-w-7xl px-5 sm:px-8">
        <Stagger className="grid grid-cols-2 overflow-hidden rounded-3xl border border-border/70 bg-card lg:grid-cols-4">
          {stats.map((s, i) => (
            <StaggerItem
              key={s.label}
              className={`p-6 sm:p-10 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:last:border-r-0 border-border/70`}
            >
              <CountUp to={s.value} suffix={s.suffix} className="font-display text-5xl font-medium text-primary sm:text-6xl" />
              <p className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default About;
