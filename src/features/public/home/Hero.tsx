import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { CarouselApi } from "@/components/ui/carousel";
import { homepageService } from "@/services/homepageService";
import { HeroSlide } from "@/types";

// Import images for fallback
import heroSlide1 from "@/assets/vmphotos/heroslide1.png";
import heroSlide2 from "@/assets/vmphotos/heroslide2.png";
import heroSlide3 from "@/assets/vmphotos/heroslide3.png";

const defaultSlides = [
  {
    id: "default-1",
    image: heroSlide1,
    title: "Veterinarians with a Mission Programme",
    description: "Transforming lives through veterinary care and the love of Christ.",
    order_index: 0,
    active: true
  },
  {
    id: "default-2",
    image: heroSlide2,
    title: "Matthew 28:19-20",
    description: "Therefore go and make disciples of all nations...",
    order_index: 1,
    active: true
  },
  {
    id: "default-3",
    image: heroSlide3,
    title: "Compassion in Action",
    description: "Reaching out to underserved communities with professional veterinary care and spiritual support.",
    order_index: 2,
    active: true
  },
];

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await homepageService.getSlides();
        // If we have active slides from DB, use them. Otherwise fallback to defaults.
        const activeSlides = data.filter(s => s.active !== false);
        if (activeSlides.length > 0) {
          setSlides(activeSlides);
        } else {
          setSlides(defaultSlides as HeroSlide[]);
        }
      } catch (error) {
        console.error("Failed to fetch slides", error);
        setSlides(defaultSlides as HeroSlide[]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

  if (loading) {
     return <div className="w-full h-[600px] md:h-[700px] bg-slate-900 animate-pulse" />;
  }

  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-slate-900 overflow-hidden group">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        className="w-full h-full"
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0 h-full">
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                  <div className="max-w-4xl space-y-6 animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-10">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg tracking-tight leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-100 max-w-2xl mx-auto drop-shadow-md font-light">
                      {slide.description}
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg px-8 py-6 h-auto rounded-full">
                        <Link to="/donate">Donate Now</Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/50 hover:border-white backdrop-blur-sm shadow-lg text-lg px-8 py-6 h-auto rounded-full">
                        <Link to="/missions">Our Missions</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-black/30 hover:bg-black/50 text-white border-none h-12 w-12" />
        <CarouselNext className="right-4 bg-black/30 hover:bg-black/50 text-white border-none h-12 w-12" />
      </Carousel>
    </div>
  );
};

export default Hero;
