import MissionsGrid from "@/features/public/missions/MissionsGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MissionsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
       {/* Page Header */}
       <section className="bg-primary text-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white"
                >
                  Mission Reports
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl md:text-2xl text-blue-50 max-w-2xl mx-auto font-light"
                >
                    Documenting our journey of service and compassion across Kenya.
                </motion.p>
            </div>
        </section>

        <MissionsGrid />

        {/* Call to Action */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                    <h3 className="text-3xl font-heading font-bold text-slate-900 mb-8">
                        Want to join us on our next mission?
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-8 py-6 h-auto text-lg shadow-lg hover:shadow-xl transition-all">
                            <Link to="/contact">Volunteer With Us</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-blue-50 font-bold rounded-full px-8 py-6 h-auto text-lg">
                            <Link to="/donate">Support a Mission</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    </div>
  );
};

export default MissionsPage;
