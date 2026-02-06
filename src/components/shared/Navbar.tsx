import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Moon, Sun, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";
import logoImage from "@/assets/kenyavetsmission-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useSettings } from "@/context/SettingsContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full shadow-md">
      {/* Top Bar - Info & Socials */}
      <div className="h-auto py-2 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs md:text-sm text-slate-600 dark:text-slate-400">
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{settings.address || "Ngong Town, Kajiado, Kenya"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>{settings.phone || "+254 116 922 908"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>{settings.contactEmail || "info@kenyavetsmission.org"}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-auto md:ml-0">
             <div className="flex items-center gap-3">
                {settings.socialLinks.facebook && (
                  <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {settings.socialLinks.twitter && (
                  <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {settings.socialLinks.instagram && (
                  <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
             </div>
             <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-2 hidden md:block"></div>
             <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-6 w-6 text-slate-600 dark:text-slate-300">
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-all duration-300 relative z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center space-x-3 group py-2"
            >
              <img
                src={logoImage}
                alt="Kenya Vets Mission"
                className="h-12 w-auto object-contain"
              />
              <div className="hidden lg:flex flex-col">
                <span className="text-primary font-heading font-bold text-sm leading-tight">
                  Veterinarians With
                </span>
                <span className="text-slate-900 dark:text-slate-100 font-heading font-bold text-sm leading-tight">
                  A Mission Programme
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => handleNavClick("/")}
                className={cn(
                  "px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary rounded-md",
                  isActive("/") ? "text-primary bg-primary/10" : "text-slate-900 dark:text-slate-100"
                )}
              >
                Home
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary focus:outline-none rounded-md",
                    location.pathname.startsWith("/about")
                      ? "text-primary bg-primary/10"
                      : "text-slate-900 dark:text-slate-100"
                  )}
                >
                  About <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-xl">
                  <DropdownMenuItem onClick={() => handleNavClick("/about/overview")} className="font-medium cursor-pointer hover:text-primary">
                    Overview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavClick("/about/history")} className="font-medium cursor-pointer hover:text-primary">
                    History
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavClick("/about/testimonials")} className="font-medium cursor-pointer hover:text-primary">
                    Testimonials
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                onClick={() => handleNavClick("/missions")}
                className={cn(
                  "px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary rounded-md",
                  isActive("/missions") ? "text-primary bg-primary/10" : "text-slate-900 dark:text-slate-100"
                )}
              >
                Missions
              </button>

              <button
                onClick={() => handleNavClick("/news")}
                className={cn(
                  "px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary rounded-md",
                  isActive("/news") ? "text-primary bg-primary/10" : "text-slate-900 dark:text-slate-100"
                )}
              >
                Updates
              </button>

              <button
                onClick={() => handleNavClick("/gallery")}
                className={cn(
                  "px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-primary rounded-md",
                  isActive("/gallery") ? "text-primary bg-primary/10" : "text-slate-900 dark:text-slate-100"
                )}
              >
                Gallery
              </button>

              <Button 
                onClick={() => handleNavClick("/donate")}
                className="ml-4 bg-slate-900 hover:bg-slate-800 text-white border-none rounded-full px-6 font-bold shadow-md hover:shadow-lg transition-all"
              >
                Donate Now
              </Button>
              
              <button
                onClick={() => handleNavClick("/contact")}
                className={cn(
                  "px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-white rounded-md",
                  isActive("/contact") ? "text-white bg-primary/10" : "text-slate-900 dark:text-slate-100"
                )}
              >
                Contact
              </button>
            </div>

            <div className="hidden md:block">
               <Button
                onClick={() => handleNavClick("/donate")}
                className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 py-6 shadow-lg transition-all hover:-translate-y-1 text-md"
              >
                Donate Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-900 dark:text-slate-100 hover:text-white transition-colors p-2"
              >
                {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-4 flex flex-col">
            <button
              onClick={() => handleNavClick("/")}
              className="text-left px-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 hover:text-primary bg-slate-50 dark:bg-slate-800 rounded-xl"
            >
              Home
            </button>
            
            <div className="px-4 py-2 space-y-2">
              <span className="text-sm font-bold text-primary uppercase tracking-wider">About Us</span>
              <button
                onClick={() => handleNavClick("/about/overview")}
                className="block w-full text-left pl-4 py-2 text-base text-slate-600 dark:text-slate-400 hover:text-primary"
              >
                Overview
              </button>
              <button
                onClick={() => handleNavClick("/about/history")}
                className="block w-full text-left pl-4 py-2 text-base text-slate-600 dark:text-slate-400 hover:text-primary"
              >
                History
              </button>
              <button
                onClick={() => handleNavClick("/about/testimonials")}
                className="block w-full text-left pl-4 py-2 text-base text-slate-600 dark:text-slate-400 hover:text-primary"
              >
                Testimonials
              </button>
            </div>

            <button
              onClick={() => handleNavClick("/missions")}
              className="text-left px-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 hover:text-primary bg-slate-50 dark:bg-slate-800 rounded-xl"
            >
              Missions
            </button>
            
            <button
              onClick={() => handleNavClick("/news")}
              className="text-left px-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 hover:text-primary bg-slate-50 dark:bg-slate-800 rounded-xl"
            >
              Updates
            </button>
            
            <button
              onClick={() => handleNavClick("/gallery")}
              className="text-left px-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 hover:text-primary bg-slate-50 dark:bg-slate-800 rounded-xl"
            >
              Gallery
            </button>
            
            <button
              onClick={() => handleNavClick("/contact")}
              className="text-left px-4 py-3 text-lg font-bold text-slate-800 dark:text-slate-200 hover:text-primary bg-slate-50 dark:bg-slate-800 rounded-xl"
            >
              Contact
            </button>
            
            <div className="pt-4">
               <Button
                onClick={() => handleNavClick("/donate")}
                className="w-full bg-secondary hover:bg-secondary/90 text-slate-900 font-bold rounded-full py-6 text-lg shadow-md"
              >
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
