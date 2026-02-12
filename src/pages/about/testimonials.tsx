import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, Heart, Award, Users, MapPin } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Josiah Mandieka",
      role: "Volunteer Veterinarian",
      location: "Nairobi, Kenya",
      year: "2023",
      image: "👩‍⚕️",
      content: "Joining VMP was one of the most fulfilling decisions of my career. Witnessing the direct impact of our work on both animals and communities has been incredibly rewarding. The organization's commitment to combining veterinary excellence with faith-based compassion creates a unique and powerful approach to service.",
      rating: 5,
      highlight: "Life-Changing Experience"
    },
    {
      name: "Pst. Amos Tanin",
      role: "Community Leader",
      location: "Turkana County",
      year: "2022",
      image: "👨",
      content: "VMP transformed our community by bringing not just veterinary care, but hope and education. Our livestock are healthier, our children are learning, and our families are thriving. The team's dedication and respect for our culture made all the difference.",
      rating: 5,
      highlight: "Community Transformation"
    },
    {
      name: "Dr. Michael Chen",
      role: "Missions Coordinator",
      location: "Singapore",
      year: "2024",
      image: "👨‍⚕️",
      content: "I've participated in medical missions globally, but VMP's holistic approach stands out. They don't just treat animals; they empower communities, train local workers, and build sustainable solutions. It's veterinary care with a lasting legacy.",
      rating: 5,
      highlight: "Sustainable Impact"
    },
    {
      name: "Grace Wanjiru",
      role: "Livestock Farmer",
      location: "Laikipia County",
      year: "2023",
      image: "👩",
      content: "Before VMP came to our village, we were losing animals to preventable diseases. Now, thanks to their training and support, I know how to care for my livestock properly. My family's income has improved, and I can send my children to school.",
      rating: 5,
      highlight: "Economic Empowerment"
    },
    {
      name: "Dr. David Mutua",
      role: "Veterinary Student",
      location: "University of Nairobi",
      year: "2024",
      image: "👨‍🎓",
      content: "The hands-on experience I gained through VMP's mentorship program was invaluable. Working alongside experienced veterinarians in real-world conditions taught me more than any textbook could. VMP is shaping the next generation of compassionate veterinarians.",
      rating: 5,
      highlight: "Professional Development"
    },
    {
      name: "Rev. Peter Kamau",
      role: "Community Pastor",
      location: "Samburu County",
      year: "2022",
      image: "⛪",
      content: "VMP's work goes beyond animal care—they touch hearts and transform lives spiritually. Their genuine love and service open doors for meaningful conversations about faith. They truly embody Christ's love through their actions.",
      rating: 5,
      highlight: "Spiritual Impact"
    }
  ];

  const stats = [
    { icon: Users, number: "500+", label: "Volunteers Served" },
    { icon: Heart, number: "10,000+", label: "Animals Helped" },
    { icon: MapPin, number: "25+", label: "Communities Reached" },
    { icon: Award, number: "15+", label: "Years of Impact" }
  ];

  const impactQuotes = [
    {
      quote: "Compassion in action",
      author: "Village Elder, Marsabit"
    },
    {
      quote: "Hope for our livestock",
      author: "Pastoralist Community"
    },
    {
      quote: "Faith in service",
      author: "Mission Partner"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center bg-blue-100 rounded-full px-6 py-2 mb-6">
                <Quote className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-600 font-semibold">What People Say</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                Stories of Impact
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed">
                Real experiences from volunteers, communities, and partners touched by our mission
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Impact Quotes */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {impactQuotes.map((item, index) => (
                <div key={index} className="text-center">
                  <Quote className="h-10 w-10 text-blue-600 mx-auto mb-4 opacity-50" />
                  <p className="text-2xl font-bold text-slate-900 mb-2">{item.quote}</p>
                  <p className="text-slate-500">— {item.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Hear From Our Community
              </h2>
              <p className="text-xl text-slate-500 max-w-3xl mx-auto">
                Voices of transformation from volunteers, beneficiaries, and partners
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1 border-2">
                  <CardContent className="p-8">
                    {/* Rating Stars */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Highlight Badge */}
                    <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      {testimonial.highlight}
                    </div>

                    {/* Quote */}
                    <Quote className="h-8 w-8 text-blue-600/20 mb-4" />
                    <blockquote className="text-slate-900 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-start border-t pt-4">
                      <div className="text-4xl mr-4">{testimonial.image}</div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-900">{testimonial.name}</div>
                        <div className="text-sm text-slate-500">{testimonial.role}</div>
                        <div className="flex items-center text-xs text-slate-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {testimonial.location}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {testimonial.year}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Statement Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-2 border-blue-600/20">
              <CardContent className="p-12 text-center">
                <Quote className="h-16 w-16 text-blue-600/30 mx-auto mb-6" />
                <blockquote className="text-3xl font-bold text-slate-900 mb-6 leading-relaxed">
                  "VMP doesn't just treat animals—they transform communities, empower people, and spread hope through compassionate service."
                </blockquote>
                <div className="text-xl text-slate-500">
                  — Common sentiment from communities we serve
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Video Testimonials Placeholder */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Video Testimonials
              </h2>
              <p className="text-xl text-slate-500">
                Watch stories of transformation in action
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-slate-100 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <Heart className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-slate-500 text-sm">Video Testimonial {item}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900">Community Impact Story</h3>
                    <p className="text-sm text-slate-500">Coming soon...</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Write Your Own Story With Us
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join our community of volunteers, partners, and supporters making a real difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/volunteers/how-to" 
                className="px-8 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Share Your Experience
              </a>
              <a 
                href="/contact" 
                className="px-8 py-3 bg-white/20 text-white border-2 border-white rounded-lg font-semibold hover:bg-white/30 transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;