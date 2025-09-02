import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
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

  const navItems = [
    { name: "About", path: "/about" },
    { name: "Missions", path: "/missions" },
    { name: "News & Events", path: "/news" },
    { name: "Contact", path: "/contact" },
    { name: "Gallery", path: "/gallery" },
    {name: "Volunteers", path: "/volunteers"},
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background border-b border-border shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">

            <Link to="/" className="flex items-center space-x-2">
             <img 
  src={logoImage} 
  alt="kenyavetsmission-logo"
  className="h-20 w-auto mx-auto mb-1"
/>
              <span className="text-xl font-bold text-foreground">Veterinarians With a Mission Programme</span>
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
        <DropdownMenuItem asChild>
          <Link to="/missions/kenya">2025</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/missions/uganda">2024</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/missions/tanzania">2023</Link>
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
        <DropdownMenuItem asChild>
          <Link to="/volunteers/stories">Volunteer Stories</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/volunteers/how-to">How to Volunteer</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
     <Link
      key={item.name}
      to={item.path}
      className={`px-3 py-2 text-sm font-medium transition-smooth hover:text-primary ${
        isActive(item.path)
          ? "text-primary border-b-2 border-primary"
          : "text-muted-foreground"
      }`}
    >
      {item.name}
    </Link>
  )
)}


            <Button variant="donate" size="sm" asChild>
              <Link to="/donate">Donate</Link>
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
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 text-base font-medium transition-smooth hover:text-primary ${
                  isActive(item.path)
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Button variant="donate" size="sm" className="w-full" asChild>
                <Link to="/donate">Donate</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;