import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Settings, LogOut, Users, Image as ImageIcon, Home, Moon, Sun } from "lucide-react";
import logoImage from "@/assets/kenyavetsmission-logo.png";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/news", icon: FileText, label: "News & Stories" },
    { to: "/admin/homepage", icon: Home, label: "Homepage" },
    { to: "/admin/missions", icon: Users, label: "Missions" },
    { to: "/admin/gallery", icon: ImageIcon, label: "Gallery" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 fixed inset-y-0 left-0 z-50 shadow-lg transition-colors duration-300">
        <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-900 dark:to-blue-800">
           <img src={logoImage} alt="Logo" className="h-8 w-auto mr-3 brightness-0 invert" />
           <span className="font-bold text-white tracking-wide">Admin Panel</span>
        </div>
        
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-blue-600 text-white shadow-md transform scale-[1.02]"
                    : "text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-400"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 flex items-center justify-between transition-colors duration-300">
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Overview</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-slate-600 dark:text-slate-300">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{user?.username || 'Admin'}</span>
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 text-slate-900 dark:text-blue-100 flex items-center justify-center font-bold border dark:border-blue-700">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
        </header>
        <main className="p-8 flex-grow bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
