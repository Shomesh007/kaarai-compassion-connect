import React from "react";
import { useEvents } from "@/hooks/use-cms";

const UpcomingEvents = () => {
  const { data: events } = useEvents();

  return (
    <section id="upcoming-events" className="py-20 px-4 bg-gradient-to-b from-secondary/10 to-background/80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:hidden">
          <h2 className="text-4xl font-bold font-heading text-accent mb-3 relative">
            Upcoming Events
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          </h2>
        </div>
        <div className="space-y-12">
          {(events ?? []).map((event) => (
            <div
              key={event.id}
              className="glass-effect rounded-3xl p-8 md:p-10 shadow-[var(--shadow-soft)] border-l-4 border-accent/60 bg-gradient-to-br from-accent/5 via-background to-primary/10"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                {event.title}
              </h3>
              <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-4 text-muted-foreground text-base md:text-lg">
                <span className="inline-block mb-1 md:mb-0">
                  <span className="font-semibold text-accent">{event.date_display}</span>
                </span>
                <span className="inline-block">
                  <span className="font-semibold text-primary">{event.location}</span>
                </span>
              </div>
              <div
                className="text-foreground/90 text-base md:text-lg leading-relaxed prose prose-primary max-w-none"
                dangerouslySetInnerHTML={{ __html: event.description_html }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
