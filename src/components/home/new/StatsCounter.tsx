import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';

const StatsCounter = () => {
  const { stats } = useData();
  
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-left"
            >
              <h3 className="text-4xl sm:text-5xl font-heading font-bold text-vmp-black mb-2">
                {stat.value}
                <span className="text-vmp-maroon">+</span>
              </h3>
              <p className="text-gray-600 font-medium text-sm sm:text-base uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
