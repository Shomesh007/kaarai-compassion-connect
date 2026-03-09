import Hero from "@/components/Hero";
import About from "@/components/About";
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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <LatestUpdates />
      <UpcomingEvents />
      <Services />
      <DonateBloodSection />
      <MediaShowcase />
      <Donate />
      <Gallery />
      <SponsorsSection />
      <Volunteer />
      <Footer />
      <StickyDonate />
    </div>
  );
};

export default Index;
