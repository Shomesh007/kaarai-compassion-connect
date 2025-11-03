import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, PieChart } from "lucide-react";

const Donate = () => {
  return (
    <section id="donate" className="relative py-20 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-secondary/30" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="relative max-w-4xl mx-auto z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-3 relative">
              Make a Difference
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mt-6">Your support transforms lives</p>
        </div>
        
        <Card className="p-8 md:p-12 glass-effect shadow-[var(--shadow-strong)] border-2 border-primary/10 rounded-3xl">
          <div className="space-y-8">
            {/* Trust badge */}
            <div className="flex items-start gap-4 bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-2xl border-2 border-primary/20">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-lg text-foreground">Registered NGO</p>
                <p className="text-sm text-muted-foreground">Registration No. 31/2025</p>
              </div>
            </div>
            
            {/* Funding breakdown */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-accent" />
                </div>
                <p className="text-xl font-bold text-foreground">How Your Donation Helps</p>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Relief & Support Programs', percent: 60, color: 'primary' },
                  { label: 'Education & Skills Training', percent: 20, color: 'accent' },
                  { label: 'Healthcare & Blood Drives', percent: 15, color: 'primary' },
                  { label: 'Administrative & Operations', percent: 5, color: 'muted' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-foreground">{item.label}</span>
                      <span className="font-bold text-primary">{item.percent}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA section */}
            <div className="pt-6 space-y-6">
              <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-6 rounded-2xl text-center border border-primary/10">
                <p className="text-sm text-muted-foreground mb-2">Donate via UPI or Bank Transfer</p>
                <p className="text-lg font-bold text-foreground">Contact us for payment details</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="donate" 
                  size="lg" 
                  className="flex-1 group relative overflow-hidden"
                  onClick={() => window.location.href = 'mailto:kaaraikarangal@gmail.com?subject=Donation Inquiry'}
                >
                  <span className="relative z-10">Donate Now</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1 border-2 hover:border-primary hover:bg-primary/5"
                  onClick={() => window.location.href = 'tel:+919750807463'}
                >
                  Call to Donate
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Donate;
