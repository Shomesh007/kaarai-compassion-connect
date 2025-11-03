import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-card to-secondary/20 border-t-2 border-primary/10 py-16 px-4 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-5xl mx-auto space-y-10 z-10">
        <div className="text-center space-y-6">
          {/* Logo and name */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-primary/30 mt-1">
              <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            </div>
            <h3 className="text-3xl font-bold font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Kaarai Karangal
            </h3>
          </div>
          
          {/* Tamil quote */}
          <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/20">
            <p className="text-xl md:text-2xl font-bold text-primary">
              "யாதும் ஊரே யாவரும் கேளிர்"
            </p>
          </div>
        </div>
        
        {/* Contact and info grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="glass-effect rounded-2xl p-6 space-y-4 border-2 border-primary/10">
            <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
              Contact Us
            </h4>
            <div className="space-y-3 text-sm">
              <a 
                href="mailto:kaaraikarangal@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                kaaraikarangal@gmail.com
              </a>
              <a 
                href="tel:+919750807463"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                +91 97508 07463
              </a>
            </div>
          </div>
          
          <div className="glass-effect rounded-2xl p-6 space-y-4 border-2 border-accent/10">
            <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-accent to-primary rounded-full" />
              Our Presence
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                Karaikal, Puducherry
              </div>
              <div className="pl-11">
                <p className="text-xs font-semibold text-primary">
                  Registered NGO - Reg. No. 31/2025 — Registered on fourth february 2025
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="pt-8 border-t-2 border-primary/10 text-center space-y-4">
          <p className="text-lg md:text-xl font-semibold text-primary">
            Together, we make compassion visible.
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kaarai Karangal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
