import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Award, Users, Globe } from "lucide-react";

const Overview = () => {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed mb-8">
          Vet Missions is a non-profit organization dedicated to providing veterinary care to 
          underserved communities around the world. Our mission is to improve animal health and 
          welfare, promote public health, and share the love of Christ through compassionate service. 
          We believe that by working together, we can make a lasting impact on the lives of both 
          animals and people.
        </p>
      </div>

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
  );
};

export default Overview;
