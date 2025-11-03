import { Card } from "@/components/ui/card";
import { Utensils, Home, Droplet, BookOpen, Users } from "lucide-react";

const services = [
  {
    icon: Utensils,
    title: "Food & Hunger Relief",
    description: "Daily meal distribution and emergency food support for those in need",
  },
  {
    icon: Home,
    title: "Shelter & Emergency Support",
    description: "Temporary housing and crisis intervention for vulnerable families",
  },
  {
    icon: Droplet,
    title: "Blood Donation Drives",
    description: "Regular blood donation camps saving lives in our communities",
  },
  {
    icon: BookOpen,
    title: "Education Support",
    description: "Scholarships and learning materials for underprivileged students",
  },
  {
    icon: Users,
    title: "Community Welfare",
    description: "Health camps, skills training, and community development programs",
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-20 px-4 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-card/50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4 relative">
              What We Do
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
            </h2>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
            Our comprehensive programs touch lives across communities, bringing hope and support to those who need it most
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative p-8 glass-effect hover:bg-card transition-all duration-500 border-2 border-transparent hover:border-primary/20 cursor-pointer overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-[var(--gradient-warm)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex flex-col items-center text-center space-y-5 z-10">
                {/* Icon with animated background */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border-2 border-primary/20">
                    <service.icon className="w-10 h-10 text-primary group-hover:text-accent transition-colors duration-500" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
