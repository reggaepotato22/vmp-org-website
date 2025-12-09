import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, FileText, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useNewsContext } from '../context/NewsContext';

const Missions = () => {
  const { missions } = useNewsContext();

  // Group missions by year
  const missionsByYear = missions.reduce((acc, mission) => {
    if (!acc[mission.year]) {
      acc[mission.year] = [];
    }
    acc[mission.year].push(mission);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(missionsByYear).sort((a, b) => b - a);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Mission Reports
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our veterinary mission work around the world. Each report documents our impact in communities, 
              lives touched, and animals cared for through God's love.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {sortedYears.length > 0 ? (
          <div className="space-y-12">
            {sortedYears.map((year) => (
              <div key={year}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-3xl font-bold text-foreground">{year}</h2>
                  <div className="flex-1 h-0.5 bg-border"></div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {missionsByYear[year].map((mission) => (
                    <Card key={mission.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                        <CardTitle className="text-2xl text-primary">
                          {mission.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <p className="text-muted-foreground">{mission.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-foreground">{mission.location}</span>
                          </div>
                          
                          <div className="flex items-start gap-2 text-sm">
                            <Calendar className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-foreground">{mission.date}</span>
                          </div>
                          
                          <div className="flex items-start gap-2 text-sm">
                            <Users className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-foreground">{mission.team}</span>
                          </div>
                          
                          <div className="flex items-start gap-2 text-sm">
                            <FileText className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                            <span className="text-foreground">
                              {mission.reports || (mission.reportFile ? 1 : 0)} Report{mission.reports !== 1 && 's'}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 border-t space-y-2">
                          {mission.reportUrl && mission.reportFile && (
                            <Button asChild className="w-full" size="sm">
                              <a href={mission.reportUrl} target="_blank" rel="noopener noreferrer" download>
                                <Download className="h-4 w-4 mr-2" />
                                Download Report: {mission.reportFile}
                              </a>
                            </Button>
                          )}
                          
                          <Button asChild variant="outline" size="sm" className="w-full">
                            <Link to={`/missions/${mission.year}`}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">No mission reports available yet.</p>
          </div>
        )}

        {/* Mission Impact Stats */}
        <div className="mt-16 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Our Mission Impact</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{missions.length}+</div>
              <div className="text-sm text-muted-foreground">Missions Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Volunteers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-sm text-muted-foreground">Animals Treated</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-primary/10 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Join Our Next Mission</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Be part of something bigger. Join our team of dedicated veterinary professionals 
            bringing healing and hope to communities around the world.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link to="/get-involved">Volunteer With Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/donate">Support Our Missions</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Missions;