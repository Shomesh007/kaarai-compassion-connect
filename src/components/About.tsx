import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import FounderMessageCollapse from "./FounderMessageCollapse";
import { useSiteSettings } from "@/hooks/use-cms";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: settings } = useSiteSettings();

  const founderMessage = settings?.founder_message ?? [];

  return (
    <section id="about" className="relative py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-4xl mx-auto">
        {/* Section header with accent */}
        <div className="text-center mb-12 md:hidden">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-3 relative">
              About Us
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </h2>
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-8 md:p-10 shadow-[var(--shadow-soft)] space-y-6">
          <p className="text-lg md:text-xl text-foreground/85 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
            {settings?.about_intro ?? 'Kaarai Karangal is a social service organization based at K7 Hall, No.36/6 Kennadiyar street, Karaikal 609 602, dedicated to serving marginalized communities across Tamil Nadu and Puducherry. Founded on the timeless Tamil principle of "யாதும் ஊரே யாவரும் கேளிர்" — meaning all towns are our home and all people our kin — we believe in the power of compassion to transform lives.'}
          </p>

          {isExpanded && (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
              {(settings?.about_expanded ?? []).map((paragraph, idx) => {
                // The last paragraph (registration info) gets special styling
                const isRegistration = idx === (settings?.about_expanded ?? []).length - 1;
                if (isRegistration) {
                  return (
                    <div key={idx} className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border-l-4 border-primary">
                      <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                        {paragraph}
                      </p>
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-base md:text-lg text-foreground/80 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}

              <p className="text-xl md:text-2xl font-semibold text-primary text-center pt-4">
                {settings?.about_motto ?? "Together, we make compassion visible."}
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
        {/* Founder's Message Section */}
        <div className="mt-16 flex justify-center">
          <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft)] space-y-8 border-t-4 border-primary/60 bg-gradient-to-br from-primary/5 via-background to-accent/10 max-w-3xl w-full flex flex-col items-center">
            <div className="relative w-40 h-40 md:w-56 md:h-56 mb-6">
              <img
                src={settings?.founder_image_url ?? "/img/founder.jpg"}
                alt="Founder"
                className="absolute inset-x-0 top-8 w-full h-[96%] md:h-[96%] rounded-full object-cover border-4 border-primary shadow-xl"
                style={{ objectPosition: 'center 20%' }}
                loading="lazy"
              />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-primary font-heading mb-2 text-center">
              Founder's Message
            </h3>
            <blockquote className="text-xl md:text-2xl italic text-primary text-center font-semibold mb-4">
              "{settings?.founder_quote ?? "When compassion becomes action, humanity blossoms."}"
            </blockquote>
            {/* Founder Message Collapsible for Mobile */}
            <div className="text-lg md:text-xl text-foreground/85 leading-relaxed space-y-4 text-center">
              {/* Mobile: Collapsible */}
              <div className="block md:hidden">
                <FounderMessageCollapse paragraphs={founderMessage} />
              </div>
              {/* Desktop: Always expanded */}
              <div className="hidden md:block">
                {founderMessage.map((paragraph, idx) => {
                  // First paragraph: bold greeting
                  if (idx === 0) {
                    return (
                      <p key={idx}>
                        <span className="font-bold text-primary">{paragraph}</span>
                      </p>
                    );
                  }
                  // Last paragraph: semibold centered
                  if (idx === founderMessage.length - 1) {
                    return (
                      <p key={idx} className="font-semibold text-primary text-center pt-2">
                        {paragraph}
                      </p>
                    );
                  }
                  return <p key={idx}>{paragraph}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
