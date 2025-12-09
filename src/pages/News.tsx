// src/context/NewsContext.jsx
import React, { createContext, useState, useContext } from 'react';

const NewsContext = createContext();

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext must be used within a NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  // Featured News State
  const [featuredNews, setFeaturedNews] = useState({
    id: 1,
    title: "Breaking: New Veterinary Clinic Opens in Nairobi",
    excerpt: "A state-of-the-art veterinary facility brings hope to underserved communities across Kenya.",
    date: "Nov 15, 2024",
    category: "Milestone",
    readTime: "3 min read",
    imageUrl: "",
    image: ""
  });

  // Recent News State
  const [recentNews, setRecentNews] = useState([
    {
      id: 2,
      title: "Community Outreach Success",
      excerpt: "Over 200 animals treated in recent mission to rural communities.",
      date: "Nov 10, 2024",
      category: "Mission Report",
      readTime: "2 min read",
      link: "",
      imageUrl: "",
      image: ""
    }
  ]);

  // Upcoming Events State
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "Volunteer Training Workshop",
      date: "Dec 5, 2024",
      time: "9:00 AM",
      location: "Main Office, Nairobi",
      description: "Comprehensive orientation for new volunteers joining our mission.",
      type: "Training"
    }
  ]);

  // Gallery State
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
      url: "https://photos.app.goo.gl/Npm53WWZd6wM8wL19",
      coverImage: "",
      image: ""
    }
  ]);

  // Missions State
  const [missions, setMissions] = useState([
    {
      id: 1,
      year: "2025",
      title: "Mataarba Mission",
      location: "Mataarba Community",
      date: "July 15-22, 2025",
      team: "12 volunteers",
      reports: 1,
      description: "Provided essential veterinary care and spiritual support to the Mataarba community with comprehensive animal health services.",
      reportUrl: "",
      reportFile: null
    },
    {
      id: 2,
      year: "2024",
      title: "Turkana Outreach",
      location: "Turkana County",
      date: "September 10-17, 2024",
      team: "15 volunteers",
      reports: 2,
      description: "Large scale veterinary mission focusing on livestock health and community education programs.",
      reportUrl: "",
      reportFile: null
    }
  ]);

  // News Functions
  const updateNews = (updatedNews) => {
    if (updatedNews.id === featuredNews.id) {
      setFeaturedNews(updatedNews);
    } else {
      setRecentNews(prev => 
        prev.map(item => item.id === updatedNews.id ? updatedNews : item)
      );
    }
  };

  const addNews = (newNews) => {
    setRecentNews(prev => [...prev, newNews]);
  };

  const deleteNews = (id) => {
    setRecentNews(prev => prev.filter(item => item.id !== id));
  };

  // Event Functions
  const updateEvent = (updatedEvent) => {
    setUpcomingEvents(prev =>
      prev.map(item => item.id === updatedEvent.id ? updatedEvent : item)
    );
  };

  const addEvent = (newEvent) => {
    setUpcomingEvents(prev => [...prev, newEvent]);
  };

  const deleteEvent = (id) => {
    setUpcomingEvents(prev => prev.filter(item => item.id !== id));
  };

  // Gallery Functions
  const updateGallery = (updatedGallery) => {
    setGalleries(prev =>
      prev.map(item => item.id === updatedGallery.id ? updatedGallery : item)
    );
  };

  const addGallery = (newGallery) => {
    setGalleries(prev => [...prev, newGallery]);
  };

  const deleteGallery = (id) => {
    setGalleries(prev => prev.filter(item => item.id !== id));
  };

  // Mission Functions
  const updateMission = (updatedMission) => {
    setMissions(prev =>
      prev.map(item => item.id === updatedMission.id ? updatedMission : item)
    );
  };

  const addMission = (newMission) => {
    setMissions(prev => [...prev, newMission]);
  };

  const deleteMission = (id) => {
    setMissions(prev => prev.filter(item => item.id !== id));
  };

  const value = {
    // News
    featuredNews,
    recentNews,
    updateNews,
    addNews,
    deleteNews,
    // Events
    upcomingEvents,
    updateEvent,
    addEvent,
    deleteEvent,
    // Gallery
    galleries,
    updateGallery,
    addGallery,
    deleteGallery,
    // Missions
    missions,
    updateMission,
    addMission,
    deleteMission
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsContext;