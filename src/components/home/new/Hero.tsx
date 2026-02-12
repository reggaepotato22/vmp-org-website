import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';

const Hero = () => {
  const navigate = useNavigate();
  const { settings } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = settings?.hero_slides?.filter(s => s.active) || [];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-vmp-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] scale-110"
            style={{ 
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-5xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-heading font-bold text-white leading-tight tracking-tight uppercase">
                  {slides[currentSlide].title.split(', ').map((part, i) => (
                    <span key={i} className="block">
                      {part}{i === 0 && slides[currentSlide].title.includes(',') ? ',' : ''}
                    </span>
                  ))}
                </h1>
                <p className="text-xl sm:text-2xl text-vmp-beige font-medium max-w-3xl mx-auto">
                  {slides[currentSlide].description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <Button 
                  size="lg" 
                  className="bg-vmp-maroon text-white hover:bg-vmp-maroon/90 rounded-full px-12 py-8 text-xl font-bold transition-all duration-300 shadow-2xl hover:-translate-y-1 active:scale-95"
                  onClick={() => navigate('/volunteer')}
                >
                  Join Our Mission
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md text-white border-2 border-white hover:bg-white hover:text-vmp-maroon rounded-full px-12 py-8 text-xl font-bold transition-all duration-300 shadow-2xl hover:-translate-y-1 active:scale-95"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 text-white hover:bg-vmp-maroon transition-all duration-300 group"
          >
            <ChevronLeft className="h-8 w-8 group-hover:scale-110" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 text-white hover:bg-vmp-maroon transition-all duration-300 group"
          >
            <ChevronRight className="h-8 w-8 group-hover:scale-110" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 transition-all duration-500 rounded-full ${
              currentSlide === i ? 'w-12 bg-vmp-maroon' : 'w-3 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
