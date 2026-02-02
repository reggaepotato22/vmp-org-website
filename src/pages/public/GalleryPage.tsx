import { useState } from "react";
import { useGallery } from "@/context/GalleryContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const GalleryPage = () => {
  const { gallery } = useGallery();
  const [filter, setFilter] = useState("All");

  const filteredImages = filter === "All" 
    ? gallery 
    : gallery.filter(img => img.category === filter);

  const categories = ["All", ...new Set(gallery.map(img => img.category))];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-blue-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Our Gallery</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-sans">
              Glimpses of our mission in action - from veterinary treatments to community engagement.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  onClick={() => setFilter(category)}
                  className="min-w-[100px]"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image) => (
                <Link key={image.id} to={`/gallery/${image.id}`} className="group cursor-pointer">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-video relative overflow-hidden bg-slate-200">
                      <img
                        src={image.src}
                        alt={image.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                          {image.category}
                        </Badge>
                        {image.date && (
                          <span className="text-xs text-slate-500">{image.date}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {image.caption}
                      </h3>
                      {image.description && (
                        <p className="text-slate-600 text-sm line-clamp-2 mt-auto">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-slate-500">No images found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
