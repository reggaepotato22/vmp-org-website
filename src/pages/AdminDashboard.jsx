import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, Image as ImageIcon, Video } from "lucide-react";
import React, { useState } from 'react';
import { useNewsContext } from '@/context/NewsContext'; // <-- NEW IMPORT

const AdminDashboard = () => {
  // Use context to get data and mutator functions
  const { 
    featuredNews: initialFeatured, 
    recentNews: initialRecent, 
    upcomingEvents: initialEvents, 
    updateNews, 
    addNews, 
    deleteNews, 
    updateEvent,
    addEvent, 
    deleteEvent 
  } = useNewsContext();

  // Use local state only to manage the CURRENT input values being edited
  const [featuredNews, setFeaturedNews] = useState(initialFeatured);
  const [recentNews, setRecentNews] = useState(initialRecent);
  const [upcomingEvents, setUpcomingEvents] = useState(initialEvents);

  // Sync local state when context data changes
  React.useEffect(() => {
    setFeaturedNews(initialFeatured);
  }, [initialFeatured]);
  React.useEffect(() => {
    setRecentNews(initialRecent);
  }, [initialRecent]);
  React.useEffect(() => {
    setUpcomingEvents(initialEvents);
  }, [initialEvents]);

  // Handler for all input changes in the dashboard
  const handleInputChange = (id, section, field, value) => {
    if (section === 'featured') {
      setFeaturedNews(prev => ({ ...prev, [field]: value }));
    } else if (section === 'news') {
      setRecentNews(prev => 
        prev.map(item => item.id === id ? { ...item, [field]: value } : item)
      );
    } else if (section === 'events') {
      setUpcomingEvents(prev => 
        prev.map(item => item.id === id ? { ...item, [field]: value } : item)
      );
    }
  };

  // Handlers now use the context functions
  const handleSaveNews = (article) => {
    updateNews(article);
    console.log(`Saved article ID: ${article.id}`);
  };

  const handleSaveEvent = (event) => {
    updateEvent(event);
    console.log(`Saved event ID: ${event.id}`);
  };

  const handleAddNewArticle = () => {
    const newArticle = {
        title: "New Draft Article",
        excerpt: "Write a brief summary here...",
        date: new Date().toLocaleDateString(),
        category: "Milestone",
        readTime: "1 min read",
        link: ""
    };
    addNews(newArticle);
  };
  
  const handleAddNewEvent = () => {
    const newEvent = {
        title: "New Event Title",
        date: new Date().toLocaleDateString(),
        time: "TBD",
        location: "Virtual",
        description: "Event details...",
        type: "Meeting"
    };
    addEvent(newEvent);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Dashboard Header */}
      <header className="bg-primary/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-primary">VMP Content Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage all news articles, media, and upcoming events for the website.</p>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-8">
        
        {/* Main Content Management (Takes 2/3rds width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Featured Article Management */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Story (ID: {featuredNews.id})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                value={featuredNews.title} 
                onChange={(e) => handleInputChange(featuredNews.id, 'featured', 'title', e.target.value)}
                placeholder="Title" 
              />
              <Textarea 
                value={featuredNews.excerpt} 
                onChange={(e) => handleInputChange(featuredNews.id, 'featured', 'excerpt', e.target.value)}
                placeholder="Excerpt" 
              />
              <div className="grid grid-cols-3 gap-3">
                <Input 
                  value={featuredNews.date} 
                  onChange={(e) => handleInputChange(featuredNews.id, 'featured', 'date', e.target.value)}
                  placeholder="Date" 
                />
                <Input 
                  value={featuredNews.category} 
                  onChange={(e) => handleInputChange(featuredNews.id, 'featured', 'category', e.target.value)}
                  placeholder="Category" 
                />
                <Input 
                  value={featuredNews.readTime} 
                  onChange={(e) => handleInputChange(featuredNews.id, 'featured', 'readTime', e.target.value)}
                  placeholder="Read Time" 
                />
              </div>
              <Button onClick={() => handleSaveNews(featuredNews)}><Save className="h-4 w-4 mr-2" /> Save Featured Article</Button>
            </CardContent>
          </Card>


          {/* Recent News Articles Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent News Articles ({recentNews.length})</CardTitle>
              <Button size="sm" variant="outline" onClick={handleAddNewArticle}><Plus className="h-4 w-4 mr-2" /> New Article</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentNews.map((article) => (
                <div key={article.id} className="border p-4 rounded-lg space-y-3 bg-card">
                  <Input 
                    defaultValue={article.title} 
                    onChange={(e) => handleInputChange(article.id, 'news', 'title', e.target.value)}
                    placeholder="Title" 
                  />
                  <Textarea 
                    defaultValue={article.excerpt} 
                    onChange={(e) => handleInputChange(article.id, 'news', 'excerpt', e.target.value)}
                    placeholder="Excerpt" 
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input 
                      defaultValue={article.date} 
                      onChange={(e) => handleInputChange(article.id, 'news', 'date', e.target.value)}
                      placeholder="Date" 
                    />
                    <Input 
                      defaultValue={article.category} 
                      onChange={(e) => handleInputChange(article.id, 'news', 'category', e.target.value)}
                      placeholder="Category" 
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="secondary" size="sm" onClick={() => handleSaveNews(article)}><Save className="h-4 w-4 mr-2" /> Save</Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteNews(article.id)}><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
                  </div>
                </div>
              ))}
              {recentNews.length === 0 && <p className="text-center text-muted-foreground py-4">No recent articles found. Click 'New Article' above.</p>}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Management (Takes 1/3rd width) */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Upcoming Events Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Events ({upcomingEvents.length})</CardTitle>
              <Button size="sm" variant="outline" onClick={handleAddNewEvent}><Plus className="h-4 w-4 mr-2" /> New Event</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border p-3 rounded-lg space-y-2 bg-card">
                  <Input 
                    defaultValue={event.title} 
                    onChange={(e) => handleInputChange(event.id, 'events', 'title', e.target.value)}
                    placeholder="Title" 
                  />
                  <Input 
                    defaultValue={event.date} 
                    onChange={(e) => handleInputChange(event.id, 'events', 'date', e.target.value)}
                    placeholder="Date" 
                  />
                  <Input 
                    defaultValue={event.location} 
                    onChange={(e) => handleInputChange(event.id, 'events', 'location', e.target.value)}
                    placeholder="Location" 
                  />
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" onClick={() => handleSaveEvent(event)}><Save className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteEvent(event.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
              {upcomingEvents.length === 0 && <p className="text-center text-muted-foreground py-4">No events scheduled. Add one above.</p>}
            </CardContent>
          </Card>

          {/* Media Uploads Card (unchanged) */}
          <Card>
            <CardHeader>
              <CardTitle>Media Manager</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Button className="w-full" variant="outline">
                  <ImageIcon className="h-4 w-4 mr-2" /> Upload Image
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="w-full" variant="outline">
                  <Video className="h-4 w-4 mr-2" /> Upload Video
                </Button>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                This area handles file uploads to your storage bucket (e.g., S3 or Firebase Storage).
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;