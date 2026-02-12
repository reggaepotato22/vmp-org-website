import { Stethoscope, Syringe, GraduationCap, Truck } from "lucide-react";
import { motion } from "framer-motion";

const impactLevels = [
  {
    amount: 25,
    icon: Syringe,
    title: "Vaccinate a Flock",
    description: "Provides essential vaccinations for 50 sheep or goats, protecting a family's livelihood.",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    amount: 50,
    icon: Stethoscope,
    title: "Treat a Calf",
    description: "Covers the cost of life-saving surgery or medical treatment for a sick calf.",
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    amount: 100,
    icon: GraduationCap,
    title: "Train a Farmer",
    description: "Sponsors a community animal health worker for a week of intensive training.",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    amount: 500,
    icon: Truck,
    title: "Mobile Clinic Day",
    description: "Funds fuel and supplies for a full day of mobile veterinary clinic operations in remote areas.",
    color: "text-secondary",
    bgColor: "bg-slate-50"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const ImpactLevels = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
    >
      {impactLevels.map((level, index) => {
        const Icon = level.icon;
        return (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="bg-white rounded-md p-6 shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-14 h-14 rounded-md flex items-center justify-center flex-shrink-0 ${level.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`h-7 w-7 ${level.color}`} />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-slate-900">${level.amount}</h3>
                  <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Impact</span>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{level.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {level.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ImpactLevels;
