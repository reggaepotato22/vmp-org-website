import { Heart, Users, Globe, Award, Target, Lightbulb, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const MissionOverview = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-blue-600 mb-6">
            Our Mission & Vision
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            "To share the love of God to mankind through veterinary skills, enhancing His Kingdom on earth."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Card className="border-t-4 border-t-blue-600 shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center text-2xl font-heading text-blue-600">
                        <Target className="mr-3 h-6 w-6" />
                        Our Vision
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-slate-600">
                        To enhance God’s Kingdom on earth by providing professional veterinary services that demonstrate Christ's love and compassion to all creation.
                    </p>
                </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-500 shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center text-2xl font-heading text-green-600">
                        <Heart className="mr-3 h-6 w-6" />
                        Our Mission
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-slate-600">
                        To share the love of God to mankind through veterinary skills, empowering communities and improving animal welfare in underserved regions.
                    </p>
                </CardContent>
            </Card>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MissionOverview;
