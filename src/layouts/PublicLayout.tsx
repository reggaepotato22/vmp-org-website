import { Outlet, useLocation } from "react-router-dom";
import { FloatingNavbar } from "@/components/shared/FloatingNavbar";
import Footer from "@/components/Footer";

const PublicLayout = () => {
  const location = useLocation();
  // Transparent nav only on home page
  const isTransparentNavPage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <FloatingNavbar />
      <main className={`flex-grow ${isTransparentNavPage ? 'pt-0' : 'pt-32'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
