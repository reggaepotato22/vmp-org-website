import Hero from "@/features/public/home/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, MapPin, Calendar, ArrowRight, Quote, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import NewsCard from "@/features/public/news/NewsCard";
import { useEffect, useState } from "react";
import { homepageService } from "@/services/homepageService";
import { newsService } from "@/services/newsService";
import { Testimonial, NewsItem } from "@/types";

const LandingPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [featuredUpdates, setFeaturedUpdates] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testimonialsData, newsData] = await Promise.all([
          homepageService.getTestimonials(),
          newsService.getAll()
        ]);
        
        setTestimonials(testimonialsData);
        // Take top 3 news items
        setFeaturedUpdates(newsData.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch landing page data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Who We Are Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Veterinarians with a Mission Programme is a faith-based organization dedicated to providing veterinary care to animals in underserved communities worldwide. We believe in the power of compassion and service to transform lives—both human and animal—while spreading the message of God's love.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center p-6 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <Heart className="h-6 w-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">2,000+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Born Again</div>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">500+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Volunteers</div>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">10+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Counties Served</div>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">15+</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Years of Service</div>
            </div>
          </div>

          {/* Our History */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-slate-100 rounded-2xl h-[400px] overflow-hidden relative">
              {/* Placeholder for History Image - using a mission related image or generic */}
              <img 
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800" 
                alt="Our History" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent flex items-end p-8">
                <p className="text-slate-900 font-medium">Serving since 2010</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">
                Our History
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p className="mb-4">
                  Founded in 2010 by Dr. Josiah Mandieka, and other directors, Mrs. Phellis Mandieka, Dr. John Mwangi, and Dr. Ezra Saitoti.
                </p>
                <p className="mb-4">
                  Veterinarians with a Mission began with a small group of volunteers and a vision to make a difference in the lives of the unreached pastoral communities in Kenya with the gospel of Jesus Christ and veterinary care.
                </p>
                <p>
                  Over the years, we have expanded our reach, conducting missions in numerous counties in Kenya and impacting countless lives. Our journey is a testament to the unwavering dedication of our teams and the support of our generous donors.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/about">
                  <Button variant="outline" className="gap-2">
                    Read More About Us <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Missions/Impact Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">Featured Missions & News</h2>
              <p className="text-slate-600 max-w-2xl">See how we are transforming communities through veterinary care.</p>
            </div>
            <Link to="/news" className="hidden md:flex text-primary font-medium hover:text-primary/80 items-center gap-2">
              View All News <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
             <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredUpdates.length > 0 ? (
                featuredUpdates.map((news) => (
                  <NewsCard key={news.id} item={news} />
                ))
              ) : (
                <div className="col-span-3 text-center py-12 text-slate-500">
                  No updates available yet.
                </div>
              )}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/news" className="text-primary font-medium hover:text-primary/80 inline-flex items-center gap-2">
              View All News <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-blue-50 text-slate-900 relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200 via-transparent to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">What People Say</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Hear from our dedicated team members and volunteers about their transformative experiences.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-white border border-slate-200 text-slate-900 shadow-sm">
                  <CardContent className="p-8">
                    <Quote className="h-8 w-8 text-primary mb-4 opacity-80" />
                    <p className="text-lg mb-6 leading-relaxed font-medium text-slate-700">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      {testimonial.image_url && (
                        <img 
                          src={testimonial.image_url} 
                          alt={testimonial.name} 
                          className="h-12 w-12 rounded-full object-cover" 
                        />
                      )}
                      <div>
                        <div className="font-bold text-lg">{testimonial.name}</div>
                        <div className="text-primary text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-blue-50 text-slate-900 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Whether through donation, volunteering, or prayer, your support helps us reach more communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate">
              <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-8 w-full sm:w-auto">
                Donate Now
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button size="lg" variant="outline" className="border-slate-900 text-slate-900 hover:bg-slate-200 hover:text-slate-900 w-full sm:w-auto">
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
