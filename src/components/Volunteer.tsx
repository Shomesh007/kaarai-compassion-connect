import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone } from "lucide-react";

const Volunteer = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent("Volunteer Application - Kaarai Karangal");
    const body = encodeURIComponent(`
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Area of Interest: ${formData.interest}

I would like to volunteer with Kaarai Karangal.
    `);
    
    window.location.href = `mailto:kaaraikarangal@gmail.com?subject=${subject}&body=${body}`;
    
    toast({
      title: "Thank you for your interest!",
      description: "We'll be in touch with you soon.",
    });
    
    setFormData({ name: "", phone: "", email: "", interest: "" });
  };

  return (
    <section id="volunteer" className="py-16 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] text-center mb-4 text-foreground">
          Join Our Mission
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Become a volunteer and help us make compassion visible in our communities
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-[var(--gradient-card)] shadow-[var(--shadow-soft)] border-border">
            <h3 className="text-xl font-semibold font-['Poppins'] mb-4 text-foreground">
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
              
              <Button type="submit" variant="donate" size="lg" className="w-full">
                Become a Volunteer
              </Button>
            </form>
          </Card>
          
          <Card className="p-6 bg-[var(--gradient-card)] shadow-[var(--shadow-soft)] border-border">
            <h3 className="text-xl font-semibold font-['Poppins'] mb-4 text-foreground">
              Get in Touch
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">Email</p>
                    <a 
                      href="mailto:kaaraikarangal@gmail.com"
                      className="text-sm text-primary hover:underline"
                    >
                      kaaraikarangal@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">Phone</p>
                    <a 
                      href="tel:+919750807463"
                      className="text-sm text-primary hover:underline"
                    >
                      +91 97508 07463
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold text-sm text-foreground mb-2">Partner With Us</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Organizations interested in collaboration can reach out to us directly.
                </p>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => window.location.href = 'mailto:kaaraikarangal@gmail.com?subject=Partnership Inquiry'}
                >
                  Partner Inquiry
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;
