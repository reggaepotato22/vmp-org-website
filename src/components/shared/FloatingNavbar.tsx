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
  
  // Navbar is now always solid for better visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Missions", path: "/missions" },
    { name: "Gallery", path: "/gallery" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "Contact", path: "/contact" },
    { name: "Donate", path: "/donate" },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8",
          scrolled || location.pathname !== "/"
            ? "py-2 bg-white shadow-md border-b border-gray-100"
            : "py-4 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group outline-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className={cn("relative transition-all duration-300", scrolled || location.pathname !== "/" ? "w-28 h-28" : "w-48 h-48")}>
               <img src={logoImage} alt="VMP Logo" className="w-full h-full object-contain cursor-pointer" />
            </div>
            {(scrolled || location.pathname !== "/") && (
              <span className="font-heading font-bold tracking-tight text-vmp-black hidden sm:inline-block">
                {settings.siteTitle || "VMP"}
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              // Simple active check logic could be enhanced with intersection observer
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.path);
                  }}
                  className={cn(
                    "text-sm font-bold uppercase tracking-wide transition-all relative py-1 cursor-pointer",
                    scrolled || location.pathname !== "/" ? "text-vmp-black hover:text-vmp-maroon" : "text-white hover:text-vmp-beige"
                  )}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={cn("lg:hidden p-2 transition-colors", scrolled || location.pathname !== "/" ? "text-black" : "text-white")}
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
                  className="p-2 rounded-md hover:bg-slate-100"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.path);
                    }}
                    className={cn(
                      "text-2xl font-medium text-slate-800 hover:text-secondary transition-colors"
                    )}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
