import MissionOverview from "@/features/public/about/MissionOverview";
import TeamSection from "@/features/public/about/TeamSection";
import HistoryTimeline from "@/features/public/about/HistoryTimeline";
import Testimonials from "@/features/public/about/Testimonials";
import ImpactSection from "@/components/home/new/ImpactSection";
import StatsCounter from "@/components/home/new/StatsCounter";
import { motion } from "framer-motion";
import bgImage from "@/assets/vmphotos/maf3.jpg";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans relative">
        
        {/* Fixed Background */}
        <div className="fixed inset-0 z-0">
          <img src={bgImage} alt="Mission Field" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/50 to-primary/90 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10">
        {/* Page Header */}
        <section className="pt-32 pb-20 text-center">
            <div className="container mx-auto px-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white drop-shadow-lg"
                >
                  About Us
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl md:text-2xl text-slate-100 max-w-3xl mx-auto font-light drop-shadow-md"
                >
                    Faith-based veterinary care serving underserved communities worldwide.
                </motion.p>
            </div>
        </section>

        {/* Content Sections */}
        <div className="bg-slate-50/90 backdrop-blur-sm">
            {/* Extended About Content */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="prose prose-lg max-w-none text-slate-700 space-y-8"
                        >
                            <div className="bg-vmp-beige/30 p-8 rounded-3xl border border-vmp-maroon/10 mb-12">
                                <h2 className="text-3xl font-heading font-bold text-vmp-black mb-6">Who We Are</h2>
                                <p className="leading-relaxed">
                                    Veterinarians With a Mission Programme (VMP) is an interdenominational Christian organization founded on the principle that veterinary medicine is a powerful tool for demonstrating God's love. We are a collective of veterinary surgeons, paraprofessionals, students, and dedicated volunteers who share a common vision of holistic transformation in underserved communities.
                                </p>
                                <p className="leading-relaxed">
                                    Our work goes beyond treating animals; we aim to uplift the livelihoods of pastoralists and small-scale farmers who depend on their livestock for survival. By ensuring animal health, we contribute to food security, economic stability, and the overall well-being of the human family.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                                <div>
                                    <h3 className="text-2xl font-heading font-bold text-vmp-black mb-4">Our Unique Approach</h3>
                                    <p className="leading-relaxed mb-4">
                                        We operate through mobile clinics that reach the most remote regions, where veterinary services are often non-existent. Our missions are characterized by:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li><strong>Clinical Excellence:</strong> Providing top-tier medical and surgical interventions in field conditions.</li>
                                        <li><strong>Community Empowerment:</strong> Training local Community Animal Health Workers (CAHWs) for sustainable care.</li>
                                        <li><strong>Spiritual Outreach:</strong> Sharing the hope and peace of Christ through word and deed.</li>
                                        <li><strong>Mentorship:</strong> Equipping the next generation of Christian veterinarians through hands-on field experience.</li>
                                    </ul>
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-xl">
                                    <img 
                                        src="https://images.unsplash.com/photo-1542810634-71277d95dc24?auto=format&fit=crop&q=80&w=800" 
                                        alt="Veterinary Training" 
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>

                            <div className="border-l-4 border-vmp-maroon pl-8 py-4 bg-vmp-maroon/[0.03] rounded-r-2xl italic text-xl text-slate-600 mb-12">
                                "The VMP journey is one of faith, resilience, and unwavering commitment to the 'least of these' in the animal kingdom and the human communities that steward them."
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <ImpactSection />
            <StatsCounter />
            <MissionOverview />
            <TeamSection />
            <HistoryTimeline />
            <Testimonials />
        </div>
        </div>
    </div>
  );
};

export default AboutPage;
