import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Heart } from "lucide-react";
import { scrollToId } from "@/lib/navigation";

/** Floating donate pill that appears after the hero and hides near the donate/footer areas. */
const StickyDonate = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const donate = document.getElementById("donate");
    const footer = document.querySelector("footer");
    const vh = window.innerHeight;
    const overDonate = donate ? donate.getBoundingClientRect().top < vh && donate.getBoundingClientRect().bottom > 0 : false;
    const overFooter = footer ? footer.getBoundingClientRect().top < vh : false;
    setVisible(y > vh * 0.8 && !overDonate && !overFooter);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          onClick={() => scrollToId("donate")}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-accent py-3 pl-3 pr-6 font-semibold text-accent-foreground shadow-[0_20px_40px_-12px_hsl(var(--accent)/0.7)] animate-glow"
          aria-label="Donate"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white/20">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/30" />
            <Heart className="relative h-4 w-4" fill="currentColor" />
          </span>
          Donate
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default StickyDonate;
