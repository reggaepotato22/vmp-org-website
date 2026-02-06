import { Outlet, useLocation } from "react-router-dom";
import { FloatingNavbar } from "@/components/shared/FloatingNavbar";
import Footer from "@/components/Footer";

const PublicLayout = () => {
  const location = useLocation();
  // Pages that have a hero header and need the navbar to overlap
  const isTransparentNavPage = ["/", "/about", "/missions", "/projects", "/gallery", "/news", "/donate"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <FloatingNavbar />
      <main className={`flex-grow ${isTransparentNavPage ? 'pt-0' : 'pt-24'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
