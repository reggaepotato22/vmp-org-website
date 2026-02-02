import { Outlet, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Settings, LogOut, Users, Image as ImageIcon } from "lucide-react";
import logoImage from "@/assets/kenyavetsmission-logo.png";
import { useAuth } from "@/context/AuthContext";

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed inset-y-0 left-0 z-50">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
           <img src={logoImage} alt="Logo" className="h-8 w-auto mr-3" />
           <span className="font-bold text-slate-800">Admin</span>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link to="/admin/dashboard" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/admin/news" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors">
            <FileText className="h-5 w-5" />
            <span className="font-medium">News & Stories</span>
          </Link>
          <Link to="/admin/missions" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors">
            <Users className="h-5 w-5" />
            <span className="font-medium">Missions</span>
          </Link>
           <Link to="/admin/users" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors">
            <Users className="h-5 w-5" />
            <span className="font-medium">Users</span>
          </Link>
          <Link to="/admin/gallery" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors">
            <ImageIcon className="h-5 w-5" />
            <span className="font-medium">Gallery</span>
          </Link>
           <Link to="/admin/settings" className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors">
            <Settings className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">Overview</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-slate-600">{user?.username || 'Admin'}</span>
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
        </header>
        <main className="p-8 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
