import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          ? "bg-white/95 backdrop-blur-md shadow-sm h-20 border-b border-slate-100"
          : "bg-white h-24 border-b border-transparent"
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
                "transition-all duration-300 object-contain",
                scrolled ? "h-12" : "h-16"
              )}
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-primary font-heading font-bold text-lg leading-tight">
                Veterinarians With
              </span>
              <span className="text-secondary font-heading font-bold text-lg leading-tight">
                A Mission Programme
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavClick("/")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/") ? "text-primary font-bold" : "text-slate-600"
              )}
            >
              Home
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary focus:outline-none",
                  location.pathname.startsWith("/about")
                    ? "text-primary font-bold"
                    : "text-slate-600"
                )}
              >
                About <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-slate-100 shadow-lg">
                <DropdownMenuItem onClick={() => handleNavClick("/about/overview")}>
                  Overview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavClick("/about/history")}>
                  History
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavClick("/about/testimonials")}>
                  Testimonials
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => handleNavClick("/news")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/news") ? "text-primary font-bold" : "text-slate-600"
              )}
            >
              Updates
            </button>

            <Button
              onClick={() => handleNavClick("/donate")}
              className="bg-accent hover:bg-accent/90 text-white font-bold rounded-full px-6 shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5"
            >
              Donate
            </Button>

            <button
              onClick={() => handleNavClick("/missions")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/missions") ? "text-primary font-bold" : "text-slate-600"
              )}
            >
              Missions
            </button>

            <button
              onClick={() => handleNavClick("/volunteer")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/volunteer") ? "text-primary font-bold" : "text-slate-600"
              )}
            >
              Volunteers
            </button>

            <button
              onClick={() => handleNavClick("/gallery")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/gallery") ? "text-primary font-bold" : "text-slate-600"
              )}
            >
              Gallery
            </button>

            <button
              onClick={() => handleNavClick("/contact")}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/contact") ? "text-primary font-bold" : "text-slate-600"
              )}
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 shadow-lg absolute w-full left-0 top-full">
          <div className="px-4 py-4 space-y-4 flex flex-col">
            <button
              onClick={() => handleNavClick("/")}
              className="text-left px-3 py-2 text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md"
            >
              Home
            </button>
            <div className="px-3 py-2 space-y-2">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">About</span>
              <button
                onClick={() => handleNavClick("/about/overview")}
                className="block w-full text-left pl-4 text-base text-slate-600 hover:text-primary"
              >
                Overview
              </button>
              <button
                onClick={() => handleNavClick("/about/history")}
                className="block w-full text-left pl-4 text-base text-slate-600 hover:text-primary"
              >
                History
              </button>
              <button
                onClick={() => handleNavClick("/about/testimonials")}
                className="block w-full text-left pl-4 text-base text-slate-600 hover:text-primary"
              >
                Testimonials
              </button>
            </div>
            <button
              onClick={() => handleNavClick("/news")}
              className="text-left px-3 py-2 text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md"
            >
              Updates
            </button>
            <Button
              onClick={() => handleNavClick("/donate")}
              className="w-full bg-accent hover:bg-accent/90 text-white font-bold rounded-full"
            >
              Donate
            </Button>
            <button
              onClick={() => handleNavClick("/missions")}
              className="text-left px-3 py-2 text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md"
            >
              Missions
            </button>
            <button
              onClick={() => handleNavClick("/volunteer")}
              className="text-left px-3 py-2 text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md"
            >
              Volunteers
            </button>
            <button
              onClick={() => handleNavClick("/gallery")}
              className="text-left px-3 py-2 text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick("/contact")}
              className="text-left px-3 py-2 text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
