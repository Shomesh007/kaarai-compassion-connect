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
      className="surface group relative h-full overflow-hidden p-8 hover:shadow-[var(--shadow-hover)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx) var(--my), hsl(var(--primary) / 0.09), transparent 45%)" }}
      />
      <div className="relative flex items-start justify-between">
        <span className={cn("grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br to-transparent", tones[index % tones.length])}>
          <Icon className="h-7 w-7 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
        </span>
        <span className="font-display text-5xl font-medium text-foreground/[0.07] transition-colors duration-500 group-hover:text-primary/20">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="relative mt-8 font-display text-2xl font-medium tracking-tight text-foreground">{service.title}</h3>
      <p className="relative mt-3 leading-relaxed text-muted-foreground">{service.description}</p>
      <div className="relative mt-8 h-px w-full overflow-hidden bg-border">
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
  const smSpan = count % 2 === 0 ? "sm:col-span-2" : "";

  return (
    <section id="services" className="relative overflow-hidden bg-secondary/40 py-24 sm:py-32">
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
        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(services ?? []).map((service, index) => (
            <StaggerItem key={service.id ?? index} className="h-full">
              <ServiceCard service={service} index={index} />
            </StaggerItem>
          ))}
          <StaggerItem className={cn("h-full", smSpan, lgSpan)}>
            <button
              onClick={() => scrollToId("volunteer")}
              className="group relative flex h-full min-h-[16rem] w-full flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-left text-white shadow-[var(--shadow-strong)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-60" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/40 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <span className="eyebrow relative text-saffron">Get involved</span>
              <div className="relative">
                <p className="font-display text-3xl font-medium leading-tight">
                  Every program runs on <em className="text-saffron">kind hands</em>.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold">
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
