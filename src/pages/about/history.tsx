import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

const timeline = [
  {
    year: "2010",
    title: "The Vision Begins",
    description:
      "Veterinarians With a Mission Programme (VMP) was founded by a small group of dedicated veterinarians who believed in using their skills to serve underprivileged communities and improve animal welfare globally.",
  },
  {
    year: "2013",
    title: "First Mission in East Africa",
    description:
      "The team embarked on its first official outreach in Kenya, offering free veterinary services, vaccinations, and community education in rural livestock-keeping areas.",
  },
  {
    year: "2016",
    title: "Building Partnerships",
    description:
      "VMP partnered with local veterinary institutions, NGOs, and government bodies to expand its impact across East Africa and develop sustainable training programs for local animal health workers.",
  },
  {
    year: "2018",
    title: "Community Empowerment",
    description:
      "Introduced community-based livestock health initiatives, empowering farmers with knowledge in disease prevention, nutrition, and sustainable animal care practices.",
  },
  {
    year: "2020",
    title: "Global Health Response",
    description:
      "During the COVID-19 pandemic, VMP continued its mission safely through mobile clinics and remote animal health consultations, ensuring continuity of care where it was needed most.",
  },
  {
    year: "2023",
    title: "Expanding Our Reach",
    description:
      "VMP extended its missions to new regions across Kenya, Uganda, and Tanzania — treating thousands of animals, training hundreds of veterinary students, and supporting local communities.",
  },
  {
    year: "2025",
    title: "A Decade of Service and Growth",
    description:
      "Now a trusted name in international veterinary outreach, VMP continues to inspire compassion, collaboration, and innovation — advancing animal welfare and uplifting communities worldwide.",
  },
];

const History = () => {
  return (
    <Card className="shadow-lg border-border bg-card">
      <CardContent className="p-8">
        <h2 className="text-3xl font-bold mb-8 text-primary text-center">
          Our Journey Through the Years
        </h2>
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="bg-primary rounded-full p-2 flex-shrink-0">
                <Award className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xl font-bold text-primary">{item.year}</span>
                  <span className="font-semibold text-lg">{item.title}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default History;
