import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { galleryService } from "@/services/galleryService";
import { missionService } from "@/services/missionService";
import { GalleryItem, Mission } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Calendar, MapPin, Users, Activity } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const GalleryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const galleryItem = await galleryService.getById(id);
        setItem(galleryItem);
        
        if (galleryItem.mission_id) {
          const missionData = await missionService.getById(galleryItem.mission_id);
          setMission(missionData);
        }
      } catch (error) {
        console.error("Failed to fetch details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="aspect-video w-full rounded-3xl" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-24 text-center px-4">
        <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-6 text-slate-500">
          <Activity className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-slate-900 mb-4">Gallery Item Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md">The image you are looking for might have been removed or does not exist.</p>
        <Button asChild className="rounded-full bg-primary text-white hover:bg-primary/90 px-8">
          <Link to="/gallery">Back to Gallery</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button variant="ghost" className="mb-8 gap-2 hover:bg-slate-100 rounded-full pl-2 pr-4 text-slate-600" asChild>
            <Link to="/gallery">
              <ArrowLeft className="h-4 w-4" />
              Back to Gallery
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl p-2 border border-slate-100">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 relative group">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-3">
                <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-full px-4 py-1.5 text-sm font-medium border border-slate-200">
                  {item.category}
                </Badge>
                {item.featured && (
                  <Badge className="bg-secondary text-white hover:bg-secondary/90 rounded-full px-4 py-1.5 text-sm font-bold border-none">
                    Featured
                  </Badge>
                )}
              </div>
              
              {item.created_at && (
                <div className="flex items-center text-slate-500 text-sm font-medium bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                  <Calendar className="h-4 w-4 mr-2 text-secondary" />
                  {format(new Date(item.created_at), 'MMMM d, yyyy')}
                </div>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                {item.title || "Untitled Image"}
              </h1>
              
              <div className="prose prose-lg text-slate-600 max-w-none">
                <p className="leading-relaxed">
                  {item.description || "No description provided for this image."}
                </p>
              </div>
            </div>

            {mission && (
              <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
                <CardHeader className="bg-slate-50 pb-4 border-b border-slate-100">
                  <CardTitle className="text-xl font-heading font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-secondary" />
                    Related Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">{mission.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2">{mission.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center text-sm text-slate-600 bg-slate-50 p-2 rounded-xl">
                      <MapPin className="h-4 w-4 mr-2 text-slate-600" />
                      {mission.location}
                    </div>
                    <div className="flex items-center text-sm text-slate-600 bg-slate-50 p-2 rounded-xl">
                      <Users className="h-4 w-4 mr-2 text-slate-600" />
                      {mission.volunteers_count || 0} Volunteers
                    </div>
                  </div>

                  <Button asChild className="w-full mt-4 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md">
                    <Link to={`/missions/${mission.id}`}>
                      View Mission Report <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {!mission && item.mission_id && (
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-slate-700 flex items-start gap-3">
                <Activity className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Associated Mission Data Unavailable</h4>
                  <p className="text-sm opacity-90">This image is linked to a mission (ID: {item.mission_id}), but the mission details could not be loaded.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GalleryDetailPage;
