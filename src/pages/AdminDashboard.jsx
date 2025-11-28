import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, Image, Upload, X, Loader2, LogOut } from "lucide-react"; 
import React, { useState, useRef, useEffect } from 'react';
import { useNewsContext } from '../context/NewsContext';
import { uploadImage, deleteImage } from '../services/storageService'; 
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

// Define the maximum size (100 MB) for validation
const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; 

const AdminDashboard = () => {
  // AUTH HOOKS
  const { logout } = useAuth();
  const navigate = useNavigate();

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
  const [featuredNews, setFeaturedNews] = useState(initialFeatured || {id: 1, title: '', excerpt: '', date: '', category: '', readTime: '', imageUrl: ''});
  const [recentNews, setRecentNews] = useState(initialRecent || []);
  const [upcomingEvents, setUpcomingEvents] = useState(initialEvents || []);
  const [isUploading, setIsUploading] = useState(false); 

  // Refs for file inputs 
  const featuredImageInputRef = useRef(null);
  const recentImageInputRefs = useRef({});

  // Sync local state when context data changes
  useEffect(() => {
    // Only update if initialFeatured is not null/undefined
    if (initialFeatured) {
        setFeaturedNews(initialFeatured);
    }
  }, [initialFeatured]);

  useEffect(() => {
    if (initialRecent) {
        setRecentNews(initialRecent);
    }
  }, [initialRecent]);

  useEffect(() => {
    if (initialEvents) {
        setUpcomingEvents(initialEvents);
    }
  }, [initialEvents]);

  // UPDATED FUNCTION: Uploads file to Supabase and gets URL
  const handleImageUpload = async (file, section, id = null) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      alert('Image size must be less than 100MB');
      return;
    }

    setIsUploading(true);
    let folder = section === 'featured' ? 'featured' : 'recent_news';
    
    // Call the external upload service
    const imageUrl = await uploadImage(file, folder); 

    setIsUploading(false);

    if (imageUrl) {
      // Update local state with the permanent URL
      if (section === 'featured') {
        setFeaturedNews(prev => ({ ...prev, imageUrl }));
      } else if (section === 'news' && id) {
        setRecentNews(prev => 
          prev.map(item => item.id === id ? { ...item, imageUrl } : item)
        );
      }
    }
  };

  // UPDATED FUNCTION: Handles deletion from storage first
  const handleRemoveImage = async (section, id = null) => {
    let currentItem;

    if (section === 'featured') {
        currentItem = featuredNews;
    } else if (section === 'news' && id) {
        currentItem = recentNews.find(item => item.id === id);
    }

    if (!currentItem || !currentItem.imageUrl) return;

    // Delete from Supabase Storage
    const deleteSuccessful = await deleteImage(currentItem.imageUrl);

    if (deleteSuccessful) {
        // Clear URL from state upon successful deletion
        if (section === 'featured') {
            setFeaturedNews(prev => ({ ...prev, imageUrl: "", image: "" }));
        } else if (section === 'news' && id) {
            setRecentNews(prev => 
                prev.map(item => item.id === id ? { ...item, imageUrl: "", image: "" } : item)
            );
        }
        alert('Image removed successfully.');
    } else {
        alert('Failed to remove image from storage.');
    }
  };

  // Handle input changes (This feeds the local state used in handleSave)
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

  // CRITICAL FIX: Unified Save Function
  const handleSave = (itemToSave, section) => {
    if (section === 'events') {
        updateEvent(itemToSave);
    } else {
        updateNews(itemToSave); 
    }
    console.log(`Saved ${section}:`, itemToSave);
    // In a real app, use a Toast/Sonner for better UX
    alert(`Saved: ${itemToSave.title}`); 
  };

  // Add new article
  const handleAddNewArticle = () => {
    const newArticle = {
      id: Date.now(), // Use unique ID generator in real life
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
      id: Date.now(), // Use unique ID generator in real life
      title: "New Event Title",
      date: new Date().toLocaleDateString(),
      time: "TBD",
      location: "Virtual",
      description: "Event details...",
      type: "Meeting"
    };
    addEvent(newEvent);
  };

  // NEW LOGOUT HANDLER
  const handleLogout = () => {
    logout();
    // Force a full browser reload to clear application state completely
    window.location.replace('/'); 
  };


  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Dashboard Header */}
      <header className="bg-blue-600 text-white py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">VMP Content Dashboard</h1>
            <p className="mt-1 opacity-90">Manage all news articles, media, and upcoming events for the website.</p>
          </div>
          {/* LOGOUT BUTTON */}
          <Button variant="secondary" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
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
                    {isUploading ? (
                      <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-3" />
                    ) : (
                      <Image className="h-12 w-12 text-gray-400 mb-3" />
                    )}
                    
                    <p className="text-sm text-gray-600 mb-3">Upload an image for the featured story</p>
                    <input
                      ref={featuredImageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e.target.files[0], 'featured')}
                      disabled={isUploading}
                    />
                    <Button
                      variant="outline"
                      onClick={() => featuredImageInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? 'Uploading...' : <Upload className="h-4 w-4 mr-2" />}
                      {isUploading ? 'Please Wait' : 'Choose Image'}
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
              {/* Using the clean handleSave function */}
              <Button onClick={() => handleSave(featuredNews, 'news')} className="w-full">
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
                            disabled={isUploading}
                          />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => recentImageInputRefs.current[article.id]?.click()}
                          disabled={isUploading}
                        >
                          {isUploading ? 'Uploading...' : <Image className="h-4 w-4 mr-2" />}
                          {isUploading ? 'Please Wait' : 'Add Image'}
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
                    {/* Using the clean handleSave function */}
                    <Button variant="secondary" size="sm" onClick={() => handleSave(article, 'news')}>
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
                    {/* Using the clean handleSave function */}
                    <Button variant="secondary" size="sm" onClick={() => handleSave(event, 'events')}>
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
                Images are uploaded to cloud storage (via Supabase Storage) and saved as a permanent URL.
              </p>
              <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                <p className="font-medium text-blue-900">Supported formats:</p>
                <p className="text-blue-700">JPG, PNG, GIF, WebP</p>
                <p className="font-medium text-blue-900 mt-2">Max size: 100MB</p> 
              </div>
              <div className="mt-3 p-3 bg-red-50 rounded text-sm">
                <p className="font-medium text-red-900">⚠️ Action Required:</p>
                <p className="text-red-700">You must configure your Supabase URL and Key in `src/services/storageService.js` before uploads work.</p>
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