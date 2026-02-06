import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Users, GraduationCap, MapPin, Plane, Heart } from "lucide-react";
import { motion } from "framer-motion";

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
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white"
            >
                Volunteer With Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed mb-8 font-light"
            >
                Join a community of dedicated professionals using their veterinary skills to serve God and transform lives.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all" onClick={scrollToApplication}>
                  Start Your Journey
              </Button>
            </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-heading font-bold text-slate-900 mb-4"
            >
              How to Join
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 max-w-2xl mx-auto"
            >
                Our application process ensures that every volunteer is well-prepared and matched with the right opportunity.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 relative hover:shadow-2xl transition-all duration-300 group"
                    >
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-slate-50">
                            {s.step}
                        </div>
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">{s.title}</h3>
                        <p className="text-slate-600 leading-relaxed">
                            {s.description}
                        </p>
                    </motion.div>
                );
            })}
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#f0fdf4_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-1/2"
                >
                    <div className="relative">
                      <div className="absolute inset-0 bg-secondary/20 rounded-3xl transform translate-x-4 translate-y-4"></div>
                      <img 
                          src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                          alt="Veterinary Team" 
                          className="rounded-3xl shadow-2xl relative z-10 w-full"
                      />
                    </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-1/2"
                >
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-8">
                        Volunteer Requirements
                    </h2>
                    <div className="space-y-6">
                        {requirements.map((req, i) => (
                            <div key={i} className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-secondary/30 transition-colors">
                                <Heart className="h-6 w-6 text-secondary mr-4 mt-0.5 flex-shrink-0 fill-secondary/20" />
                                <span className="text-slate-700 font-medium">{req}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-10 p-8 bg-primary rounded-3xl text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                        <p className="text-xl text-white font-heading italic relative z-10 leading-relaxed">
                            "Each one should use whatever gift he has received to serve others, faithfully administering God's grace in its various forms."
                        </p>
                        <p className="text-blue-200 mt-4 text-sm font-bold uppercase tracking-widest relative z-10">- 1 Peter 4:10</p>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* CTA / Application Form Placeholder */}
      <section id="application" ref={applicationRef} className="py-24 bg-blue-50 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-slate-900">Ready to Serve?</h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                  We're excited to have you join our mission. Click below to contact us and start your application process.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-7 text-lg shadow-xl rounded-full w-full sm:w-auto hover:shadow-2xl transition-all hover:-translate-y-1" asChild>
                  <Link to="/contact">Contact Us to Apply</Link>
              </Button>
            </motion.div>
        </div>
      </section>

    </div>
  );
};

export default VolunteerPage;
