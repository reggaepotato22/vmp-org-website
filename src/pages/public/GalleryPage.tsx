import { useState, useEffect } from "react";
import { galleryService } from "@/services/galleryService";
import { GalleryItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const GalleryPage = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await galleryService.getAll();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch gallery", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredImages = filter === "All" 
    ? items 
    : items.filter(img => img.category === filter);

  const categories = ["All", ...new Set(items.map(img => img.category))];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-blue-100 text-slate-900 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Our Gallery</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-sans">
              Glimpses of our mission in action - from veterinary treatments to community engagement.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col">
                    <Skeleton className="aspect-video w-full" />
                    <div className="p-6 flex-1 flex flex-col space-y-3">
                      <div className="flex justify-between items-start">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-6 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Filters */}
                {categories.length > 1 && (
                  <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={filter === category ? "default" : "outline"}
                        onClick={() => setFilter(category)}
                        className="min-w-[100px] capitalize"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredImages.map((image) => (
                    <Link key={image.id} to={`/gallery/${image.id}`} className="group cursor-pointer">
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                        <div className="aspect-video relative overflow-hidden bg-slate-200">
                          <img
                            src={image.image_url}
                            alt={image.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          {image.featured && (
                            <Badge className="absolute top-2 left-2 z-10 bg-yellow-400 hover:bg-yellow-500 text-slate-900">Featured</Badge>
                          )}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 capitalize">
                              {image.category}
                            </Badge>
                            {image.created_at && (
                              <span className="text-xs text-slate-500">
                                {new Date(image.created_at).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {image.title || "Untitled"}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {filteredImages.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-xl text-slate-500">No images found.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
