import MissionOverview from "@/features/public/about/MissionOverview";
import TeamSection from "@/features/public/about/TeamSection";
import HistoryTimeline from "@/features/public/about/HistoryTimeline";
import Testimonials from "@/features/public/about/Testimonials";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
        {/* Page Header */}
        <section className="bg-primary text-white py-24 relative overflow-hidden">
             {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white"
                >
                  About Us
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto font-light"
                >
                    Faith-based veterinary care serving underserved communities worldwide.
                </motion.p>
            </div>
        </section>

        {/* Content Sections */}
        <MissionOverview />
        <TeamSection />
        <HistoryTimeline />
        <Testimonials />
    </div>
  );
};

export default AboutPage;
