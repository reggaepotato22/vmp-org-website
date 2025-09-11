import { useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { 
  Users, 
  GraduationCap, 
  Heart, 
  Plane, 
  MapPin, 
  Calendar,
  CheckCircle,
  FileText,
  Clock,
  Globe
} from "lucide-react";

const HowToVolunteer = () => {
  // ref for Application Process section
  const applicationRef = useRef<HTMLDivElement | null>(null);

  const scrollToApplication = () => {
    applicationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const steps = [
    {
      step: "1",
      title: "Check Eligibility",
      description: "Review our volunteer requirements and ensure you meet the qualifications",
      icon: <CheckCircle className="h-8 w-8 text-primary" />
    },
    {
      step: "2", 
      title: "Submit Application",
      description: "Complete our comprehensive volunteer application form with your details and experience",
      icon: <FileText className="h-8 w-8 text-primary" />
    },
    {
      step: "3",
      title: "Interview Process",
      description: "Participate in a virtual interview to discuss your motivations and suitability",
      icon: <Users className="h-8 w-8 text-primary" />
    },
    {
      step: "4",
      title: "Training & Preparation",
      description: "Complete mandatory training modules and prepare for your mission deployment",
      icon: <GraduationCap className="h-8 w-8 text-primary" />
    },
    {
      step: "5",
      title: "Mission Assignment",
      description: "Get matched with a mission that aligns with your skills and availability",
      icon: <MapPin className="h-8 w-8 text-primary" />
    },
    {
      step: "6",
      title: "Deploy & Serve",
      description: "Travel to your assigned location and begin making a difference",
      icon: <Plane className="h-8 w-8 text-primary" />
    }
  ];

  const requirements = {
    essential: [
      "Qualified veterinarian, veterinary nurse, or final-year veterinary student",
      "Valid professional license/certification in your home country",
      "Minimum 2 years of clinical experience (exceptions for students)",
      "Physical fitness for travel and work in challenging environments",
      "Current passport valid for at least 12 months",
      "Flexibility to travel for 2-4 weeks"
    ],
    preferred: [
      "Experience with large animals or rural veterinary practice",
      "Previous volunteer or humanitarian work experience",
      "Basic knowledge of tropical diseases",
      "Ability to work with limited resources",
      "Cultural sensitivity and adaptability",
      "Additional language skills (French, Swahili, etc.)"
    ]
  };

  const missionTypes = [
    {
      title: "Community Outreach",
      duration: "2-3 weeks",
      description: "Provide direct veterinary care to animals in rural communities, focusing on treatment and preventive medicine.",
      activities: ["Clinical consultations", "Vaccinations", "Basic surgeries", "Health education"],
      commitment: "Medium"
    },
    {
      title: "Training & Education",
      duration: "3-4 weeks", 
      description: "Train local veterinarians and farmers in modern veterinary practices and animal husbandry techniques.",
      activities: ["Workshop facilitation", "Hands-on training", "Resource development", "Follow-up support"],
      commitment: "High"
    },
    {
      title: "Wildlife Conservation",
      duration: "3-4 weeks",
      description: "Support wildlife conservation efforts through veterinary care for wild animals and conservation education.",
      activities: ["Wildlife health assessments", "Research support", "Conservation education", "Species monitoring"],
      commitment: "High"
    },
    {
      title: "Emergency Response",
      duration: "1-2 weeks",
      description: "Respond to disease outbreaks or natural disasters affecting animal populations.",
      activities: ["Emergency treatment", "Disease control", "Assessment missions", "Rapid deployment"],
      commitment: "Flexible"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How to Volunteer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join our mission to provide essential veterinary care across Africa. 
            Your skills and compassion can make a life-changing difference for animals and communities in need.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={scrollToApplication}
          >
            Start Your Application
          </Button>
        </div>
      </section>

      {/* Application Process */}
      <section ref={applicationRef} className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Application Process</h2>
            <p className="text-xl text-muted-foreground">Follow these simple steps to begin your volunteer journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-smooth">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs font-bold">
                      STEP {step.step}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-mission-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Volunteer Requirements</h2>
            <p className="text-xl text-muted-foreground">Ensure you meet our qualifications before applying</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center">
                  <CheckCircle className="h-6 w-6 text-primary mr-2" />
                  Essential Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.essential.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center">
                  <Globe className="h-6 w-6 text-accent mr-2" />
                  Preferred Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.preferred.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Types */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Types of Missions</h2>
            <p className="text-xl text-muted-foreground">Choose the mission type that matches your skills and interests</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missionTypes.map((mission, index) => (
              <Card key={index} className="hover:shadow-medium transition-smooth">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-foreground">{mission.title}</CardTitle>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {mission.duration}
                      </Badge>
                      <p className="text-xs text-muted-foreground">Commitment: {mission.commitment}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{mission.description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-foreground mb-3">Key Activities:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {mission.activities.map((activity, idx) => (
                      <span key={idx} className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded">
                        {activity}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Start your application today and join our community of dedicated veterinary volunteers 
            making a lasting impact across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Download Application */}
            <a 
              href="/files/volunteer-application.pdf" 
              download 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-white/90">
                Download Application
              </Button>
            </a>

            {/* Contact Us */}
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowToVolunteer;
