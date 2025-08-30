import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-cross.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center text-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Enhancing God's Kingdom
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Our mission is to provide veterinary care to animals in need, sharing God's love and 
          compassion through our service to underserved communities worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/about">Learn More</Link>
          </Button>
          <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
            <Link to="/missions">Our Missions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;