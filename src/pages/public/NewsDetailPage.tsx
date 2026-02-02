import { useParams, Link, useNavigate } from "react-router-dom";
import { useNewsContext } from "@/context/NewsContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ArrowLeft, Share2 } from "lucide-react";
import NotFound from "@/pages/NotFound";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { newsItems } = useNewsContext();

  const newsItem = newsItems.find((item) => item.id.toString() === id);

  if (!newsItem) {
    return <NotFound />;
  }

  // Handle sharing
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Image */}
      <div className="h-[40vh] md:h-[50vh] relative w-full bg-slate-900">
        <img 
          src={newsItem.imageUrl || newsItem.image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"} 
          alt={newsItem.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 container mx-auto">
          <Badge className="mb-4 bg-primary hover:bg-primary/90 text-white border-none">
            {newsItem.category}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">
            {newsItem.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {newsItem.date}
            </div>
            {newsItem.readTime && (
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {newsItem.readTime}
              </div>
            )}
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
              <p className="lead text-xl md:text-2xl font-medium text-slate-900 dark:text-slate-100 mb-8">
                {newsItem.excerpt}
              </p>
              
              {newsItem.body ? (
                <div dangerouslySetInnerHTML={{ __html: newsItem.body }} />
              ) : (
                <div className="space-y-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <blockquote>
                    "We are committed to making a difference in the lives of animals and the communities that depend on them."
                  </blockquote>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              )}
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
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Support Our Mission</h3>
              <p className="text-slate-600 mb-6 text-sm">
                Your support helps us continue providing vital veterinary care to communities in need.
              </p>
              <Button className="w-full font-bold shadow-lg shadow-primary/20" size="lg" asChild>
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
