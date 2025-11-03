import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative max-w-4xl mx-auto space-y-10 animate-in fade-in duration-1000 z-10">
        {/* Logo with glow effect */}
        <div className="inline-flex items-center justify-center w-24 h-24 mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border-2 border-primary/30 shadow-[var(--shadow-soft)] animate-glow">
          <Heart className="w-12 h-12 text-primary drop-shadow-lg" fill="currentColor" />
        </div>
        
        {/* Organization name with gradient */}
        <h1 className="text-4xl md:text-6xl font-bold font-heading bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent leading-tight">
          Kaarai Karangal
        </h1>
        
        {/* Tamil quote - prominent and stylized */}
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--gradient-warm)] blur-2xl opacity-30 rounded-3xl" />
          <blockquote className="relative text-3xl md:text-5xl font-bold font-heading text-primary px-6 py-8 rounded-2xl border-2 border-primary/20 bg-card/50 backdrop-blur-sm shadow-[var(--shadow-soft)]">
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
