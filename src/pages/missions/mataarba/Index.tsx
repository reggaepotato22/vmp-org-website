import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, MapPin, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Mission2025 = () => {
  const reports = [
    {
      id: "mataarba-2025",
      title: "Mataarba Mission 2025 Report",
      date: "July 15-22, 2025",
      summary: "Complete mission report covering veterinary services, spiritual outreach, and community impact in the Mataarba community.",
      type: "Final Report",
      pages: 8,
      downloads: 45
    }
  ];

  const missionStats = {
    location: "Mataarba Community",
    duration: "8 days",
    teamSize: "12 volunteers",
    animalsTreated: "300+",
    servicesValue: "$15,000",
    biblesDistributed: "200+",
    communityGatherings: "7 sessions"
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <div className="flex items-center text-sm text-slate-500">
            <Link to="/missions" className="hover:text-slate-900 transition-colors">
              Missions
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">2025</span>
          </div>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            2025 Missions
          </h1>
          <p className="text-lg text-slate-500">
            Comprehensive reports and documentation from our 2025 veterinary missions
          </p>
        </header>

        {/* Mission Overview Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Mataarba Mission 2025</CardTitle>
            <CardDescription className="text-base">
              A transformative 8-day mission providing veterinary care and spiritual support 
              to the Mataarba community from July 15-22, 2025.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{missionStats.animalsTreated}</div>
                <div className="text-sm text-slate-500">Animals Treated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{missionStats.teamSize}</div>
                <div className="text-sm text-slate-500">Team Members</div>
              </div>
              <div className="text-2xl font-bold text-blue-600 text-center">
                <div>{missionStats.servicesValue}</div>
                <div className="text-sm text-slate-500">Services Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{missionStats.biblesDistributed}</div>
                <div className="text-sm text-slate-500">Bibles Distributed</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                {missionStats.location}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                {missionStats.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-slate-500" />
                {missionStats.communityGatherings}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Section */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Mission Reports</h2>
          
          <div className="grid gap-4">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription>{report.summary}</CardDescription>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded whitespace-nowrap">
                      {report.type}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {report.date}
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {report.pages} pages
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {report.downloads} downloads
                      </div>
                    </div>
                    
                    <Link to={`/missions/2025/${report.id}`}>
                      <Button>
                        <FileText className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Back Navigation */}
        <div className="mt-8">
          <Link to="/missions">
            <Button variant="outline">
              ← Back to All Missions
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Mission2025;