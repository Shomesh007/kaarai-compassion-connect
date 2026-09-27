import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Droplet } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-cms";
import { Reveal } from "@/components/motion/Reveal";

const needs = ["Emergencies", "Surgeries", "Chronic illnesses"];

export default function DonateBloodSection() {
  const { data: settings } = useSiteSettings();
  const reduce = useReducedMotion();

  return (
    <section id="blood-donation" className="relative overflow-hidden bg-gradient-to-br from-[#7a0f1c] via-[#a3162a] to-[#c2410c] py-14 text-white md:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-40" />

      {/* Heartbeat line */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-1/2 h-40 w-full -translate-y-1/2 opacity-25"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M0 80 H380 L410 80 L430 30 L455 140 L480 10 L505 120 L525 80 H760 L785 80 L800 50 L820 110 L840 80 H1200"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="order-2 lg:order-1 lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 md:hidden">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/30" />
              <Droplet className="relative h-5 w-5" fill="currentColor" />
            </span>
            <span className="eyebrow text-white/80">Donate blood, save lives</span>
          </div>
          <h2 className="mt-4 font-display text-[2.1rem] font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
            Be the reason someone gets a <em className="text-amber-200">second chance</em>.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:mt-6 md:text-lg">
            Every drop donated is a gift of life. By volunteering, you become a hero in someone’s story and inspire a wave of
            compassion that strengthens our whole community.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 md:mt-7">
            {needs.map((n) => (
              <li key={n} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur md:px-4 md:py-1.5 md:text-sm">
                {n}
              </li>
            ))}
          </ul>
          <a
            href={settings?.blood_donation_url ?? "https://kaaraikarangal.netlify.app/"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine group mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 md:mt-10 md:inline-flex md:h-14 md:w-auto md:py-0 text-base font-semibold text-[#a3162a] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5"
          >
            Volunteer to Donate Blood
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <Reveal direction="left" className="order-1 hidden justify-center md:flex lg:order-2 lg:col-span-5">
          <div className="relative grid h-64 w-64 place-items-center sm:h-80 sm:w-80">
            <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-white/40" />
            <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-white/30" style={{ animationDelay: "0.8s" }} />
            <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-white/20" style={{ animationDelay: "1.6s" }} />
            <motion.div
              animate={reduce ? undefined : { scale: [1, 1.08, 1, 1.12, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-40 w-40 place-items-center rounded-full bg-white/15 shadow-[inset_0_0_40px_rgba(255,255,255,0.2)] backdrop-blur-md sm:h-48 sm:w-48"
            >
              <Droplet className="h-20 w-20 text-white drop-shadow-lg sm:h-24 sm:w-24" fill="currentColor" />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
