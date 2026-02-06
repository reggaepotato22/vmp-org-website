import GalleryGrid from "@/features/public/gallery/GalleryGrid";
import { motion } from "framer-motion";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Page Header */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
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
      <GalleryGrid />
      
    </div>
  );
};

export default GalleryPage;
