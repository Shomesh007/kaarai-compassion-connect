import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-cms";
import { NAV_LINKS, useGoToSection } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/components/motion/variants";

const Navbar = () => {
  const { data: settings } = useSiteSettings();
  const goTo = useGoToSection();
  const { pathname } = useLocation();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Hide on fast downward scroll past the hero, reveal on scroll up
    setHidden(y > 640 && y > prev + 4);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const orgName = settings?.org_name ?? "Kaarai Karangal";
  // On phones the home hero is a dark photo, so the bar starts light-on-dark
  const overPhoto = pathname === "/" && !scrolled && !open;

  const handleNav = (id: string) => {
    setOpen(false);
    // Let the menu close before scrolling so the body lock is released
    window.setTimeout(() => goTo(id), open ? 250 : 0);
  };

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-saffron to-accent"
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
      >
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 sm:px-4",
            scrolled || open
              ? "border border-border/60 bg-background/80 shadow-[var(--shadow-soft)] backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}
          aria-label="Main"
        >
          <Link to="/" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-border">
              <img
                src={settings?.logo_url ?? "/img/logo.jpg"}
                alt=""
                className="h-9 w-9 object-contain"
              />
            </span>
            <span
              className={cn(
                "truncate font-display text-lg font-semibold tracking-tight",
                overPhoto ? "text-white md:text-foreground" : "text-foreground",
              )}
            >
              {orgName}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNav("donate")}
              className="btn-shine hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.6)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              <Heart className="h-4 w-4" fill="currentColor" />
              Donate
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full border backdrop-blur lg:hidden",
                overPhoto
                  ? "border-white/25 bg-white/10 text-white md:border-border/70 md:bg-background/70 md:text-foreground"
                  : "border-border/70 bg-background/70 text-foreground",
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink text-white lg:hidden"
          >
            <div className="absolute inset-0 bg-kolam-light opacity-60" />
            <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
            <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="relative flex min-h-full flex-col justify-center gap-1 px-8 pb-16 pt-28"
            >
              {[...NAV_LINKS, { id: "donate", label: "Donate" }].map((link, i) => (
                <motion.li
                  key={link.id}
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } } }}
                >
                  <button
                    onClick={() => handleNav(link.id)}
                    className="flex w-full items-baseline gap-4 border-b border-white/10 py-4 text-left"
                  >
                    <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                    <span className="font-display text-4xl font-medium tracking-tight">{link.label}</span>
                  </button>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
                className="pt-8 font-tamil text-lg text-saffron"
              >
                {settings?.tagline_tamil ?? "யாதும் ஊரே யாவரும் கேளிர்"}
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
