import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Droplet, Heart, Home, Users, Utensils, type LucideIcon } from "lucide-react";
import { scrollToId } from "@/lib/navigation";
import { useServices } from "@/hooks/use-cms";
import SectionHeading from "@/components/motion/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { Service } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

/** Map icon name strings from CMS to actual Lucide icon components */
const iconMap: Record<string, LucideIcon> = {
  Utensils,
  Home,
  Droplet,
  BookOpen,
  Users,
  Heart,
};

const tones = [
  "from-primary/15 text-primary",
  "from-accent/15 text-accent",
  "from-red-500/15 text-red-600",
  "from-saffron/25 text-amber-700",
  "from-primary/15 text-primary",
  "from-accent/15 text-accent",
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = iconMap[service.icon_name] ?? Heart;

  // Spotlight that follows the cursor
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="surface group relative h-full overflow-hidden rounded-2xl p-4 hover:shadow-[var(--shadow-hover)] md:rounded-3xl md:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx) var(--my), hsl(var(--primary) / 0.09), transparent 45%)" }}
      />
      <div className="relative flex items-start justify-between">
        <span className={cn("grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br to-transparent md:h-16 md:w-16 md:rounded-2xl", tones[index % tones.length])}>
          <Icon className="h-5 w-5 transition-transform md:h-7 md:w-7 duration-500 group-hover:scale-110 group-hover:-rotate-6" />
        </span>
        <span className="font-display text-2xl font-medium text-foreground/[0.1] md:text-5xl md:text-foreground/[0.07] transition-colors duration-500 group-hover:text-primary/20">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="relative mt-4 font-display text-[1.05rem] font-medium leading-snug tracking-tight text-foreground md:mt-8 md:text-2xl">{service.title}</h3>
      <p className="relative mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground md:mt-3 md:line-clamp-none md:text-base">{service.description}</p>
      <div className="relative mt-8 hidden h-px w-full overflow-hidden bg-border md:block">
        <span className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-700 group-hover:w-full" />
      </div>
    </motion.div>
  );
}

const Services = () => {
  const { data: services } = useServices();
  const count = services?.length ?? 0;
  // Span the call-to-action tile across whatever is left of the last row
  const lgSpan = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-1"][count % 3];
  const smSpan = count % 2 === 0 ? "col-span-2" : "";

  return (
    <section id="services" className="relative overflow-hidden bg-secondary/40 py-14 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Programs that meet people <em className="text-primary">where they are</em>.
            </>
          }
          description="Our programs address the most pressing needs of marginalized communities — from a warm meal today to an education for tomorrow."
        />
        <Stagger className="mt-8 grid grid-cols-2 gap-3 md:mt-16 md:gap-5 lg:grid-cols-3">
          {(services ?? []).map((service, index) => (
            <StaggerItem key={service.id ?? index} className="h-full">
              <ServiceCard service={service} index={index} />
            </StaggerItem>
          ))}
          <StaggerItem className={cn("h-full", smSpan, lgSpan)}>
            <button
              onClick={() => scrollToId("volunteer")}
              className="group relative flex h-full w-full flex-col justify-between gap-6 overflow-hidden rounded-2xl bg-ink p-4 text-left text-white shadow-[var(--shadow-strong)] md:min-h-[16rem] md:rounded-3xl md:p-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-60" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/40 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <span className="eyebrow relative text-saffron">Get involved</span>
              <div className="relative">
                <p className="font-display text-lg font-medium leading-tight md:text-3xl">
                  Every program runs on <em className="text-saffron">kind hands</em>.
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold md:mt-6 md:text-base">
                  Join as a volunteer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
};

export default Services;
