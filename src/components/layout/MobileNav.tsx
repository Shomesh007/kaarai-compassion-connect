import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Home, Images, LayoutGrid, UserPlus } from "lucide-react";
import { scrollToId } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const items = [
  { id: "top", label: "Home", icon: Home },
  { id: "services", label: "Programs", icon: LayoutGrid },
  { id: "donate", label: "Donate", icon: Heart, primary: true },
  { id: "gallery", label: "Impact", icon: Images },
  { id: "volunteer", label: "Join", icon: UserPlus },
];

/** App-style bottom tab bar shown on phones only; highlights the section in view. */
const MobileNav = () => {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 26 }}
      className="fixed inset-x-3 bottom-3 z-40 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Quick navigation"
    >
      <ul className="flex items-end justify-between rounded-[1.75rem] border border-border/60 bg-background/85 px-2 py-1.5 shadow-[0_12px_40px_-12px_hsl(var(--ink)/0.35)] backdrop-blur-xl">
        {items.map(({ id, label, icon: Icon, primary }) => {
          const on = active === id;
          if (primary) {
            return (
              <li key={id} className="-mt-7">
                <button
                  onClick={() => scrollToId(id)}
                  className="flex flex-col items-center gap-1"
                  aria-label="Donate"
                >
                  <span className="relative grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-[0_10px_24px_-6px_hsl(var(--accent)/0.8)] ring-4 ring-background">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent/40" />
                    <Icon className="relative h-6 w-6" fill="currentColor" />
                  </span>
                  <span className="text-[0.65rem] font-bold text-accent">{label}</span>
                </button>
              </li>
            );
          }
          return (
            <li key={id}>
              <button
                onClick={() => scrollToId(id)}
                className={cn(
                  "relative flex w-14 flex-col items-center gap-1 rounded-2xl py-1.5 text-[0.65rem] font-semibold transition-colors",
                  on ? "text-primary" : "text-muted-foreground",
                )}
              >
                {on && (
                  <motion.span layoutId="mnav-pill" className="absolute inset-0 rounded-2xl bg-primary/10" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <Icon className="relative h-5 w-5" />
                <span className="relative">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};

export default MobileNav;
