import DonateForm from "@/components/home/new/DonateForm";
import ImpactLevels from "@/features/public/donate/ImpactLevels";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import bgImage from "@/assets/vmphotos/vetst3.jpg";

const DonatePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      
      {/* Full Page Background Hero with Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2070" 
          alt="Veterinary Mission" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/50 to-primary/90 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4">
          
          <div className="flex flex-col lg:flex-row gap-16 items-start">
              
              {/* Left Column: Mission Statement & Impact */}
              <div className="w-full lg:w-7/12 text-white pt-10">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="inline-block py-1 px-4 rounded-md bg-secondary/20 text-secondary-foreground border border-secondary/30 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
                      Partner With Us
                    </span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight drop-shadow-lg">
                        Heal Animals, <br/>
                        <span className="text-secondary">Transform Lives.</span>
                    </h1>
                    <p className="text-xl text-slate-100 max-w-2xl leading-relaxed mb-10 font-light drop-shadow-md">
                        Your generosity empowers us to provide essential veterinary care, training, and the hope of the Gospel to communities that need it most.
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl"
                  >
                      <h3 className="text-2xl font-heading font-bold text-white mb-6">Why Give to Kenya Vets Mission?</h3>
                      <ul className="space-y-5">
                          {[
                              { text: "Direct Impact: 90% of funds go directly to field operations.", title: "Direct Impact" },
                              { text: "Sustainable Change: We train locals to care for their own animals.", title: "Sustainable Change" },
                              { text: "Holistic Care: We address both animal health and human spiritual needs.", title: "Holistic Care" },
                              { text: "Transparency: We provide regular reports on how funds are used.", title: "Transparency" }
                          ].map((item, i) => (
                              <li key={i} className="flex items-start">
                                  <div className="bg-secondary/20 p-1 rounded-md mr-4 mt-1 border border-secondary/50">
                                    <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                                  </div>
                                  <div>
                                    <span className="text-slate-100 text-lg">{item.text}</span>
                                  </div>
                              </li>
                          ))}
                      </ul>
                      
                      <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="text-slate-300 italic font-heading">
                          "The righteous care for the needs of their animals..." - Proverbs 12:10
                        </p>
                      </div>
                  </motion.div>
              </div>

              {/* Right Column: Donation Form */}
              <div className="w-full lg:w-5/12 sticky top-28">
                  <DonateForm />
              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
