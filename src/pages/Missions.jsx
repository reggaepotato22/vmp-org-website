import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Heart, Stethoscope, GraduationCap, Home } from "lucide-react";

const Missions = () => {
  const allMissions = [
    {
      title: "Mission to Rural Mexico",
      location: "Chiapas, Mexico",
      date: "March 2024",
      participants: 12,
      duration: "10 days",
      purpose: "Veterinary Care & Community Health",
      description: "Our team provided essential veterinary care to animals in remote villages, improving their health and well-being while building relationships with local communities.",
      achievements: [
        "Treated 280+ animals",
        "Vaccinated 150+ dogs and cats",
        "Performed 45 spay/neuter surgeries",
        "Trained 8 local volunteers"
      ],
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=400&fit=crop",
      status: "completed",
      category: "veterinary"
    },
    {
      title: "Community Outreach in Guatemala",
      location: "Antigua, Guatemala",
      date: "February 2024",
      participants: 8,
      duration: "7 days",
      purpose: "Education & Animal Welfare Training",
      description: "We engaged with local communities, offering education on animal care, nutrition, and basic veterinary practices while building lasting relationships.",
      achievements: [
        "Educated 120+ community members",
        "Distributed care packages",
        "Established ongoing partnership",
        "Created educational materials in Spanish"
      ],
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop",
      status: "completed",
      category: "education"
    },
    {
      title: "Team Success in Honduras",
      location: "Tegucigalpa, Honduras",
      date: "January 2024",
      participants: 15,
      duration: "14 days",
      purpose: "Comprehensive Animal Health Program",
      description: "Our mission team achieved significant milestones, treating over 300 animals and training local volunteers in advanced animal care techniques.",
      achievements: [
        "Treated 320+ animals",
        "Performed 60+ surgeries",
        "Trained 12 local veterinarians",
        "Established mobile clinic program"
      ],
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&h=400&fit=crop",
      status: "completed",
      category: "veterinary"
    },
    {
      title: "Emergency Response - Ecuador",
      location: "Quito, Ecuador",
      date: "November 2023",
      participants: 20,
      duration: "21 days",
      purpose: "Disaster Relief & Animal Rescue",
      description: "Following natural disasters, our team provided emergency veterinary care and rescued displaced animals, working closely with local authorities.",
      achievements: [
        "Rescued 180+ animals",
        "Provided emergency medical care",
        "Reunited 95+ pets with families",
        "Coordinated with 5 local shelters"
      ],
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop",
      status: "completed",
      category: "emergency"
    },
    {
      title: "Rural Costa Rica Initiative",
      location: "Puntarenas, Costa Rica",
      date: "September 2023",
      participants: 10,
      duration: "12 days",
      purpose: "Wildlife Conservation & Community Education",
      description: "Focused on wildlife conservation efforts while educating local communities about sustainable practices and animal protection.",
      achievements: [
        "Protected 50+ wildlife species",
        "Established conservation protocols",
        "Trained 25 eco-guardians",
        "Created wildlife corridor"
      ],
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
      status: "completed",
      category: "conservation"
    },
    {
      title: "Urban Outreach - Colombia",
      location: "Medellín, Colombia",
      date: "July 2023",
      participants: 6,
      duration: "8 days",
      purpose: "Street Animal Rehabilitation",
      description: "Focused on rehabilitating street animals in urban areas, providing medical care and finding permanent homes for abandoned pets.",
      achievements: [
        "Rescued 95+ street animals",
        "Found homes for 70+ pets",
        "Established adoption network",
        "Created spay/neuter program"
      ],
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop",
      status: "completed",
      category: "rescue"
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'veterinary': return <Stethoscope className="h-4 w-4" />;
      case 'education': return <GraduationCap className="h-4 w-4" />;
      case 'emergency': return <Heart className="h-4 w-4" />;
      case 'conservation': return <Home className="h-4 w-4" />;
      case 'rescue': return <Heart className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'veterinary': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'education': return 'bg-green-50 text-green-700 border-green-200';
      case 'emergency': return 'bg-red-50 text-red-700 border-red-200';
      case 'conservation': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rescue': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Our Missions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the journey of compassion and care we've taken across Latin America. 
            Each mission represents our commitment to improving animal welfare and building stronger communities.
          </p>
        </div>
      </section>

      {/* Mission Stats */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">6</div>
              <div className="text-muted-foreground">Missions Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">71</div>
              <div className="text-muted-foreground">Total Volunteers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">1,245+</div>
              <div className="text-muted-foreground">Animals Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">6</div>
              <div className="text-muted-foreground">Countries Visited</div>
            </div>
          </div>
        </div>
      </section>

      {/* Missions Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allMissions.map((mission, index) => (
              <Card key={index} className="overflow-hidden shadow-medium hover:shadow-large transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={mission.image}
                    alt={mission.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${getCategoryColor(mission.category)} flex items-center gap-1`}>
                      {getCategoryIcon(mission.category)}
                      {mission.purpose}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {mission.status}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {mission.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{mission.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{mission.date} • {mission.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{mission.participants} volunteers</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {mission.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-sm">Key Achievements:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {mission.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Purpose Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Purpose Behind Our Missions
            </h2>
            <p className="text-lg text-muted-foreground">
              Every mission we undertake is driven by a specific purpose, tailored to the unique needs of each community we serve.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Stethoscope className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Veterinary Care</h3>
              </div>
              <p className="text-muted-foreground">
                Providing essential medical treatment, surgeries, and preventive care to animals in underserved communities where veterinary services are limited or unavailable.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Education & Training</h3>
              </div>
              <p className="text-muted-foreground">
                Empowering local communities with knowledge and skills in animal care, creating sustainable impact that continues long after our missions end.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Emergency Response</h3>
              </div>
              <p className="text-muted-foreground">
                Rapid deployment to areas affected by natural disasters or crises, providing immediate veterinary aid and animal rescue services when they're needed most.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Home className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Conservation</h3>
              </div>
              <p className="text-muted-foreground">
                Protecting wildlife and promoting sustainable practices that benefit both animals and local ecosystems while supporting community livelihoods.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Missions;