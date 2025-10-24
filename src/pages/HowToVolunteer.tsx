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
  CheckCircle,
  FileText,
  Clock,
  Globe
} from "lucide-react";

const HowToVolunteer = () => {
  const applicationRef = useRef<HTMLDivElement | null>(null);

  const scrollToApplication = () => {
    applicationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const steps = [
    {
      step: "1",
      title: "Check Eligibility",
      description: "Review our volunteer requirements and ensure you meet the qualifications",
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />
    },
    {
      step: "2", 
      title: "Submit Application",
      description: "Complete our comprehensive volunteer application form with your details and experience",
      icon: <FileText className="h-8 w-8 text-blue-600" />
    },
    {
      step: "3",
      title: "Interview Process",
      description: "Participate in a virtual interview to discuss your motivations and suitability",
      icon: <Users className="h-8 w-8 text-blue-600" />
    },
    {
      step: "4",
      title: "Training & Preparation",
      description: "Complete mandatory training modules and prepare for your mission deployment",
      icon: <GraduationCap className="h-8 w-8 text-blue-600" />
    },
    {
      step: "5",
      title: "Mission Assignment",
      description: "Get matched with a mission that aligns with your skills and availability",
      icon: <MapPin className="h-8 w-8 text-blue-600" />
    },
    {
      step: "6",
      title: "Deploy & Serve",
      description: "Travel to your assigned location and begin making a difference",
      icon: <Plane className="h-8 w-8 text-blue-600" />
    }
  ];

  const requirements = {
    essential: [
      "Born again and having a firm stand in Christian faith",
      "Active member in church or Christian Union",
      "Active participant in veterinary profession(Vet Surgeons, Vet paraprofessionals, Vet interns, Vet students",
      "Zeal to serve Christ and mankind in all diversities",
      "Availability for our monthly prayers, Missions , and other activities",
      "Annual Subscription 500 for students, 1000 for professions"
    ],
    preferred: [
      // "Experience with large animals or rural veterinary practice",
      // "Previous volunteer or humanitarian work experience",
      // "Basic knowledge of tropical diseases",
      // "Ability to work with limited resources",
      // "Cultural sensitivity and adaptability",
      // "Additional language skills (French, Swahili, etc.)"
    ]
  };

  const missionTypes = [
    // {
    //   title: "Community Outreach",
    //   duration: "2-3 weeks",
    //   description: "Provide direct veterinary care to animals in rural communities, focusing on treatment and preventive medicine.",
    //   activities: ["Clinical consultations", "Vaccinations", "Basic surgeries", "Health education"],
    //   commitment: "Medium"
    // },
    // {
    //   title: "Training & Education",
    //   duration: "3-4 weeks", 
    //   description: "Train local veterinarians and farmers in modern veterinary practices and animal husbandry techniques.",
    //   activities: ["Workshop facilitation", "Hands-on training", "Resource development", "Follow-up support"],
    //   commitment: "High"
    // },
    // {
    //   title: "Wildlife Conservation",
    //   duration: "3-4 weeks",
    //   description: "Support wildlife conservation efforts through veterinary care for wild animals and conservation education.",
    //   activities: ["Wildlife health assessments", "Research support", "Conservation education", "Species monitoring"],
    //   commitment: "High"
    // },
    // {
    //   title: "Emergency Response",
    //   duration: "1-2 weeks",
    //   description: "Respond to disease outbreaks or natural disasters affecting animal populations.",
    //   activities: ["Emergency treatment", "Disease control", "Assessment missions", "Rapid deployment"],
    //   commitment: "Flexible"
    // }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-news-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How to Volunteer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join our mission to provide essential veterinary care across Africa. 
            Your skills and compassion can make a life-changing difference for animals and communities in need.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={scrollToApplication}
          >
            Start Your Application
          </Button>
        </div>
      </section>

      {/* Application Process */}
      <section ref={applicationRef} className="py-16 bg-news-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Application Process</h2>
            <p className="text-xl text-gray-600">Follow these simple steps to begin your volunteer journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-smooth">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs font-bold">
                      STEP {step.step}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-gray-800">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-news-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Volunteer Requirements</h2>
            <p className="text-xl text-gray-600">Ensure you meet our qualifications before applying</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                  Essential Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.essential.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center">
                  <Globe className="h-6 w-6 text-blue-600 mr-2" />
                  Preferred Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.preferred.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </section>

      {/* Mission Types */}
      <section className="py-16 bg-news-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Types of Missions</h2>
            <p className="text-xl text-gray-600">Choose the mission type that matches your skills and interests</p>
          </div><div className="text-3xl font-bold text-gray-800 mb-4"> Not yet posted </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missionTypes.map((mission, index) => (
              <Card key={index} className="hover:shadow-medium transition-smooth">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-gray-800">{mission.title}</CardTitle>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {mission.duration}
                      </Badge>
                      <p className="text-xs text-gray-500">Commitment: {mission.commitment}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{mission.description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-gray-800 mb-3">Key Activities:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {mission.activities.map((activity, idx) => (
                      <span key={idx} className="text-sm text-gray-600 bg-blue-50 px-2 py-1 rounded">
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
      <section className="bg-news-gradient py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your application today and join our community of dedicated veterinary volunteers 
            making a lasting impact across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSeP02XAJr24KICE3UUkHuU6BlO0mseUzW5UwXpHYESypOm2vg/viewform?usp=header" 
              download 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                CLick to apply
              </Button>
            </a>

            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
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
