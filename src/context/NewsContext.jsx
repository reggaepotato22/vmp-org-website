import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

// Local Storage Keys
const STORAGE_KEYS = {
  FEATURED: 'vmp_featured_news',
  RECENT: 'vmp_recent_news',
  EVENTS: 'vmp_upcoming_events',
};

// Define initial mock data structure
const initialFeaturedNews = {
  id: 'featured',
  title: "VMP Website launched",
  excerpt: "Reflecting on over a decade of transforming communities through faith-based veterinary care, with over 10,000 animals treated across 25+ countries.",
  date: "1st October 2025",
  category: "Milestone",
  image: "/src/assets/vmphotos/calf.jpg",
  imageUrl: "", // For uploaded images
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
    link: "/missions/mataarba/mataarba-2025",
    imageUrl: "", // For uploaded images
  },
  {
    id: 2,
    title: "Partnership with Local Veterinary Schools",
    excerpt: "VMP announces collaborative training programs with veterinary institutions in Maasai Mara University.",
    date: "February 28, 2024", 
    category: "Partnership",
    readTime: "4 min read",
    imageUrl: "", // For uploaded images
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
  // Initialize state from localStorage or use defaults
  const [featuredNews, setFeaturedNews] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FEATURED);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved featured news:', e);
        return initialFeaturedNews;
      }
    }
    return initialFeaturedNews;
  });

  const [recentNews, setRecentNews] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RECENT);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved recent news:', e);
        return initialRecentNews;
      }
    }
    return initialRecentNews;
  });

  const [upcomingEvents, setUpcomingEvents] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved events:', e);
        return initialUpcomingEvents;
      }
    }
    return initialUpcomingEvents;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FEATURED, JSON.stringify(featuredNews));
      console.log('✅ Featured news saved to localStorage');
    } catch (e) {
      console.error('Error saving featured news:', e);
    }
  }, [featuredNews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recentNews));
      console.log('✅ Recent news saved to localStorage');
    } catch (e) {
      console.error('Error saving recent news:', e);
    }
  }, [recentNews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(upcomingEvents));
      console.log('✅ Events saved to localStorage');
    } catch (e) {
      console.error('Error saving events:', e);
    }
  }, [upcomingEvents]);

  // --- NEWS CRUD OPERATIONS ---
  const updateNews = (updatedArticle) => {
    console.log('📝 Updating news:', updatedArticle);
    if (updatedArticle.id === 'featured') {
      setFeaturedNews(updatedArticle);
    } else {
      setRecentNews(prev => 
        prev.map(item => item.id === updatedArticle.id ? updatedArticle : item)
      );
    }
  };

  const addNews = (newArticle) => {
    console.log('➕ Adding news:', newArticle);
    setRecentNews(prev => [{...newArticle, id: Date.now()}, ...prev]);
  };

  const deleteNews = (id) => {
    console.log('🗑️ Deleting news:', id);
    setRecentNews(prev => prev.filter(item => item.id !== id));
  };

  // --- EVENTS CRUD OPERATIONS ---
  const updateEvent = (updatedEvent) => {
    console.log('📝 Updating event:', updatedEvent);
    setUpcomingEvents(prev => 
      prev.map(item => item.id === updatedEvent.id ? updatedEvent : item)
    );
  };
  
  const addEvent = (newEvent) => {
    console.log('➕ Adding event:', newEvent);
    setUpcomingEvents(prev => [...prev, {...newEvent, id: Date.now()}]);
  };

  const deleteEvent = (id) => {
    console.log('🗑️ Deleting event:', id);
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