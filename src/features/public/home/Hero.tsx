import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

// Import images
import heroSlide1 from "@/assets/vmphotos/heroslide1.png";
import heroSlide2 from "@/assets/vmphotos/heroslide2.png";
import heroSlide3 from "@/assets/vmphotos/heroslide3.png";
import heroSlide4 from "@/assets/vmphotos/heroslide4.png";
import heroSlide5 from "@/assets/vmphotos/heroslide5.png";
import heroSlide6 from "@/assets/vmphotos/heroslide6.png";
import heroSlide7 from "@/assets/vmphotos/heroslide7.jpg";
import heroSlide8 from "@/assets/vmphotos/heroslide8.png";
import heroSlide9 from "@/assets/vmphotos/heroslide9.jpg";

const slides = [
  {
    id: 1,
    image: heroSlide1,
    title: "Veterinarians with a Mission Programme",
    description: "Transforming lives through veterinary care and the love of Christ.",
  },
  {
    id: 2,
    image: heroSlide2,
    title: "Matthew 28:19-20",
    description: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age",
  },
  {
    id: 3,
    image: heroSlide3,
    title: "Compassion in Action",
    description: "Reaching out to underserved communities with professional veterinary care and spiritual support.",
  },
];

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-slate-900 overflow-hidden group">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        className="w-full h-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="relative w-full h-[600px] md:h-[700px]">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <h1 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link to="/donate">
                      <Button 
                        size="lg" 
                        className="bg-accent hover:bg-accent/90 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-accent/20 transition-all hover:-translate-y-1"
                      >
                        Donate Now
                      </Button>
                    </Link>
                    <Link to="/missions">
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm font-bold text-lg px-8 py-6 rounded-full"
                      >
                        Our Missions
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/10 border-white/20 text-white hover:bg-white/20 hidden md:flex" />
        <CarouselNext className="right-4 bg-white/10 border-white/20 text-white hover:bg-white/20 hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default Hero;
