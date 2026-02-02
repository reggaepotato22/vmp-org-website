import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { newsService } from '@/services/newsService';
import { missionService } from '@/services/missionService';
import { galleryService } from '@/services/galleryService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, FileText, Image as ImageIcon, TrendingUp } from 'lucide-react';

const mockData = [
  { name: 'Jan', visits: 4000 },
  { name: 'Feb', visits: 3000 },
  { name: 'Mar', visits: 2000 },
  { name: 'Apr', visits: 2780 },
  { name: 'May', visits: 1890 },
  { name: 'Jun', visits: 2390 },
  { name: 'Jul', visits: 3490 },
];

const DashboardPage = () => {
  const [stats, setStats] = useState({
    news: 0,
    missions: 0,
    gallery: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [news, missions, gallery] = await Promise.all([
          newsService.getAll().catch(() => []),
          missionService.getAll().catch(() => []),
          galleryService.getAll().catch(() => [])
        ]);
        setStats({
          news: news.length,
          missions: missions.length,
          gallery: gallery.length
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
        // We could set an error state here, but for now we'll just log it
        // and keep the stats at 0.
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total News & Stories</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.news}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Missions</CardTitle>
            <div className="p-2 bg-green-100 rounded-full">
              <Users className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.missions}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Gallery Images</CardTitle>
            <div className="p-2 bg-purple-100 rounded-full">
              <ImageIcon className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.gallery}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Monthly Visitors</CardTitle>
            <div className="p-2 bg-orange-100 rounded-full">
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">+2,350</div>
            <p className="text-xs text-slate-500 mt-1">+18% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <a href="/admin/news" className="block p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-500 hover:ring-1 hover:ring-blue-500 transition-all cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Add News</h3>
              <p className="text-sm text-slate-500">Post a new update</p>
            </div>
          </div>
        </a>
        <a href="/admin/missions" className="block p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-green-500 hover:ring-1 hover:ring-green-500 transition-all cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Add Mission</h3>
              <p className="text-sm text-slate-500">Create new mission</p>
            </div>
          </div>
        </a>
        <a href="/admin/gallery" className="block p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-purple-500 hover:ring-1 hover:ring-purple-500 transition-all cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
              <ImageIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Upload Photos</h3>
              <p className="text-sm text-slate-500">Add to gallery</p>
            </div>
          </div>
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip />
                <Bar dataKey="visits" fill="#adfa1d" radius={[4, 4, 0, 0]} className="fill-blue-600" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New Donation</p>
                  <p className="text-sm text-slate-500">Isabella Nguyen donated $50.00</p>
                </div>
                <div className="ml-auto font-medium">Just now</div>
              </div>
              <div className="flex items-center">
                 <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New Mission Created</p>
                  <p className="text-sm text-slate-500">Turkana 2026 Mission</p>
                </div>
                <div className="ml-auto font-medium">2h ago</div>
              </div>
               <div className="flex items-center">
                 <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New News Article</p>
                  <p className="text-sm text-slate-500">Vet Mission Success</p>
                </div>
                <div className="ml-auto font-medium">5h ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
