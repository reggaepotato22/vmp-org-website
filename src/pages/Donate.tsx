import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Globe, DollarSign, Zap, Gift, CheckCircle } from "lucide-react";
import FlutterwaveDonate from "@/components/donate/FlutterwaveDonate";

const Donate = () => {

  // return (
  //   <div className="container mx-auto py-10">
  //     <h1 className="text-3xl font-bold text-center mb-6">Make a Donation</h1>
  //     <FlutterwaveDonate />
  //   </div>
  // )
  const donationAmounts = [25, 50, 100, 250, 500, 1000];

  const [donationType, setDonationType] = useState<"one-time" | "monthly" | "sponsorship" | null>(null);

  const impactStories = [
    {
      amount: "$25",
      impact: "Provides basic veterinary supplies for treating 5 animals",
      icon: Heart
    },
    {
      amount: "$50", 
      impact: "Covers vaccination costs for 10 livestock animals",
      icon: Users
    },
    {
      amount: "$100",
      impact: "Funds a full day of mobile clinic operations",
      icon: Globe
    },
    {
      amount: "$250",
      impact: "Sponsors a volunteer's mission trip for one week",
      icon: Gift
    }
  ];

  const donationMethods = [
    {
      title: "One-Time Donation",
      description: "Make a single donation to support our current missions",
      popular: false
    },
    {
      title: "Monthly Partnership",
      description: "Become a monthly partner and sustain our ongoing work",
      popular: true
    },
    {
      title: "Mission Sponsorship", 
      description: "Sponsor an entire mission trip or specific program",
      popular: false
    }
  ];

  const recentProjects = [
    {
      title: "Mosiro water project",
      description: "Emergency veterinary care for drought-affected communities",
      raised: 8500,
      goal: 12000,
      percentage: 71
    },
    {
      title: "Samburu Vaccination Animal Center",
      description: "Adding two new mobile units for remote areas",
      raised: 15200,
      goal: 20000, 
      percentage: 76
    },
    {
      title: "Volunteer Training Equipment",
      description: "Medical equipment and supplies for training programs",
      raised: 3400,
      goal: 5000,
      percentage: 68
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            
           <img 
             src="src/assets/kenyavetsmission-logo.png" 
           alt="kenyavetsmission-logo"
           className="h-1500 w-auto mx-auto mb-4"
           />

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Support Our Mission
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your generous donation enables us to bring veterinary care and God's love to animals 
              and communities in need around the world.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Donation Form */}
          <div className="lg:col-span-2">
            {/* Donation Methods */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Choose Your Giving Method</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {donationMethods.map((method, index) => (
  <Card
    key={index}
    onClick={() => setDonationType(
      method.title === "One-Time Donation"
        ? "one-time"
        : method.title === "Monthly Partnership"
        ? "monthly"
        : "sponsorship"
    )}
    className={`cursor-pointer transition-all hover:shadow-md ${
      donationType &&
      ((donationType === "one-time" && method.title === "One-Time Donation") ||
       (donationType === "monthly" && method.title === "Monthly Partnership") ||
       (donationType === "sponsorship" && method.title === "Mission Sponsorship"))
        ? "ring-2 ring-primary bg-primary/5"
        : ""
    }`}
  >
    <CardHeader className="text-center pb-3">
      {method.popular && (
        <Badge className="w-fit mx-auto mb-2">Most Popular</Badge>
      )}
      <CardTitle className="text-lg">{method.title}</CardTitle>
      <CardDescription className="text-sm">{method.description}</CardDescription>
    </CardHeader>
  </Card>
))}

              </div>
            </div>

            {/* Donation Amount Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Select Donation Amount</CardTitle>
                <CardDescription>Choose an amount or enter a custom donation</CardDescription>
              </CardHeader>
              
              <CardContent>
                <FlutterwaveDonate />
                {/* <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                  {donationAmounts.map((amount, index) => (
                    <Button key={index} variant="outline" className="h-12">
                      ${amount}
                    </Button>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Custom Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-md"
                    />
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  <Heart className="h-4 w-4 mr-2" />
                  Donate Now
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Secure payment processing • Tax-deductible receipt provided or God bless you!
                </p> */}
              </CardContent>
            </Card>

            {/* Impact Stories */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Your Impact</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {impactStories.map((story, index) => {
                  const Icon = story.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-primary text-lg">{story.amount}</div>
                            <p className="text-sm text-muted-foreground">{story.impact}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Current Projects */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Current Projects</h3>
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{project.title}</CardTitle>
                      <CardDescription className="text-sm">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{project.percentage}% funded</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${project.percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>${project.raised.toLocaleString()} raised</span>
                          <span>${project.goal.toLocaleString()} goal</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Why Give */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Why Give to VMP?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>95% of donations go directly to mission work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>All donations are tax-deductible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Transparent reporting on fund usage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Regular updates on mission impact</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Questions About Giving?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our team is here to help you make the most impact with your donation.
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    <span className="text-muted-foreground">veterinarianswithamission@gmail.com</span>
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>{" "}
                    <span className="text-muted-foreground">+254 719 207 497</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Contact Our Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Ways to Give */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Other Ways to Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Volunteer</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Join our mission trips and serve alongside our veterinary teams worldwide.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Corporate Sponsorship</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Partner with us through corporate giving and sponsorship opportunities.
                </p>
                <Button variant="outline" size="sm">Get Started</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Legacy Giving</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Include VMP in your estate planning to create lasting impact.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Donate;