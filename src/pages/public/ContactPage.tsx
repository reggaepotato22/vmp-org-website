import ContactForm from "@/components/home/new/ContactForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Loader2, Navigation } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { contactService } from "@/services/contactService";
import bgImage from "@/assets/vmphotos/maf.jpg";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interest, setInterest] = useState("general");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string || "General Inquiry",
      interest: formData.get("interest") as string || "general",
      message: formData.get("message") as string,
      to: "info@kenyavetsmission.org" // Explicitly target this email
    };

    try {
      await contactService.sendMessage(data);
      toast.success("Message Sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen font-sans">
      
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src={bgImage} 
          alt="Mission Field" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/50 to-primary/90 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 drop-shadow-lg"
            >
                Get in Touch
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
            >
                Have questions about our missions, volunteering, or how to support us? We'd love to hear from you.
            </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
                <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md">
                    <CardHeader className="bg-primary/90 text-white py-6">
                        <CardTitle className="text-2xl font-bold font-heading">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8 p-8">
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary mr-5 flex-shrink-0">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 mb-1 font-heading">Our Office</h3>
                                <p className="text-slate-700">
                                    Ultimate Vetserve<br />
                                    Ultimate House, Oloolua Road<br />
                                    Ngong Town, Kenya
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary mr-5 flex-shrink-0">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 mb-1 font-heading">Phone Number</h3>
                                <p className="text-slate-700">+254 722 813 545</p>
                                <p className="text-slate-700">+254 733 813 545</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center text-primary mr-5 flex-shrink-0">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 mb-1 font-heading">Email Us</h3>
                                <p className="text-slate-700">
                                    info@kenyavetsmission.org<br />
                                    support@kenyavetsmission.org
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading">Join Our Newsletter</h3>
                    <p className="text-slate-700 mb-6">Stay updated with our latest missions and impact reports.</p>
                    <form className="flex gap-2">
                        <Input placeholder="Your Email Address" className="bg-white border-slate-200" />
                        <Button className="bg-primary text-white font-bold">Subscribe</Button>
                    </form>
                </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-0 overflow-hidden"
            >
                <ContactForm />
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
