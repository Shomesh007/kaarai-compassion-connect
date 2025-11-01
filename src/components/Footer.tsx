import { Heart, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            <span className="text-xl font-bold font-['Poppins'] text-foreground">
              Kaarai Karangal
            </span>
          </div>
          
          <blockquote className="text-lg font-['Poppins'] italic text-primary">
            "Yaadhum Ooree, Yaavarum Kelir"
          </blockquote>
          
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
            <a 
              href="mailto:kaaraikarangal@gmail.com" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              kaaraikarangal@gmail.com
            </a>
            <a 
              href="tel:+919750807463" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91 97508 07463
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Registered NGO - Reg. No. 31/2025</p>
            <p>Based in Karaikal, Puducherry, India</p>
          </div>
          
          <div className="pt-4 border-t border-border w-full">
            <p className="text-sm text-foreground/80 font-medium">
              Together, we make compassion visible.
            </p>
          </div>
          
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kaarai Karangal. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
