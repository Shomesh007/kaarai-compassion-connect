import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useImpactCategories } from "@/hooks/use-cms";
import SectionHeading from "@/components/motion/SectionHeading";
import { EASE_OUT } from "@/components/motion/variants";
import { cn } from "@/lib/utils";

const Gallery = () => {
  const { data: impactCategories } = useImpactCategories();
  const categories = (impactCategories ?? []).filter((c) => c.images.length > 0);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const active = categories.find((c) => c.id === activeId) ?? categories[0];
  const images = active?.images ?? [];

  const step = useCallback(
    (dir: 1 | -1) => setLightbox((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, step]);

  if (!active) return null;
  const current = lightbox !== null ? images[lightbox] : null;

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our impact"
          title={
            <>
              Compassion, <em className="text-primary">in action</em>.
            </>
          }
          description="Real moments from our programs across Karaikal and beyond."
        />

        {/* Category tabs */}
        <div className="no-scrollbar -mx-5 mt-12 overflow-x-auto px-5">
          <div role="tablist" className="mx-auto flex w-max gap-1 rounded-full border border-border/70 bg-card p-1.5 shadow-[var(--shadow-soft)]">
            {categories.map((c) => {
              const selected = c.id === active.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                    selected ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="gallery-tab"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {active.description && (
              <p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">{active.description}</p>
            )}
            <div className="mt-10 columns-2 gap-3 sm:gap-4 lg:columns-3">
              {images.map((image, i) => (
                <motion.button
                  key={image.id ?? i}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: EASE_OUT }}
                  onClick={() => setLightbox(i)}
                  className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-muted text-left sm:mb-4"
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    loading="lazy"
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  <p className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {image.caption}
                  </p>
                  <span className="absolute right-3 top-3 grid h-9 w-9 scale-75 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Dialog open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-5xl gap-0 overflow-hidden border-white/10 bg-ink p-0 text-white [&>button]:hidden">
          <DialogTitle className="sr-only">{current?.caption ?? "Image"}</DialogTitle>
          <DialogDescription className="sr-only">Use the arrow keys to browse images.</DialogDescription>
          <div className="relative flex min-h-[50vh] items-center justify-center bg-black">
            <AnimatePresence mode="wait">
              {current && (
                <motion.img
                  key={current.url}
                  src={current.url}
                  alt={current.caption}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="max-h-[78vh] w-full object-contain"
                />
              )}
            </AnimatePresence>
            {images.length > 1 && (
              <>
                <button
                  onClick={() => step(-1)}
                  className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/25"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => step(1)}
                  className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/25"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/25"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <p className="text-sm text-white/80">{current?.caption}</p>
            <p className="shrink-0 font-mono text-xs text-white/50">
              {(lightbox ?? 0) + 1} / {images.length}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
