import { useSponsors } from "@/hooks/use-cms";
import SectionHeading from "@/components/motion/SectionHeading";
import Marquee from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

export default function SponsorsSection() {
  const { data: sponsors } = useSponsors();
  const list = sponsors ?? [];
  if (list.length === 0) return null;

  return (
    <section id="sponsors" className="relative py-14 md:py-24 lg:py-28">
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
      <Reveal className="mt-8 md:mt-14">
        <Marquee duration={Math.max(list.length * 6, 30)}>
          {list.map((sponsor) => {
            const card = (
              <div className="mx-2 flex h-28 w-44 flex-col items-center justify-center gap-2 rounded-2xl md:mx-3 md:h-36 md:rounded-3xl md:gap-3 border border-border/70 bg-card px-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] sm:w-64">
                <div className="grid h-12 w-full place-items-center md:h-16">
                  {sponsor.logo_url ? (
                    <img
                      src={sponsor.logo_url}
                      alt={`${sponsor.name} logo`}
                      loading="lazy"
                      className="max-h-12 max-w-[8rem] object-contain md:max-h-16 md:max-w-[10rem] grayscale-[30%] transition duration-300 hover:grayscale-0"
                    />
                  ) : (
                    <span className="font-display text-2xl text-muted-foreground">{sponsor.name.charAt(0)}</span>
                  )}
                </div>
                <span className="line-clamp-1 text-center text-xs font-semibold text-foreground md:text-sm">{sponsor.name}</span>
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
