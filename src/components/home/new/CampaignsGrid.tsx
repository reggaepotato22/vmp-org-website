import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CampaignsGrid = () => {
  const { campaigns } = useData();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-vmp-black uppercase">
            Current Mission Appeals <br/> & Urgent Needs
          </h2>
        </div>

        {/* Custom Grid Layout: 2 top, 3 bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* First 2 items span 3 cols each (half width on large) */}
          {campaigns.slice(0, 2).map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="lg:col-span-3 group relative rounded-xl overflow-hidden shadow-lg h-[400px]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${campaign.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-3 uppercase leading-tight">{campaign.title}</h3>
                {campaign.description && (
                  <p className="text-white/90 mb-6 line-clamp-2">{campaign.description}</p>
                )}
                <div className="flex gap-4">
                   <Button className="bg-vmp-maroon hover:bg-vmp-maroon/90 text-white rounded-full">
                     {campaign.ctaText || 'Donate now'}
                   </Button>
                   <Button variant="outline" className="text-white border-white hover:bg-white/20 bg-transparent rounded-full">
                     Learn more
                   </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Next 3 items span 2 cols each (third width on large) */}
          {campaigns.slice(2, 5).map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
              className="lg:col-span-2 group relative rounded-xl overflow-hidden shadow-lg h-[350px]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${campaign.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-4 uppercase leading-tight">{campaign.title}</h3>
                <div className="flex gap-3">
                   <Button size="sm" className="bg-white text-black hover:bg-gray-200 rounded-full text-xs font-bold">
                     {campaign.ctaText || 'Learn more'}
                   </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="rounded-full border-gray-300 text-gray-600 px-8">
            View All Our Campaigns
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CampaignsGrid;
