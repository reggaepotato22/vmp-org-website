import { useState, useEffect } from "react";
import MissionCard from "./MissionCard";
import { missionService } from "@/services/missionService";
import { Mission } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const MissionsGrid = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const data = await missionService.getAll();
        setMissions(data);
      } catch (error) {
        console.error("Failed to fetch missions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMissions();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-800 mb-4">
              Our Impact in Action
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Explore our recent missions where we combine professional veterinary care with the message of God's love.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <div className="pt-4 flex justify-between items-center">
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-800 mb-4">
            Our Impact in Action
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore our recent missions where we combine professional veterinary care with the message of God's love.
          </p>
        </div>

        {missions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-slate-500">No mission reports available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MissionsGrid;
