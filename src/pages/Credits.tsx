import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  Code2,
  Gauge,
  Heart,
  LayoutDashboard,
  Palette,
  Rocket,
  Sparkles,
  Type,
  Wand2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer, { CREDIT_URL } from "@/components/Footer";
import { EASE_OUT } from "@/components/motion/variants";
import { Reveal } from "@/components/motion/Reveal";
import { useSiteSettings } from "@/hooks/use-cms";
import SwipeRow from "@/components/motion/SwipeRow";

const contributions = [
  { icon: Palette, title: "Brand & UI design", text: "Visual language, colour system, typography and every layout on the site." },
  { icon: Wand2, title: "Motion & interaction", text: "Scroll reveals, parallax, micro-interactions and the little moments of delight." },
  { icon: Code2, title: "Frontend development", text: "A fast, accessible, fully responsive React application built from scratch." },
  { icon: LayoutDashboard, title: "CMS & admin panel", text: "A content dashboard so the team can update programs, events and galleries themselves." },
  { icon: Gauge, title: "Performance & SEO", text: "Optimised loading, structured data and search-friendly metadata." },
  { icon: Rocket, title: "Deployment & hosting", text: "Continuous deployment pipeline and custom-domain hosting setup." },
];

const stack = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Framer Motion",
  "Radix UI",
  "shadcn/ui",
  "TanStack Query",
  "Supabase",
  "Lucide Icons",
];

const Credits = () => {
  const { data: settings } = useSiteSettings();
  const orgName = settings?.org_name ?? "Kaarai Karangal";

  useEffect(() => {
    const prev = document.title;
    document.title = `Credits — ${orgName}`;
    return () => {
      document.title = prev;
    };
  }, [orgName]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="grain relative overflow-hidden bg-[var(--gradient-hero)] pb-16 pt-28 sm:pb-28 sm:pt-44">
          <div className="pointer-events-none absolute inset-0 bg-kolam [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000,transparent)]" />
          <div className="pointer-events-none absolute -left-24 top-24 h-96 w-96 animate-blob rounded-full bg-primary/15 blur-[90px]" />
          <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 animate-blob rounded-full bg-accent/15 blur-[90px]" style={{ animationDelay: "-8s" }} />

          <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="eyebrow"
            >
              Credits
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
              className="mt-4 font-display text-[2.6rem] font-medium leading-[1.02] tracking-tight text-balance sm:text-7xl md:mt-5"
            >
              Made with care, for a cause that <em className="text-accent">cares</em>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 }}
              className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:mt-6 md:text-lg"
            >
              The people, studio and tools that brought the {orgName} website to life.
            </motion.p>
          </div>
        </section>

        {/* Studio credit */}
        <section className="relative -mt-8 pb-20 sm:pb-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white shadow-[var(--shadow-strong)] sm:p-14 md:rounded-[2.5rem]">
                <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-50" />
                <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-primary/40 blur-[120px]" />
                <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent/30 blur-[120px]" />

                <div className="relative grid items-end gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-saffron">
                      <Sparkles className="h-3.5 w-3.5" /> Designed &amp; developed by
                    </span>
                    <a href={CREDIT_URL} target="_blank" rel="noopener" className="group mt-6 block w-fit">
                      <span className="block bg-gradient-to-r from-white via-white to-saffron bg-clip-text font-display text-[15vw] font-medium leading-[1.15] pb-2 tracking-tight text-transparent sm:text-8xl lg:text-9xl">
                        builtbygsv
                        <span className="text-saffron">.in</span>
                      </span>
                      <span className="mt-2 block h-px w-0 bg-saffron transition-all duration-700 group-hover:w-full" />
                    </a>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:mt-8 md:text-lg">
                      This entire website — its design, motion, code, content management system and deployment — was
                      conceived and crafted by <strong className="text-white">builtbygsv.in</strong>, proudly supporting{" "}
                      {orgName}’s mission to make compassion visible.
                    </p>
                  </div>
                  <div className="lg:col-span-4 lg:text-right">
                    <a
                      href={CREDIT_URL}
                      target="_blank"
                      rel="noopener"
                      className="btn-shine group flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-ink md:inline-flex md:h-14 md:w-auto md:py-0 transition-transform hover:-translate-y-0.5"
                    >
                      Visit www.builtbygsv.in
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-5 md:mt-6">
            <SwipeRow desktopClassName="md:grid-cols-2 lg:grid-cols-3" itemWidth="w-[78%]">
              {contributions.map(({ icon: Icon, title, text }) => (
                <div key={title} className="h-full">
                  <div className="surface group h-full p-6 transition-all md:p-7 duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="mt-5 font-display text-xl font-medium text-foreground md:mt-6 md:text-2xl">{title}</h2>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-accent">by builtbygsv.in</p>
                  </div>
                </div>
              ))}
            </SwipeRow>
            </Reveal>
          </div>
        </section>

        {/* Acknowledgements */}
        <section className="bg-secondary/40 py-14 md:py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 md:gap-6 lg:grid-cols-3">
            <Reveal className="surface p-6 md:p-8">
              <Camera className="h-6 w-6 text-accent" />
              <h2 className="mt-5 font-display text-2xl font-medium">Content &amp; photography</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Stories and photographs from the volunteers, team members and communities of {orgName}. Sponsor logos
                are trademarks of their respective owners.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="surface p-6 md:p-8">
              <Type className="h-6 w-6 text-accent" />
              <h2 className="mt-5 font-display text-2xl font-medium">Typography</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                <span className="font-display">Fraunces</span>, <span className="font-sans font-semibold">Plus Jakarta Sans</span> and{" "}
                <span className="font-tamil">Noto Serif Tamil</span>, served via Google Fonts.
              </p>
            </Reveal>
            <Reveal delay={0.16} className="surface p-6 md:p-8">
              <Code2 className="h-6 w-6 text-accent" />
              <h2 className="mt-5 font-display text-2xl font-medium">Built with open source</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <li key={s} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mx-auto mt-16 flex max-w-7xl flex-col items-center gap-6 px-5 text-center sm:px-8">
            <Heart className="h-8 w-8 text-accent" fill="currentColor" />
            <p className="font-tamil text-2xl text-primary">{settings?.tagline_tamil ?? "யாதும் ஊரே யாவரும் கேளிர்"}</p>
            <Link
              to="/"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/15 px-6 font-semibold transition-colors hover:bg-foreground hover:text-background"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Credits;
