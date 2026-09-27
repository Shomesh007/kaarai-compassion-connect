import { Link } from "react-router-dom";
import { ArrowUpRight, Facebook, Heart, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-cms";
import { NAV_LINKS, useGoToSection } from "@/lib/navigation";
import { Reveal } from "@/components/motion/Reveal";

export const CREDIT_URL = "https://www.builtbygsv.in";

const Footer = () => {
  const { data: settings } = useSiteSettings();
  const goTo = useGoToSection();

  const orgName = settings?.org_name ?? "Kaarai Karangal";
  const email = settings?.email ?? "kaaraikarangal@gmail.com";
  const phoneTel = settings?.phone_tel ?? "+918220573306";
  const phoneDisplay = settings?.phone_display ?? "+91 82205 73306";
  const address = settings?.address ?? "K7 Hall, No.36/6 Kennadiyar street, Karaikal 609 602.";
  const instagramUrl = settings?.instagram_url ?? "";
  const facebookUrl = settings?.facebook_url ?? "";
  const taglineTamil = settings?.tagline_tamil ?? "யாதும் ஊரே யாவரும் கேளிர்";
  const registrationInfo = settings?.registration_info ?? "Registered NGO - Reg. No. 31/2025";
  const motto = settings?.about_motto ?? "Together, we make compassion visible.";

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-kolam-light opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />

      {/* CTA band */}
      <div className="relative mx-auto max-w-7xl px-5 pt-14 sm:px-8 md:pt-28">
        <Reveal className="flex flex-col items-start justify-between gap-7 border-b border-white/10 pb-10 md:gap-10 md:pb-16 lg:flex-row lg:items-end">
          <div>
            <p className="font-tamil text-lg text-saffron sm:text-2xl">{taglineTamil}</p>
            <h2 className="mt-3 max-w-3xl font-display text-[2rem] font-medium leading-[1.05] tracking-tight sm:text-6xl md:mt-4">
              {motto}
            </h2>
          </div>
          <div className="grid w-full grid-cols-2 gap-2.5 sm:flex sm:w-auto sm:gap-3">
            <button
              onClick={() => goTo("donate")}
              className="btn-shine inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-8 font-semibold text-accent-foreground md:h-14"
            >
              <Heart className="h-5 w-5" fill="currentColor" /> Donate
            </button>
            <button
              onClick={() => goTo("volunteer")}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-8 font-semibold md:h-14 transition-colors hover:bg-white hover:text-ink"
            >
              Volunteer
            </button>
          </div>
        </Reveal>
      </div>

      {/* Columns */}
      <div className="relative mx-auto grid max-w-7xl gap-9 px-5 py-10 sm:px-8 md:grid-cols-2 md:gap-12 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white">
              <img src={settings?.logo_url ?? "/img/logo.jpg"} alt="" className="h-11 w-11 object-contain" />
            </span>
            <span className="font-display text-2xl font-medium">{orgName}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{registrationInfo}</p>
          <div className="mt-6 flex gap-3">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-transparent hover:bg-gradient-to-br hover:from-accent hover:to-saffron"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-transparent hover:bg-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <nav className="lg:col-span-3" aria-label="Footer">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Explore</h3>
          <ul className="mt-4 grid grid-cols-3 gap-x-4 gap-y-3 text-sm md:mt-5 md:grid-cols-2 lg:grid-cols-1">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button onClick={() => goTo(l.id)} className="text-white/70 transition-colors hover:text-saffron">
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <Link to="/credits" className="text-white/70 transition-colors hover:text-saffron">
                Credits
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-2 lg:col-span-5">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Get in touch</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-white/70 transition-colors hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-saffron" /> {email}
              </a>
            </li>
            <li>
              <a href={`tel:${phoneTel}`} className="flex items-center gap-3 text-white/70 transition-colors hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-saffron" /> {phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" /> {address}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 pb-28 pt-6 text-center text-xs text-white/50 sm:px-8 md:flex-row md:pb-6 md:text-sm">
          <p>
            © {new Date().getFullYear()} {orgName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            Designed &amp; developed by
            <a
              href={CREDIT_URL}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-1 font-semibold text-white transition-colors hover:text-saffron"
            >
              builtbygsv.in
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <span aria-hidden="true">·</span>
            <Link to="/credits" className="underline-offset-4 hover:text-white hover:underline">
              Credits
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
