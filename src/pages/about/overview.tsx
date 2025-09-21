import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, Award, Calendar } from "lucide-react";

const Overview = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-6 text-center">Overview</h1>
          <p className="text-lg leading-relaxed mb-12 text-center">
            Vet Missions is a non-profit organization dedicated to providing veterinary care 
            to underserved communities around the world. Our mission is to improve animal health 
            and welfare, promote public health, and share the love of Christ through compassionate service.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">500+ Volunteers</h3>
                <p className="text-muted-foreground text-sm">
                  Dedicated professionals and volunteers from around the world
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">25+ Countries</h3>
                <p className="text-muted-foreground text-sm">
                  Serving communities across multiple continents
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">10,000+ Animals</h3>
                <p className="text-muted-foreground text-sm">
                  Lives touched through our veterinary care programs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">14 Years</h3>
                <p className="text-muted-foreground text-sm">
                  Of dedicated service to animals and communities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Overview;
