import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, FileText } from "lucide-react";

const missions = [
  {
    year: "2025",
    title: "Mataarba Mission",
    location: "Mataarba Community",
    date: "July 15-22, 2025",
    team: "12 volunteers",
    reports: 1,
    description: "Provided essential veterinary care and spiritual support to the Mataarba community with comprehensive animal health services."
  },
  {
    year: "2024",
    title: "Turkana Outreach",
    location: "Turkana County",
    date: "September 10-17, 2024",
    team: "15 volunteers",
    reports: 2,
    description: "Large scale veterinary mission focusing on livestock health and community education programs."
  },
  {
    year: "2023",
    title: "Samburu Initiative",
    location: "Samburu County",
    date: "June 5-12, 2023",
    team: "10 volunteers",
    reports: 1,
    description: "Veterinary care and spiritual outreach in remote Samburu communities with focus on pastoral livestock."
  }
];

const MissionDetails = () => {
  const { year } = useParams();
  const mission = missions.find((m) => m.year === year);

  if (!mission) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Mission not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">
              {mission.title}
            </CardTitle>
            <p className="text-muted-foreground">{mission.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" /> {mission.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" /> {mission.date}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" /> {mission.team}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <FileText className="h-4 w-4 mr-2" /> {mission.reports} Report{mission.reports > 1 && 's'}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link to="/missions">
            <Button variant="outline">← Back to Missions</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MissionDetails;
