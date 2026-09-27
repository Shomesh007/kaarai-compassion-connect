import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Services from "@/components/Services";
import Donate from "@/components/Donate";
import Gallery from "@/components/Gallery";
import Volunteer from "@/components/Volunteer";
import DonateBloodSection from "@/components/DonateBloodSection";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";
import StickyDonate from "@/components/StickyDonate";
import UpcomingEvents from "@/components/UpcomingEvents";
import LatestUpdates from "@/components/LatestUpdates";
import MediaShowcase from "@/components/MediaShowcase";
import Team from "@/components/Team";
import MobileNav from "@/components/layout/MobileNav";
import { scrollToId } from "@/lib/navigation";

const Index = () => {
  const { hash } = useLocation();

  // Support deep links like /#donate (also used when navigating back from /credits)
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => scrollToId(hash.slice(1)), 120);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Founder />
        <Services />
        <LatestUpdates />
        <UpcomingEvents />
        <DonateBloodSection />
        <Gallery />
        <MediaShowcase />
        <Donate />
        <Team />
        <SponsorsSection />
        <Volunteer />
      </main>
      <Footer />
      <StickyDonate />
      <MobileNav />
    </div>
  );
};

export default Index;
