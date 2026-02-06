import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Story {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  image: string;
  beneficiary: string;
  location: string;
}

const stories: Story[] = [
  {
    id: "1",
    title: "Saving Sarabi the Lioness",
    summary: "How our emergency team treated a snared lioness in the Masai Mara.",
    fullContent: "In early 2024, we received a distress call about a lioness caught in a wire snare. Our team mobilized immediately, working alongside KWS rangers. After a tense 4-hour operation, we successfully darted, treated, and released Sarabi back to her pride. Today, she has been spotted with three new cubs, a testament to the importance of every single life.",
    image: "/assets/vmphotos/lion.jpg",
    beneficiary: "Wildlife Conservation",
    location: "Masai Mara"
  },
  {
    id: "2",
    title: "A Village's Lifeline",
    summary: "Vaccinating 5,000 cattle to prevent a devastating anthrax outbreak.",
    fullContent: "When signs of Anthrax appeared in a remote village in Turkana, the community's entire livelihood was at risk. VMP deployed a rapid response team. Over three days, we vaccinated over 5,000 head of cattle, goats, and sheep. Not a single animal was lost to the disease after our intervention, securing food and economic stability for 200 families.",
    image: "/assets/vmphotos/cow2.jpg",
    beneficiary: "Pastoralist Community",
    location: "Turkana"
  },
  {
    id: "3",
    title: "Donkeys of Lamu",
    summary: "Providing free medical care to the working donkeys of the coast.",
    fullContent: "Donkeys are the engines of Lamu's economy, but they often suffer from untreated wounds and parasites. Our mobile clinic spent two weeks treating over 400 donkeys. We also held workshops for owners on hoof care and harness fitting, ensuring long-term improvement in the animals' welfare.",
    image: "/assets/vmphotos/donkey.jpg",
    beneficiary: "Working Animals",
    location: "Lamu"
  }
];

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Real Lives,<br />
              <span className="text-emerald-400">Real Change.</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-lg">
              Every mission has a story. Behind every number is a life saved, a family supported, and a community strengthened.
            </p>
            
            <div className="flex gap-4 pt-4">
              <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Carousel Card */}
          <div 
            className="md:w-1/2 w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[4/3] md:aspect-[16/10] bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col"
                >
                  {/* Image */}
                  <div className="h-2/3 relative overflow-hidden">
                    <img 
                      src={stories[currentIndex].image} 
                      alt={stories[currentIndex].title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800&auto=format&fit=crop&q=60";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 left-6">
                      <div className="flex gap-3 text-xs font-medium text-emerald-300 mb-2">
                        <span className="bg-emerald-900/50 backdrop-blur px-2 py-1 rounded">{stories[currentIndex].location}</span>
                        <span className="bg-emerald-900/50 backdrop-blur px-2 py-1 rounded">{stories[currentIndex].beneficiary}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{stories[currentIndex].title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="h-1/3 p-6 flex flex-col justify-between bg-slate-800">
                    <p className="text-slate-300 line-clamp-2">
                      {stories[currentIndex].summary}
                    </p>
                    
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="link" className="self-start p-0 text-amber-400 hover:text-amber-300 font-bold">
                          Read Full Story <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="overflow-y-auto sm:max-w-md w-full">
                        <SheetHeader className="mb-6">
                          <div className="w-full h-48 rounded-xl overflow-hidden mb-4 mt-6">
                            <img 
                              src={stories[currentIndex].image} 
                              alt={stories[currentIndex].title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800&auto=format&fit=crop&q=60";
                              }}
                            />
                          </div>
                          <div className="flex gap-2 mb-2">
                             <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-medium">{stories[currentIndex].location}</span>
                          </div>
                          <SheetTitle className="text-2xl font-bold text-slate-900">{stories[currentIndex].title}</SheetTitle>
                          <SheetDescription className="text-emerald-600 font-medium">
                            Beneficiary: {stories[currentIndex].beneficiary}
                          </SheetDescription>
                        </SheetHeader>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                          <p>{stories[currentIndex].fullContent}</p>
                          <p>Your support makes stories like this possible. Join us in our mission to heal and protect.</p>
                          
                          <div className="pt-6">
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-12 text-lg">
                              Support This Cause
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
