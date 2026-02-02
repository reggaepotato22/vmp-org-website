import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Mission } from "@/types";
import { format } from "date-fns";

interface MissionCardProps {
  mission: Mission;
}

const MissionCard = ({ mission }: MissionCardProps) => {
  const { id, title, description, location, start_date, end_date, cover_image, status } = mission;
  
  const formatDate = () => {
    try {
      if (!start_date) return "";
      const start = format(new Date(start_date), "MMM yyyy");
      if (!end_date) return start;
      const end = format(new Date(end_date), "MMM yyyy");
      return start === end ? start : `${start} - ${end}`;
    } catch (e) {
      return start_date;
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 group border-slate-100">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={cover_image || "/placeholder-mission.jpg"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-primary hover:bg-white font-bold backdrop-blur-sm capitalize">
                {status}
            </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4 text-xs text-slate-500 mb-2">
            <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1 text-secondary" />
                {formatDate()}
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
        <div className="text-slate-600 text-sm line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
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
