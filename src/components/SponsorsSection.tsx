import { useSponsors } from "@/hooks/use-cms";
import SectionHeading from "@/components/motion/SectionHeading";
import Marquee from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

export default function SponsorsSection() {
  const { data: sponsors } = useSponsors();
  const list = sponsors ?? [];
  if (list.length === 0) return null;

  return (
    <section id="sponsors" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Supporting sponsors"
          title={
            <>
              Partners in <em className="text-accent">kindness</em>.
            </>
          }
          description="Local businesses and institutions who stand with us to serve the community."
        />
      </div>
      <Reveal className="mt-14">
        <Marquee duration={Math.max(list.length * 6, 30)}>
          {list.map((sponsor) => {
            const card = (
              <div className="mx-3 flex h-36 w-56 flex-col items-center justify-center gap-3 rounded-3xl border border-border/70 bg-card px-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] sm:w-64">
                <div className="grid h-16 w-full place-items-center">
                  {sponsor.logo_url ? (
                    <img
                      src={sponsor.logo_url}
                      alt={`${sponsor.name} logo`}
                      loading="lazy"
                      className="max-h-16 max-w-[10rem] object-contain grayscale-[30%] transition duration-300 hover:grayscale-0"
                    />
                  ) : (
                    <span className="font-display text-2xl text-muted-foreground">{sponsor.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-center text-sm font-semibold text-foreground">{sponsor.name}</span>
              </div>
            );
            return sponsor.website_url ? (
              <a key={sponsor.id} href={sponsor.website_url} target="_blank" rel="noopener noreferrer">
                {card}
              </a>
            ) : (
              <div key={sponsor.id}>{card}</div>
            );
          })}
        </Marquee>
      </Reveal>
    </section>
  );
}
