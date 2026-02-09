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
    <Card className={`group overflow-hidden h-full flex flex-col border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl ${featured ? 'md:flex-row md:col-span-2' : 'bg-white'}`}>
      <div className={`relative overflow-hidden ${featured ? 'md:w-1/2 min-h-[300px]' : 'h-56'}`}>
        <img 
            src={item.image_url || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="absolute top-4 left-4">
            <Badge className={`${
                item.category === 'news' 
                  ? 'bg-slate-100 text-slate-800 border-slate-200' 
                  : 'bg-secondary text-white border-secondary'
            } hover:bg-opacity-90 border`}>
                {item.category === 'news' ? 'News' : 'Event'}
            </Badge>
        </div>
      </div>
      
      <div className={`flex flex-col flex-grow ${featured ? 'md:w-1/2 justify-center p-8 bg-slate-50' : 'bg-white'}`}>
        <CardHeader className={`${featured ? 'p-0 mb-4' : 'pt-6 px-6 pb-2'}`}>
            <div className="flex items-center text-xs font-medium text-slate-500 mb-3 gap-3">
                <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-secondary" />
                    {item.date}
                </span>
            </div>
            <h3 className={`font-heading font-bold text-slate-900 group-hover:text-secondary transition-colors ${featured ? 'text-2xl md:text-3xl leading-tight' : 'text-xl leading-snug'}`}>
                <Link to={`/news/${item.id}`} className="block">
                  {item.title}
                </Link>
            </h3>
        </CardHeader>
        
        <CardContent className={`${featured ? 'p-0 mb-6' : 'px-6 py-2'}`}>
            <p className="text-slate-600 line-clamp-3 leading-relaxed">
                {excerpt}
            </p>
        </CardContent>

        <CardFooter className={`${featured ? 'p-0' : 'px-6 pb-6 pt-4 mt-auto'}`}>
            <Button variant="link" className="p-0 h-auto font-bold text-secondary hover:text-secondary/80 hover:no-underline" asChild>
                <Link to={`/news/${item.id}`} className="flex items-center gap-2">
                    Read Full Story 
                    <div className="bg-secondary/10 p-1 rounded-full group-hover:bg-secondary/20 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                </Link>
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default NewsCard;
