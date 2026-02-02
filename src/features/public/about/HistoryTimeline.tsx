import { Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const timeline = [
  {
    year: "2010",
    title: "The Vision Begins",
    description: "Veterinarians With a Mission Programme (VMP) was founded by a small group of dedicated veterinarians who believed in using their skills to serve underprivileged communities and improve animal welfare globally.",
  },
  {
    year: "2012",
    title: "First Major Mission",
    description: "Launched our first large-scale vaccination drive in Turkana, treating over 5,000 animals and establishing our first community partnership.",
  },
  {
    year: "2015",
    title: "Expanding Horizons",
    description: "Expanded operations to three new counties, introducing our mentorship program for young veterinary students.",
  },
  {
    year: "2018",
    title: "International Recognition",
    description: "Received recognition for our sustainable approach to community-based animal healthcare, partnering with major international aid organizations.",
  },
  {
    year: "2020",
    title: "Resilience in Pandemic",
    description: "Adapted our services to provide emergency relief and essential veterinary care during global challenges, ensuring food security for vulnerable communities.",
  },
  {
    year: "2025",
    title: "A Decade of Service and Growth",
    description: "Now a trusted name in international veterinary outreach, VMP continues to inspire compassion, collaboration, and innovation — advancing animal welfare and uplifting communities worldwide.",
  },
];

const HistoryTimeline = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-800 mb-4">
            Our Journey
          </h2>
          <p className="text-slate-600 text-lg">
            From humble beginnings to a global mission movement.
          </p>
        </div>

        <div className="relative border-l-4 border-slate-100 ml-4 md:ml-0 space-y-12">
            {timeline.map((item, index) => (
                <div key={index} className="relative pl-8 md:pl-12 group">
                    {/* Dot */}
                    <div className="absolute -left-[11px] top-1 bg-white border-4 border-primary w-6 h-6 rounded-full group-hover:scale-125 transition-transform duration-300" />
                    
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="md:w-1/4">
                            <span className="text-2xl font-bold text-primary block">{item.year}</span>
                        </div>
                        <div className="md:w-3/4">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
