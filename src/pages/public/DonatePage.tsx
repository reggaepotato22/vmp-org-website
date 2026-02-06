import DonationForm from "@/features/public/donate/DonationForm";
import ImpactLevels from "@/features/public/donate/ImpactLevels";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const DonatePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="bg-primary text-white pt-24 pb-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/80 to-slate-50"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary text-sm font-bold tracking-wider mb-6 border border-secondary/30">
                JOIN OUR MISSION
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white leading-tight">
                  Support Our <span className="text-secondary">Mission</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed mb-8">
                  Your generosity empowers us to provide essential veterinary care, training, and hope to communities that need it most.
              </p>
            </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 -mt-32 relative z-20 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Column: Form */}
            <div className="w-full lg:w-5/12 order-2 lg:order-1 sticky top-24">
                <DonationForm />
            </div>

            {/* Right Column: Info & Impact */}
            <div className="w-full lg:w-7/12 order-1 lg:order-2 lg:pt-12">
                <div className="mb-16">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">
                          How Your Gift Helps
                      </h2>
                      <p className="text-slate-600 mb-10 text-lg">
                        Every donation directly impacts the lives of animals and the people who depend on them. Here's what your contribution can achieve:
                      </p>
                    </motion.div>
                    <ImpactLevels />
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6">Why Give to Kenya Vets Mission?</h3>
                      <ul className="space-y-5">
                          {[
                              { text: "Direct Impact: 90% of funds go directly to field operations.", title: "Direct Impact" },
                              { text: "Sustainable Change: We train locals to care for their own animals.", title: "Sustainable Change" },
                              { text: "Holistic Care: We address both animal health and human spiritual needs.", title: "Holistic Care" },
                              { text: "Transparency: We provide regular reports on how funds are used.", title: "Transparency" }
                          ].map((item, i) => (
                              <li key={i} className="flex items-start">
                                  <div className="bg-slate-100 p-1 rounded-full mr-4 mt-1">
                                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                  </div>
                                  <div>
                                    <span className="text-slate-700 text-lg">{item.text}</span>
                                  </div>
                              </li>
                          ))}
                      </ul>
                      
                      <div className="mt-8 pt-8 border-t border-slate-100">
                        <p className="text-slate-500 italic">
                          "The righteous care for the needs of their animals..." - Proverbs 12:10
                        </p>
                      </div>
                    </div>
                </motion.div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default DonatePage;
