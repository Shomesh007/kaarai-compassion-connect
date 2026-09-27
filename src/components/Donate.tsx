import { motion } from "framer-motion";
import { Heart, Mail, Phone, ShieldCheck } from "lucide-react";
import { useDonationBreakdown, useSiteSettings } from "@/hooks/use-cms";
import SectionHeading from "@/components/motion/SectionHeading";
import { EASE_OUT } from "@/components/motion/variants";
import { Reveal } from "@/components/motion/Reveal";

const barColors = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--saffron))", "hsl(var(--muted-foreground))"];

const Donate = () => {
  const { data: settings } = useSiteSettings();
  const { data: breakdown } = useDonationBreakdown();

  const items = breakdown ?? [];
  const email = settings?.email ?? "kaaraikarangal@gmail.com";
  const phoneTel = settings?.phone_tel ?? "+918220573306";
  const phoneDisplay = settings?.phone_display ?? "+91 82205 73306";

  // Donut geometry
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const total = items.reduce((sum, i) => sum + Number(i.percent), 0) || 100;
  let offset = 0;

  return (
    <section id="donate" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Make a difference"
          title={
            <>
              Your kindness, <em className="text-accent">multiplied</em>.
            </>
          }
          description="Every rupee goes toward serving those in need. Here’s exactly how your donation helps."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* Breakdown */}
          <Reveal className="surface flex flex-col p-8 sm:p-10 lg:col-span-7">
            <div className="grid flex-1 items-center gap-10 sm:grid-cols-[auto_1fr]">
              <div className="relative mx-auto h-48 w-48">
                <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
                  <circle cx="90" cy="90" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="18" />
                  {items.map((item, idx) => {
                    const length = (Number(item.percent) / total) * circumference;
                    const dashOffset = -offset;
                    offset += length;
                    return (
                      <motion.circle
                        key={item.id ?? idx}
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke={barColors[idx % barColors.length]}
                        strokeWidth="18"
                        strokeDashoffset={dashOffset}
                        initial={{ strokeDasharray: `0 ${circumference}` }}
                        whileInView={{ strokeDasharray: `${Math.max(length - 3, 0)} ${circumference}` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 1.2, delay: 0.2 + idx * 0.15, ease: EASE_OUT }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <Heart className="mx-auto h-6 w-6 text-accent" fill="currentColor" />
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your gift</p>
                  </div>
                </div>
              </div>

              <ul className="space-y-5">
                {items.map((item, idx) => (
                  <li key={item.id ?? idx}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2.5 font-medium text-foreground">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: barColors[idx % barColors.length] }} />
                        {item.label}
                      </span>
                      <span className="font-display text-xl font-medium text-foreground">{item.percent}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: barColors[idx % barColors.length] }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + idx * 0.12, ease: EASE_OUT }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 grid gap-4 border-t border-border/70 pt-8 sm:grid-cols-2">
              <p className="flex items-start gap-3 text-sm text-muted-foreground">
                <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                Complete transparency and accountability in every rupee spent.
              </p>
              <p className="flex items-start gap-3 text-sm text-muted-foreground">
                <Heart className="h-5 w-5 shrink-0 text-accent" />
                Every contribution goes directly toward serving those in need.
              </p>
            </div>
          </Reveal>

          {/* CTA card */}
          <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white shadow-[var(--shadow-strong)] sm:p-10 lg:col-span-5">
            <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-60" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <ShieldCheck className="h-6 w-6 shrink-0 text-saffron" />
                <div>
                  <p className="font-semibold">Registered NGO</p>
                  <p className="mt-1 text-sm text-white/60">
                    {settings?.registration_info ?? "Registration No. 31/2025 — Registered on fourth february 2025"}
                  </p>
                </div>
              </div>
              <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-white/50">UPI or bank transfer</p>
              <p className="mt-2 font-display text-3xl font-medium leading-tight">Contact us for payment details — we’ll guide you through.</p>
              <div className="mt-auto flex flex-col gap-3 pt-10">
                <a
                  href={`mailto:${email}?subject=Donation Inquiry`}
                  className="btn-shine inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
                >
                  <Mail className="h-5 w-5" /> Donate via email
                </a>
                <a
                  href={`tel:${phoneTel}`}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/20 px-6 font-semibold transition-colors hover:bg-white hover:text-ink"
                >
                  <Phone className="h-5 w-5" /> Call {phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Donate;
