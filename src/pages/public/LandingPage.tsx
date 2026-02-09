import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, HandHeart, Globe, Stethoscope, Heart, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { homepageService } from "@/services/homepageService";
import { newsService } from "@/services/newsService";
import { Testimonial, NewsItem } from "@/types";
import { useSettings } from "@/context/SettingsContext";
import Hero from "@/features/public/home/Hero";

// Import images
import maf8 from "@/assets/vmphotos/maf8.jpg";
import cow2 from "@/assets/vmphotos/cow2.jpg";
import cvm from "@/assets/vmphotos/cvm.webp";
import maf from "@/assets/vmphotos/maf.jpg";
import calf from "@/assets/vmphotos/calf.jpg";
import flock from "@/assets/vmphotos/flock.jpg";
import maf3 from "@/assets/vmphotos/maf3.jpg";

const LandingPage = () => {
  const { settings } = useSettings();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [featuredUpdates, setFeaturedUpdates] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testimonialsData, newsData] = await Promise.all([
          homepageService.getTestimonials(),
          newsService.getAll()
        ]);
        
        setTestimonials(testimonialsData);
        setFeaturedUpdates(newsData.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch landing page data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mock projects data for the grid
  const projects = [
    {
      id: "rabies-drive",
      title: "Rabies Vaccination Drive",
      description: "Vaccinating 2,000+ dogs in rural Kajiado to eliminate rabies.",
      image: maf8,
      icon: <Stethoscope className="h-6 w-6 text-primary" />,
      color: "bg-blue-50 border-blue-100"
    },
    {
      id: "livestock-health",
      title: "Livestock Health",
      description: "Supporting Maasai pastoralists with essential veterinary care.",
      image: cow2,
      icon: <Heart className="h-6 w-6 text-secondary" />,
      color: "bg-rose-50 border-rose-100"
    },
    {
      id: "community-education",
      title: "Community Education",
      description: "Teaching 500+ children about animal welfare and care.",
      image: cvm,
      icon: <Globe className="h-6 w-6 text-primary" />,
      color: "bg-blue-50 border-blue-100"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Standard Hero Carousel */}
      <Hero />

      {/* 2. Our Mission / Projects Grid */}
      {settings.features?.showMissions && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Work</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">Making a Tangible Difference</h2>
              <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl bg-white ${project.color}`}
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-4 p-3 bg-white rounded-full w-fit shadow-sm">
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                    <p className="text-slate-600 mb-4">{project.description}</p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto font-semibold text-primary hover:text-blue-800"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      Learn More <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Donation Section */}
      {settings.features?.showDonations && (
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <HandHeart className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Your Support Changes Lives</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Every donation goes directly to providing veterinary care, vaccines, and education to those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8 py-6 text-lg shadow-xl"
                onClick={() => navigate("/donate")}
              >
                Donate Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-primary hover:bg-primary/90 hover:text-white rounded-full px-8 py-6 text-lg"
                onClick={() => navigate("/volunteer")}
              >
                Volunteer
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* 4. Gallery Preview */}
      {settings.features?.showGallery && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">Gallery</span>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Moments of Hope</h2>
              </div>
              <Button variant="ghost" onClick={() => navigate("/gallery")} className="hidden sm:flex text-primary hover:text-blue-800">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
                <img 
                  src={maf} 
                  alt="Gallery" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
              <div className="col-span-1 relative group overflow-hidden rounded-2xl cursor-pointer aspect-square">
                <img 
                  src={calf} 
                  alt="Gallery" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="col-span-1 relative group overflow-hidden rounded-2xl cursor-pointer aspect-square">
                <img 
                  src={flock} 
                  alt="Gallery" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="col-span-2 relative group overflow-hidden rounded-2xl cursor-pointer aspect-[2/1]">
                <img 
                  src={maf3} 
                  alt="Gallery" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Testimonials */}
      {settings.features?.showTestimonials && testimonials.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">What People Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-white rounded-2xl overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className="absolute top-6 right-8 text-blue-100">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.054 15.331 14.812 16.463 13.896C17.321 13.202 18.337 12.379 18.337 10.975C18.337 9.805 17.584 9.176 16.792 9.176C15.932 9.176 15.111 9.923 14.542 10.457L12.915 8.718C13.682 7.822 14.996 6.875 16.666 6.875C18.887 6.875 20.957 8.242 20.957 10.975C20.957 14.012 18.766 15.961 17.321 17.13C16.463 17.824 15.787 18.371 15.787 19.34L15.787 21H14.017ZM6.683 21L6.683 18C6.683 16.054 7.997 14.812 9.129 13.896C9.987 13.202 11.003 12.379 11.003 10.975C11.003 9.805 10.25 9.176 9.458 9.176C8.598 9.176 7.777 9.923 7.208 10.457L5.581 8.718C6.348 7.822 7.662 6.875 9.332 6.875C11.553 6.875 13.623 8.242 13.623 10.975C13.623 14.012 11.432 15.961 9.987 17.13C9.129 17.824 8.453 18.371 8.453 19.34L8.453 21H6.683Z" /></svg>
                    </div>
                    <p className="text-slate-600 italic mb-6 relative z-10">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Latest News */}
      {settings.features?.showNews && featuredUpdates.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">Blog</span>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Latest Updates</h2>
              </div>
              <Button variant="ghost" onClick={() => navigate("/news")} className="hidden sm:flex text-primary hover:text-blue-800">
                Read More <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {featuredUpdates.map((item) => (
                <div key={item.id} className="group cursor-pointer" onClick={() => navigate(`/news/${item.id}`)}>
                  <div className="rounded-2xl overflow-hidden mb-4 aspect-video">
                    <img 
                      src={item.image_url || "/placeholder.svg"} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  <span className="text-primary text-sm font-medium">{item.category || "News"}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2 mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 line-clamp-2">{item.content?.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default LandingPage;
