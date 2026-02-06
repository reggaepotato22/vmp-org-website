import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/kenyavetsmission-logo.png";
import { useSettings } from "@/context/SettingsContext";

export const FloatingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSettings();
  
  // Pages with dark hero headers where navbar should be transparent white initially
  // Note: specific sub-routes might need adjustment if they don't share the same header style
  const isDarkHeaderPage = [
    "/", 
    "/about", 
    "/missions", 
    "/projects", 
    "/donate"
  ].some(path => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path)) || 
  // Exact match only for pages where sub-routes (details) have light headers
  ["/gallery", "/news"].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Missions", path: "/missions" },
    { name: "Projects", path: "/projects" }, // Assuming this exists or will redirect to missions/projects
    { name: "Gallery", path: "/gallery" },
    { name: "News", path: "/news" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8",
          scrolled 
            ? "py-3 bg-blue-50/95 backdrop-blur-md shadow-md border-b border-blue-100" 
            : "py-6 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative overflow-hidden rounded-full w-10 h-10 bg-white p-1 shadow-sm group-hover:shadow-md transition-all">
               <img src={logoImage} alt="VMP Logo" className="w-full h-full object-contain" />
            </div>
            <span className={cn(
              "font-heading font-bold text-lg tracking-tight transition-colors hidden sm:inline-block",
              scrolled || !isDarkHeaderPage ? "text-slate-900" : "text-white"
            )}>
              {settings.siteTitle || "Veterinarians With a Mission Programme"}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-all relative py-1",
                    isActive
                      ? (scrolled || !isDarkHeaderPage
                          ? "text-secondary font-bold border-b-2 border-secondary" 
                          : "text-white font-bold border-b-2 border-secondary")
                      : scrolled || !isDarkHeaderPage
                          ? "text-slate-900 hover:text-secondary hover:font-semibold" 
                          : "text-slate-100 hover:text-white hover:font-semibold"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Button 
              className="bg-secondary hover:bg-rose-900 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all"
              onClick={() => navigate("/donate")}
            >
              Donate Now <Heart className="ml-2 w-4 h-4 fill-white" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={cn(
              "lg:hidden p-2 transition-colors",
              scrolled ? "text-slate-700" : (isDarkHeaderPage ? "text-white" : "text-slate-900")
            )}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white h-screen w-screen overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <img src={logoImage} alt="VMP Logo" className="w-8 h-8" />
                  <span className="font-bold text-slate-900">VMP</span>
                </Link>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-2xl font-medium text-slate-800 hover:text-secondary transition-colors",
                      location.pathname === link.path && "text-secondary font-bold"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                  <Button 
                    className="w-full bg-secondary hover:bg-rose-900 text-white rounded-full py-6 text-lg"
                    onClick={() => {
                      navigate("/donate");
                      setIsMenuOpen(false);
                    }}
                  >
                    Donate Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
