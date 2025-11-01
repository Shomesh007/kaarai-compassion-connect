import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Donate from "@/components/Donate";
import Fundraising from "@/components/Fundraising";
import Gallery from "@/components/Gallery";
import Volunteer from "@/components/Volunteer";
import Footer from "@/components/Footer";
import StickyDonate from "@/components/StickyDonate";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Donate />
      <Fundraising />
      <Gallery />
      <Volunteer />
      <Footer />
      <StickyDonate />
    </div>
  );
};

export default Index;
