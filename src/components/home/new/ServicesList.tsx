import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataContext';

const ServicesList = () => {
  const { programs } = useData();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
               <div className="absolute top-0 left-0 w-2/3 h-full z-10">
                 <img 
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" 
                    alt="Community" 
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                 />
               </div>
               <div className="absolute bottom-10 right-0 w-1/2 h-2/3 z-20 bg-vmp-beige p-6 rounded-l-xl shadow-xl flex flex-col justify-center">
                  <h3 className="font-heading font-bold text-2xl mb-4 text-vmp-black">
                    FAITH IN ACTION THROUGH SERVICE.
                  </h3>
                  <Button className="w-fit bg-vmp-maroon text-white hover:bg-vmp-maroon/90 rounded-full text-sm font-bold shadow-sm">
                    Partner With Us
                  </Button>
               </div>
            </div>
          </motion.div>

          {/* Text/List Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-vmp-black mb-8 uppercase leading-tight">
              VETERINARIANS WITH A MISSION <br/> PROGRAMME PROVIDES <br/> COMMUNITIES WITH THE <br/> FOLLOWING SERVICES:
            </h2>

            <div className="space-y-4">
              {programs.map((program) => (
                <div key={program.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                  <Check className="w-5 h-5 text-vmp-maroon mt-1 shrink-0" />
                  <span className="text-gray-700 font-medium">{program.text}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-gray-500 text-sm italic">
              "Demonstrating God's love through professional excellence and compassionate care."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
