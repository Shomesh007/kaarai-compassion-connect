import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { allImpactImageUrls } from "@/lib/impactData";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Preload impact/gallery images once when Hero becomes visible for the first time.
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = heroRef.current || document.querySelector('section[role="hero"]') || document.querySelector('section');
    if (!el || typeof IntersectionObserver === 'undefined') return;

    let triggered = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!triggered && entry.isIntersecting) {
            triggered = true;
            // Preload each image and attempt to decode so the browser caches and decodes it before dialog opens.
            try {
              (async () => {
                await Promise.allSettled(
                  allImpactImageUrls.map((url) => {
                    try {
                      const img = new Image();
                      img.src = url;
                      // return decode promise if available so we wait for the image to be decoded
                      return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
                    } catch (e) {
                      return Promise.resolve();
                    }
                  }),
                );
              })();
            } catch (e) {
              // ignore preload errors
            }
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
  <section ref={heroRef} role="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-28 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Top-centered logo (fixed within the hero area) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-20 top-16 md:top-8">
        <img src="/img/logo.jpg" alt="Kaarai Karangal logo" className="w-40 h-40 object-contain" />
      </div>

      <div className="relative max-w-4xl mx-auto space-y-10 animate-in fade-in duration-1000 z-10 text-center">
        
        {/* Organization name with gradient */}
        <h1 className="text-4xl md:text-6xl font-bold font-heading bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent leading-tight mt-8 md:mt-16">
          Kaarai Karangal
        </h1>
        
        {/* Tamil quote - prominent and stylized (removed box outline) */}
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--gradient-warm)] blur-2xl opacity-30 rounded-3xl" />
          <blockquote className="relative text-3xl md:text-5xl font-bold font-heading text-primary px-6 py-6 rounded-2xl bg-transparent backdrop-blur-sm">
            "யாதும் ஊரே யாவரும் கேளிர்"
          </blockquote>
        </div>
        
        {/* Translation */}
        <p className="text-xl md:text-2xl text-muted-foreground font-medium italic">
          All towns are our home, all people our kin
        </p>
        
        {/* Description with better typography */}
        <p className="text-base md:text-lg text-foreground/75 max-w-2xl mx-auto leading-relaxed px-4">
          Serving marginalized communities across Tamil Nadu and Puducherry through food, shelter, education, and blood donation drives.
        </p>
        
        {/* CTA buttons with enhanced styling */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            variant="donate"
            size="xl"
            onClick={() => scrollToSection('donate')}
            className="w-full sm:w-auto group relative overflow-hidden"
          >
            <span className="relative z-10">Donate Now</span>
          </Button>
          <Button
            variant="cta"
            size="xl"
            onClick={() => scrollToSection('volunteer')}
            className="w-full sm:w-auto"
          >
            Join as Volunteer
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
