import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { missionService } from "@/services/missionService";
import { galleryService } from "@/services/galleryService";
import { Mission, GalleryItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, Download, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const MissionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [mission, setMission] = useState<Mission | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const missionData = await missionService.getById(id);
        setMission(missionData);
        
        const galleryData = await galleryService.getByMissionId(id);
        setGalleryItems(galleryData || []);
      } catch (error) {
        console.error("Failed to fetch mission details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto pt-8 pb-20 px-4">
        <Skeleton className="h-10 w-40 mb-8" />
        <Skeleton className="h-96 w-full rounded-2xl mb-8" />
        <div className="space-y-4 max-w-3xl mx-auto">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-2 pt-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="container mx-auto pt-32 pb-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Mission Not Found</h1>
        <p className="text-slate-600 mb-8">The mission report you are looking for does not exist.</p>
        <Button asChild className="rounded-md">
          <Link to="/missions">Back to Missions</Link>
        </Button>
      </div>
    );
  }

  const formatDate = () => {
    try {
      if (!mission.start_date) return "";
      const start = format(new Date(mission.start_date), "MMMM d, yyyy");
      if (!mission.end_date) return start;
      const end = format(new Date(mission.end_date), "MMMM d, yyyy");
      return `${start} - ${end}`;
    } catch (e) {
      return mission.start_date;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Fixed Background Hero */}
      <div className="fixed inset-0 z-0">
        <img 
          src={mission.cover_image || "/placeholder-mission.jpg"} 
          alt={mission.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/50 to-primary/90 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Button asChild variant="outline" className="text-white border-white/30 hover:bg-white/10 hover:text-white mb-8 backdrop-blur-sm rounded-md">
              <Link to="/missions">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Missions
              </Link>
            </Button>
            
            <div className="flex flex-wrap gap-4 text-white/90 mb-6 text-sm font-medium">
              <div className="flex items-center bg-white/10 px-3 py-1 rounded-md backdrop-blur-md border border-white/10">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate()}
              </div>
              <div className="flex items-center bg-white/10 px-3 py-1 rounded-md backdrop-blur-md border border-white/10">
                <MapPin className="h-4 w-4 mr-2" />
                {mission.location}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight drop-shadow-xl">
              {mission.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* AI Summary Section */}
              {mission.report_summary && (
                <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-md p-8 shadow-xl">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                    <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-md mr-3 uppercase tracking-wider font-bold">Summary</span>
                    Mission Highlights
                  </h3>
                  <div className="text-slate-700 leading-relaxed">
                    {mission.report_summary}
                  </div>
                </div>
              )}

              {/* Full Description */}
              <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-md p-8 shadow-xl">
                <div className="prose prose-lg max-w-none text-slate-700 prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-primary">
                  <div dangerouslySetInnerHTML={{ __html: mission.description }} />
                </div>
              </div>

              {/* Gallery Section */}
              {galleryItems.length > 0 && (
                <div className="pt-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center text-white drop-shadow-md">
                    <ImageIcon className="mr-2 h-6 w-6 text-secondary" />
                    Mission Gallery
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryItems.map((item) => (
                      <Dialog key={item.id}>
                        <DialogTrigger asChild>
                          <div className="aspect-square relative group cursor-pointer overflow-hidden rounded-md bg-slate-900/50 border border-white/10">
                            <img 
                              src={item.image_url} 
                              alt={item.title || "Mission photo"} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none">
                          <img 
                            src={item.image_url} 
                            alt={item.title || "Mission photo"} 
                            className="w-full h-auto max-h-[90vh] object-contain rounded-md"
                          />
                          {item.title && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 backdrop-blur-sm">
                              <p className="font-medium text-center">{item.title}</p>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Download Report Card */}
              {mission.report_file && (
                <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-md p-6 shadow-xl sticky top-24">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Full Mission Report</h3>
                  <p className="text-slate-500 text-sm mb-6">
                    Download the detailed PDF report containing all statistics, testimonies, and financial breakdowns.
                  </p>
                  <Button className="w-full gap-2 rounded-md" size="lg" onClick={() => window.open(mission.report_file, '_blank')}>
                    <Download className="h-4 w-4" />
                    Download PDF Report
                  </Button>
                </div>
              )}

              {/* Share Card */}
              <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-md p-6 shadow-xl">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Share this Mission</h3>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-md">Twitter</Button>
                  <Button variant="outline" className="flex-1 rounded-md">Facebook</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionDetailPage;
