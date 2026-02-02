import { useEffect, useState } from "react";
import { newsService } from "@/services/newsService";
import { NewsItem } from "@/types";
import NewsCard from "@/features/public/news/NewsCard";
import { Button } from "@/components/ui/button";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 pt-24 pb-12">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-800 mb-6">
                News & Stories
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-8">
                Updates from the field, success stories from our veterinary missions, and upcoming opportunities to get involved.
            </p>
            
            {/* Search/Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 max-w-xl">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input 
                      placeholder="Search stories..." 
                      className="pl-10" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={filter === "all" ? "default" : "outline"} 
                    onClick={() => setFilter("all")}
                  >
                    All
                  </Button>
                  <Button 
                    variant={filter === "news" ? "default" : "outline"} 
                    onClick={() => setFilter("news")}
                  >
                    News
                  </Button>
                  <Button 
                    variant={filter === "event" ? "default" : "outline"} 
                    onClick={() => setFilter("event")}
                  >
                    Events
                  </Button>
                </div>
            </div>
        </div>
      </section>

      {error && (
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {!error && (
        <>
          {/* Featured Story */}
          {featuredNews && (
            <section className="py-12 container mx-auto px-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Featured Story</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <NewsCard item={featuredNews} featured={true} />
              </div>
            </section>
          )}

          {/* Recent Stories Grid */}
          <section className="py-8 container mx-auto px-4">
            <h2 className="text-2xl font-heading font-bold text-slate-800 mb-8">Recent Updates</h2>
            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* If there's only one item (featured), don't show it again in recent list unless we want to. 
                      The original code sliced(1). If only 1 item, recentNews is empty.
                      If filteredNews has items but slice(1) is empty, we might want to handle that.
                      But wait, if filteredNews.length > 0, we show featured. 
                      If filteredNews.length === 1, recentNews is empty. 
                      So we only show "Recent Updates" header if recentNews.length > 0? 
                      Or just show the grid if recentNews has items. 
                  */}
                  {recentNews.length > 0 ? (
                    recentNews.map((news) => (
                        <NewsCard key={news.id} item={news} />
                    ))
                  ) : (
                    <div className="col-span-full text-slate-500 italic">
                      {filteredNews.length === 1 ? "No other recent stories." : "No stories found matching your criteria."}
                    </div>
                  )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                No stories found matching your criteria.
              </div>
            )}
          </section>
        </>
      )}

      {/* Newsletter Signup */}
      <section className="py-20 bg-blue-50 text-slate-900 mt-12 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-heading font-bold mb-4">Stay in the Loop</h2>
            <p className="text-slate-600 mb-8 text-lg">
                Get the latest updates on our veterinary missions and learn how your support is making a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Input placeholder="Enter your email address" className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 max-w-md" />
                <Button className="bg-amber-400 hover:bg-amber-500 text-slate-900 border-none">
                    Subscribe
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
