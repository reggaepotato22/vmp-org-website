import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Users, Globe, BookOpen } from 'lucide-react';

const VolunteerSection = () => {
  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-vmp-maroon" />,
      title: "Impact Lives",
      description: "Directly contribute to the health and well-being of animals and communities."
    },
    {
      icon: <Users className="w-6 h-6 text-vmp-maroon" />,
      title: "Global Community",
      description: "Connect with like-minded veterinary professionals and passionate volunteers."
    },
    {
      icon: <Globe className="w-6 h-6 text-vmp-maroon" />,
      title: "Serve Anywhere",
      description: "Participate in local missions or international deployments across Africa."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-vmp-maroon" />,
      title: "Growth",
      description: "Gain unique field experience and develop your professional skills in diverse settings."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-vmp-beige/50 rounded-full blur-2xl" />
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-vmp-black mb-6 leading-tight">
                JOIN OUR MISSION AS A <span className="text-vmp-maroon">VOLUNTEER</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We are always looking for passionate individuals to join our team. Whether you're a veterinary professional, a student, or simply someone who wants to help, there's a place for you at VMP.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 p-2 bg-vmp-beige/30 rounded-lg">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-vmp-black">{benefit.title}</h4>
                      <p className="text-sm text-gray-500">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-vmp-maroon hover:bg-vmp-maroon/90 text-white rounded-full px-8 py-6 shadow-lg">
                  <Link to="/volunteer">Learn More</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-vmp-maroon text-vmp-maroon hover:bg-vmp-maroon hover:text-white rounded-full px-8 py-6">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800" 
                alt="Volunteers at work" 
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-vmp-maroon/10 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-10 w-64 h-64 border-8 border-vmp-beige/20 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;
