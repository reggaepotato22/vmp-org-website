import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Users, 
  Image as ImageIcon, 
  Home, 
  Briefcase
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import logoImage from "@/assets/kenyavetsmission-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/news", icon: FileText, label: "News & Stories" },
    { to: "/admin/homepage", icon: Home, label: "Homepage" },
    { to: "/admin/missions", icon: Briefcase, label: "Missions" },
    { to: "/admin/projects", icon: FolderKanban, label: "Projects" },
    { to: "/admin/gallery", icon: ImageIcon, label: "Gallery" },
    { to: "/admin/team", icon: Users, label: "Team" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center justify-center bg-sidebar-accent/10">
        <div className="flex items-center gap-2 px-2 w-full group-data-[collapsible=icon]:justify-center">
          <img 
            src={logoImage} 
            alt="Logo" 
            className="h-8 w-auto transition-all group-data-[collapsible=icon]:h-6" 
          />
          <span className="font-bold text-sidebar-foreground tracking-wide group-data-[collapsible=icon]:hidden truncate">
            Admin Panel
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu className="p-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton 
                asChild 
                isActive={location.pathname === item.to}
                tooltip={item.label}
                className="data-[active=true]:bg-emerald-600 data-[active=true]:text-white data-[active=true]:hover:bg-emerald-700 data-[active=true]:hover:text-white"
              >
                <Link to={item.to}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarSeparator className="my-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              tooltip="Logout"
              className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
