import { Heart, Users, Globe, Award, Target, Lightbulb, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const coreValues = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We approach every animal and community with deep empathy and care, recognizing the sacred bond between humans and animals."
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for the highest standards in veterinary care, ensuring quality treatment and sustainable solutions."
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in empowering local communities through education, training, and collaborative partnerships."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace new approaches and technologies to address evolving challenges in animal health and welfare."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const MissionOverview = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6"
          >
            Our Mission & Vision
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-900 leading-relaxed italic"
          >
            "To share the love of God to mankind through veterinary skills, enhancing His Kingdom on earth."
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-none shadow-lg rounded-3xl overflow-hidden h-full">
                  <div className="h-2 bg-secondary w-full"></div>
                  <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-3xl font-heading text-primary">
                          <Target className="mr-3 h-8 w-8 text-secondary" />
                          Our Vision
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-lg text-slate-600 leading-relaxed">
                          To enhance God’s Kingdom on earth by providing professional veterinary services that demonstrate Christ's love and compassion to all creation.
                      </p>
                  </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-none shadow-lg rounded-3xl overflow-hidden h-full">
                  <div className="h-2 bg-primary w-full"></div>
                  <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-3xl font-heading text-primary">
                          <Heart className="mr-3 h-8 w-8 text-primary" />
                          Our Mission
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-lg text-slate-600 leading-relaxed">
                          To share the love of God to mankind through veterinary skills, empowering communities and improving animal welfare in underserved regions.
                      </p>
                  </CardContent>
              </Card>
            </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6"
        >
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div key={index} variants={item}>
                <Card className="bg-white hover:shadow-xl transition-all duration-300 rounded-2xl border-none shadow-md h-full transform hover:-translate-y-2">
                  <CardContent className="pt-8 pb-8 text-center px-6">
                    <div className="mx-auto bg-deep-forest-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-deep-forest-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-deep-forest-green-900 mb-3">{value.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default MissionOverview;
