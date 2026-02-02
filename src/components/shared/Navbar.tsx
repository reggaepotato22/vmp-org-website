import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import logoImage from "@/assets/kenyavetsmission-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();
  const navigate = useNavigate();

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
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        scrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm h-20 border-b border-slate-100 dark:border-slate-800"
          : "bg-white dark:bg-slate-900 h-24 border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-3 group"
          >
            <img
              src={logoImage}
              alt="Kenya Vets Mission"
              className={cn(
                "transition-all duration-300 object-contain dark:brightness-0 dark:invert",
                scrolled ? "h-12" : "h-16"
              )}
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-primary font-heading font-bold text-lg leading-tight dark:text-blue-400">
                Veterinarians With
              </span>
              <span className="text-secondary font-heading font-bold text-lg leading-tight dark:text-blue-200">
                A Mission Programme
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavClick("/")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary dark:hover:text-blue-400",
                isActive("/") ? "text-primary font-bold dark:text-blue-400" : "text-slate-600 dark:text-slate-300"
              )}
            >
              Home
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary dark:hover:text-blue-400 focus:outline-none",
                  location.pathname.startsWith("/about")
                    ? "text-primary font-bold dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-300"
                )}
              >
                About <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-lg">
                <DropdownMenuItem onClick={() => handleNavClick("/about/overview")} className="dark:text-slate-200 dark:focus:bg-slate-700">
                  Overview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavClick("/about/history")} className="dark:text-slate-200 dark:focus:bg-slate-700">
                  History
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavClick("/about/testimonials")} className="dark:text-slate-200 dark:focus:bg-slate-700">
                  Testimonials
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => handleNavClick("/news")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary dark:hover:text-blue-400",
                isActive("/news") ? "text-primary font-bold dark:text-blue-400" : "text-slate-600 dark:text-slate-300"
              )}
            >
              Updates
            </button>

            <button
              onClick={() => handleNavClick("/missions")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary dark:hover:text-blue-400",
                isActive("/missions") ? "text-primary font-bold dark:text-blue-400" : "text-slate-600 dark:text-slate-300"
              )}
            >
              Missions
            </button>

            <button
              onClick={() => handleNavClick("/volunteer")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary dark:hover:text-blue-400",
                isActive("/volunteer") ? "text-primary font-bold dark:text-blue-400" : "text-slate-600 dark:text-slate-300"
              )}
            >
              Volunteers
            </button>

            <button
              onClick={() => handleNavClick("/gallery")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary dark:hover:text-blue-400",
                isActive("/gallery") ? "text-primary font-bold dark:text-blue-400" : "text-slate-600 dark:text-slate-300"
              )}
            >
              Gallery
            </button>

            <button
              onClick={() => handleNavClick("/contact")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary dark:hover:text-blue-400",
                isActive("/contact") ? "text-primary font-bold dark:text-blue-400" : "text-slate-600 dark:text-slate-300"
              )}
            >
              Contact
            </button>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            <Button
              onClick={() => handleNavClick("/donate")}
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-full px-6 shadow-lg transition-all hover:-translate-y-0.5"
            >
              Donate
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-slate-600 dark:text-slate-300">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-lg absolute w-full left-0 top-full">
          <div className="px-4 py-4 space-y-4 flex flex-col">
            <button
              onClick={() => handleNavClick("/")}
              className="text-left px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md"
            >
              Home
            </button>
            <div className="px-3 py-2 space-y-2">
              <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">About</span>
              <button
                onClick={() => handleNavClick("/about/overview")}
                className="block w-full text-left pl-4 text-base text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400"
              >
                Overview
              </button>
              <button
                onClick={() => handleNavClick("/about/history")}
                className="block w-full text-left pl-4 text-base text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400"
              >
                History
              </button>
              <button
                onClick={() => handleNavClick("/about/testimonials")}
                className="block w-full text-left pl-4 text-base text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400"
              >
                Testimonials
              </button>
            </div>
            <button
              onClick={() => handleNavClick("/news")}
              className="text-left px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md"
            >
              Updates
            </button>
            <button
              onClick={() => handleNavClick("/missions")}
              className="text-left px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md"
            >
              Missions
            </button>
            <button
              onClick={() => handleNavClick("/volunteer")}
              className="text-left px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md"
            >
              Volunteers
            </button>
            <button
              onClick={() => handleNavClick("/gallery")}
              className="text-left px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick("/contact")}
              className="text-left px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md"
            >
              Contact
            </button>
            <Button
              onClick={() => handleNavClick("/donate")}
              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-full"
            >
              Donate
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
