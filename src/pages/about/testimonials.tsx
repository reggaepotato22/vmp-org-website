import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Kathy Dunaway",
      role: "Founder & Lead Veterinarian",
      year: "2022",
      content: "My experience with Vet Missions was truly life-changing. The opportunity to use my skills to help animals in need while sharing my faith was incredibly rewarding.",
      rating: 5
    },
    {
      name: "Dr. Troy Sammons",
      role: "Volunteer Veterinarian",
      year: "2023",
      content: "Vet Missions provides a unique platform for veterinarians to make a global impact. The dedication and compassion of the team are inspiring.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Testimonials</h1>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">★</span>
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.year}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;
