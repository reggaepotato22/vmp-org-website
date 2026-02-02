import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, DollarSign, TrendingUp, Activity, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  // Mock Stats
  const stats = [
    {
      title: "Total Donations",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Active Volunteers",
      value: "124",
      change: "+12 new this month",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Mission Reports",
      value: "24",
      change: "All reports up to date",
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Upcoming Events",
      value: "3",
      change: "Next event in 5 days",
      icon: Calendar,
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
            <p className="text-slate-500">Welcome back to the Kenya Vets Mission admin panel.</p>
        </div>
        <div className="flex gap-2">
            <Button>Download Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
                <Card key={i} className="border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">
                            {stat.title}
                        </CardTitle>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${stat.bg}`}>
                            <Icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                        <p className="text-xs text-slate-500 mt-1">
                            {stat.change}
                        </p>
                    </CardContent>
                </Card>
            );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4 shadow-sm">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {[
                        { user: "Sarah Johnson", action: "submitted a new volunteer application", time: "2 hours ago" },
                        { user: "Admin", action: "updated the Mataarba Mission report", time: "5 hours ago" },
                        { user: "John Doe", action: "donated $50.00 via M-Pesa", time: "1 day ago" },
                        { user: "System", action: "automated backup completed", time: "1 day ago" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center">
                            <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center mr-4 border border-slate-200">
                                <Activity className="h-4 w-4 text-slate-500" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none text-slate-800">
                                    <span className="font-bold">{item.user}</span> {item.action}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {item.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3 shadow-sm">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button 
                    variant="outline" 
                    className="w-full justify-start h-12 text-slate-600 hover:text-primary hover:border-primary/50 hover:bg-blue-50"
                    onClick={() => navigate("/admin/news")}
                >
                    <FileText className="mr-2 h-4 w-4" />
                    Post New Story
                </Button>
                <Button 
                    variant="outline" 
                    className="w-full justify-start h-12 text-slate-600 hover:text-primary hover:border-primary/50 hover:bg-blue-50"
                    onClick={() => navigate("/admin/gallery")}
                >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Upload Gallery Photos
                </Button>
                <Button 
                    variant="outline" 
                    className="w-full justify-start h-12 text-slate-600 hover:text-primary hover:border-primary/50 hover:bg-blue-50"
                    onClick={() => navigate("/admin/users")}
                >
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
