 import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MissionOverview from "@/components/MissionOverview";
import RecentMissions from "@/components/RecentMissions";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <MissionOverview />
      <RecentMissions />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
