import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

const History = () => {
  const timeline = [
    { year: "2010", title: "Founding of Vet Missions", description: "Vet Missions was established with a vision to serve communities in need." },
    { year: "2012", title: "First International Mission Trip", description: "Our first mission trip to a rural village provided essential veterinary care." },
    { year: "2015", title: "Expansion to South America", description: "Expanded our reach to South America, providing care in multiple countries." },
    { year: "2020", title: "Reached 10,000 Animals Treated", description: "Celebrated a milestone of treating over 10,000 animals worldwide." }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Our History</h1>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-primary rounded-full p-2 flex-shrink-0">
                      <Award className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-xl font-bold text-primary">{item.year}:</span>
                        <span className="font-semibold text-lg">{item.title}</span>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
