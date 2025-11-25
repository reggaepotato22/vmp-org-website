import Navigation from "@/components/Navigation"; // Navigation is your Navbar
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import Footer from "@/components/Footer";

const timeline = [
  {
    year: "2010",
    title: "The Vision Begins",
    description:
      "Veterinarians With a Mission Programme (VMP) was founded by a small group of dedicated veterinarians who believed in using their skills to serve underprivileged communities and improve animal welfare globally.",
  },
  // ... (rest of the timeline array remains the same)
  {
    year: "2025",
    title: "A Decade of Service and Growth",
    description:
      "Now a trusted name in international veterinary outreach, VMP continues to inspire compassion, collaboration, and innovation — advancing animal welfare and uplifting communities worldwide.",
  },
];

const History = () => {
  return (
    <>
      {/* 1. ADD THE NAVIGATION (NAVBAR) HERE */}
      <Navigation />

      {/* 2. Your existing page content */}
      <div className="container mx-auto py-12"> {/* Adding a container/padding for better page layout */}
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
      </div>

      {/* 3. ADD THE FOOTER HERE */}
      <Footer />
    </>
  );
};

export default History;