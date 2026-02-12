import Hero from "@/components/home/new/Hero";
import Partnership from "@/components/home/new/Partnership";
import ImpactSection from "@/components/home/new/ImpactSection";
import ServiceCards from "@/components/home/new/ServiceCards";
import CampaignsGrid from "@/components/home/new/CampaignsGrid";
import Testimonials from "@/features/public/about/Testimonials";
import NewsSection from "@/components/home/new/NewsSection";
import GalleryGrid from "@/features/public/gallery/GalleryGrid";
import { motion } from "framer-motion";
import { Heart, ShieldCheck, Globe2 } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Welcome Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <span className="text-vmp-maroon font-bold uppercase tracking-widest text-sm mb-4 block">Welcome to VMP</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-vmp-black mb-8 leading-tight">
                Veterinary Care With a <span className="text-vmp-maroon">Global Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Veterinarians With a Mission Programme (VMP) is a faith-based non-profit organization dedicated to transforming lives through professional veterinary services. We believe that by caring for animals, we care for the people who depend on them, demonstrating Christ's love in action.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-vmp-beige rounded-lg text-vmp-maroon">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-vmp-black mb-1">Faith Driven</h4>
                    <p className="text-sm text-gray-500">Motivated by the Gospel to serve all creation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-vmp-beige rounded-lg text-vmp-maroon">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-vmp-black mb-1">Professional Excellence</h4>
                    <p className="text-sm text-gray-500">High-quality clinical and surgical services.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1599463428489-49780e920d3f?auto=format&fit=crop&q=80&w=800" 
                  alt="Veterinary mission in action" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vmp-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xl font-heading italic">"Sharing the love of God through professional skills."</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-vmp-beige rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-vmp-maroon/20 rounded-2xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <Partnership />
      <ImpactSection />
      <ServiceCards />
      <CampaignsGrid />
      <Testimonials />
      
      {/* Gallery Preview Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center mb-16">
          <span className="text-vmp-maroon font-bold uppercase tracking-widest text-sm mb-4 block">Our Work in Pictures</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-vmp-black mb-6">
            Mission <span className="text-vmp-maroon">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A visual journey through our field missions, surgical clinics, and community outreach programs across Kenya.
          </p>
        </div>
        <GalleryGrid />
      </section>

      <NewsSection />
    </div>
  );
};

export default LandingPage;
