import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, User } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Dr. Sarah Kimani",
    role: "Volunteer Veterinarian",
    content: "Joining VMP was one of the most fulfilling decisions of my career. Witnessing the direct impact of our work on both animals and communities has been incredibly rewarding.",
    location: "Nairobi, Kenya"
  },
  {
    name: "James Omondi",
    role: "Community Leader",
    content: "VMP transformed our community by bringing not just veterinary care, but hope and education. Our livestock are healthier, our children are learning, and our families are thriving.",
    location: "Turkana County"
  },
  {
    name: "Dr. Michael Chen",
    role: "Missions Coordinator",
    content: "I've participated in medical missions globally, but VMP's holistic approach stands out. They don't just treat animals; they empower communities.",
    location: "Singapore"
  },
  {
    name: "Grace Wanjiru",
    role: "Livestock Farmer",
    content: "Before VMP came to our village, we were losing animals to preventable diseases. Now, thanks to their training and support, I know how to care for my livestock properly.",
    location: "Laikipia County"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-800 mb-4">
            Voices of Impact
          </h2>
          <p className="text-slate-600 text-lg">
            Stories from our volunteers, partners, and the communities we serve.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full">
                  <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-8 flex flex-col h-full">
                      <Quote className="h-10 w-10 text-blue-200 mb-6" />
                      <p className="text-slate-600 mb-6 flex-grow italic leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      <div className="mt-auto flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-primary">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{testimonial.name}</h4>
                          <p className="text-xs text-secondary font-medium">{testimonial.role}</p>
                          <p className="text-xs text-slate-400">{testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
