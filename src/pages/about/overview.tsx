import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Globe, Award, Target, Eye, Lightbulb, CheckCircle2 } from "lucide-react";

const Overview = () => {
  const stats = [
    { icon: Heart, label: "Animals Treated", value: "10,000+", color: "text-red-500" },
    { icon: Users, label: "Volunteers", value: "500+", color: "text-blue-500" },
    { icon: Globe, label: "Counties Served", value: "25+", color: "text-green-500" },
    { icon: Award, label: "Years of Service", value: "15+", color: "text-purple-500" },
  ];

  const coreValues = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every animal and community with deep empathy and care, recognizing the sacred bond between humans and animals."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest standards in veterinary care, ensuring quality treatment and sustainable solutions."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in empowering local communities through education, training, and collaborative partnerships."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace new approaches and technologies to address evolving challenges in animal health and welfare."
    }
  ];

  const impactAreas = [
    {
      title: "Veterinary Care",
      description: "Providing essential medical treatment, vaccinations, and surgical services to animals in underserved regions.",
      points: [
        "Free veterinary clinics in rural areas",
        "Emergency medical interventions",
        "Disease prevention programs",
        "Parasite control initiatives"
      ]
    },
    {
      title: "Community Education",
      description: "Empowering communities with knowledge about animal health, nutrition, and sustainable farming practices.",
      points: [
        "Animal husbandry training",
        "Disease prevention workshops",
        "Nutrition and care seminars",
        "Youth education programs"
      ]
    },
    {
      title: "Capacity Building",
      description: "Training local veterinarians and animal health workers to create lasting impact in their communities.",
      points: [
        "Professional development programs",
        "Hands-on clinical training",
        "Resource provision and support",
        "Mentorship opportunities"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Who We Are
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Veterinarians with a Mission Programme is a faith-based organization dedicated 
                to providing veterinary care to animals in underserved communities worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-background rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon className={`h-10 w-10 ${stat.color}`} />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-primary/10 rounded-lg p-3 mr-4">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To improve animal health and welfare in underserved communities while promoting 
                    public health and sharing the love of Christ through compassionate veterinary service. 
                    We are committed to making a lasting impact on the lives of both animals and the 
                    people who depend on them.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-primary/10 rounded-lg p-3 mr-4">
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A world where every animal receives quality veterinary care, and every community 
                    has access to the knowledge and resources needed to maintain healthy, thriving 
                    livestock. We envision empowered communities transforming their futures through 
                    improved animal health and welfare.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="bg-primary/10 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impact Areas Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Impact Areas</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive programs designed to create lasting change
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {impactAreas.map((area, index) => (
                <Card key={index} className="border-2 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">{area.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {area.description}
                    </p>
                    <ul className="space-y-3">
                      {area.points.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Together, we can transform lives through compassionate veterinary care and community empowerment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/volunteers/how-to" 
                className="px-8 py-3 bg-background text-foreground rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Become a Volunteer
              </a>
              <a 
                href="/donate" 
                className="px-8 py-3 bg-primary-foreground/20 text-primary-foreground border-2 border-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/30 transition-all"
              >
                Support Our Mission
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Overview;