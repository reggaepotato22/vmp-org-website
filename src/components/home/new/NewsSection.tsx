import { useEffect, useState } from "react";
import { newsService } from "@/services/newsService";
import { NewsItem } from "@/types";
import NewsCard from "@/features/public/news/NewsCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsService.getAll();
        // Get only the latest 3 news items
        setNews(data?.slice(0, 3) || []);
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="py-24 bg-slate-50 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-vmp-maroon" />
      </div>
    );
  }

  if (news.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-vmp-maroon font-bold uppercase tracking-widest text-sm mb-4 block">Latest Updates</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-vmp-black mb-6">
              News & <span className="text-vmp-maroon">Stories</span>
            </h2>
            <p className="text-lg text-gray-600">
              Stay updated with our latest missions, events, and the impact we're making together in communities across Kenya.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="outline" className="border-vmp-maroon text-vmp-maroon hover:bg-vmp-maroon hover:text-white font-bold group">
              <Link to="/news" className="flex items-center gap-2">
                View All Stories
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <NewsCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
