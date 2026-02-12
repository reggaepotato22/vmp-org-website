import { useState, useEffect } from "react";
import { galleryService } from "@/services/galleryService";
import { GalleryItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, Calendar, ExternalLink } from "lucide-react";

const GalleryGrid = () => {
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
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm break-inside-avoid border border-slate-100 mb-8">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-6 flex flex-col space-y-3">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-20 rounded-md" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Filters */}
            {categories.length > 1 && (
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={filter === category ? "default" : "outline"}
                    onClick={() => setFilter(category)}
                    className={`min-w-[100px] capitalize rounded-md px-6 transition-all duration-300 ${
                      filter === category 
                        ? "bg-primary text-white hover:bg-primary/90 shadow-lg" 
                        : "border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="break-inside-avoid mb-8"
                  >
                    <Link to={`/gallery/${image.id}`} className="group cursor-pointer block h-full">
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 transform hover:-translate-y-1">
                        <div className="relative overflow-hidden bg-slate-100">
                          <img
                            src={image.image_url}
                            alt={image.title}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-md text-white transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                              <ZoomIn className="w-8 h-8" />
                            </div>
                            {image.external_link && (
                              <div 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(image.external_link, '_blank');
                                }}
                                className="bg-white/20 backdrop-blur-md p-4 rounded-md text-white transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-200 hover:bg-white/40 cursor-pointer"
                                title="Open External Link"
                              >
                                <ExternalLink className="w-8 h-8" />
                              </div>
                            )}
                          </div>

                          {image.featured && (
                            <Badge className="absolute top-4 left-4 z-10 bg-secondary hover:bg-secondary/90 text-white font-bold border-none shadow-md">
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <Badge variant="secondary" className="bg-slate-100 text-slate-800 hover:bg-slate-200 capitalize rounded-md px-3 py-1 font-medium border border-slate-200">
                              {image.category}
                            </Badge>
                            {image.created_at && (
                              <div className="flex items-center text-xs text-slate-500 font-medium">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(image.created_at).toLocaleDateString(undefined, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </div>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-secondary transition-colors leading-tight">
                            {image.title || "Untitled"}
                          </h3>
                          
                          {image.description && (
                            <p className="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                              {image.description}
                            </p>
                          )}
                          
                          <div className="pt-4 border-t border-slate-100 flex items-center text-secondary font-bold text-sm group-hover:translate-x-1 transition-transform duration-300">
                            View Details 
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GalleryGrid;
