import { Outlet } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

const AdminLayout = () => {
  const { user } = useAuth();
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

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white dark:bg-slate-800 transition-colors duration-300">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold text-slate-800 dark:text-white">Overview</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-slate-600 dark:text-slate-300">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden md:inline-block">{user?.username || 'Admin'}</span>
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 text-slate-900 dark:text-blue-100 flex items-center justify-center font-bold border dark:border-blue-700">
                {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 overflow-auto">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-slate-50/50 md:min-h-min mt-4">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
