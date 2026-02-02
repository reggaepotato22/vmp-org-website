import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { galleryService } from "@/services/galleryService";
import { missionService } from "@/services/missionService";
import { GalleryItem, Mission } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Calendar, MapPin, Users, Activity, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { format } from "date-fns";

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
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navigation />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navigation />
        <div className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Gallery Item Not Found</h1>
          <Button asChild>
            <Link to="/gallery">Back to Gallery</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6 gap-2" asChild>
          <Link to="/gallery">
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden shadow-lg">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex justify-between items-center">
              <Badge className="capitalize">{item.category}</Badge>
              {item.created_at && (
                <span className="text-slate-500 text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(item.created_at), "MMMM d, yyyy")}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-slate-900">{item.title || "Untitled"}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {item.description || "No additional description provided."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="w-full sm:w-auto gap-2" asChild>
                <a href={item.image_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  View Full Size Image
                </a>
              </Button>
            </div>
          </div>

          {/* Linked Mission Section */}
          <div className="space-y-6">
            {mission ? (
              <Card className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Linked Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{mission.title}</h3>
                    <p className="text-slate-500">
                      {mission.start_date && format(new Date(mission.start_date), "MMM yyyy")}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-slate-400 mt-1" />
                      <div>
                        <p className="font-medium text-slate-900">Location</p>
                        <p className="text-sm text-slate-600">{mission.location}</p>
                      </div>
                    </div>
                  </div>

                  {mission.stats && (
                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="font-medium text-slate-900 mb-2">Impact Statistics</h4>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {mission.stats.treated && (
                          <div className="bg-slate-50 p-2 rounded">
                            <p className="text-lg font-bold text-blue-600">{mission.stats.treated}</p>
                            <p className="text-xs text-slate-500">Treated</p>
                          </div>
                        )}
                        {mission.stats.value && (
                          <div className="bg-slate-50 p-2 rounded">
                            <p className="text-lg font-bold text-green-600">{mission.stats.value}</p>
                            <p className="text-xs text-slate-500">Value</p>
                          </div>
                        )}
                        {mission.stats.bibles && (
                          <div className="bg-slate-50 p-2 rounded">
                            <p className="text-lg font-bold text-amber-600">{mission.stats.bibles}</p>
                            <p className="text-xs text-slate-500">Bibles</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <div className="text-slate-600 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: mission.description }} />
                  </div>
                  
                  <Button variant="outline" className="w-full mt-2" asChild>
                    <Link to={`/missions/${mission.id}`}>View Mission Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-50 border-dashed">
                <CardContent className="py-8 text-center text-slate-500">
                  <p>No specific mission linked to this photo.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryDetailPage;
