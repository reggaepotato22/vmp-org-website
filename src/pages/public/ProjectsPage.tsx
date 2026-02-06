import MissionsGrid from "@/features/public/missions/MissionsGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectsPage = () => {
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
                  Our Projects
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl md:text-2xl text-blue-50 max-w-2xl mx-auto font-light"
                >
                    Sustainable initiatives empowering communities and improving animal welfare.
                </motion.p>
            </div>
        </section>

        {/* Reusing MissionsGrid for now as placeholder for projects, or we could create a ProjectsGrid */}
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <p className="text-slate-600 max-w-3xl mx-auto text-lg">
                    We are currently working on several key projects. Check back soon for detailed updates!
                </p>
            </div>
             <MissionsGrid />
        </div>

        {/* Call to Action */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                    <h3 className="text-3xl font-heading font-bold text-slate-900 mb-8">
                        Partner with us on a project?
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-8 py-6 h-auto text-lg shadow-lg hover:shadow-xl transition-all">
                            <Link to="/contact">Contact Us</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-blue-50 font-bold rounded-full px-8 py-6 h-auto text-lg">
                            <Link to="/donate">Support a Project</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    </div>
  );
};

export default ProjectsPage;
