import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Message Sent! We'll get back to you soon.");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6"
            >
                Get in Touch
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed"
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
                <Card className="border-none shadow-lg rounded-3xl overflow-hidden">
                    <CardHeader className="bg-primary text-white py-6">
                        <CardTitle className="text-2xl font-bold">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8 p-8 bg-white">
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary mr-5 flex-shrink-0">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 mb-1">Our Office</h3>
                                <p className="text-slate-600">
                                    Nairobi, Kenya<br />
                                    P.O. Box 12345 - 00100
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary mr-5 flex-shrink-0">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 mb-1">Phone</h3>
                                <p className="text-slate-600">+254 7XX XXX XXX</p>
                                <p className="text-slate-500 text-sm">Mon-Fri from 8am to 5pm</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary mr-5 flex-shrink-0">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 mb-1">Email</h3>
                                <p className="text-slate-600">info@kenyavetsmission.org</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Map Placeholder */}
                <div className="h-64 bg-slate-100 rounded-3xl w-full flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
                    <div className="text-center">
                        <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <span className="font-medium">Map Integration Coming Soon</span>
                    </div>
                </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
                <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                    <CardHeader className="bg-secondary text-white py-6">
                        <CardTitle className="text-2xl font-bold">Send us a Message</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-slate-800 font-medium">Full Name</Label>
                                    <Input id="name" required placeholder="John Doe" className="rounded-xl border-slate-200 focus:border-primary focus:ring-primary" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-800 font-medium">Email Address</Label>
                                    <Input id="email" type="email" required placeholder="john@example.com" className="rounded-xl border-slate-200 focus:border-primary focus:ring-primary" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject" className="text-slate-800 font-medium">Subject</Label>
                                <Select name="interest">
                                    <SelectTrigger className="rounded-xl border-slate-200 focus:ring-primary">
                                        <SelectValue placeholder="Select a topic" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="general">General Inquiry</SelectItem>
                                        <SelectItem value="volunteer">Volunteering</SelectItem>
                                        <SelectItem value="partnership">Partnership</SelectItem>
                                        <SelectItem value="donation">Donation Support</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-slate-800 font-medium">Message</Label>
                                <Textarea 
                                    id="message" 
                                    required 
                                    placeholder="How can we help you?" 
                                    className="min-h-[150px] rounded-xl border-slate-200 focus:border-primary focus:ring-primary"
                                />
                            </div>

                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
