import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const StickyDonate = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToDonate = () => {
    const element = document.getElementById('donate');
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <Button
        variant="donate"
        size="lg"
        onClick={scrollToDonate}
        className="shadow-lg hover:shadow-xl gap-2"
      >
        <Heart className="w-5 h-5" fill="currentColor" />
        Donate
      </Button>
    </div>
  );
};

export default StickyDonate;
