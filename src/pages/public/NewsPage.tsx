import NewsCard from "@/features/public/news/NewsCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNewsContext } from "@/context/NewsContext";

const NewsPage = () => {
  const { newsItems } = useNewsContext();

  // Sort by date descending
  const sortedNews = [...newsItems].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Filter published news only
  const publishedNews = sortedNews.filter(item => item.status === 'Published');

  const featuredNews = publishedNews[0];
  const recentNews = publishedNews.slice(1);

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
                    <Input placeholder="Search stories..." className="pl-10" />
                </div>
                <Button variant="outline">Filter by Category</Button>
            </div>
        </div>
      </section>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentNews.map((news) => (
                <NewsCard key={news.id} item={news} />
            ))}
            
            {/* Placeholder for more content simulation */}
            <div className="bg-slate-100 rounded-xl border border-dashed border-slate-300 flex items-center justify-center p-8 text-center h-full min-h-[300px]">
                <div>
                    <h3 className="text-lg font-semibold text-slate-500 mb-2">More Stories Coming Soon</h3>
                    <p className="text-slate-400 text-sm">We are constantly updating our field reports.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-primary text-white mt-12">
        <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-heading font-bold mb-4">Stay in the Loop</h2>
            <p className="text-blue-100 mb-8 text-lg">
                Get the latest updates on our veterinary missions and learn how your support is making a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Input placeholder="Enter your email address" className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 max-w-md" />
                <Button variant="secondary" className="bg-secondary hover:bg-secondary/90 text-white border-none">
                    Subscribe
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
