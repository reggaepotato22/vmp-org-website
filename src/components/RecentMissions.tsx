import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Users } from "lucide-react";

const RecentMissions = () => {
  const missions = [
    {
      title: "Mission to Rural Mexico",
      location: "Mexico",
      date: "March 2024",
      participants: "12 volunteers",
      description: "Our team provided essential veterinary care to animals in remote villages, improving their health and well-being.",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=250&fit=crop"
    },
    {
      title: "Community Outreach in Guatemala",
      location: "Guatemala",
      date: "February 2024",
      participants: "8 volunteers", 
      description: "We engaged with local communities, offering education on animal care and building lasting relationships.",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=250&fit=crop"
    },
    {
      title: "Team Success in Honduras",
      location: "Honduras",
      date: "January 2024",
      participants: "15 volunteers",
      description: "Our mission team achieved significant milestones, treating over 300 animals and training local volunteers.",
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400&h=250&fit=crop"
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