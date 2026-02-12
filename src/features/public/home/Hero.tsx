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
import heroSlide4 from "@/assets/vmphotos/heroslide4.png";
import heroSlide5 from "@/assets/vmphotos/heroslide5.png";
import heroSlide6 from "@/assets/vmphotos/heroslide6.png";
import heroSlide7 from "@/assets/vmphotos/heroslide7.jpg";

const defaultSlides = [
  {
    id: "default-1",
    image: heroSlide1,
    title: "Empowering Communities Through Veterinary Care",
    description: "Veterinarians with a Mission Programme is dedicated to improving animal health and community livelihoods.",
    order_index: 0,
    active: true
  },
  {
    id: "default-2",
    image: heroSlide2,
    title: "Compassion in Action",
    description: "Reaching out to underserved communities with professional veterinary care and the love of Christ.",
    order_index: 1,
    active: true
  },
  {
    id: "default-3",
    image: heroSlide3,
    title: "Join Our Mission Today",
    description: "Your support helps us reach more communities and save more lives.",
    order_index: 2,
    active: true
  },
  {
    id: "default-4",
    image: heroSlide4,
    title: "Sustainable Livelihoods",
    description: "Building resilience in pastoral communities through improved animal health and productivity.",
    order_index: 3,
    active: true
  },
  {
    id: "default-5",
    image: heroSlide5,
    title: "Education for Future Generations",
    description: "Training and mentoring the next generation of animal health workers and community leaders.",
    order_index: 4,
    active: true
  },
  {
    id: "default-6",
    image: heroSlide6,
    title: "Spiritual Transformation",
    description: "Sharing the message of hope and faith alongside professional veterinary practice.",
    order_index: 5,
    active: true
  },
  {
    id: "default-7",
    image: heroSlide7,
    title: "Community Partnership",
    description: "Working hand-in-hand with local leaders to create lasting impact and sustainable change.",
    order_index: 6,
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
    <div className="relative w-full h-[600px] md:h-[800px] bg-slate-900 overflow-hidden group">
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
                <div className="absolute inset-0 bg-black/40" />
                
                <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                  <div className="max-w-5xl space-y-8 animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-10">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white drop-shadow-lg tracking-tight leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-100 max-w-2xl mx-auto drop-shadow-md font-light">
                      {slide.description}
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white border-none shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg px-8 py-6 h-auto rounded-md">
                        <Link to="/about">Learn More</Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="bg-transparent hover:bg-white/10 text-white border-2 border-white backdrop-blur-sm shadow-lg text-lg px-8 py-6 h-auto rounded-md">
                        <Link to="/donate">Donate Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/20 text-white border-none h-12 w-12" />
        <CarouselNext className="right-4 bg-white/10 hover:bg-white/20 text-white border-none h-12 w-12" />
      </Carousel>
    </div>
  );
};

export default Hero;
