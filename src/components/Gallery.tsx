import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronDown, ChevronUp } from "lucide-react";

const impactCategories = [
  {
    id: 1,
    title: "ID Cards for Government School Students",
    description: "Empowering students with identity and dignity",
    images: [
      { url: "/img/id1.jpg", caption: "ID card front example — student photo and details" },
      { url: "/img/id2.jpg", caption: "ID card back example — school & contact info" },
      { url: "/img/id3.jpg", caption: "Printed sample attached to lanyard" },
      { url: "/img/id4.jpg", caption: "Batch of ID cards ready for distribution" },
    ],
  },
  {
    id: 2,
    title: "School Bags for Children in Need",
    description: "Providing school bags and supplies to help children attend school",
    images: [
      { url: "/img/bag1.jpg", caption: "School bags ready for distribution" },
      { url: "/img/bag2.jpg", caption: "Volunteers packing school supplies" },
      { url: "/img/bag3.jpg", caption: "Children receiving school bags" },
      { url: "/img/bag5.jpg", caption: "Supplies and materials inside the bags" },
    ],
  },
  {
    id: 3,
    title: "Elderly Care & Support",
    description: "Providing essentials and compassion to senior citizens",
    images: [
      { url: "/img/elder1.jpg", caption: "Home visit: health & companionship" },
      { url: "/img/elder2.jpg", caption: "Distribution of essential supplies to seniors" },
      { url: "/img/elder3.jpg", caption: "Community care activities for elderly" },
      { url: "/img/elder4.jpg", caption: "Wellness check-up program in progress" },
      { url: "/img/elder5.jpg", caption: "Volunteers assisting daily needs" },
    ],
  },
];

const Gallery = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);
  
  const visibleCategories = isExpanded ? impactCategories : impactCategories.slice(0, 2);

  // Inner component to handle per-category carousel autoplay every 3 seconds.
  const CategoryCarousel = ({ category }: { category: (typeof impactCategories)[0] }) => {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Observe whether the carousel wrapper is in viewport. Only autoplay when visible.
    useEffect(() => {
      const el = containerRef.current;
      if (!el || typeof IntersectionObserver === "undefined") return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.4));
        },
        { threshold: [0, 0.4, 0.75] },
      );

      obs.observe(el);
      return () => obs.disconnect();
    }, []);

    // Autoplay effect: only when api is available and carousel is visible
    useEffect(() => {
      if (!api || !isVisible) return;

      const interval = setInterval(() => {
        try {
          if (api.canScrollNext && api.canScrollNext()) {
            api.scrollNext();
          } else if (api.scrollTo) {
            api.scrollTo(0);
          }
        } catch (e) {
          // ignore errors
        }
      }, 3000);

      return () => clearInterval(interval);
    }, [api, isVisible]);

    return (
      <div ref={containerRef}>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full px-4 md:px-0"
          setApi={(a: CarouselApi) => setApi(a)}
        >
        <CarouselContent className="-ml-2 md:-ml-4">
          {category.images.map((image, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
              <Dialog>
                <DialogTrigger asChild>
                  <Card
                    className="overflow-hidden cursor-pointer group border-border hover:shadow-[var(--shadow-hover)] transition-all duration-300"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative aspect-square">
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white text-sm font-medium">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-lg p-0 bg-background">
                  <DialogHeader>
                    <DialogTitle>{image.caption}</DialogTitle>
                    <DialogDescription>Image preview — click close or outside to dismiss.</DialogDescription>
                  </DialogHeader>
                  <div className="relative">
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                    <div className="p-4 bg-card">
                      <p className="text-sm text-foreground">{image.caption}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 md:-left-12" />
        <CarouselNext className="-right-4 md:-right-12" />
        </Carousel>
      </div>
    );
  };

  return (
    <section id="gallery" className="py-16 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] text-center mb-4 text-foreground">
          Our Impact
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Moments of compassion in action across our communities
        </p>

        <div className="space-y-12">
          {visibleCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>

              {/* Use CategoryCarousel which handles autoplay */}
              <CategoryCarousel category={category} />
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-2"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View More Impact Stories <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
