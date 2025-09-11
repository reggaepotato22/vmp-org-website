import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Heart, Users, Globe } from "lucide-react";
import heroSlide1 from "@/assets/hero-cross.png";
import heroSlide2 from "@/assets/vmphotos/calf.jpg";
import heroSlide3 from "@/assets/vmphotos/co3.jpg";
import heroSlide4 from "@/assets/vmphotos/cow.jpg";
import heroSlide5 from "@/assets/vmphotos/cow2.jpg";
import heroSlide6 from "@/assets/vmphotos/cwater.jpg";
import heroSlide7 from "@/assets/vmphotos/flock.jpg";
import heroSlide8 from "@/assets/vmphotos/maf.jpg";
import heroSlide9 from "@/assets/vmphotos/maf2.jpg";



const slides = [
  {
    id: 1,
    image: heroSlide1,
    title: "Enhancing God's Kingdom",
    subtitle: "Through Compassionate Veterinary Care",
    description: "Our mission is to provide veterinary care to animals in need, sharing God's love and compassion through our service to underserved communities worldwide.",
    primaryButton: "Learn More",
    secondaryButton: "Our Missions",
    icon: Heart
  },
  {
    id: 2,
    image: heroSlide2,
    title: "Empowering Communities",
    subtitle: "Through Education and Training",
    description: "We believe in teaching communities to care for their animals, creating sustainable solutions that last long after our mission teams return home.",
    primaryButton: "Get Involved",
    secondaryButton: "View Training Programs",
    icon: Users
  },
  {
    id: 3,
    image: heroSlide3,
    title: "Reaching the World",
    subtitle: "One Animal at a Time",
    description: "From mobile clinics to permanent facilities, we're committed to bringing quality veterinary care to the places that need it most around the globe.",
    primaryButton: "Support Our Mission",
    secondaryButton: "See Our Impact",
    icon: Globe
  },

  // {
  //   id: 4,
  //   image: heroSlide4,
  // },
  // {
  //   id: 5,
  //   image: heroSlide5,
  // },
  // {
  //   id: 6,
  //   image: heroSlide6,
  // },
  // {
  //   id: 7,
  //   image: heroSlide7,
  // },
  // {
  //   id: 8,
  //   image: heroSlide8,
  // },
  // {
  //   id: 9,
  //   image: heroSlide9,
  // }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const current = slides[currentSlide];
  const IconComponent = current.icon;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-hero-overlay/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Icon */}
            <div className="mb-6 animate-fade-in">
              <IconComponent className="w-16 h-16 text-hero-text mb-4" />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-hero-text mb-4 animate-slide-right">
              {current.title}
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl md:text-3xl font-semibold text-hero-text/90 mb-6 animate-slide-left">
              {current.subtitle}
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-hero-text/80 mb-8 max-w-2xl leading-relaxed animate-fade-in">
              {current.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button variant="hero" size="lg">
                {current.primaryButton}
              </Button>
              <Button variant="hero-outline" size="lg">
                {current.secondaryButton}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-hero-text/20 hover:bg-hero-text/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6 text-hero-text" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-hero-text/20 hover:bg-hero-text/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6 text-hero-text" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-hero-text scale-125"
                : "bg-hero-text/50 hover:bg-hero-text/75"
            }`}
            disabled={isAnimating}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-hero-text/20">
        <div
          className="h-full bg-mission-primary transition-all duration-1000 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
        />
      </div>
    </section>
  );
};

export default Hero; []