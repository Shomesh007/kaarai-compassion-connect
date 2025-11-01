import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--gradient-hero)] text-center">
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-1000">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-primary/10">
          <Heart className="w-10 h-10 text-primary" fill="currentColor" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold font-['Poppins'] text-foreground">
          Kaarai Karangal
        </h1>
        
        <blockquote className="text-2xl md:text-3xl font-['Poppins'] font-semibold text-primary italic border-l-4 border-primary pl-4 py-2">
          "Yaadhum Ooree, Yaavarum Kelir"
        </blockquote>
        
        <p className="text-lg md:text-xl text-muted-foreground">
          All towns are our home, all people our kin
        </p>
        
        <p className="text-base md:text-lg text-foreground/80 max-w-xl mx-auto leading-relaxed">
          Serving marginalized communities across Tamil Nadu and Puducherry through food, shelter, education, and blood donation drives.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            variant="donate" 
            size="xl"
            onClick={() => scrollToSection('donate')}
            className="w-full sm:w-auto"
          >
            Donate Now
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
