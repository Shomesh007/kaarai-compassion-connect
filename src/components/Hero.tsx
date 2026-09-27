import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Droplet, Heart, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { allImpactImageUrls } from "@/lib/impactData";
import { useImpactCategories, useServices, useSiteSettings } from "@/hooks/use-cms";
import { scrollToId } from "@/lib/navigation";
import Marquee from "@/components/motion/Marquee";
import { EASE_OUT } from "@/components/motion/variants";

const Hero = () => {
  const { data: settings } = useSiteSettings();
  const { data: categories } = useImpactCategories();
  const { data: services } = useServices();
  const reduce = useReducedMotion();

  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -220]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Preload impact/gallery images once when Hero becomes visible for the first time.
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          allImpactImageUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cats = categories ?? [];
  const mainImage = cats[1]?.images[0]?.url ?? "/img/bag1.jpg";
  const sideImage = cats[2]?.images[1]?.url ?? "/img/elder2.jpg";
  const smallImage = cats[0]?.images[3]?.url ?? "/img/id4.jpg";

  const orgName = settings?.org_name ?? "Kaarai Karangal";
  const taglineTamil = settings?.tagline_tamil ?? "யாதும் ஊரே யாவரும் கேளிர்";
  const taglineEnglish = settings?.tagline_english ?? "All towns are our home, all people our kin";
  const tamilWords = taglineTamil.split(" ");

  return (
    <section
      ref={heroRef}
      id="top"
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--gradient-hero)] pt-28"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-kolam [mask-image:radial-gradient(ellipse_70%_60%_at_30%_40%,#000,transparent)]" />
      <div className="pointer-events-none absolute -left-32 top-20 h-[28rem] w-[28rem] animate-blob rounded-full bg-primary/15 blur-[90px]" />
      <div
        className="pointer-events-none absolute -right-20 bottom-24 h-[26rem] w-[26rem] animate-blob rounded-full bg-accent/15 blur-[90px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 animate-blob rounded-full bg-saffron/15 blur-[80px]"
        style={{ animationDelay: "-12s" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <motion.div style={{ y: yText, opacity: fade }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 py-1.5 pl-1.5 pr-4 text-xs font-semibold text-primary shadow-sm backdrop-blur"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            {orgName} · Social Service Organization
          </motion.div>

          <h1 className="mt-8 font-tamil text-[2.6rem] font-bold leading-[1.25] tracking-tight text-foreground sm:text-6xl lg:text-[4.6rem]">
            {tamilWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.35 + i * 0.12 }}
                className={`mr-[0.25em] inline-block ${i === 1 || i === 3 ? "text-primary" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.9 }}
            className="mt-5 font-display text-2xl italic text-foreground/80 sm:text-3xl"
          >
            “{taglineEnglish}.”
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.05 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {settings?.hero_description ??
              "Serving marginalized communities across Tamil Nadu and Puducherry through food, shelter, education, and blood donation drives."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.2 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <button
              onClick={() => scrollToId("donate")}
              className="btn-shine group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground shadow-[0_18px_40px_-14px_hsl(var(--accent)/0.7)] transition-transform hover:-translate-y-0.5"
            >
              <Heart className="h-5 w-5" fill="currentColor" />
              Donate Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToId("volunteer")}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-foreground/15 bg-background/60 px-8 text-base font-semibold text-foreground backdrop-blur transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Join as Volunteer
            </button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.45 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
          >
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Registered NGO · Reg. No. 31/2025
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" /> Tamil Nadu &amp; Puducherry
            </li>
          </motion.ul>
        </motion.div>

        {/* Photo collage */}
        <div className="relative mx-auto h-[26rem] w-full max-w-md sm:h-[32rem] lg:col-span-5 lg:h-[36rem] lg:max-w-none">
          <motion.div
            style={{ y: yBack }}
            initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.3 }}
            className="absolute right-0 top-0 h-[78%] w-[72%] overflow-hidden rounded-[2rem] shadow-[var(--shadow-strong)] ring-8 ring-background"
          >
            <img src={mainImage} alt="Children receiving school bags from Kaarai Karangal" className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            style={{ y: yFront }}
            initial={{ opacity: 0, scale: 0.9, rotate: 8 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.5 }}
            className="absolute bottom-0 left-0 h-[62%] w-[52%] overflow-hidden rounded-[2rem] shadow-[var(--shadow-strong)] ring-8 ring-background"
          >
            <img src={sideImage} alt="Elderly care support visit" className="h-full w-full object-cover object-top" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.8 }}
            className="absolute bottom-[8%] right-[4%] hidden h-28 w-28 overflow-hidden rounded-2xl shadow-[var(--shadow-hover)] ring-4 ring-background sm:block"
          >
            <img src={smallImage} alt="Student ID cards ready for distribution" className="h-full w-full object-cover" />
          </motion.div>

          {/* Floating chips */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.1 }}
            className="absolute left-0 top-[12%] sm:-left-6"
          >
            <div className="flex animate-float items-center gap-3 rounded-2xl border border-border/60 bg-background/90 px-4 py-3 shadow-[var(--shadow-hover)] backdrop-blur">
              <span className="relative grid h-10 w-10 place-items-center rounded-full bg-red-500/10 text-red-600">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-red-500/30" />
                <Droplet className="relative h-5 w-5" fill="currentColor" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-foreground">Blood donation</p>
                <p className="text-xs text-muted-foreground">Every drop, a gift of life</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.3 }}
            className="absolute right-2 top-[62%] hidden sm:block lg:-right-4"
          >
            <div
              className="flex animate-float items-center gap-3 rounded-2xl bg-primary px-4 py-3 text-primary-foreground shadow-[var(--shadow-strong)]"
              style={{ animationDelay: "-3s" }}
            >
              <Heart className="h-5 w-5 text-saffron" fill="currentColor" />
              <p className="text-sm font-semibold">Compassion, made visible</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToId("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground lg:flex"
        aria-label="Scroll to About"
      >
        <span className="grid h-10 w-6 place-items-start justify-center rounded-full border border-foreground/20 pt-2">
          <motion.span
            animate={reduce ? undefined : { y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-3 w-3" />
          </motion.span>
        </span>
      </motion.button>

      {/* Programs ribbon */}
      <div className="relative z-10 border-y border-white/10 bg-ink py-4 text-white">
        <Marquee duration={36}>
          {(services ?? []).map((s) => (
            <span key={s.id} className="flex items-center gap-8 pr-8 font-display text-xl italic sm:text-2xl">
              {s.title}
              <Sparkles className="h-4 w-4 text-saffron" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Hero;
