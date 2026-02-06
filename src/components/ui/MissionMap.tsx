import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";

interface Location {
  id: string;
  name: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  stats: string;
  description: string;
}

const locations: Location[] = [
  { id: "turkana", name: "Turkana", x: 20, y: 25, stats: "15,000+ Animals Treated", description: "Drought relief and livestock vaccination campaigns." },
  { id: "marsabit", name: "Marsabit", x: 45, y: 20, stats: "5,000 Camels Vaccinated", description: "Camel health program and community training." },
  { id: "nairobi", name: "Nairobi", x: 45, y: 65, stats: "HQ & Training Center", description: "Coordination hub and student mentorship programs." },
  { id: "kajiado", name: "Kajiado", x: 48, y: 75, stats: "Rabies Free Zone", description: "Mass dog vaccination and sterilization drive." },
  { id: "mombasa", name: "Coastal Region", x: 80, y: 80, stats: "Marine Life & Donkeys", description: "Working donkey welfare and marine conservation." },
  { id: "kisumu", name: "Western Kenya", x: 15, y: 60, stats: "Zoonotic Disease Control", description: "Rabies and anthrax surveillance." },
];

const MissionMap = () => {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);

  return (
    <section className="py-24 bg-emerald-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm">Our Reach</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">Where We Make an Impact</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            From the arid lands of Turkana to the coastal region, VMP is active across Kenya.
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] md:aspect-[16/9] bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
          {/* Abstract Map Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            {/* Rough Kenya Shape SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-900 fill-current">
              <path d="M 10 10 L 50 0 L 90 10 L 95 50 L 80 90 L 40 100 L 0 40 Z" />
            </svg>
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-20 pointer-events-none"></div>

          {/* Interactive Pins */}
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              onMouseEnter={() => setActiveLocation(loc)}
              onClick={() => setActiveLocation(loc)}
            >
              {/* Pulse Effect */}
              <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75 w-full h-full"></div>
              
              {/* Pin Icon */}
              <div className="relative bg-emerald-600 text-white p-2 rounded-full shadow-lg group-hover:bg-amber-500 transition-colors z-10">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
          ))}

          {/* Info Popup / Card */}
          <AnimatePresence mode="wait">
            {activeLocation && (
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white/90 backdrop-blur-md border border-emerald-100 p-6 rounded-2xl shadow-2xl z-20"
              >
                <button 
                  onClick={() => setActiveLocation(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
                <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  {activeLocation.name}
                </h3>
                <div className="text-emerald-600 font-bold text-sm mb-3 uppercase tracking-wide">
                  {activeLocation.stats}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {activeLocation.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Default State (When no location selected) */}
          {!activeLocation && (
             <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm text-slate-500 italic pointer-events-none">
                Hover over a region to see details
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MissionMap;
