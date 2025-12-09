import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, Image, Upload, X, Loader2, LogOut, Camera, MapPin, Calendar, Users, FileText } from "lucide-react"; 
import React, { useState, useRef, useEffect } from 'react';

// Simulated storage service (replace with actual Supabase implementation)
const uploadImage = async (file, folder) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      resolve(url);
    }, 1500);
  });
};

const deleteImage = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 500);
  });
};

const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024;

const EnhancedAdminDashboard = () => {
  // Simulated context data
  const [featuredNews, setFeaturedNews] = useState({
    id: 1, 
    title: 'Breaking: New Veterinary Clinic Opens in Nairobi', 
    excerpt: 'A state-of-the-art veterinary facility brings hope to underserved communities',
    date: 'Nov 15, 2024',
    category: 'Milestone',
    readTime: '3 min read',
    imageUrl: ''
  });

  const [recentNews, setRecentNews] = useState([
    {
      id: 2,
      title: "Community Outreach Success",
      excerpt: "Over 200 animals treated in recent mission",
      date: "Nov 10, 2024",
      category: "Mission",
      readTime: "2 min read",
      imageUrl: ""
    }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "Volunteer Training",
      date: "Dec 5, 2024",
      time: "9:00 AM",
      location: "Main Office",
      description: "Orientation for new volunteers",
      type: "Training"
    }
  ]);

  const [galleries, setGalleries] = useState([
    {
      id: 1,
      title: "Kenya Mission 2024",
      location: "Nakuru, Kenya",
      date: "March 2024",
      imageCount: 24,
      description: "Providing livestock care to rural farming communities",
      category: "Medical Care",
      featured: true,
      url: "https://photos.app.goo.gl/example",
      coverImage: ""
    }
  ]);

  const [missions, setMissions] = useState([
    {
      id: 1,
      year: "2025",
      title: "Mataarba Mission",
      location: "Mataarba Community",
      date: "July 15-22, 2025",
      team: "12 volunteers",
      description: "Provided essential veterinary care and spiritual support",
      reportUrl: "",
      reportFile: null
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('news'); // news, gallery, missions
  
  const featuredImageInputRef = useRef(null);
  const recentImageInputRefs = useRef({});
  const galleryImageInputRefs = useRef({});
  const missionReportInputRefs = useRef({});

  // Real-time image upload handler
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
    let folder = section === 'featured' ? 'featured' : section === 'gallery' ? 'gallery' : 'recent_news';
    
    const imageUrl = await uploadImage(file, folder);
    setIsUploading(false);

    if (imageUrl) {
      if (section === 'featured') {
        setFeaturedNews(prev => ({ ...prev, imageUrl }));
      } else if (section === 'news' && id) {
        setRecentNews(prev => 
          prev.map(item => item.id === id ? { ...item, imageUrl } : item)
        );
      } else if (section === 'gallery' && id) {
        setGalleries(prev =>
          prev.map(item => item.id === id ? { ...item, coverImage: imageUrl } : item)
        );
      }
    }
  };

  // Report file upload handler
  const handleReportUpload = async (file, missionId) => {
    if (!file) return;

    if (!file.type.includes('pdf') && !file.type.includes('document')) {
      alert('Please upload a PDF or document file');
      return;
    }

    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      const reportUrl = URL.createObjectURL(file);
      setMissions(prev =>
        prev.map(item => item.id === missionId ? { ...item, reportUrl, reportFile: file.name } : item)
      );
      setIsUploading(false);
      alert('Report uploaded successfully!');
    }, 1500);
  };

  const handleRemoveImage = async (section, id = null) => {
    let currentItem;

    if (section === 'featured') {
      currentItem = featuredNews;
    } else if (section === 'news' && id) {
      currentItem = recentNews.find(item => item.id === id);
    } else if (section === 'gallery' && id) {
      currentItem = galleries.find(item => item.id === id);
    }

    if (!currentItem || !currentItem.imageUrl && !currentItem.coverImage) return;

    const deleteSuccessful = await deleteImage(currentItem.imageUrl || currentItem.coverImage);

    if (deleteSuccessful) {
      if (section === 'featured') {
        setFeaturedNews(prev => ({ ...prev, imageUrl: "" }));
      } else if (section === 'news' && id) {
        setRecentNews(prev => 
          prev.map(item => item.id === id ? { ...item, imageUrl: "" } : item)
        );
      } else if (section === 'gallery' && id) {
        setGalleries(prev =>
          prev.map(item => item.id === id ? { ...item, coverImage: "" } : item)
        );
      }
      alert('Image removed successfully.');
    }
  };

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
    } else if (section === 'gallery') {
      setGalleries(prev =>
        prev.map(item => item.id === id ? { ...item, [field]: value } : item)
      );
    } else if (section === 'missions') {
      setMissions(prev =>
        prev.map(item => item.id === id ? { ...item, [field]: value } : item)
      );
    }
  };

  const handleSave = (itemToSave, section) => {
    console.log(`Saved ${section}:`, itemToSave);
    alert(`Saved: ${itemToSave.title}`);
  };

  const handleAddNewArticle = () => {
    const newArticle = {
      id: Date.now(),
      title: "New Draft Article",
      excerpt: "Write a brief summary here...",
      date: new Date().toLocaleDateString(),
      category: "Milestone",
      readTime: "1 min read",
      imageUrl: ""
    };
    setRecentNews(prev => [...prev, newArticle]);
  };

  const handleAddNewEvent = () => {
    const newEvent = {
      id: Date.now(),
      title: "New Event Title",
      date: new Date().toLocaleDateString(),
      time: "TBD",
      location: "Virtual",
      description: "Event details...",
      type: "Meeting"
    };
    setUpcomingEvents(prev => [...prev, newEvent]);
  };

  const handleAddNewGallery = () => {
    const newGallery = {
      id: Date.now(),
      title: "New Gallery",
      location: "Location",
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      imageCount: 0,
      description: "Gallery description...",
      category: "Mission",
      featured: false,
      url: "",
      coverImage: ""
    };
    setGalleries(prev => [...prev, newGallery]);
  };

  const handleAddNewMission = () => {
    const newMission = {
      id: Date.now(),
      year: new Date().getFullYear().toString(),
      title: "New Mission",
      location: "Location",
      date: "Month Day-Day, Year",
      team: "0 volunteers",
      description: "Mission description...",
      reportUrl: "",
      reportFile: null
    };
    setMissions(prev => [...prev, newMission]);
  };

  const handleDeleteItem = (id, section) => {
    if (section === 'news') {
      setRecentNews(prev => prev.filter(item => item.id !== id));
    } else if (section === 'events') {
      setUpcomingEvents(prev => prev.filter(item => item.id !== id));
    } else if (section === 'gallery') {
      setGalleries(prev => prev.filter(item => item.id !== id));
    } else if (section === 'missions') {
      setMissions(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Header */}
      <header className="bg-blue-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">VMP Content Dashboard</h1>
            <p className="mt-1 opacity-90">Manage news, gallery, missions, and events</p>
          </div>
          <Button variant="secondary">
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 py-4">
            <Button
              variant={activeTab === 'news' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('news')}
            >
              News & Events
            </Button>
            <Button
              variant={activeTab === 'gallery' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('gallery')}
            >
              <Camera className="h-4 w-4 mr-2" />
              Gallery
            </Button>
            <Button
              variant={activeTab === 'missions' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('missions')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Mission Reports
            </Button>
        </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* NEWS & EVENTS TAB */}
        {activeTab === 'news' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Featured Article */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Story</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <label className="block text-sm font-medium mb-2">Featured Image</label>
                    {featuredNews.imageUrl ? (
                      <div className="relative">
                        <img 
                          src={featuredNews.imageUrl} 
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
                        <p className="text-sm text-gray-600 mb-3">Upload featured image</p>
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
                  <Button onClick={() => handleSave(featuredNews, 'news')} className="w-full">
                    <Save className="h-4 w-4 mr-2" /> Save Featured Article
                  </Button>
                </CardContent>
              </Card>

              {/* Recent News */}
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
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-3">
                        {article.imageUrl ? (
                          <div className="relative">
                            <img 
                              src={article.imageUrl} 
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
                        <Button variant="secondary" size="sm" onClick={() => handleSave(article, 'news')}>
                          <Save className="h-4 w-4 mr-2" /> Save
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(article.id, 'news')}>
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Upcoming Events ({upcomingEvents.length})</CardTitle>
                  <Button size="sm" variant="outline" onClick={handleAddNewEvent}>
                    <Plus className="h-4 w-4 mr-2" /> New
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
                        <Button variant="secondary" size="sm" onClick={() => handleSave(event, 'events')}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(event.id, 'events')}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gallery Management</h2>
              <Button onClick={handleAddNewGallery}>
                <Plus className="h-4 w-4 mr-2" /> New Gallery
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery) => (
                <Card key={gallery.id} className="overflow-hidden">
                  <div className="h-48 relative bg-gray-100">
                    {gallery.coverImage ? (
                      <>
                        <img 
                          src={gallery.coverImage} 
                          alt={gallery.title} 
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => handleRemoveImage('gallery', gallery.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <input
                          ref={el => galleryImageInputRefs.current[gallery.id] = el}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e.target.files[0], 'gallery', gallery.id)}
                          disabled={isUploading}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => galleryImageInputRefs.current[gallery.id]?.click()}
                          disabled={isUploading}
                        >
                          {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Camera className="h-4 w-4 mr-2" />}
                          {isUploading ? 'Uploading...' : 'Upload Cover'}
                        </Button>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <Input 
                      value={gallery.title} 
                      onChange={(e) => handleInputChange(gallery.id, 'gallery', 'title', e.target.value)}
                      placeholder="Gallery Title" 
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        value={gallery.location} 
                        onChange={(e) => handleInputChange(gallery.id, 'gallery', 'location', e.target.value)}
                        placeholder="Location" 
                      />
                      <Input 
                        value={gallery.date} 
                        onChange={(e) => handleInputChange(gallery.id, 'gallery', 'date', e.target.value)}
                        placeholder="Date" 
                      />
                    </div>
                    <Input 
                      value={gallery.category} 
                      onChange={(e) => handleInputChange(gallery.id, 'gallery', 'category', e.target.value)}
                      placeholder="Category" 
                    />
                    <Input 
                      type="number"
                      value={gallery.imageCount} 
                      onChange={(e) => handleInputChange(gallery.id, 'gallery', 'imageCount', e.target.value)}
                      placeholder="Image Count" 
                    />
                    <Input 
                      value={gallery.url} 
                      onChange={(e) => handleInputChange(gallery.id, 'gallery', 'url', e.target.value)}
                      placeholder="Google Photos Link" 
                    />
                    <Textarea 
                      value={gallery.description} 
                      onChange={(e) => handleInputChange(gallery.id, 'gallery', 'description', e.target.value)}
                      placeholder="Description"
                      rows={2}
                    />
                    <div className="flex items-center gap-2">
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={gallery.featured}
                          onChange={(e) => handleInputChange(gallery.id, 'gallery', 'featured', e.target.checked)}
                          className="mr-2"
                        />
                        Featured
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm" className="flex-1" onClick={() => handleSave(gallery, 'gallery')}>
                        <Save className="h-4 w-4 mr-2" /> Save
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(gallery.id, 'gallery')}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* MISSIONS TAB */}
        {activeTab === 'missions' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mission Reports</h2>
              <Button onClick={handleAddNewMission}>
                <Plus className="h-4 w-4 mr-2" /> New Mission
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {missions.map((mission) => (
                <Card key={mission.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{mission.year}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(mission.id, 'missions')}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <Input 
                      value={mission.title} 
                      onChange={(e) => handleInputChange(mission.id, 'missions', 'title', e.target.value)}
                      placeholder="Mission Title"
                      className="font-semibold text-lg"
                    />
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
                        <Input 
                          value={mission.location} 
                          onChange={(e) => handleInputChange(mission.id, 'missions', 'location', e.target.value)}
                          placeholder="Location"
                          className="flex-1"
                        />
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
                        <Input 
                          value={mission.date} 
                          onChange={(e) => handleInputChange(mission.id, 'missions', 'date', e.target.value)}
                          placeholder="Date Range"
                          className="flex-1"
                        />
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Users className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
                        <Input 
                          value={mission.team} 
                          onChange={(e) => handleInputChange(mission.id, 'missions', 'team', e.target.value)}
                          placeholder="Team Size"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <Textarea 
                      value={mission.description} 
                      onChange={(e) => handleInputChange(mission.id, 'missions', 'description', e.target.value)}
                      placeholder="Mission Description"
                      rows={3}
                      className="resize-none"
                    />

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <label className="block text-sm font-medium mb-2 flex items-center">
                        {/* FIX APPLIED: Added the missing closing slash (/) to the FileText component */}
                        <FileText className="h-4 w-4 mr-2" />
                        Mission Report File
                      </label>
                      
                      {mission.reportFile ? (
                        <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                          <span className="text-sm truncate">{mission.reportFile}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleInputChange(mission.id, 'missions', 'reportFile', null)}
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <input
                            ref={el => missionReportInputRefs.current[mission.id] = el}
                            type="file"
                            accept=".pdf, .doc, .docx"
                            className="hidden"
                            onChange={(e) => handleReportUpload(e.target.files[0], mission.id)}
                            disabled={isUploading}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => missionReportInputRefs.current[mission.id]?.click()}
                            disabled={isUploading}
                          >
                            {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                            {isUploading ? 'Uploading...' : 'Upload Report'}
                          </Button>
                        </div>
                      )}
                    </div>

                    <Button onClick={() => handleSave(mission, 'missions')} className="w-full">
                      <Save className="h-4 w-4 mr-2" /> Save Mission
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EnhancedAdminDashboard;