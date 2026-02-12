import MissionsGrid from "@/features/public/missions/MissionsGrid";
import CampaignsGrid from "@/components/home/new/CampaignsGrid";
import ServiceCards from "@/components/home/new/ServiceCards";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "@/assets/vmphotos/maf3.jpg";

const MissionsPage = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans relative">
        
        {/* Fixed Background */}
        <div className="fixed inset-0 z-0">
          <img src={bgImage} alt="Mission Field" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/50 to-primary/90 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10">
        {/* Page Header */}
        <section className="text-white py-24">
            <div className="container mx-auto px-4 text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white"
                >
                  Our Missions
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

        <div className="bg-white/95 backdrop-blur-sm">
          {/* Extended Missions Content */}
          <section className="py-24 bg-white">
              <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto text-center mb-16">
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-heading font-bold text-vmp-black mb-6"
                      >
                        Our Mission Strategy
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 leading-relaxed"
                      >
                        VMP missions are carefully planned interventions designed to provide maximum impact in regions with the greatest need. Our strategy combines immediate veterinary care with long-term community development.
                      </motion.p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 mb-20">
                      {[
                        {
                          title: "Mass Vaccinations",
                          description: "Protecting entire herds from preventable diseases like Foot and Mouth, Rabies, and CCPP, which can devastate local economies.",
                          image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800"
                        },
                        {
                          title: "Surgical Clinics",
                          description: "Performing critical surgeries in mobile theater setups, treating injuries and conditions that would otherwise lead to animal loss.",
                          image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800"
                        },
                        {
                          title: "Training Programs",
                          description: "Empowering pastoralists with knowledge on animal nutrition, parasite control, and early disease detection for year-round health.",
                          image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
                        }
                      ].map((strategy, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-vmp-beige/20 rounded-2xl overflow-hidden border border-vmp-maroon/5 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <img src={strategy.image} alt={strategy.title} className="w-full h-48 object-cover" />
                          <div className="p-6">
                            <h4 className="font-bold text-xl text-vmp-black mb-3 font-heading">{strategy.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{strategy.description}</p>
                          </div>
                        </motion.div>
                      ))}
                  </div>

                  <div className="bg-vmp-maroon text-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-vmp-beige">Where We Serve</h3>
                      <p className="text-lg mb-8 text-white/90 max-w-2xl leading-relaxed">
                        Currently, our primary focus is on the arid and semi-arid lands (ASALs) of Kenya, including Samburu, Turkana, Marsabit, and West Pokot. These regions host large populations of livestock but have limited access to veterinary services.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {['Samburu', 'Turkana', 'Marsabit', 'West Pokot', 'Kajiado', 'Narok'].map((county) => (
                          <span key={county} className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-sm font-bold backdrop-blur-sm">
                            {county} County
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Abstract background shape */}
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-vmp-beige/10 rounded-full"></div>
                  </div>
              </div>
          </section>

          <ServiceCards />
          <CampaignsGrid />
          <MissionsGrid />
          
          {/* Call to Action */}
          <section className="py-20 border-t border-slate-100">
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
                          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-md px-8 py-6 h-auto text-lg shadow-lg hover:shadow-xl transition-all">
                              <Link to="/contact">Volunteer With Us</Link>
                          </Button>
                          <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-blue-50 font-bold rounded-md px-8 py-6 h-auto text-lg">
                              <Link to="/donate">Support a Mission</Link>
                          </Button>
                      </div>
                  </motion.div>
              </div>
          </section>
        </div>
        </div>
    </div>
  );
};

export default MissionsPage;
