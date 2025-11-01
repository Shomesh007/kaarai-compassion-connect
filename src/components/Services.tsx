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
    <section id="services" className="py-16 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] text-center mb-4 text-foreground">
          What We Do
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Our comprehensive programs address the most pressing needs of marginalized communities
        </p>
        
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 min-w-min md:min-w-0">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="flex-shrink-0 w-72 md:w-auto p-6 bg-[var(--gradient-card)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-1 border-border"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold font-['Poppins'] text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
