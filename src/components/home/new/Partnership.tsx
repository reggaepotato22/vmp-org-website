import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';

const Partnership = () => {
  const { partners } = useData();

  return (
    <section className="py-20 bg-vmp-beige/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold text-vmp-black mb-4 uppercase tracking-tight"
          >
            Our Partners
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-vmp-maroon mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <motion.a
              key={partner.id}
              href={partner.website_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-20 w-auto object-contain"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnership;
