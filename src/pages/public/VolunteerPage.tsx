import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Users, GraduationCap, MapPin, Plane, Heart } from "lucide-react";

const VolunteerPage = () => {
  const applicationRef = useRef<HTMLDivElement | null>(null);

  const scrollToApplication = () => {
    applicationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const steps = [
    {
      step: "1",
      title: "Check Eligibility",
      description: "Review our volunteer requirements and ensure you meet the qualifications",
      icon: CheckCircle
    },
    {
      step: "2", 
      title: "Submit Application",
      description: "Complete our comprehensive volunteer application form with your details and experience",
      icon: FileText
    },
    {
      step: "3",
      title: "Interview Process",
      description: "Participate in a virtual interview to discuss your motivations and suitability",
      icon: Users
    },
    {
      step: "4",
      title: "Training & Preparation",
      description: "Complete mandatory training modules and prepare for your mission deployment",
      icon: GraduationCap
    },
    {
      step: "5",
      title: "Mission Assignment",
      description: "Get matched with a mission that aligns with your skills and availability",
      icon: MapPin
    },
    {
      step: "6",
      title: "Deploy & Serve",
      description: "Travel to your assigned location and begin making a difference",
      icon: Plane
    }
  ];

  const requirements = [
    "Born again and having a firm stand in Christian faith",
    "Active member in church or Christian Union",
    "Active participant in veterinary profession (Vet Surgeons, Vet paraprofessionals, Vet interns, Vet students)",
    "Zeal to serve Christ and mankind in all diversities",
    "Availability for our monthly prayers, Missions, and other activities",
    "Annual Subscription 500 KES for students, 1000 KES for professionals"
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero */}
      <section className="bg-primary text-white pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Volunteer With Us
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
                Join a community of dedicated professionals using their veterinary skills to serve God and transform lives.
            </p>
            <Button size="lg" variant="secondary" onClick={scrollToApplication} className="font-bold">
                Start Your Journey
            </Button>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-slate-800 mb-4">How to Join</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
                Our application process ensures that every volunteer is well-prepared and matched with the right opportunity.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                    <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative hover:shadow-md transition-shadow">
                        <div className="absolute -top-4 -left-4 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                            {s.step}
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-primary">
                            <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">{s.title}</h3>
                        <p className="text-slate-600 leading-relaxed">
                            {s.description}
                        </p>
                    </div>
                );
            })}
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="w-full lg:w-1/2">
                    <img 
                        src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                        alt="Veterinary Team" 
                        className="rounded-2xl shadow-lg"
                    />
                </div>
                <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl font-heading font-bold text-slate-800 mb-6">
                        Volunteer Requirements
                    </h2>
                    <div className="space-y-4">
                        {requirements.map((req, i) => (
                            <div key={i} className="flex items-start">
                                <Heart className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                                <span className="text-slate-700">{req}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-blue-800 italic">
                            "Each one should use whatever gift he has received to serve others, faithfully administering God's grace in its various forms." - 1 Peter 4:10
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA / Application Form Placeholder */}
      <section id="application" ref={applicationRef} className="py-20 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Serve?</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                We're excited to have you join our mission. Click below to contact us and start your application process.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-6 text-lg shadow-lg shadow-accent/20 w-full sm:w-auto" asChild>
                <Link to="/contact">Contact Us to Apply</Link>
            </Button>
        </div>
      </section>

    </div>
  );
};

export default VolunteerPage;
