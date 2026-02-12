import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { NewsItem } from "@/types";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  item: NewsItem;
  featured?: boolean;
}

const NewsCard = ({ item, featured = false }: NewsCardProps) => {
  // Helper to strip HTML tags for excerpt if needed
  const getExcerpt = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";
    return text.substring(0, 150) + (text.length > 150 ? "..." : "");
  };

  const excerpt = getExcerpt(item.content);

  return (
    <Card className={`group relative overflow-hidden h-[400px] flex flex-col border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-xl ${featured ? 'md:col-span-2 md:h-[500px]' : ''}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
            src={item.image_url || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full p-6 md:p-8 text-white">
        <div className="flex justify-between items-start">
            <Badge className={`${
                item.category === 'news' 
                  ? 'bg-white/20 text-white border-white/30 backdrop-blur-md' 
                  : 'bg-secondary text-white border-secondary'
            } hover:bg-white/30 transition-colors`}>
                {item.category === 'news' ? 'News' : 'Event'}
            </Badge>
        </div>

        <div className="mt-auto space-y-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center text-xs font-medium text-slate-300 gap-3">
                <span className="flex items-center bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-secondary" />
                    {item.date}
                </span>
            </div>
            
            <h3 className={`font-heading font-bold text-white group-hover:text-secondary transition-colors duration-300 drop-shadow-md ${featured ? 'text-2xl md:text-4xl leading-tight' : 'text-xl leading-snug'}`}>
                <Link to={`/news/${item.id}`} className="block">
                  {item.title}
                </Link>
            </h3>
            
            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                 <p className="text-slate-200 line-clamp-2 leading-relaxed text-sm md:text-base mb-4 drop-shadow-sm">
                    {excerpt}
                </p>
                <Button variant="link" className="p-0 h-auto font-bold text-secondary hover:text-white hover:no-underline" asChild>
                    <Link to={`/news/${item.id}`} className="flex items-center gap-2">
                        Read Full Story 
                        <div className="bg-secondary/20 p-1 rounded-md">
                        <ArrowRight className="h-4 w-4" />
                        </div>
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
