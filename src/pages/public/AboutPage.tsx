import MissionOverview from "@/features/public/about/MissionOverview";
import HistoryTimeline from "@/features/public/about/HistoryTimeline";
import Testimonials from "@/features/public/about/Testimonials";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
        {/* Page Header */}
        <section className="bg-primary text-white py-20 relative overflow-hidden">
             {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About Us</h1>
                <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                    Faith-based veterinary care serving underserved communities worldwide.
                </p>
            </div>
        </section>

        {/* Content Sections */}
        <MissionOverview />
        <HistoryTimeline />
        <Testimonials />
    </div>
  );
};

export default AboutPage;
