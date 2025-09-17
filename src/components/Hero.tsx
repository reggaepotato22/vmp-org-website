import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import heroSlide1 from "@/assets/hero-cross.png";
import heroSlide2 from "@/assets/vmphotos/calf.jpg";
import heroSlide3 from "@/assets/vmphotos/co3.jpg";
import heroSlide4 from "@/assets/vmphotos/cow.jpg";
import heroSlide5 from "@/assets/vmphotos/cow2.jpg";
import heroSlide6 from "@/assets/vmphotos/cwater.jpg";
import heroSlide7 from "@/assets/vmphotos/flock.jpg";
import heroSlide8 from "@/assets/vmphotos/maf.jpg";
import heroSlide9 from "@/assets/vmphotos/maf2.jpg";

const images = [
  heroSlide1,
  heroSlide2,
  heroSlide3,
  heroSlide4,
  heroSlide5,
  heroSlide6,
  heroSlide7,
  heroSlide8,
  heroSlide9,
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((img, i) => (
  <div key={i} className="w-full flex-shrink-0 h-full bg-black flex items-center justify-center">
    <img
      src={img}
      alt={`slide-${i}`}
      className="max-h-full max-w-full object-contain"
    />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 rounded-full p-3"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 rounded-full p-3"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white py-10 text-center px-4">
        <Heart className="w-12 h-12 mx-auto text-mission-primary mb-4" />
        <h1 className="text-4xl md:text-6xl font-bold mb-3">
          Enhancing God&apos;s Kingdom
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Through Compassionate Veterinary Care
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
          Our mission is to provide veterinary care to animals in need, sharing God&apos;s love and compassion through our service to underserved communities worldwide.
        </p>
      </div>
    </section>
  );
};

export default Hero;
