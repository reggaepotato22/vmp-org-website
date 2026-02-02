import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import logoImage from "@/assets/kenyavetsmission-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/context/SettingsContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings, toggleTheme } = useSettings();

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 fixed top-0 left-0 right-0 z-50 h-20 flex items-center w-full transition-all duration-300 dark:bg-slate-950/95 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo + Text */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center space-x-3 group"
            >
              <img
                src={logoImage}
                alt="kenyavetsmission-logo"
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-xl font-bold text-slate-800 tracking-tight whitespace-nowrap hidden lg:block dark:text-slate-100">
                {settings.siteTitle || "Veterinarians With a Mission"}
              </span>
              <span className="text-xl font-bold text-slate-800 tracking-tight whitespace-nowrap lg:hidden dark:text-slate-100">
                VMP
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => handleNavClick("/")}
              className={`px-3 py-2 text-sm font-bold tracking-wide transition-colors ${
                isActive("/") ? "text-blue-600" : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-600"
              }`}
            >
              HOME
            </button>

            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`px-3 py-2 text-sm font-bold tracking-wide transition-colors outline-none ${
                  location.pathname.startsWith("/about")
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-600"
                }`}
              >
                ABOUT
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white/95 backdrop-blur-md border-slate-100 shadow-lg animate-in fade-in-0 zoom-in-95 dark:bg-slate-900 dark:border-slate-800">
                <DropdownMenuItem className="cursor-pointer focus:bg-blue-50 focus:text-blue-600 font-medium dark:focus:bg-slate-800" onClick={() => handleNavClick("/about/overview")}>
                  Overview
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer focus:bg-blue-50 focus:text-blue-600 font-medium dark:focus:bg-slate-800" onClick={() => handleNavClick("/about/history")}>
                  History
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer focus:bg-blue-50 focus:text-blue-600 font-medium dark:focus:bg-slate-800" onClick={() => handleNavClick("/about/testimonials")}>
                  Testimonials
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Missions */}
            <button
              onClick={() => handleNavClick("/missions")}
              className={`px-3 py-2 text-sm font-bold tracking-wide transition-colors ${
                isActive("/missions") ? "text-blue-600" : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-600"
              }`}
            >
              MISSIONS
            </button>

            {/* Volunteers Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`px-3 py-2 text-sm font-bold tracking-wide transition-colors outline-none ${
                  location.pathname.startsWith("/volunteer")
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-600"
                }`}
              >
                VOLUNTEERS
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white/95 backdrop-blur-md border-slate-100 shadow-lg animate-in fade-in-0 zoom-in-95 dark:bg-slate-900 dark:border-slate-800">
                <DropdownMenuItem className="cursor-pointer focus:bg-blue-50 focus:text-blue-600 font-medium dark:focus:bg-slate-800" onClick={() => handleNavClick("/volunteer")}>
                  How to Volunteer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Updates */}
            <button
              onClick={() => handleNavClick("/news")} 
              className={`px-3 py-2 text-sm font-bold tracking-wide transition-colors ${
                isActive("/news") ? "text-blue-600" : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-600"
              }`}
            >
              UPDATES
            </button>

            {/* Gallery */}
            <button
              onClick={() => handleNavClick("/gallery")}
              className={`px-3 py-2 text-sm font-bold tracking-wide transition-colors ${
                isActive("/gallery") ? "text-blue-600" : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-600"
              }`}
            >
              GALLERY
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNavClick("/contact")}
              className={`px-3 py-2 text-sm font-bold tracking-wide transition-colors ${
                isActive("/contact") ? "text-blue-600" : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-600"
              }`}
            >
              CONTACT
            </button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-600"
            >
              {settings.theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Donate */}
            <Button 
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              size="default" 
              onClick={() => handleNavClick("/donate")}
            >
              GIVE
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
             {/* Theme Toggle Mobile */}
             <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-600"
            >
              {settings.theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-blue-600 transition-colors p-2 dark:text-slate-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-100 shadow-lg animate-in slide-in-from-top-5 max-h-[calc(100vh-80px)] overflow-y-auto dark:bg-slate-950 dark:border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button
              onClick={() => handleNavClick("/")}
              className={`block w-full text-left px-4 py-3 text-base font-semibold rounded-md ${
                isActive("/") ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              }`}
            >
              HOME
            </button>
            
            <div className="px-4 py-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">About</p>
              <button
                onClick={() => handleNavClick("/about/overview")}
                className="block w-full text-left py-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300"
              >
                Overview
              </button>
              <button
                onClick={() => handleNavClick("/about/history")}
                className="block w-full text-left py-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300"
              >
                History
              </button>
              <button
                onClick={() => handleNavClick("/about/testimonials")}
                className="block w-full text-left py-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300"
              >
                Testimonials
              </button>
            </div>

            <button
              onClick={() => handleNavClick("/missions")}
              className={`block w-full text-left px-4 py-3 text-base font-semibold rounded-md ${
                isActive("/missions") ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              }`}
            >
              MISSIONS
            </button>

            <div className="px-4 py-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Volunteers</p>
              <button
                onClick={() => handleNavClick("/volunteers/how-to")}
                className="block w-full text-left py-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300"
              >
                How to Volunteer
              </button>
            </div>

            <button
              onClick={() => handleNavClick("/news")}
              className={`block w-full text-left px-4 py-3 text-base font-semibold rounded-md ${
                isActive("/news") ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              }`}
            >
              UPDATES
            </button>

            <button
              onClick={() => handleNavClick("/gallery")}
              className={`block w-full text-left px-4 py-3 text-base font-semibold rounded-md ${
                isActive("/gallery") ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              }`}
            >
              GALLERY
            </button>

            <button
              onClick={() => handleNavClick("/contact")}
              className={`block w-full text-left px-4 py-3 text-base font-semibold rounded-md ${
                isActive("/contact") ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              }`}
            >
              CONTACT
            </button>

            <div className="pt-4 px-4">
              <Button className="w-full bg-blue-600 font-bold shadow-md" onClick={() => handleNavClick("/donate")}>
                GIVE
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
