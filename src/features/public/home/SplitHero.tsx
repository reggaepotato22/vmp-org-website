import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SplitHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  stats?: { label: string; value: string }[];
}

const SplitHero = ({
  title = "Healing Animals, Empowering Communities",
  subtitle = "We are dedicated to improving animal health and welfare in underserved communities across Kenya through veterinary missions and education.",
  ctaText = "Support Our Mission",
  ctaLink = "/donate",
  secondaryCtaText = "Volunteer With Us",
  secondaryCtaLink = "/volunteer",
  backgroundImage = "/assets/vmphotos/maf8.jpg", // Default fallback
  stats = [
    { label: "Animals Treated", value: "5,000+" },
    { label: "Communities Served", value: "40+" },
  ]
}: SplitHeroProps) => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row bg-slate-50 overflow-hidden">
      {/* Left Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-20 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-primary text-sm font-medium mb-6">
          <Heart className="w-4 h-4 fill-primary" />
          <span>Veterinarians with a Mission Programme</span>
        </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
            {title.split(" ").map((word, i) => (
              <span key={i} className={i === 1 ? "text-primary" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white rounded-md px-8 h-12 text-base shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={() => navigate(ctaLink)}
            >
              {ctaText}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-blue-50 rounded-md px-8 h-12 text-base"
              onClick={() => navigate(secondaryCtaLink)}
            >
              {secondaryCtaText} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Stats (Visible only on small screens) */}
          <div className="mt-12 grid grid-cols-2 gap-6 lg:hidden">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-slate-500 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Image Side */}
      <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-auto">
        <div className="absolute inset-0 bg-primary/10 z-0"></div>
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          src={backgroundImage} 
          alt="Veterinary Mission" 
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default SplitHero;
