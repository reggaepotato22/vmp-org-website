import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { newsService } from "@/services/newsService";
import { NewsItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2, Loader2, User } from "lucide-react";
import NotFound from "@/pages/NotFound";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!id) return;
      try {
        const data = await newsService.getById(id);
        setNewsItem(data);
      } catch (error) {
        console.error("Failed to fetch news detail", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-12 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8 rounded-full" />
          <Skeleton className="h-16 w-3/4 mb-6 rounded-xl" />
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-[400px] w-full rounded-3xl mb-12" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return <NotFound />;
  }

  // Handle sharing
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: (newsItem.content || '').replace(/<[^>]*>?/gm, '').substring(0, 100), // Strip HTML tags for share text
        url: window.location.href,
      });
    } else {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
    }
  };

  // Estimate read time
  const wordCount = (newsItem.content || '').replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200) + " min read";

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button variant="ghost" className="mb-8 gap-2 hover:bg-slate-100 rounded-full pl-2 pr-4 text-slate-600" onClick={() => navigate('/news')}>
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Button>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge className={`${
                newsItem.category === 'news' 
                  ? 'bg-slate-100 text-slate-800 border-slate-200' 
                  : 'bg-secondary text-white border-secondary'
            } hover:bg-opacity-90 border px-3 py-1 text-sm rounded-md`}>
                {newsItem.category === 'news' ? 'News' : 'Event'}
            </Badge>
            <span className="text-slate-400 text-sm">•</span>
            <div className="flex items-center text-slate-500 text-sm font-medium">
              <Calendar className="h-4 w-4 mr-2 text-secondary" />
              {newsItem.date}
            </div>
            <span className="text-slate-400 text-sm">•</span>
            <div className="flex items-center text-slate-500 text-sm font-medium">
              <Clock className="h-4 w-4 mr-2 text-secondary" />
              {readTime}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl md:leading-tight font-heading font-bold text-slate-900 mb-8">
            {newsItem.title}
          </h1>

          <div className="flex items-center justify-between border-y border-slate-200 py-6">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                   <User className="h-5 w-5" />
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-900">{newsItem.author || "VMP Team"}</p>
                   <p className="text-xs text-slate-500">Author</p>
                </div>
             </div>
             
             <Button variant="outline" size="sm" className="rounded-md gap-2 text-slate-600 hover:text-slate-900 border-slate-200" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
             </Button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src={newsItem.image_url || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"} 
            alt={newsItem.title}
            className="w-full h-auto object-cover max-h-[600px]"
          />
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:text-slate-900 prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl"
        >
           <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
        </motion.div>

      </div>
    </div>
  );
};

export default NewsDetailPage;
