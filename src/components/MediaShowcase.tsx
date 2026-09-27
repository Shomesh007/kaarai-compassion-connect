import { useState, useRef, useEffect, useCallback } from "react";
import { useMediaGallery } from "@/hooks/use-cms";
import { Play, ChevronLeft, ChevronRight, X, Camera, Film } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import SectionHeading from "@/components/motion/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * MediaShowcase — A cinematic media gallery with filmstrip navigation,
 * supporting both images and embedded videos. Features a "spotlight"
 * hero item with filmstrip thumbnails below, smooth crossfade transitions,
 * and a lightbox for full-screen viewing.
 */
const MediaShowcase = () => {
  const { data: media } = useMediaGallery();
  const items = media ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  const activeItem = items[activeIndex] ?? null;

  // Observe section visibility for autoplay
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Autoplay — cycle through items every 4s when visible
  const goNext = useCallback(() => {
    if (items.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
      setIsTransitioning(false);
    }, 300);
  }, [items.length]);

  const goPrev = useCallback(() => {
    if (items.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
      setIsTransitioning(false);
    }, 300);
  }, [items.length]);

  useEffect(() => {
    if (!sectionVisible || lightboxOpen) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      return;
    }
    autoplayRef.current = setInterval(goNext, 4500);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [sectionVisible, lightboxOpen, goNext]);

  // Scroll filmstrip to keep active thumb visible (horizontal only — never scrolls the page)
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const thumb = strip.children[activeIndex] as HTMLElement | undefined;
    if (thumb) {
      const stripLeft = strip.getBoundingClientRect().left;
      const thumbLeft = thumb.getBoundingClientRect().left;
      const scrollOffset = thumbLeft - stripLeft - (strip.clientWidth - thumb.clientWidth) / 2;
      strip.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  }, [activeIndex]);

  const selectItem = (idx: number) => {
    if (idx === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setIsTransitioning(false);
    }, 300);
  };

  if (items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="media-showcase"
      className="relative overflow-hidden bg-ink px-5 py-14 sm:px-8 md:py-24 lg:py-32"
    >
      {/* Ambient glow behind the spotlight */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, hsl(178 50% 42% / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Film grain overlay for cinematic feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          tone="dark"
          eyebrow="Media gallery"
          title={
            <>
              Moments that <em className="text-saffron">matter</em>.
            </>
          }
          description="Images and videos capturing our journey of service and compassion."
          className="mb-8 md:mb-14"
        />

        {/* Spotlight / Hero area */}
        <Reveal className="relative group">
          {/* Navigation arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Main display */}
          <div
            className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[2.2/1] rounded-3xl md:rounded-[2rem] overflow-hidden border border-white/10 cursor-pointer"
            onClick={() => setLightboxOpen(true)}
            style={{
              boxShadow:
                "0 20px 60px hsl(0 0% 0% / 0.5), 0 0 80px hsl(178 50% 42% / 0.08)",
            }}
          >
            {activeItem?.media_type === "video" ? (
              // Video thumbnail with play overlay
              <div className="relative w-full h-full bg-black">
                {activeItem.thumbnail_url && (
                  <img
                    src={activeItem.thumbnail_url}
                    alt={activeItem.title}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      isTransitioning ? "opacity-0" : "opacity-100"
                    }`}
                  />
                )}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>
            ) : (
              // Image over a blurred copy of itself so nothing important is cropped
              <div className="relative h-full w-full bg-black">
                <img
                  src={activeItem?.url ?? ""}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl"
                />
                <img
                  src={activeItem?.url ?? ""}
                  alt={activeItem?.title ?? ""}
                  className={`relative h-full w-full object-contain transition-all duration-500 ${
                    isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100"
                  }`}
                />
              </div>
            )}

            {/* Bottom gradient overlay with title */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                {activeItem?.media_type === "video" ? (
                  <Film className="w-4 h-4 text-accent" />
                ) : (
                  <Camera className="w-4 h-4 text-primary" />
                )}
                <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  {activeItem?.media_type === "video" ? "Video" : "Photo"}
                </span>
              </div>
              <h3 className="mb-1 font-display text-xl font-medium text-white sm:text-2xl md:text-4xl">
                {activeItem?.title}
              </h3>
              <p className="hidden max-w-lg text-sm text-white/60 sm:block">
                {activeItem?.description}
              </p>
            </div>

            {/* Counter badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-mono text-white/70">
              {activeIndex + 1} / {items.length}
            </div>
          </div>
        </Reveal>

        {/* Filmstrip thumbnails */}
        <div className="mt-4 relative md:mt-6">
          <div
            ref={stripRef}
            className="flex gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => selectItem(idx)}
                className={`relative flex-shrink-0 w-16 h-12 md:w-28 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  idx === activeIndex
                    ? "border-saffron ring-2 ring-saffron/30 scale-105"
                    : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                }`}
              >
                {item.media_type === "video" ? (
                  <div className="relative w-full h-full bg-black">
                    {item.thumbnail_url && (
                      <img
                        src={item.thumbnail_url}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-4 h-4 text-white" fill="white" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Active indicator bar */}
                {idx === activeIndex && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-white/10 rounded-2xl overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{activeItem?.title ?? "Media"}</DialogTitle>
            <DialogDescription>Full-screen media preview</DialogDescription>
          </DialogHeader>

          <div className="relative">
            {activeItem?.media_type === "video" && activeItem.video_embed_url ? (
              <div className="aspect-video">
                <iframe
                  src={`${activeItem.video_embed_url}?autoplay=1`}
                  title={activeItem.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={activeItem?.url ?? ""}
                  alt={activeItem?.title ?? ""}
                  className="w-full max-h-[85vh] object-contain bg-black"
                />
              </div>
            )}

            {/* Info bar */}
            <div className="p-5 bg-gradient-to-t from-black to-black/90">
              <h3 className="text-lg font-bold text-white mb-1">
                {activeItem?.title}
              </h3>
              <p className="text-sm text-white/50">{activeItem?.description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MediaShowcase;
