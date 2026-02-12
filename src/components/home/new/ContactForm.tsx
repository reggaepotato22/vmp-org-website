import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useData } from '@/context/DataContext';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>();
  const { addVolunteer } = useData(); // We can use this or just mock the submission

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    // In a real app, this would send an email. 
    // For this demo, we could treat it as a volunteer inquiry if they check a box, 
    // but for now just reset and show success.
    reset();
    alert("Message sent successfully!");
  };

  return (
    <section id="contact" className="py-20 bg-vmp-beige relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-vmp-black mb-4 font-montserrat">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            Have questions about our mission or want to get involved? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8 bg-white p-8 rounded-2xl shadow-sm h-full"
          >
            <h3 className="text-2xl font-bold text-vmp-maroon mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-vmp-beige p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-vmp-maroon" />
                </div>
                <div>
                  <h4 className="font-bold text-vmp-black">Our Office</h4>
                  <p className="text-gray-600">123 Mission Drive, Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-vmp-beige p-3 rounded-full">
                  <Mail className="h-6 w-6 text-vmp-maroon" />
                </div>
                <div>
                  <h4 className="font-bold text-vmp-black">Email Us</h4>
                  <p className="text-gray-600">contact@kenyamission.org</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-vmp-beige p-3 rounded-full">
                  <Phone className="h-6 w-6 text-vmp-maroon" />
                </div>
                <div>
                  <h4 className="font-bold text-vmp-black">Call Us</h4>
                  <p className="text-gray-600">+254 123 456 789</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-vmp-maroon/5 rounded-xl border border-vmp-maroon/10">
              <h4 className="font-bold text-vmp-maroon mb-2">Join as a Volunteer?</h4>
              <p className="text-gray-600 text-sm mb-4">
                We are always looking for passionate individuals to join our cause.
              </p>
              <Button variant="outline" className="w-full border-vmp-maroon text-vmp-maroon hover:bg-vmp-maroon hover:text-white transition-colors">
                Apply to Volunteer
              </Button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-vmp-maroon"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <Input 
                    {...register("name", { required: "Name is required" })}
                    placeholder="John"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input 
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    placeholder="john@example.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <Input 
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="How can I help?"
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && <span className="text-xs text-red-500">{errors.subject.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <Textarea 
                  {...register("message", { required: "Message is required" })}
                  placeholder="Your message here..."
                  className={`min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-vmp-maroon hover:bg-vmp-maroon/90 text-white h-12 text-lg font-semibold"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
