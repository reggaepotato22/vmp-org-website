import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/kenyavetsmission-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "About", path: "/about" },
    { name: "Missions", path: "/missions" },
    { name: "News & Events", path: "/news" },
    { name: "Contact", path: "/contact" },
    { name: "Gallery", path: "/gallery" },
    { name: "Volunteers", path: "/volunteers" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background border-b border-border shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center space-x-2"
            >
              <img
                src={logoImage}
                alt="kenyavetsmission-logo"
                className="h-20 w-auto mx-auto mb-1"
              />
              <span className="text-xl font-bold text-foreground">
                Veterinarians With a Mission Programme
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.name === "Missions" ? (
                <DropdownMenu key="missions">
                  <DropdownMenuTrigger
                    className={`px-3 py-2 text-sm font-medium transition-smooth hover:text-primary ${
                      isActive("/missions")
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    Missions
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleNavClick("/missions/kenya")}
                    >
                      2025
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleNavClick("/missions/uganda")}
                    >
                      2024
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleNavClick("/missions/tanzania")}
                    >
                      2023
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : item.name === "Volunteers" ? (
                <DropdownMenu key="volunteers">
                  <DropdownMenuTrigger
                    className={`px-3 py-2 text-sm font-medium transition-smooth hover:text-primary ${
                      isActive("/volunteers")
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    Volunteers
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleNavClick("/volunteers/stories")}
                    >
                      Volunteer Stories
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleNavClick("/volunteers/how-to")}
                    >
                      How to Volunteer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`px-3 py-2 text-sm font-medium transition-smooth hover:text-primary ${
                    isActive(item.path)
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </button>
              )
            )}

            <Button
              variant="donate"
              size="sm"
              onClick={() => handleNavClick("/donate")}
            >
              Donate
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-primary transition-smooth"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-medium">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className={`block w-full text-left px-3 py-2 text-base font-medium transition-smooth hover:text-primary ${
                  isActive(item.path)
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="px-3 py-2">
              <Button
                variant="donate"
                size="sm"
                className="w-full"
                onClick={() => handleNavClick("/donate")}
              >
                Donate
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
