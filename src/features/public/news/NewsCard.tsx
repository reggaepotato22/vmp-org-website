import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { NewsItem } from "@/data/news";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsCardProps {
  item: NewsItem;
  featured?: boolean;
}

const NewsCard = ({ item, featured = false }: NewsCardProps) => {
  return (
    <Card className={`overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow ${featured ? 'md:flex-row md:col-span-2' : ''}`}>
      <div className={`relative ${featured ? 'md:w-1/2 h-64 md:h-auto' : 'h-48'}`}>
        <img 
            src={item.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
            <Badge className={`${
                item.category === 'Milestone' ? 'bg-blue-600' : 
                item.category === 'Event' ? 'bg-orange-500' :
                item.category === 'Gallery' ? 'bg-purple-600' : 'bg-green-600'
            } text-white hover:bg-opacity-90`}>
                {item.category}
            </Badge>
        </div>
      </div>
      
      <div className={`flex flex-col flex-grow ${featured ? 'md:w-1/2 justify-center p-6' : ''}`}>
        <CardHeader className={`${featured ? 'p-0 mb-4' : 'pt-6 px-6 pb-2'}`}>
            <div className="flex items-center text-xs text-muted-foreground mb-3 gap-3">
                <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {item.date}
                </span>
                {item.readTime && (
                    <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.readTime}
                    </span>
                )}
                {item.location && (
                    <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.location}
                    </span>
                )}
            </div>
            <h3 className={`font-heading font-bold text-slate-800 hover:text-primary transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                <Link to={`/news/${item.id}`}>{item.title}</Link>
            </h3>
        </CardHeader>
        
        <CardContent className={`${featured ? 'p-0 mb-6' : 'px-6 py-2'}`}>
            <p className="text-slate-600 line-clamp-3 leading-relaxed">
                {item.excerpt}
            </p>
        </CardContent>

        <CardFooter className={`${featured ? 'p-0' : 'px-6 pb-6 pt-4 mt-auto'}`}>
            <Button variant="link" className="p-0 h-auto font-semibold text-primary" asChild>
                <Link to={`/news/${item.id}`} className="flex items-center group">
                    Read Full Story 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default NewsCard;
