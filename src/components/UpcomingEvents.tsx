import { useState } from "react";
import { CalendarDays, ChevronDown, MapPin } from "lucide-react";
import { useEvents } from "@/hooks/use-cms";
import SectionHeading from "@/components/motion/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import type { CMSEvent } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

function EventCard({ event, index }: { event: CMSEvent; index: number }) {
  const [open, setOpen] = useState(false);
  const date = new Date(event.event_date);
  const valid = !Number.isNaN(date.getTime());
  const upcoming = valid && date.getTime() >= Date.now();

  return (
    <Reveal delay={index * 0.08}>
      <article className="surface group grid overflow-hidden md:grid-cols-[14rem_1fr]">
        {/* Date tile */}
        <div className="relative flex items-center gap-5 overflow-hidden bg-gradient-to-br from-accent to-saffron p-7 text-white md:flex-col md:items-start md:justify-between md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-kolam-light" />
          {valid ? (
            <div className="relative">
              <p className="font-display text-7xl font-medium leading-none md:text-8xl">{date.getDate()}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em]">
                {date.toLocaleDateString("en-IN", { month: "long" })} {date.getFullYear()}
              </p>
            </div>
          ) : (
            <CalendarDays className="relative h-12 w-12" />
          )}
          <span className="relative rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
            {upcoming ? "Upcoming" : valid ? "Recently held" : "Event"}
          </span>
        </div>

        {/* Details */}
        <div className="p-7 sm:p-10">
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">
              <CalendarDays className="h-4 w-4" />
              {event.date_display}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
              <MapPin className="h-4 w-4" />
              {event.location}
            </span>
          </div>
          <h3 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight text-foreground text-balance sm:text-4xl">
            {event.title}
          </h3>
          <div className="relative">
            <div
              className={cn(
                "prose prose-neutral mt-5 max-w-none text-foreground/80 prose-p:leading-relaxed prose-strong:text-foreground prose-li:my-0.5 transition-[max-height] duration-700",
                open ? "max-h-[2000px]" : "max-h-44 overflow-hidden",
              )}
              dangerouslySetInnerHTML={{ __html: event.description_html }}
            />
            {!open && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />}
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
            aria-expanded={open}
          >
            {open ? "Show less" : "Read full details"}
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </button>
        </div>
      </article>
    </Reveal>
  );
}

const UpcomingEvents = () => {
  const { data: events } = useEvents();
  const items = events ?? [];
  if (items.length === 0) return null;

  return (
    <section id="upcoming-events" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Events"
          title={
            <>
              Gatherings that bring <em className="text-accent">hearts</em> together.
            </>
          }
          description="Art, service and community — come be a part of what we do next."
        />
        <div className="mt-14 space-y-8">
          {items.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
