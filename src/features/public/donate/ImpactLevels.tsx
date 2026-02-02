import { Heart, Syringe, GraduationCap, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const impactLevels = [
  {
    amount: 25,
    icon: Syringe,
    title: "Vaccinate a Flock",
    description: "Provides essential vaccinations for 50 sheep or goats, protecting a family's livelihood.",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    amount: 50,
    icon: Heart,
    title: "Treat a Calf",
    description: "Covers the cost of life-saving surgery or medical treatment for a sick calf.",
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    amount: 100,
    icon: GraduationCap,
    title: "Train a Farmer",
    description: "Sponsors a community animal health worker for a week of intensive training.",
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    amount: 500,
    icon: Truck,
    title: "Mobile Clinic Day",
    description: "Funds fuel and supplies for a full day of mobile veterinary clinic operations in remote areas.",
    color: "text-green-500",
    bgColor: "bg-green-50"
  }
];

const ImpactLevels = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {impactLevels.map((level, index) => {
        const Icon = level.icon;
        return (
          <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${level.bgColor}`}>
                <Icon className={`h-6 w-6 ${level.color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">${level.amount}</h3>
              <h4 className="font-semibold text-slate-700 mb-2">{level.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {level.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ImpactLevels;
