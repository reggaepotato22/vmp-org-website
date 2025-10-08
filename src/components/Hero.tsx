import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroSlide1 from "@/assets//vmphotos/prayers.jpg";
import heroSlide2 from "@/assets/vmphotos/calf.jpg";
import heroSlide3 from "@/assets/vmphotos/co3.jpg";
import heroSlide4 from "@/assets/vmphotos/cow.jpg";
import heroSlide5 from "@/assets/vmphotos/cow2.jpg";
import heroSlide6 from "@/assets/vmphotos/cwater.jpg";
import heroSlide7 from "@/assets/vmphotos/flock.jpg";
import heroSlide8 from "@/assets/vmphotos/maf.jpg";
import heroSlide9 from "@/assets/vmphotos/maf2.jpg";

interface Slide {
  id: number;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  { id: 0, image: heroSlide1, alt: "prayers - Veterinary mission work" },
  { id: 1, image: heroSlide2, alt: "Calf receiving veterinary care" },
  { id: 2, image: heroSlide3, alt: "Veterinary team at work" },
  { id: 3, image: heroSlide4, alt: "Cow receiving treatment" },
  { id: 4, image: heroSlide5, alt: "Veterinary care for cattle" },
  { id: 5, image: heroSlide6, alt: "Providing water for animals" },
  { id: 6, image: heroSlide7, alt: "Caring for a flock" },
  { id: 7, image: heroSlide8, alt: "Mission work in action" },
  { id: 8, image: heroSlide9, alt: "Veterinary mission team" },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const scrollToWhoWeAre = () => {
    const section = document.getElementById("who-we-are");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Enhancing God&apos;s Kingdom
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-8 text-white/90">
            Through Compassionate Veterinary Care
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/80 leading-relaxed">
            Our mission is to provide veterinary care to animals in need,
            sharing God&apos;s love and compassion through our service to
            underserved communities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90"
              onClick={scrollToWhoWeAre}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
