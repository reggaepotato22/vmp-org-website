import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "George Mulovi",
      // role: "Founder & Lead Veterinarian",
      year: "2022",
      // rating: 5,
      content: "My experience with Vet Missions was truly life-changing. The opportunity to use my skills to help animals in need while sharing my faith was incredibly rewarding.",
    },
    {
      name: "Jadiel Muiru", 
      role: "Paraprofessional",
      // year: "",
      rating: 5,
      content: "Vet Missions provides a unique platform for veterinarians to make a global impact. The dedication and compassion of the team are inspiring.",
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our dedicated team members and volunteers about their transformative 
            experiences with Vet Missions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-medium hover:shadow-large transition-smooth">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Quote className="h-6 w-6 text-primary/60 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.year}</div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                    </div>
                    <div className="flex items-center">
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-primary/10 rounded-lg p-8 max-w-md mx-auto">
            <div className="text-4xl font-bold text-primary mb-2">2000+</div>
            <div className="text-muted-foreground font-medium">Lives Changed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;