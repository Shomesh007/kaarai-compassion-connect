import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="py-16 px-4 bg-card">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] text-center mb-8 text-foreground">
          About Us
        </h2>
        
        <div className="space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed">
          <p>
            Kaarai Karangal is a social service organization based in Karaikal, Puducherry, dedicated to serving marginalized communities across Tamil Nadu and Puducherry. Founded on the timeless Tamil principle of "Yaadhum Ooree, Yaavarum Kelir" — meaning all towns are our home and all people our kin — we believe in the power of compassion to transform lives.
          </p>
          
          {isExpanded && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <p>
                Our journey began with a simple idea: that every person deserves dignity, care, and opportunity regardless of their circumstances. What started as small community gatherings to provide meals has grown into a comprehensive social welfare initiative touching thousands of lives.
              </p>
              
              <p>
                We are driven by the belief that real change happens when communities come together. Through our various programs — from hunger relief to education support, from emergency shelter to blood donation drives — we unite people from all walks of life in acts of service and compassion.
              </p>
              
              <p>
                Registered NGO (Reg. No. 31/2025), Kaarai Karangal operates with complete transparency and accountability. Every contribution goes directly toward serving those in need, building a society where compassion is visible and tangible.
              </p>
              
              <p className="font-semibold text-primary">
                Together, we make compassion visible.
              </p>
            </div>
          )}
          
          <div className="flex justify-center pt-4">
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2"
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
