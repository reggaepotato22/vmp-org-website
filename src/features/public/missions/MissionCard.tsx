import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export interface MissionProps {
  id: string | number;
  title: string;
  description: string;
  location: string;
  date: string;
  imageUrl: string;
  category?: string;
}

const MissionCard = ({ id, title, description, location, date, imageUrl, category = "Outreach" }: MissionProps) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 group border-slate-100">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-primary hover:bg-white font-bold backdrop-blur-sm">
                {category}
            </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4 text-xs text-slate-500 mb-2">
            <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1 text-secondary" />
                {date}
            </div>
            <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1 text-secondary" />
                {location}
            </div>
        </div>
        <h3 className="text-xl font-heading font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild variant="ghost" className="p-0 text-primary font-semibold hover:text-secondary hover:bg-transparent group/btn">
          <Link to={`/missions/${id}`} className="flex items-center">
            Read Report 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MissionCard;
