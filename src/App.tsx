import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Pages
import LandingPage from "@/pages/public/LandingPage";
import AboutPage from "@/pages/public/AboutPage";
import MissionsPage from "@/pages/public/MissionsPage";
import DonatePage from "@/pages/public/DonatePage";
import NewsPage from "@/pages/public/NewsPage";
import NewsDetailPage from "@/pages/public/NewsDetailPage";
import VolunteerPage from "@/pages/public/VolunteerPage";
import ContactPage from "@/pages/public/ContactPage";
import GalleryPage from "@/pages/public/GalleryPage";
import GalleryDetailPage from "@/pages/public/GalleryDetailPage";
import LoginPage from "@/pages/auth/LoginPage";
import NotFound from "@/pages/NotFound";

import DashboardPage from "@/pages/admin/DashboardPage";
import ManageNewsPage from "@/pages/admin/ManageNewsPage";
import ManageHomepagePage from "@/pages/admin/ManageHomepagePage";
import ManageMissionsPage from "@/pages/admin/ManageMissionsPage";
import ManageUsersPage from "@/pages/admin/ManageUsersPage";
import ManageGalleryPage from "@/pages/admin/ManageGalleryPage";
import ManageSettingsPage from "@/pages/admin/ManageSettingsPage";

// Components
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ScrollToTop from "@/components/shared/ScrollToTop";

// Contexts
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Analytics />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <SettingsProvider>
            <Routes>
              {/* Public Routes */}
                    <Route path="/" element={<PublicLayout />}>
                      <Route index element={<LandingPage />} />
                      <Route path="about/*">
                        <Route path="overview" element={<AboutPage />} />
                        <Route path="history" element={<AboutPage />} />
                        <Route path="testimonials" element={<AboutPage />} />
                      </Route>
                      <Route path="missions" element={<MissionsPage />} />
                      <Route path="donate" element={<DonatePage />} />
                      <Route path="news" element={<NewsPage />} />
                      <Route path="news/:id" element={<NewsDetailPage />} />
                      <Route path="volunteer" element={<VolunteerPage />} />
                      <Route path="contact" element={<ContactPage />} />
                      <Route path="gallery" element={<GalleryPage />} />
                      <Route path="gallery/:id" element={<GalleryDetailPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>

                    {/* Auth Routes */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    }>
                      <Route index element={<Navigate to="/admin/dashboard" replace />} />
                      <Route path="dashboard" element={<DashboardPage />} />
                      <Route path="news" element={<ManageNewsPage />} />
                      <Route path="homepage" element={<ManageHomepagePage />} />
                      <Route path="missions" element={<ManageMissionsPage />} />
                      <Route path="users" element={<ManageUsersPage />} />
                      <Route path="gallery" element={<ManageGalleryPage />} />
                      <Route path="settings" element={<ManageSettingsPage />} />
                    </Route>
                  </Routes>
          </SettingsProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
