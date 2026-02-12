import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ImpactSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto lg:max-w-full">
              <img 
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800" 
                alt="Child carrying water" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements could go here */}
          </motion.div>

          {/* Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-vmp-black uppercase leading-tight">
              Healing Animals, <span className="text-vmp-maroon">Transforming Lives</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Veterinarians With a Mission Programme (VMP) is dedicated to serving the unreached pastoral communities in Kenya through the dual mission of professional veterinary care and the Gospel of Jesus Christ. 
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              By providing essential health services to livestock—the primary livelihood of these communities—we demonstrate God's love in practical ways, building bridges for spiritual transformation and sustainable community development.
            </p>
            
            <div className="pt-4 space-y-4">
              <h3 className="text-xl font-bold text-vmp-black">
                WITH YOUR SUPPORT, WE CAN REACH THE MOST REMOTE REGIONS AND BRING HOPE TO THOSE IN NEED.
              </h3>
              
              <Button 
                className="bg-vmp-maroon hover:bg-vmp-maroon/90 text-white rounded-full px-8 py-6 text-lg shadow-md transition-all"
              >
                Learn More About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
