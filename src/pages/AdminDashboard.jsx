import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, Image, Upload, X } from "lucide-react";
import React, { useState, useRef, useEffect } from 'react';
import { useNewsContext } from '../context/NewsContext';

const AdminDashboard = () => {
  // Get data and functions from context
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

  // Local state for editing
  const [featuredNews, setFeaturedNews] = useState(initialFeatured);
  const [recentNews, setRecentNews] = useState(initialRecent);
  const [upcomingEvents, setUpcomingEvents] = useState(initialEvents);

  // Refs for file inputs
  const featuredImageInputRef = useRef(null);
  const recentImageInputRefs = useRef({});

  // Sync local state when context data changes
  useEffect(() => {
    setFeaturedNews(initialFeatured);
  }, [initialFeatured]);

  useEffect(() => {
    setRecentNews(initialRecent);
  }, [initialRecent]);

  useEffect(() => {
    setUpcomingEvents(initialEvents);
  }, [initialEvents]);

  // Convert image file to base64 or URL
  const handleImageUpload = (file, section, id = null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      
      if (section === 'featured') {
        setFeaturedNews(prev => ({ ...prev, imageUrl }));
      } else if (section === 'news' && id) {
        setRecentNews(prev => 
          prev.map(item => item.id === id ? { ...item, imageUrl } : item)
        );
      }
    };
    reader.readAsDataURL(file);
  };

  // Remove image
  const handleRemoveImage = (section, id = null) => {
    if (section === 'featured') {
      setFeaturedNews(prev => ({ ...prev, imageUrl: "", image: "" }));
    } else if (section === 'news' && id) {
      setRecentNews(prev => 
        prev.map(item => item.id === id ? { ...item, imageUrl: "", image: "" } : item)
      );
    }
  };

  // Handle input changes
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

  // Save news article (updates context)
  const handleSaveNews = (article) => {
    let articleToSave;
    if (article.id === featuredNews.id) {
      articleToSave = featuredNews;
    } else {
      articleToSave = recentNews.find(item => item.id === article.id) || article;
    }
    
    updateNews(articleToSave);
    console.log('Saved article:', articleToSave);
    alert(`Saved: ${articleToSave.title}`);
  };

  // Save event (updates context)
  const handleSaveEvent = (event) => {
    const eventToSave = upcomingEvents.find(item => item.id === event.id) || event;
    updateEvent(eventToSave);
    console.log('Saved event:', eventToSave);
    alert(`Saved: ${eventToSave.title}`);
  };

  // Add new article
  const handleAddNewArticle = () => {
    const newArticle = {
      title: "New Draft Article",
      excerpt: "Write a brief summary here...",
      date: new Date().toLocaleDateString(),
      category: "Milestone",
      readTime: "1 min read",
      link: "",
      imageUrl: ""
    };
    addNews(newArticle);
  };

  // Add new event
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
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Dashboard Header */}
      <header className="bg-blue-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">VMP Content Dashboard</h1>
          <p className="mt-1 opacity-90">Manage all news articles, media, and upcoming events for the website.</p>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-8">
        
        {/* Main Content Management */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Featured Article Management */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Story (ID: {featuredNews.id})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Upload Section */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <label className="block text-sm font-medium mb-2">Featured Image</label>
                {(featuredNews.imageUrl || featuredNews.image) ? (
                  <div className="relative">
                    <img 
                      src={featuredNews.imageUrl || featuredNews.image} 
                      alt="Featured" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleRemoveImage('featured')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Image className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-3">Upload an image for the featured story</p>
                    <input
                      ref={featuredImageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e.target.files[0], 'featured')}
                    />
                    <Button
                      variant="outline"
                      onClick={() => featuredImageInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Image
                    </Button>
                  </div>
                )}
              </div>

              <Input 
                value={featuredNews.title} 
                onChange={(e) => handleInputChange(featuredNews.id, 'featured', 'title', e.target.value)}
                placeholder="Title" 
              />
              <Textarea 
                value={featuredNews.excerpt} 
                onChange={(e) => handleInputChange(featuredNews.id, 'featured', 'excerpt', e.target.value)}
                placeholder="Excerpt"
                rows={4}
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
              <Button onClick={() => handleSaveNews(featuredNews)} className="w-full">
                <Save className="h-4 w-4 mr-2" /> Save Featured Article
              </Button>
            </CardContent>
          </Card>

          {/* Recent News Articles Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent News Articles ({recentNews.length})</CardTitle>
              <Button size="sm" variant="outline" onClick={handleAddNewArticle}>
                <Plus className="h-4 w-4 mr-2" /> New Article
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentNews.map((article) => (
                <div key={article.id} className="border p-4 rounded-lg space-y-3 bg-white">
                  {/* Image Upload for Recent News */}
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-3">
                    {(article.imageUrl || article.image) ? (
                      <div className="relative">
                        <img 
                          src={article.imageUrl || article.image} 
                          alt={article.title} 
                          className="w-full h-32 object-cover rounded"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1"
                          onClick={() => handleRemoveImage('news', article.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <input
                          ref={el => recentImageInputRefs.current[article.id] = el}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e.target.files[0], 'news', article.id)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => recentImageInputRefs.current[article.id]?.click()}
                        >
                          <Image className="h-4 w-4 mr-2" />
                          Add Image
                        </Button>
                      </div>
                    )}
                  </div>

                  <Input 
                    value={article.title} 
                    onChange={(e) => handleInputChange(article.id, 'news', 'title', e.target.value)}
                    placeholder="Title" 
                  />
                  <Textarea 
                    value={article.excerpt} 
                    onChange={(e) => handleInputChange(article.id, 'news', 'excerpt', e.target.value)}
                    placeholder="Excerpt"
                    rows={3}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input 
                      value={article.date} 
                      onChange={(e) => handleInputChange(article.id, 'news', 'date', e.target.value)}
                      placeholder="Date" 
                    />
                    <Input 
                      value={article.category} 
                      onChange={(e) => handleInputChange(article.id, 'news', 'category', e.target.value)}
                      placeholder="Category" 
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="secondary" size="sm" onClick={() => handleSaveNews(article)}>
                      <Save className="h-4 w-4 mr-2" /> Save
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteNews(article.id)}>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
              {recentNews.length === 0 && (
                <p className="text-center text-gray-500 py-4">No recent articles found. Click 'New Article' above.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Management */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Upcoming Events Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Events ({upcomingEvents.length})</CardTitle>
              <Button size="sm" variant="outline" onClick={handleAddNewEvent}>
                <Plus className="h-4 w-4 mr-2" /> New Event
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border p-3 rounded-lg space-y-2 bg-white">
                  <Input 
                    value={event.title} 
                    onChange={(e) => handleInputChange(event.id, 'events', 'title', e.target.value)}
                    placeholder="Title" 
                  />
                  <Input 
                    value={event.date} 
                    onChange={(e) => handleInputChange(event.id, 'events', 'date', e.target.value)}
                    placeholder="Date" 
                  />
                  <Input 
                    value={event.location} 
                    onChange={(e) => handleInputChange(event.id, 'events', 'location', e.target.value)}
                    placeholder="Location" 
                  />
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" onClick={() => handleSaveEvent(event)}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteEvent(event.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {upcomingEvents.length === 0 && (
                <p className="text-center text-gray-500 py-4">No events scheduled. Add one above.</p>
              )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Info</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Images are converted to base64 and stored in context. Changes will persist during your session.
              </p>
              <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                <p className="font-medium text-blue-900">Supported formats:</p>
                <p className="text-blue-700">JPG, PNG, GIF, WebP</p>
                <p className="font-medium text-blue-900 mt-2">Max size: 5MB</p>
              </div>
              <div className="mt-3 p-3 bg-yellow-50 rounded text-sm">
                <p className="font-medium text-yellow-900">Note:</p>
                <p className="text-yellow-800">For production, upload to cloud storage (S3, Cloudinary) and save URLs to database.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;