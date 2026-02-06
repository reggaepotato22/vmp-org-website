import { useEffect, useState } from "react";
import { newsService } from "@/services/newsService";
import { NewsItem } from "@/types";
import NewsCard from "@/features/public/news/NewsCard";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "news" | "event">("all");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await newsService.getAll();
        setNewsItems(data || []);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch news", err);
        setError(`Failed to load news stories: ${err.message || "Unknown error"}. Please check your connection.`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Filter logic
  const filteredNews = newsItems.filter(item => {
    if (!item) return false;
    
    const matchesSearch = (item.title || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.content || "").toLowerCase().includes(searchTerm.toLowerCase());
                          
    // Case-insensitive category matching
    const itemCategory = (item.category || "").toLowerCase();
    const filterCategory = filter.toLowerCase();
    
    const matchesCategory = filter === "all" || itemCategory === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredNews = filteredNews.length > 0 ? filteredNews[0] : null;
  const recentNews = filteredNews.length > 1 ? filteredNews.slice(1) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        <section className="bg-deep-forest-green-900 border-b border-deep-forest-green-800 py-24">
          <div className="container mx-auto px-4 text-center">
            <Skeleton className="h-16 w-3/4 md:w-1/2 mb-6 mx-auto bg-deep-forest-green-800" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto bg-deep-forest-green-800" />
          </div>
        </section>
        <section className="container mx-auto px-4 py-12">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-64 w-full rounded-3xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Header */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white"
            >
                News & Stories
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-50 max-w-2xl mx-auto font-light leading-relaxed"
            >
                Updates from the field, success stories from our veterinary missions, and upcoming opportunities to get involved.
            </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="flex-1 py-12 md:py-20 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
            
            {/* Search and Filters */}
            <div className="bg-white rounded-3xl p-6 shadow-xl mb-12 border border-slate-100 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative w-full md:w-auto md:flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <Input 
                            placeholder="Search articles..." 
                            className="pl-12 rounded-full border-slate-200 h-12 text-base focus:ring-primary focus:border-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 justify-center md:justify-end">
                        <Button 
                            variant={filter === "all" ? "default" : "outline"}
                            onClick={() => setFilter("all")}
                            className={`rounded-full px-6 ${filter === "all" ? "bg-primary text-white hover:bg-primary/90" : "text-slate-600 hover:text-primary border-slate-200"}`}
                        >
                            All
                        </Button>
                        <Button 
                            variant={filter === "news" ? "default" : "outline"}
                            onClick={() => setFilter("news")}
                            className={`rounded-full px-6 ${filter === "news" ? "bg-primary text-white hover:bg-primary/90" : "text-slate-600 hover:text-primary border-slate-200"}`}
                        >
                            News
                        </Button>
                        <Button 
                            variant={filter === "event" ? "default" : "outline"}
                            onClick={() => setFilter("event")}
                            className={`rounded-full px-6 ${filter === "event" ? "bg-primary text-white hover:bg-primary/90" : "text-slate-600 hover:text-primary border-slate-200"}`}
                        >
                            Events
                        </Button>
                    </div>
                </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-6 mb-8 text-center">
                 <p className="font-medium">{error}</p>
                 <Button variant="outline" onClick={() => window.location.reload()} className="mt-4 border-red-200 text-red-800 hover:bg-red-100">
                   Try Again
                 </Button>
              </div>
            )}

            {filteredNews.length === 0 && !loading && !error && (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">No stories found</h3>
                    <p className="text-slate-600 mb-6">We couldn't find any articles matching your search.</p>
                    <Button onClick={() => {setSearchTerm(""); setFilter("all");}} variant="outline" className="rounded-full">
                        Clear Filters
                    </Button>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Featured Post - Spans 2 cols on large screens if it's the first item and we're on page 1 (simulated) */}
                {featuredNews && (
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5 }}
                     className="md:col-span-2 lg:col-span-2"
                   >
                     <NewsCard item={featuredNews} featured={true} />
                   </motion.div>
                )}

                {/* Other Posts */}
                {recentNews.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    >
                        <NewsCard item={item} />
                    </motion.div>
                ))}
            </div>
            
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
