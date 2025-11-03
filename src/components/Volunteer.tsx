import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import toast hook removed - using dialog confirmation instead of mailto/toast
import { Mail, Phone, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

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
                      href="tel:+919750807463"
                      className="text-sm text-accent hover:text-primary transition-colors"
                    >
                      +91 97508 07463
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
            <DialogContent className="w-[92%] sm:w-auto sm:max-w-sm p-0 bg-transparent">
              <div className="bg-card rounded-3xl shadow-xl overflow-hidden">
                <div className="px-6 pt-6 pb-4 flex items-start gap-4 bg-gradient-to-r from-primary/10 to-accent/10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md flex-shrink-0">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-lg font-semibold text-foreground">Registration Successful</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">Thank you for registering as a volunteer. We will contact you soon with next steps.</DialogDescription>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3">
                  <p className="text-sm text-muted-foreground">If you have any urgent queries, reach us at <a className="text-primary" href="tel:+919750807463">+91 97508 07463</a>.</p>
                  <div className="mt-5 flex justify-end">
                    <DialogClose asChild>
                      <Button variant="donate" className="px-6">Close</Button>
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
