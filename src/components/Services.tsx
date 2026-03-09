import { Card } from "@/components/ui/card";
import { Utensils, Home, Droplet, BookOpen, Users, Heart, type LucideIcon } from "lucide-react";
import { useServices } from "@/hooks/use-cms";

/** Map icon name strings from CMS to actual Lucide icon components */
const iconMap: Record<string, LucideIcon> = {
  Utensils,
  Home,
  Droplet,
  BookOpen,
  Users,
  Heart,
};

const Services = () => {
  const { data: services } = useServices();

  return (
    <section id="services" className="py-16 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="md:hidden">
          <h2 className="text-3xl font-bold font-['Poppins'] text-center mb-4 text-foreground">
            What We Do
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our comprehensive programs address the most pressing needs of marginalized communities
          </p>
        </div>

        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 min-w-min md:min-w-0">
            {(services ?? []).map((service, index) => {
              const Icon = iconMap[service.icon_name] ?? Heart;
              return (
                <Card
                  key={service.id ?? index}
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
