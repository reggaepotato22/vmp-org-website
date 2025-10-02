import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Heart, Users, Stethoscope, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const galleryCategories = [];

  // Import images
  const maf4Image = new URL('/src/assets/vmphotos/maf4.jpg', import.meta.url).href;
  const cwaterImage = new URL('/src/assets/vmphotos/cwater.jpg', import.meta.url).href;

  const featuredGalleries = [
    {
      title: "Kenya Mission 2024",
      location: "Nakuru, Kenya",
      date: "March 2024",
      imageCount: 24,
      description: "Providing livestock care to rural farming communities",
      category: "Medical Care",
      featured: true,
      url: "https://photos.app.goo.gl/Npm53WWZd6wM8wL19",
      image: maf4Image
    },
    // {
    //   title: "Lodwar Mission Outreach",
    //   location: "Lodwar, KE",
    //   date: "January 2024",
    //   imageCount: 18,
    //   description: "Mobile clinics serving remote mountain communities",
    //   category: "Community Outreach",
    //   featured: true,
    //   url: "links will be here",
    //   image: cwaterImage
    // }
  ];

  const recentGalleries = [
    {
      title: "",
      location: "",
      date: "",
      imageCount: 32,
      description: "",
      category: "",
      url: "",
      image: cwaterImage
    },
    // {
    //   title: "",
    //   location: "",
    //   date: "",
    //   imageCount: 15,
    //   description: "",
    //   category: "",
    //   url: "",
    //   image: cwaterImage
    // },
    // {
    //   title: "",
    //   location: "",
    //   date: "",
    //   imageCount: 21,
    //   description: "",
    //   category: "",
    //   url: "",
    //   image: cwaterImage
    // },
    // {
    //   title: "",
    //   location: "",
    //   date: "",
    //   imageCount: 28,
    //   description: "",
    //   category: "",
    //   url: "",
    //   image: cwaterImage
    // },
    // {
    //   title: "",
    //   location: "",
    //   date: "",
    //   imageCount: 26,
    //   description: "",
    //   category: "",
    //   url: "",
    //   image: cwaterImage
    // },
    // {
    //   title: "",
    //   location: "",
    //   date: "",
    //   imageCount: 19,
    //   description: "",
    //   category: "",
    //   url: "",
    //   image: cwaterImage
    // }
  ];

  const testimonialPhotos = [
    {
      quote: "These photos capture the heart of our mission - bringing hope and healing to both animals and communities.",
      author: "Dr. Sarah Johnson",
      role: "Executive Director"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Camera className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Mission Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Witness God's love in action through our veterinary missions around the world. 
              Each folders tells a story of compassion, healing, and transformed lives.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {galleryCategories.map((category, index) => (
            <Button
              key={index}
              variant={category.active ? "default" : "outline"}
              size="sm"
              className="mb-2"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Featured Collections</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredGalleries.map((gallery, index) => (
              <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={gallery.image}
                    alt={gallery.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {gallery.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {gallery.imageCount} photos
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{gallery.title}</h3>
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {gallery.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {gallery.date}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{gallery.description}</p>
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to={gallery.url}>
                      View Gallery
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Recent Mission Galleries</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentGalleries.map((gallery, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-md transition-shadow">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={gallery.image}
                    alt={gallery.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {gallery.imageCount} photos
                  </span>
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="text-xs mb-2">
                    {gallery.category}
                  </Badge>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{gallery.title}</h3>
                  <div className="space-y-1 mb-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {gallery.location}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {gallery.date}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{gallery.description}</p>
                  <Button asChild size="sm" variant="outline" className="w-full text-xs">
                    <Link to={gallery.url}>
                      View Photos
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline">
              Load More Galleries
            </Button>
          </div>
        </div>

        <div className="bg-secondary/20 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Captured Moments of Impact</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <Camera className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">1,200+</div>
              <div className="text-sm text-muted-foreground">Photos Captured</div>
            </div>
            <div>
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Volunteers Featured</div>
            </div>
            <div>
              <Stethoscope className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">10,000+</div>
              <div className="text-sm text-muted-foreground">Animals Photographed</div>
            </div>
            <div>
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">25+</div>
              <div className="text-sm text-muted-foreground">Countries Documented</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <blockquote className="text-lg italic text-muted-foreground mb-4">
              "{testimonialPhotos[0].quote}"
            </blockquote>
            <div className="font-semibold text-foreground">{testimonialPhotos[0].author}</div>
            <div className="text-sm text-muted-foreground">{testimonialPhotos[0].role}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;