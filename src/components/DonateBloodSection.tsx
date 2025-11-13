import React from "react";

export default function DonateBloodSection() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-red-100 via-white to-accent/10 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="glass-effect rounded-3xl p-10 md:p-14 shadow-[var(--shadow-soft)] border-4 border-red-400/30 bg-white/60 backdrop-blur-lg relative z-20">
          <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-red-600 via-primary to-accent bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Donate Blood, Save Lives
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full mb-8" />
          <p className="text-lg md:text-xl text-foreground/85 mb-6 leading-relaxed">
            Every drop donated is a gift of life. Blood donation supports patients in emergencies, surgeries, and chronic illnesses. By volunteering, you become a hero in someone’s story and inspire a wave of compassion.
          </p>
          <p className="text-md md:text-lg text-muted-foreground mb-8">
            Volunteering for blood donation strengthens community bonds and builds a culture of care. Your contribution matters—be the reason someone gets a second chance.
          </p>
          <a
            href="https://kaaraikarangal.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-red-600 via-primary to-accent text-white font-semibold px-10 py-4 rounded-xl shadow-lg transition-all duration-300 scale-100 hover:scale-105 hover:shadow-xl hover:ring-4 hover:ring-red-400/40 hover:ring-offset-2 hover:ring-offset-white"
          >
            Volunteer to Donate Blood
          </a>
        </div>
        {/* Floating blurred accent shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
}