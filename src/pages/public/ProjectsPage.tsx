import MissionsGrid from "@/features/public/missions/MissionsGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "@/assets/vmphotos/vetst2.jpg";

const ProjectsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative">
        {/* Fixed Background */}
        <div className="fixed inset-0 z-0">
          <img src={bgImage} alt="Projects Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/50 to-primary/90 mix-blend-multiply"></div>
        </div>

       {/* Page Header */}
       <section className="relative py-24 overflow-hidden z-10">
            <div className="container mx-auto px-4 text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white drop-shadow-lg"
                >
                  Our Projects
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto font-light drop-shadow-md"
                >
                    Sustainable initiatives empowering communities and improving animal welfare.
                </motion.p>
            </div>
        </section>

        {/* Reusing MissionsGrid for now as placeholder for projects, or we could create a ProjectsGrid */}
        <div className="container mx-auto px-4 py-12 relative z-10">
            <div className="text-center mb-12">
                <div className="inline-block p-6 rounded-md bg-white/90 backdrop-blur-sm shadow-sm">
                    <p className="text-slate-700 max-w-3xl mx-auto text-lg">
                        We are currently working on several key projects. Check back soon for detailed updates!
                    </p>
                </div>
            </div>
             <MissionsGrid />
        </div>

        {/* Call to Action */}
        <section className="py-20 bg-white/90 backdrop-blur-sm relative z-10">
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
                        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-md px-8 py-6 h-auto text-lg shadow-lg hover:shadow-xl transition-all">
                            <Link to="/contact">Contact Us</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-blue-50 font-bold rounded-md px-8 py-6 h-auto text-lg">
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
