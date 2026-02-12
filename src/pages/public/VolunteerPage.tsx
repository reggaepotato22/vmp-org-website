import VolunteerSection from "@/components/home/new/VolunteerSection";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Users, GraduationCap, MapPin, Plane, Heart } from "lucide-react";
import { motion } from "framer-motion";
import bgImage from "@/assets/vmphotos/vetst.jpg";

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
    <div className="min-h-screen font-sans relative">
      
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0">
        <img src={bgImage} alt="Veterinary Team" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/50 to-primary/90 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10">
      
      {/* Hero */}
      <section className="pt-32 pb-20 text-center">
        <div className="container mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white drop-shadow-lg"
            >
                Volunteer With Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed mb-8 font-light drop-shadow-md"
            >
                Join a community of dedicated professionals using their veterinary skills to serve God and transform lives.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-md px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all" onClick={scrollToApplication}>
                  Start Your Journey
              </Button>
            </motion.div>
        </div>
      </section>

      <div className="bg-white/95 backdrop-blur-sm">
        <VolunteerSection />
        
        {/* Requirements */}
        <section className="py-20 border-t border-slate-100">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-heading font-bold text-slate-900 mb-10 text-center">Requirements</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {requirements.map((req, i) => (
                            <div key={i} className="flex items-start bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
                                <p className="text-slate-700 text-lg leading-relaxed">{req}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Steps */}
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-heading font-bold text-slate-900 mb-16 text-center">How to Join</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 relative group hover:shadow-xl transition-all">
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white font-bold text-xl rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                {item.step}
                            </div>
                            <div className="mb-6 text-primary bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <item.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 font-heading">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Application Section */}
        <section ref={applicationRef} className="py-20 border-t border-slate-100">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-heading font-bold text-slate-900 mb-8">Ready to Apply?</h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12">
                    Take the first step towards a life-changing experience. Our team will review your application and get in touch.
                </p>
                <div className="bg-primary/5 p-12 rounded-[3rem] border-2 border-primary/10 max-w-4xl mx-auto">
                    <Heart className="h-16 w-16 text-primary mx-auto mb-8 animate-pulse" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 font-heading">Online Application Form</h3>
                    <p className="text-slate-700 mb-10">
                        Our comprehensive application process helps us ensure that every volunteer is well-prepared for the unique challenges and rewards of mission work.
                    </p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-md px-10 py-7 text-xl shadow-xl transition-all h-auto">
                        Open Application Form
                    </Button>
                </div>
            </div>
        </section>
      </div>

      </div>
    </div>
  );
};

export default VolunteerPage;
