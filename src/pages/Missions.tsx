import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Missions = () => {
  const missions = [
    {
      year: "2025",
      title: "Mataarba Mission",
      location: "Mataarba Community",
      date: "July 15-22, 2025",
      team: "12 volunteers",
      reports: 1,
      status: "completed",
      description: "Provided essential veterinary care and spiritual support to the Mataarba community with comprehensive animal health services."
    },
    {
      year: "2024",
      title: "Turkana Outreach",
      location: "Turkana County",
      date: "September 10-17, 2024",
      team: "15 volunteers",
      reports: 2,
      status: "completed",
      description: "Large scale veterinary mission focusing on livestock health and community education programs."
    },
    {
      year: "2023",
      title: "Samburu Initiative",
      location: "Samburu County",
      date: "June 5-12, 2023",
      team: "10 volunteers",
      reports: 1,
      status: "completed",
      description: "Veterinary care and spiritual outreach in remote Samburu communities with focus on pastoral livestock."
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Mission Database
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our veterinary missions and their impact on communities across Kenya. 
            Each mission combines professional veterinary care with spiritual outreach.
          </p>
        </header>

        {/* Missions Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => (
            <Card key={mission.year} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{mission.title}</CardTitle>
                  <span className="text-sm font-semibold bg-primary/10 text-primary px-2 py-1 rounded">
                    {mission.year}
                  </span>
                </div>
                <CardDescription className="text-base">
                  {mission.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {mission.location}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {mission.date}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  {mission.team}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-2" />
                    {mission.reports} {mission.reports === 1 ? 'Report' : 'Reports'}
                  </div>
                  
                  <Link to={`/missions/${mission.year}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Join Our Next Mission
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Ready to make a difference? Join our team of dedicated veterinarians and volunteers 
            on our next mission to serve communities in need.
          </p>
          <Link to="/volunteers">
            <Button size="lg">
              Become a Volunteer
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Missions;  