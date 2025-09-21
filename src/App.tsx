import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import MissionOverview from "./components/MissionOverview"; 
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Donate from "./pages/Donate";
import Missions from "./pages/Missions";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import HowToVolunteer from "./pages/Howtovolunteer";
// import Stories from "./pages/VolunteerStories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* About section with tabs */}
          <Route path="/about" element={<Navigate to="/about/overview" replace />} />
          <Route path="/about/overview" element={<MissionOverview />} />
          <Route path="/about/history" element={<MissionOverview />} />
          <Route path="/about/testimonials" element={<MissionOverview />} />

          {/* Missions is now its own page */}
          <Route path="/missions" element={<Missions />} />

          {/* Other routes */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} /> 
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/volunteers/how-to" element={<HowToVolunteer />} />
          {/* <Route path="/volunteers/stories" element={<Stories />} /> */}

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
