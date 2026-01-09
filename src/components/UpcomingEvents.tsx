import React from "react";

const events = [
  {
    title: "Where Strings Meet Souls — A New Chapter in the Art of Puppetry",
    date: "22nd February 2026, 6:00 PM",
    location: "Karaikal Beach",
    description: (
      <>
        <p className="text-base md:text-lg text-foreground/90 mb-4">
          On <span className="font-semibold text-primary">22nd February 2026, at 6:00 PM</span>, the serene shores of Karaikal Beach will transform into a living stage for an extraordinary artistic experience.
        </p>
        <p className="mb-4">
          <span className="font-semibold text-primary">Kaarai Karangal Social Service Organization</span>, in its continued journey of nurturing art with purpose, proudly presents a unique puppetry performance by <span className="font-semibold text-accent">Kaarai Raman Creations</span> — a show that gently breaks boundaries and redefines tradition.
        </p>
        <p className="mb-4">
          <span className="italic">This is not a usual puppetry show.</span> Here, puppets do not remain confined to strings or silence. They move with life, dance with human performers, and share the stage as equals. Humans and puppets respond to each other — not as controller and controlled — but as co-artists, breathing emotion, rhythm, and storytelling together.
        </p>
        <div className="my-4 px-4 py-3 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-l-4 border-primary">
          <div className="font-semibold text-lg text-primary mb-2">✨ The novelty of this puppetry art lies in its union:</div>
          <ul className="list-disc pl-6 text-foreground/90 space-y-1">
            <li>Where wood and flesh dance in harmony</li>
            <li>Where art transcends age, language, and form</li>
            <li>Where imagination gently reminds us that life exists even in the smallest movements</li>
          </ul>
        </div>
        <p className="mb-4">
          Set against the timeless rhythm of the sea, this performance is a celebration of creativity, sensitivity, and human connection. It reflects how art can dissolve boundaries — between the living and the crafted, between tradition and innovation, between the performer and the audience.
        </p>
        <p className="mb-4">
          Through this presentation, Kaarai Karangal continues its mission of bringing meaningful art to the community — art that touches hearts, inspires minds, and preserves cultural roots while allowing them to grow in new directions.
        </p>
        <p className="font-semibold text-accent text-center text-lg mt-6">
          🌟 Come, witness puppetry not as you have seen before — but as you have never imagined.
        </p>
      </>
    ),
  },
];

const UpcomingEvents = () => {
  return (
    <section id="upcoming-events" className="py-20 px-4 bg-gradient-to-b from-secondary/10 to-background/80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-accent mb-3 relative">
            Upcoming Events
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          </h2>
        </div>
        <div className="space-y-12">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="glass-effect rounded-3xl p-8 md:p-10 shadow-[var(--shadow-soft)] border-l-4 border-accent/60 bg-gradient-to-br from-accent/5 via-background to-primary/10"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                {event.title}
              </h3>
              <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-4 text-muted-foreground text-base md:text-lg">
                <span className="inline-block mb-1 md:mb-0">
                  <span className="font-semibold text-accent">{event.date}</span>
                </span>
                <span className="inline-block">
                  <span className="font-semibold text-primary">{event.location}</span>
                </span>
              </div>
              <div className="text-foreground/90 text-base md:text-lg leading-relaxed">
                {event.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
