import { useState, useEffect } from "react";
import { galleryService } from "@/services/galleryService";
import { GalleryItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, Calendar } from "lucide-react";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm h-full flex flex-col border border-slate-100">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6 flex-1 flex flex-col space-y-3">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-20 rounded-full" />
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
                    className={`min-w-[100px] capitalize rounded-full px-6 transition-all duration-300 ${
                      filter === category 
                        ? "bg-deep-forest-green-900 text-white hover:bg-deep-forest-green-800 shadow-lg" 
                        : "border-deep-forest-green-200 text-deep-forest-green-700 hover:bg-deep-forest-green-50 hover:text-deep-forest-green-900"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}

            {/* Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="h-full"
                  >
                    <Link to={`/gallery/${image.id}`} className="group cursor-pointer block h-full">
                      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-slate-100 transform hover:-translate-y-1">
                        <div className="aspect-[4/3] relative overflow-hidden bg-deep-forest-green-100">
                          <img
                            src={image.image_url}
                            alt={image.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-deep-forest-green-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                              <ZoomIn className="w-8 h-8" />
                            </div>
                          </div>

                          {image.featured && (
                            <Badge className="absolute top-4 left-4 z-10 bg-gold hover:bg-gold-600 text-deep-forest-green-900 font-bold border-none shadow-md">
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <Badge variant="secondary" className="bg-deep-forest-green-50 text-deep-forest-green-700 hover:bg-deep-forest-green-100 capitalize rounded-full px-3 py-1 font-medium border border-deep-forest-green-100">
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
                          
                          <h3 className="text-xl font-heading font-bold text-deep-forest-green-900 mb-3 group-hover:text-gold transition-colors line-clamp-2">
                            {image.title || "Untitled"}
                          </h3>
                          
                          {image.description && (
                            <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                              {image.description}
                            </p>
                          )}
                          
                          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-gold font-bold text-sm group-hover:translate-x-1 transition-transform duration-300">
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
            </motion.div>

            {filteredImages.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                   <ZoomIn className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No images found</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  We couldn't find any images in this category. Try selecting a different filter.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-6 rounded-full"
                  onClick={() => setFilter("All")}
                >
                  View All Photos
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default GalleryGrid;
