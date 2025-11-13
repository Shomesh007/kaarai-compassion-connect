import React from "react";

const sponsors = [
  { name: "Sekar textiles", logo: "" },
  { name: "Fittness zone unisex gym", logo: "" },
  { name: "Zen health care clinic", logo: "" },
  { name: "Kaarai raman creations", logo: "" },
  { name: "NGV fabrication", logo: "" },
  { name: "Thaai decors", logo: "" },
];

export default function SponsorsSection() {
  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-8">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-3 relative">
            Our Supporting Sponsors
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {sponsors.map((sponsor, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white/60 rounded-2xl shadow p-6 min-w-[140px] max-w-[200px] transition hover:scale-105"
            >
              <div className="w-20 h-20 mb-4 bg-secondary/20 rounded-full flex items-center justify-center overflow-hidden">
                {/* Logo placeholder, replace src with actual logo path */}
                {sponsor.logo ? (
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name + ' logo'}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-secondary text-2xl font-bold">Logo</span>
                )}
              </div>
              <span className="text-lg font-semibold text-primary">{sponsor.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}