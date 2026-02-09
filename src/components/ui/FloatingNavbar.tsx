
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";
import logoImage from "@/assets/kenyavetsmission-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useSettings } from "@/context/SettingsContext";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const FloatingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSettings();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 20);
  });

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 py-2" 
          : "bg-white/95 border-b border-slate-100 py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-3 group"
          >
            <img
              src={logoImage}
              alt="Kenya Vets Mission"
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden lg:flex flex-col">
              <span className="text-primary font-heading font-bold text-sm leading-tight tracking-wide">
                Veterinarians With
              </span>
              <span className="text-slate-900 font-heading font-bold text-sm leading-tight tracking-wide">
                A Mission Programme
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => handleNavClick("/")}
              className={cn(
                "px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-secondary rounded-full",
                isActive("/") ? "text-primary bg-blue-50" : "text-slate-700"
              )}
            >
              Home
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-secondary focus:outline-none rounded-full",
                  location.pathname.startsWith("/about")
                    ? "text-primary bg-blue-50"
                    : "text-slate-700"
                )}
              >
                About <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-xl border-slate-100 shadow-xl rounded-xl p-2">
                <DropdownMenuItem onClick={() => handleNavClick("/about/overview")} className="font-medium cursor-pointer hover:text-secondary hover:bg-rose-50 rounded-lg py-2">
                  Overview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavClick("/about/history")} className="font-medium cursor-pointer hover:text-secondary hover:bg-rose-50 rounded-lg py-2">
                  History
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavClick("/about/testimonials")} className="font-medium cursor-pointer hover:text-secondary hover:bg-rose-50 rounded-lg py-2">
                  Testimonials
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => handleNavClick("/missions")}
              className={cn(
                "px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-secondary rounded-full",
                isActive("/missions") ? "text-primary bg-blue-50" : "text-slate-700"
              )}
            >
              Missions
            </button>
            
            <button
              onClick={() => handleNavClick("/projects")}
              className={cn(
                "px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-secondary rounded-full",
                isActive("/projects") ? "text-primary bg-blue-50" : "text-slate-700"
              )}
            >
              Projects
            </button>

            <button
              onClick={() => handleNavClick("/news")}
              className={cn(
                "px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-secondary rounded-full",
                isActive("/news") ? "text-primary bg-blue-50" : "text-slate-700"
              )}
            >
              Updates
            </button>

            <button
              onClick={() => handleNavClick("/gallery")}
              className={cn(
                "px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-secondary rounded-full",
                isActive("/gallery") ? "text-primary bg-blue-50" : "text-slate-700"
              )}
            >
              Gallery
            </button>
            
            <div className="pl-4">
                <Button 
                    onClick={() => handleNavClick("/donate")}
                    className="bg-secondary hover:bg-rose-900 text-white border-none rounded-full px-8 py-5 font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                    Donate
                </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-900 hover:text-primary transition-colors p-2"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100"
        >
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-inner">
            <button
              onClick={() => handleNavClick("/")}
              className="block w-full text-left px-4 py-3 text-base font-bold text-slate-700 hover:bg-blue-50 hover:text-primary rounded-lg"
            >
              HOME
            </button>
            <button
              onClick={() => handleNavClick("/about/overview")}
              className="block w-full text-left px-4 py-3 text-base font-bold text-slate-700 hover:bg-blue-50 hover:text-primary rounded-lg"
            >
              ABOUT
            </button>
            <button
              onClick={() => handleNavClick("/missions")}
              className="block w-full text-left px-4 py-3 text-base font-bold text-slate-700 hover:bg-blue-50 hover:text-primary rounded-lg"
            >
              MISSIONS
            </button>
            <button
              onClick={() => handleNavClick("/projects")}
              className="block w-full text-left px-4 py-3 text-base font-bold text-slate-700 hover:bg-blue-50 hover:text-primary rounded-lg"
            >
              PROJECTS
            </button>
            <button
              onClick={() => handleNavClick("/news")}
              className="block w-full text-left px-4 py-3 text-base font-bold text-slate-700 hover:bg-blue-50 hover:text-primary rounded-lg"
            >
              UPDATES
            </button>
            <button
              onClick={() => handleNavClick("/gallery")}
              className="block w-full text-left px-4 py-3 text-base font-bold text-slate-700 hover:bg-blue-50 hover:text-primary rounded-lg"
            >
              GALLERY
            </button>
            <button
              onClick={() => handleNavClick("/contact")}
              className="block w-full text-left px-4 py-3 text-base font-bold text-slate-700 hover:bg-blue-50 hover:text-primary rounded-lg"
            >
              CONTACT
            </button>
            <div className="pt-4 px-4">
                <Button className="w-full bg-secondary hover:bg-rose-900 text-white font-bold py-6 rounded-xl text-lg shadow-md" onClick={() => handleNavClick("/donate")}>
                    DONATE NOW
                </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default FloatingNavbar;
