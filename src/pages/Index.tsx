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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <DonateBloodSection />
      <Donate />
      <Gallery />
      <Volunteer />
      {/* Sponsors section inserted below Join Our Mission */}
      {/*
        Place this section before Footer to show sponsors with logo placeholders.
        You can update logo paths in SponsorsSection.tsx when available.
      */}
      <SponsorsSection />
      <Footer />
      <StickyDonate />
    </div>
  );
};

export default Index;
