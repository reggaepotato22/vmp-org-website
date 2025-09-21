import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  Stethoscope,
  GraduationCap,
  AlarmPlus,
} from "lucide-react";

const Missions = () => {
  const upcomingMissions = [
    {
      title: "Turkana Animals Health Initiative",
      location: "Lodwar, Turkana",
      date: "June 2024",
      duration: "10 days",
      volunteers: "8-12",
      focus: "Animal Health",
      description:
        "Comprehensive livestock health program focusing on sheep, goats, and camels farming communities.",
      goals: [
        "Treat 4000+ animals",
        "Train 30+ local farmers",
        "Establish sustainable care protocols",
      ],
      status: "Open for Applications",
    },
    {
      title: "Kimuka Rural Vet Outreach",
      location: "Kimuka, Ngong",
      date: "August 2024",
      duration: "14 days",
      volunteers: "10-15",
      focus: "Mobile Clinics",
      description:
        "Mobile veterinary clinics serving remote communities with focus on working animals.",
      goals: [
        "Establish 5 mobile clinic sites",
        "Treat 300+ working animals",
        "Educate 50+ families",
      ],
      status: "Planning Phase",
    },
  ];

  const completedMissions = [
    {
      title: "Kenya Rural Clinic Seminar",
      location: "Remote",
      date: "March 2024",
      volunteers: 12,
      impact: "Discussions on the impact of livestock",
      focus: "Livestock Health",
    },
    {
      title: "Suswa Hills Communities",
      location: "Suswa, Narok County",
      date: "January 2024",
      volunteers: 8,
      impact: "150+ animals treated, 35+ families educated",
      focus: "Preventive Care",
    },
    {
      title: "Tanzania Vaccination Program",
      location: "Arusha, Tanzania",
      date: "November 2023",
      volunteers: 15,
      impact: "500+ animals vaccinated, 75+ farmers trained",
      focus: "Disease Prevention",
    },
    {
      title: "Uganda Emergency Response",
      location: "Entebbe, Uganda",
      date: "September 2023",
      volunteers: 6,
      impact: "200+ animals treated during floods",
      focus: "Emergency Care",
    },
  ];

  const missionTypes = [
    {
      icon: Stethoscope,
      title: "Medical Missions",
      description:
        "Providing direct veterinary care and treatment to animals in underserved communities.",
    },
    {
      icon: GraduationCap,
      title: "Training Programs",
      description:
        "Educating local veterinarians and farmers in best practices for animal care.",
    },
    {
      icon: AlarmPlus,
      title: "Emergency Response",
      description:
        "Rapid deployment teams for natural disasters and veterinary emergencies.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Missions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming communities worldwide through compassionate veterinary
            care and Christ-centered service.
          </p>
        </div>
      </section>

      {/* Mission Types */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Types of Missions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {missionTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-md transition"
                >
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mb-2">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Missions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Upcoming Missions
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {upcomingMissions.map((mission, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{mission.title}</CardTitle>
                    <Badge
                      variant={
                        mission.status === "Open for Applications"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {mission.status}
                    </Badge>
                  </div>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {mission.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {mission.date} • {mission.duration}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      {mission.volunteers} volunteers needed
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <Badge variant="outline" className="mb-3">
                    {mission.focus}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-4">
                    {mission.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Mission Goals:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {mission.goals.map((goal, goalIndex) => (
                        <li key={goalIndex} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="mt-auto w-full">
                    {mission.status === "Open for Applications"
                      ? "Apply Now"
                      : "Learn More"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" size="lg">
              View All Upcoming Missions
            </Button>
          </div>
        </div>
      </section>

      {/* Completed Missions */}
      <section className="py-20 bg-accent/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Recent Completed Missions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {completedMissions.map((mission, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{mission.title}</CardTitle>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {mission.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      {mission.date}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-2 text-xs">
                    {mission.focus}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-2">
                    {mission.volunteers} volunteers
                  </p>
                  <div className="bg-primary/5 p-2 rounded text-xs">
                    <strong className="text-primary">Impact:</strong>{" "}
                    {mission.impact}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline">View Mission Archive</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Missions;
