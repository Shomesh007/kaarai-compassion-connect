import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, PieChart } from "lucide-react";

const Donate = () => {
  return (
    <section id="donate" className="py-16 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] text-center mb-8 text-foreground">
          Make a Difference
        </h2>
        
        <Card className="p-6 md:p-8 bg-[var(--gradient-card)] shadow-[var(--shadow-soft)] border-border">
          <div className="space-y-6">
            <div className="flex items-start gap-3 bg-primary/5 p-4 rounded-lg border border-primary/20">
              <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-foreground">Registered NGO</p>
                <p className="text-sm text-muted-foreground">Registration No. 31/2025</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <PieChart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-2">How Your Donation Helps</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between items-center">
                      <span>Relief & Support Programs</span>
                      <span className="font-semibold text-foreground">60%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Education & Skills Training</span>
                      <span className="font-semibold text-foreground">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Healthcare & Blood Drives</span>
                      <span className="font-semibold text-foreground">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Administrative & Operations</span>
                      <span className="font-semibold text-foreground">5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Donate via UPI or Bank Transfer</p>
                <p className="font-semibold text-foreground">Contact us for payment details</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="donate" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => window.location.href = 'mailto:kaaraikarangal@gmail.com?subject=Donation Inquiry'}
                >
                  Donate Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
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
