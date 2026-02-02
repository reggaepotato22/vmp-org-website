import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { newsService } from "@/services/newsService";
import { NewsItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2, Loader2 } from "lucide-react";
import NotFound from "@/pages/NotFound";
import { toast } from "sonner";

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
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
        text: newsItem.content.replace(/<[^>]*>?/gm, '').substring(0, 100), // Strip HTML tags for share text
        url: window.location.href,
      });
    } else {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
    }
  };

  // Estimate read time
  const wordCount = newsItem.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200) + " min read";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Image */}
      <div className="h-[40vh] md:h-[50vh] relative w-full bg-slate-100">
        <img 
          src={newsItem.image_url || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"} 
          alt={newsItem.title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 container mx-auto">
          <Badge className="mb-4 bg-blue-100 hover:bg-blue-200 text-blue-900 border-none capitalize">
            {newsItem.category}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 max-w-4xl leading-tight">
            {newsItem.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-slate-700 text-sm md:text-base font-medium">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              {newsItem.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              {readTime}
            </div>
            {newsItem.author && (
              <div className="flex items-center">
                <span className="font-semibold">By {newsItem.author}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6 md:p-10">
            <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300">
              <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
              <Button variant="outline" onClick={() => navigate('/news')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to News
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share Story
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-8">
            {/* Action Card */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Support Our Mission</h3>
              <p className="text-slate-600 mb-6 text-sm">
                Your support helps us continue providing vital veterinary care to communities in need.
              </p>
              <Button className="w-full font-bold shadow-lg shadow-blue-200" size="lg" asChild>
                <Link to="/donate">Donate Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
