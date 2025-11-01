import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    caption: "Food distribution drive in rural areas",
    url: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    caption: "Blood donation camp at community center",
    url: "https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    caption: "Education support program with students",
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    caption: "Community health check-up initiative",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    caption: "Volunteer training session",
    url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    caption: "Emergency shelter support during floods",
    url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section id="gallery" className="py-16 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-['Poppins'] text-center mb-4 text-foreground">
          Our Impact
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Moments of compassion in action across our communities
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((image) => (
            <Dialog key={image.id}>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <p className="text-white text-xs md:text-sm font-medium">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
