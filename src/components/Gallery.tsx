import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronDown, ChevronUp } from "lucide-react";

const impactCategories = [
  {
    id: 1,
    title: "ID Cards for Government School Students",
    description: "Empowering students with identity and dignity",
    images: [
      {
        url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop",
        caption: "Students receiving their new ID cards",
      },
      {
        url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
        caption: "Distribution ceremony at local school",
      },
      {
        url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop",
        caption: "Happy students with their ID cards",
      },
      {
        url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop",
        caption: "Group photo with new ID cards",
      },
      {
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop",
        caption: "School principal with students",
      },
    ],
  },
  {
    id: 2,
    title: "Supporting Girls Through Coming-of-Age Ceremonies",
    description: "Celebrating milestones with dignity and care",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&auto=format&fit=crop",
        caption: "Traditional ceremony celebration",
      },
      {
        url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop",
        caption: "Community gathering for the occasion",
      },
      {
        url: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=800&auto=format&fit=crop",
        caption: "Families celebrating together",
      },
      {
        url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop",
        caption: "Cultural festivities and joy",
      },
      {
        url: "https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=800&auto=format&fit=crop",
        caption: "Volunteers supporting the event",
      },
    ],
  },
  {
    id: 3,
    title: "Elderly Care & Support",
    description: "Providing essentials and compassion to senior citizens",
    images: [
      {
        url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
        caption: "Healthcare support for elderly",
      },
      {
        url: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&auto=format&fit=crop",
        caption: "Distribution of essential supplies",
      },
      {
        url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop",
        caption: "Community care initiatives",
      },
      {
        url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop",
        caption: "Wellness check-up programs",
      },
      {
        url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop",
        caption: "Providing daily necessities",
      },
    ],
  },
];

const Gallery = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);
  
  const visibleCategories = isExpanded ? impactCategories : impactCategories.slice(0, 2);

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

              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full px-4 md:px-0"
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
                        <DialogContent className="max-w-4xl p-0 bg-background">
                          <div className="relative">
                            <img
                              src={image.url}
                              alt={image.caption}
                              className="w-full h-auto"
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
