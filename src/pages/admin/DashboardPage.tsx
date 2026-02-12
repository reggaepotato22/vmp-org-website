import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { 
  Users, 
  FileText, 
  Target, 
  Award, 
  PlusCircle, 
  TrendingUp, 
  Calendar,
  ArrowUpRight,
  MessageSquare,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { stats, updateStat, campaigns, programs, volunteers, messages, missionReports } = useData();
  const { user } = useAuth();
  const [editingStats, setEditingStats] = useState(false);
  const [tempStats, setTempStats] = useState(stats);

  const handleStatChange = (id: string, value: string) => {
    setTempStats(prev => prev.map(s => s.id === id ? { ...s, value } : s));
  };

  const saveStats = () => {
    tempStats.forEach(s => updateStat(s.id, s.value));
    setEditingStats(false);
    toast.success("Statistics updated successfully");
  };

  const quickActions = [
    { label: "New Mission", icon: PlusCircle, to: "/admin/missions", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Add Story", icon: FileText, to: "/admin/news", color: "text-vmp-maroon", bg: "bg-vmp-maroon/10" },
    { label: "Volunteers", icon: Users, to: "/admin/volunteers", color: "text-green-600", bg: "bg-green-50" },
    { label: "Settings", icon: Calendar, to: "/admin/settings", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentVolunteers = volunteers.slice(0, 3);
  const recentMessages = messages.slice(0, 3);
  const unreadMessagesCount = messages.filter(m => m.status === 'unread' || !m.read).length;
  const recentReports = missionReports.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-vmp-black">Dashboard Overview</h2>
          <p className="text-gray-500">Welcome back, {user?.username || 'Admin'}. Here's what's happening with VMP.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex" asChild>
            <Link to="/"><ExternalLink className="mr-2 h-4 w-4" /> View Site</Link>
          </Button>
          <Button className="bg-vmp-maroon hover:bg-vmp-maroon/90 text-white shadow-md" asChild>
            <Link to="/admin/missions"><PlusCircle className="mr-2 h-4 w-4" /> New Mission</Link>
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm hover:shadow-md transition-all bg-white dark:bg-slate-800 border-l-4 border-l-vmp-maroon">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Missions</CardTitle>
            <div className="p-2 bg-vmp-maroon/10 rounded-lg">
              <Target className="h-5 w-5 text-vmp-maroon" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-vmp-black dark:text-white">{stats.find(s => s.id === '1')?.value || '150'}</div>
            <p className="text-xs text-green-600 flex items-center mt-2 font-medium">
              <TrendingUp className="h-3 w-3 mr-1" /> Active in 5 counties
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all bg-white dark:bg-slate-800 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Volunteers</CardTitle>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-vmp-black dark:text-white">{stats.find(s => s.id === '2')?.value || '10k+'}</div>
            <p className="text-xs text-blue-600 flex items-center mt-2 font-medium">
              <CheckCircle2 className="h-3 w-3 mr-1" /> {volunteers.length} new apps
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all bg-white dark:bg-slate-800 border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Unread Messages</CardTitle>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <MessageSquare className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-vmp-black dark:text-white">{unreadMessagesCount}</div>
            <p className="text-xs text-yellow-600 flex items-center mt-2 font-medium">
              <Clock className="h-3 w-3 mr-1" /> Requires response
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm hover:shadow-md transition-all bg-white dark:bg-slate-800 border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Animals Treated</CardTitle>
            <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <Award className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-vmp-black dark:text-white">{stats.find(s => s.id === '3')?.value || '500k+'}</div>
            <p className="text-xs text-green-600 flex items-center mt-2 font-medium">
              <TrendingUp className="h-3 w-3 mr-1" /> Life-changing impact
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="shadow-sm border-none bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-lg">Quick Access</CardTitle>
            <CardDescription>Direct links to management tools.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, idx) => (
                <Link 
                  key={idx} 
                  to={action.to}
                  className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-vmp-maroon/30 hover:bg-vmp-maroon/[0.02] hover:shadow-sm transition-all group"
                >
                  <div className={`p-3 ${action.bg} rounded-full mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center uppercase tracking-tight">{action.label}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mission Reports Widget */}
        <Card className="lg:col-span-2 shadow-sm border-none bg-white dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Mission Reports</CardTitle>
              <CardDescription>Summary of latest field activities.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-vmp-maroon font-bold text-xs uppercase" asChild>
              <Link to="/admin/missions">All Missions</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-start justify-between p-3 rounded-lg border border-slate-50 hover:bg-slate-50 transition-colors">
                  <div className="flex gap-3">
                    <div className="mt-1 p-2 bg-slate-100 rounded-lg">
                      <Target className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{report.title}</p>
                      <p className="text-xs text-slate-500">{report.location} • {report.date}</p>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1">{report.summary}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] uppercase font-bold",
                    report.status === 'completed' ? 'bg-green-100 text-green-700' : 
                    report.status === 'ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                  )}>
                    {report.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Volunteers */}
        <Card className="shadow-sm border-none bg-white dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">New Volunteers</CardTitle>
              <CardDescription>Recent applications for review.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-vmp-maroon font-bold text-xs uppercase" asChild>
              <Link to="/admin/volunteers">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVolunteers.map((vol) => (
                <div key={vol.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-vmp-beige/50 flex items-center justify-center text-vmp-maroon font-bold">
                      {vol.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{vol.name}</p>
                      <p className="text-xs text-slate-500">{vol.role} • {vol.date}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] uppercase font-bold",
                    vol.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  )}>
                    {vol.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="shadow-sm border-none bg-white dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Messages</CardTitle>
              <CardDescription>Latest inquiries from the website.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-vmp-maroon font-bold text-xs uppercase" asChild>
              <Link to="/admin/messages">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="flex items-start justify-between p-3 rounded-lg border border-slate-50">
                  <div className="flex gap-3">
                    <div className="mt-1 p-2 bg-slate-100 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{msg.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{msg.subject}</p>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1">{msg.message}</p>
                    </div>
                  </div>
                  {!msg.read && (
                    <div className="h-2 w-2 rounded-full bg-vmp-maroon mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Management Section */}
      <Card className="shadow-sm border-none bg-white dark:bg-slate-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Impact Statistics</CardTitle>
            <CardDescription>Update the numbers displayed on the homepage.</CardDescription>
          </div>
          {!editingStats ? (
            <Button variant="outline" size="sm" onClick={() => setEditingStats(true)} className="text-vmp-maroon border-vmp-maroon hover:bg-vmp-maroon hover:text-white">
              Edit Stats
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => { setTempStats(stats); setEditingStats(false); }}>
                Cancel
              </Button>
              <Button size="sm" onClick={saveStats} className="bg-vmp-maroon text-white hover:bg-vmp-maroon/90">
                Save Changes
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tempStats.map((stat) => (
              <div key={stat.id} className="space-y-2">
                <Label htmlFor={`stat-${stat.id}`} className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</Label>
                {editingStats ? (
                  <Input
                    id={`stat-${stat.id}`}
                    value={stat.value}
                    onChange={(e) => handleStatChange(stat.id, e.target.value)}
                    className="font-bold text-lg border-vmp-maroon/20 focus:border-vmp-maroon"
                  />
                ) : (
                  <div className="text-2xl font-bold text-vmp-black dark:text-white p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">{stat.value}</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
