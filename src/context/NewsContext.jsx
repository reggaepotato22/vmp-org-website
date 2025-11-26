import React, { createContext, useContext, useState, useMemo } from 'react';

// Define initial mock data structure
const initialFeaturedNews = {
  id: 'featured',
  title: "VMP Website launched",
  excerpt: "Reflecting on over a decade of transforming communities through faith-based veterinary care, with over 10,000 animals treated across 25+ countries.",
  date: "1st October 2025",
  category: "Milestone",
  image: "/src/assets/vmphotos/calf.jpg",
  readTime: "∞",
  link: "kenyavetsmission.org",
};

const initialRecentNews = [
  {
    id: 1,
    title: "Mataarba Mission",
    excerpt: "Provided essential veterinary care and spiritual support to the Mataarba community with comprehensive animal health services.",
    date: "July 15-22, 2025",
    category: "Mission Report",
    readTime: "5 min read",
    link: "/missions/mataarba/mataarba-2025"
  },
  {
    id: 2,
    title: "Partnership with Local Veterinary Schools",
    excerpt: "VMP announces collaborative training programs with veterinary institutions in Maasai Mara University.",
    date: "February 28, 2024", 
    category: "Partnership",
    readTime: "4 min read"
  },
];

const initialUpcomingEvents = [
  {
    id: 101,
    title: "Annual VMP Fundraising Gala",
    date: "May 18, 2024",
    time: "6:00 PM",
    location: "Ole Sereni, Southern Bypass",
    description: "Join us for an evening of celebration, fellowship, and fundraising for our global missions.",
    type: "Fundraiser"
  },
  {
    id: 102,
    title: "Volunteer Training Workshop",
    date: "April 22, 2024", 
    time: "9:00 AM - 4:00 PM",
    location: "VMP Headquarters",
    description: "Comprehensive training for new volunteers preparing for international missions.",
    type: "Training"
  },
];

const NewsContext = createContext();

export const useNewsContext = () => {
  return useContext(NewsContext);
};

export const NewsProvider = ({ children }) => {
  const [featuredNews, setFeaturedNews] = useState(initialFeaturedNews);
  const [recentNews, setRecentNews] = useState(initialRecentNews);
  const [upcomingEvents, setUpcomingEvents] = useState(initialUpcomingEvents);

  // --- NEWS CRUD OPERATIONS ---
  const updateNews = (updatedArticle) => {
    if (updatedArticle.id === 'featured') {
      setFeaturedNews(updatedArticle);
    } else {
      setRecentNews(prev => 
        prev.map(item => item.id === updatedArticle.id ? updatedArticle : item)
      );
    }
  };

  const addNews = (newArticle) => {
    setRecentNews(prev => [{...newArticle, id: Date.now()}, ...prev]);
  };

  const deleteNews = (id) => {
    setRecentNews(prev => prev.filter(item => item.id !== id));
  };

  // --- EVENTS CRUD OPERATIONS ---
  const updateEvent = (updatedEvent) => {
    setUpcomingEvents(prev => 
      prev.map(item => item.id === updatedEvent.id ? updatedEvent : item)
    );
  };
  
  const addEvent = (newEvent) => {
    setUpcomingEvents(prev => [...prev, {...newEvent, id: Date.now()}]);
  };

  const deleteEvent = (id) => {
    setUpcomingEvents(prev => prev.filter(item => item.id !== id));
  };

  // Context value memoized to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    featuredNews,
    recentNews,
    upcomingEvents,
    updateNews,
    addNews,
    deleteNews,
    updateEvent,
    addEvent,
    deleteEvent,
  }), [featuredNews, recentNews, upcomingEvents]);

  return (
    <NewsContext.Provider value={contextValue}>
      {children}
    </NewsContext.Provider>
  );
};