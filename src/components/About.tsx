import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="relative py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-4xl mx-auto">
        {/* Section header with accent */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-3 relative">
              About Us
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </h2>
          </div>
        </div>
        
        <div className="glass-effect rounded-3xl p-8 md:p-10 shadow-[var(--shadow-soft)] space-y-6">
          <p className="text-lg md:text-xl text-foreground/85 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
            Kaarai Karangal is a social service organization based in Karaikal, Puducherry, dedicated to serving marginalized communities across Tamil Nadu and Puducherry. Founded on the timeless Tamil principle of "யாதும் ஊரே யாவரும் கேளிர்" — meaning all towns are our home and all people our kin — we believe in the power of compassion to transform lives.
          </p>
          
          {isExpanded && (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                Our journey began with a simple idea: that every person deserves dignity, care, and opportunity regardless of their circumstances. What started as small community gatherings to provide meals has grown into a comprehensive social welfare initiative touching thousands of lives.
              </p>
              
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                We are driven by the belief that real change happens when communities come together. Through our various programs — from hunger relief to education support, from emergency shelter to blood donation drives — we unite people from all walks of life in acts of service and compassion.
              </p>
              
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border-l-4 border-primary">
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  Registered NGO (Reg. No. 31/2025 — Registered on fourth february 2025), Kaarai Karangal operates with complete transparency and accountability. Every contribution goes directly toward serving those in need, building a society where compassion is visible and tangible.
                </p>
              </div>
              
              <p className="text-xl md:text-2xl font-semibold text-primary text-center pt-4">
                Together, we make compassion visible.
              </p>
            </div>
          )}
          
          <div className="flex justify-center pt-6">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2 rounded-full px-8 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Read More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
