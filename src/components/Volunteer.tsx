import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import toast hook removed - using dialog confirmation instead of mailto/toast
import { Mail, Phone, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { contact } from "../lib/impactData";

const Volunteer = () => {
  // confirmation dialog will be shown on submit
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
  });
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  // Open confirmation dialog and reset form
  setSuccessOpen(true);
  setFormData({ name: "", phone: "", email: "", interest: "" });
  };

  return (
    <section id="volunteer" className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-card" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" />
      
      <div className="relative max-w-5xl mx-auto z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4 relative">
              Join Our Mission
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </h2>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
            Become a volunteer and help us make compassion visible in our communities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Signup form */}
          <Card className="p-8 glass-effect shadow-[var(--shadow-soft)] border-2 border-primary/10 rounded-3xl">
            <h3 className="text-2xl font-bold font-heading mb-6 text-foreground flex items-center gap-2">
              <span className="w-2 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
              Quick Signup
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone"
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interest">Area of Interest</Label>
                <Textarea
                  id="interest"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  placeholder="Food distribution, education, healthcare, etc."
                  className="bg-background min-h-20"
                />
              </div>
              
              <Button type="submit" variant="donate" size="lg" className="w-full group relative overflow-hidden">
                <span className="relative z-10">Become a Volunteer</span>
              </Button>
            </form>
          </Card>
          
          {/* Contact info */}
          <Card className="p-8 glass-effect shadow-[var(--shadow-soft)] border-2 border-accent/10 rounded-3xl">
            <h3 className="text-2xl font-bold font-heading mb-6 text-foreground flex items-center gap-2">
              <span className="w-2 h-8 bg-gradient-to-b from-accent to-primary rounded-full" />
              Get in Touch
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-1">Email</p>
                    <a 
                      href="mailto:kaaraikarangal@gmail.com"
                      className="text-sm text-primary hover:text-accent transition-colors"
                    >
                      kaaraikarangal@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-accent/10 to-accent/5 border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground mb-1">Phone</p>
                    <a
                      href={`tel:${contact.tel}`}
                      className="text-sm text-accent hover:text-primary transition-colors"
                    >
                      {contact.display}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t-2 border-border/50">
                <h4 className="font-bold text-lg text-foreground mb-2">Partner With Us</h4>
                <p className="text-sm text-muted-foreground mb-5">
                  Organizations interested in collaboration can reach out to us directly.
                </p>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-2 hover:border-accent hover:bg-accent/5 transition-all duration-300"
                  onClick={() => window.location.href = 'mailto:kaaraikarangal@gmail.com?subject=Partnership Inquiry'}
                >
                  Partner Inquiry
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Success dialog shown after signup */}
          <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
            <DialogContent className="w-full max-w-xs sm:max-w-md mx-auto p-0 bg-transparent border-none shadow-none">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/30 animate-in fade-in duration-500"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18)"
                }}>
                {/* Decorative floating accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30 rounded-full blur-2xl opacity-60 pointer-events-none" />
                <div className="px-6 pt-8 pb-4 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg mb-2 animate-bounce-slow">
                    <CheckCircle className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-primary mb-2 text-center drop-shadow-sm">Thank You for Joining!</DialogTitle>
                  <DialogDescription className="text-base text-foreground/90 text-center mb-2">
                    Your registration as a volunteer is successful.<br />
                    We’ll reach out soon with next steps.<br />
                    <span className="block text-accent mt-2 font-semibold">Together, we make compassion visible.</span>
                  </DialogDescription>
                </div>
                <div className="px-6 pb-8 pt-3">
                  <p className="text-sm text-muted-foreground text-center">
                    For urgent queries, call us at <a className="text-primary font-semibold" href={`tel:${contact.tel}`}>{contact.display}</a>.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <DialogClose asChild>
                      <Button variant="donate" className="px-8 rounded-full shadow-lg">Close</Button>
                    </DialogClose>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;
