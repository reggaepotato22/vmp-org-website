import GalleryGrid from "@/features/public/gallery/GalleryGrid";
import { motion } from "framer-motion";
import bgImage from "@/assets/vmphotos/vetst2.jpg";

const GalleryPage = () => {
  return (
    <div className="min-h-screen font-sans flex flex-col relative">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <img src={bgImage} alt="Veterinary Mission" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/50 to-primary/90 mix-blend-multiply"></div>
      </div>

      {/* Page Header */}
      <section className="text-white py-24 relative z-10">
        
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white"
          >
            Our Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-50 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Glimpses of our mission in action - from veterinary treatments to community engagement across Kenya.
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <div className="relative z-10">
        <GalleryGrid />
      </div>
      
    </div>
  );
};

export default GalleryPage;
