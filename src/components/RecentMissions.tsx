import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Users } from "lucide-react";

const RecentMissions = () => {
  const missions = [
    {
      title: "Mission to Rural Mosiro",
      location: "Narok",
      date: "Month 20--",
      participants: "25 volunteers",
      description: "Our team provided essential veterinary care to animals in remote villages, improving their health and well-being.",

      image: "src/assets/vmphotos/mosiro.jpg"

    },
    {
      title: "Community Outreach in Marsabit",
      location: "Marsabit",
      date: "February 20--",
      participants: "120 volunteers", 
      description: "We engaged with local communities, offering education on animal care and building lasting relationships.",

      image: "src/assets/lodwar.jpg"

      image: "src/assets/vmphotos/vetst4.jpg"

    },
    {
      title: "Team Success in Moyale",
      location: "Moyale",
      date: "January 20--",
      participants: "70 volunteers",
      description: "Our mission team achieved significant milestones, treating over 300 animals and training local volunteers.",
      image: "src/assets/vmphotos/prayers.jpg"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recent Missions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the impact we're making around the world through our recent mission trips 
            and community outreach programs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {missions.map((mission, index) => (
            <Card key={index} className="overflow-hidden shadow-medium hover:shadow-large transition-smooth group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={mission.image}
                  alt={mission.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {mission.title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="mr-4">{mission.location}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{mission.date}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{mission.participants}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {mission.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/missions">View All Missions</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentMissions;