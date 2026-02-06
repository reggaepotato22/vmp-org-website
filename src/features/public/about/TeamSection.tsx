import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { teamService } from "@/services/teamService";
import { TeamMember } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { mockTeam } from "@/data/mockData";

const TeamSection = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamService.getAll();
        // Use mock data if API returns empty or fails
        setMembers(data && data.length > 0 ? data : mockTeam);
      } catch (error) {
        console.error("Failed to fetch team", error);
        setMembers(mockTeam);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-4 w-24 mx-auto mb-4" />
            <Skeleton className="h-10 w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="w-48 h-48 rounded-full mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Remove the return null check since we have mock data fallback
  // if (members.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold tracking-wider uppercase text-sm">Our Team</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Meet the Experts</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Avatar Container with Squircle Shape */}
              <div className="relative w-64 h-64 mb-6 perspective-1000">
                <div className="relative w-full h-full transition-transform duration-500 transform style-preserve-3d group-hover:rotate-y-180">
                  
                  {/* Front Side: Image */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-blue-50 shadow-lg">
                      <img 
                        src={member.image_url || "/placeholder-user.jpg"} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Back Side: Bio (Hover State) */}
                  <div className="absolute inset-0 h-full w-full rounded-[2rem] bg-primary p-6 text-white backface-hidden rotate-y-180 flex flex-col justify-center items-center shadow-xl">
                    <p className="text-sm leading-relaxed mb-4 line-clamp-6">
                      {member.bio || "Dedicated to animal welfare and community service."}
                    </p>
                    <div className="flex gap-4 mt-2">
                      {member.social_links?.linkedin && (
                        <a href={member.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.social_links?.twitter && (
                        <a href={member.social_links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {member.social_links?.email && (
                        <a href={`mailto:${member.social_links.email}`} className="hover:text-amber-400 transition-colors">
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-secondary font-medium mb-2">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Custom Styles for 3D Flip Effect */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
};

export default TeamSection;
