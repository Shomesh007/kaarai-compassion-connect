import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import FounderMessageCollapse from "./FounderMessageCollapse";

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
            Kaarai Karangal is a social service organization based at K7 Hall, No.36/6 Kennadiyar street, Karaikal 609 602, dedicated to serving marginalized communities across Tamil Nadu and Puducherry. Founded on the timeless Tamil principle of "யாதும் ஊரே யாவரும் கேளிர்" — meaning all towns are our home and all people our kin — we believe in the power of compassion to transform lives.
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
        {/* Founder’s Message Section */}
        <div className="mt-16 flex justify-center">
          <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft)] space-y-8 border-t-4 border-primary/60 bg-gradient-to-br from-primary/5 via-background to-accent/10 max-w-3xl w-full flex flex-col items-center">
            <div className="relative w-40 h-40 md:w-56 md:h-56 mb-6">
              <img
                src="/img/founder.jpg"
                alt="Founder"
                className="absolute inset-x-0 top-8 w-full h-[96%] md:h-[96%] rounded-full object-cover border-4 border-primary shadow-xl"
                style={{ objectPosition: 'center 20%' }}
                loading="lazy"
              />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-primary font-heading mb-2 text-center">
              Founder’s Message
            </h3>
            <blockquote className="text-xl md:text-2xl italic text-primary text-center font-semibold mb-4">
              “When compassion becomes action, humanity blossoms.”
            </blockquote>
            {/* Founder Message Collapsible for Mobile */}
            <div className="text-lg md:text-xl text-foreground/85 leading-relaxed space-y-4 text-center">
              {/* Mobile: Collapsible */}
              <div className="block md:hidden">
                <FounderMessageCollapse />
              </div>
              {/* Desktop: Always expanded */}
              <div className="hidden md:block">
                <p>
                  <span className="font-bold text-primary">Vanakkam and warm greetings to all!</span>
                </p>
                <p>
                  The story of Kaarai Karangal Social Service Organization began with a heartfelt dream — a dream to build a community where kindness flows freely and every helping hand becomes a source of hope. From humble beginnings, we have grown into a family bound by compassion, selflessness, and an unwavering commitment to serve humanity.
                </p>
                <p>
                  The inspiration behind Karai Karangal came from witnessing the silent struggles of people around us — those who needed help, comfort, and a sense of belonging. I realized that change begins not with wealth or power, but with a single thought: <span className="italic text-primary">“How can I make someone’s life better today?”</span> That thought became our mission.
                </p>
                <p>
                  Over the years, we have worked passionately in areas such as blood donation, healthcare support, education assistance, environmental awareness, and community welfare. Each initiative reflects our belief that <span className="font-semibold text-primary">“service to others is the purest form of love.”</span> We are not just an organization — we are a movement of hearts determined to make the world a kinder place.
                </p>
                <p>
                  Every drop of blood donated, every meal shared, and every smile restored reminds us why we started this journey. It’s not about recognition or rewards; it’s about humanity — about standing together when someone needs us the most.
                </p>
                <p>
                  As the founder, I feel deeply humbled and grateful for all our volunteers, supporters, and well-wishers who continue to strengthen this mission. You are the true pillars of Kaarai Karangal. Together, we can continue to light lives, spread hope, and prove that compassion still reigns in this world.
                </p>
                <p className="font-semibold text-primary text-center pt-2">
                  Let us join hands to keep this spirit alive — because when hearts unite in service, miracles happen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
