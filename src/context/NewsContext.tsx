import React, { createContext, useContext, useState, useEffect } from 'react';

// Interfaces
export interface NewsItem {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  imageUrl?: string;
  readTime?: string;
  link?: string;
  author?: string;
  status?: 'Draft' | 'Published';
  body?: string; // Rich Text placeholder
}

export interface EventItem {
  id: string | number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: string;
}

interface NewsContextType {
  featuredNews: NewsItem;
  recentNews: NewsItem[];
  upcomingEvents: EventItem[];
  addNews: (item: NewsItem) => void;
  updateNews: (item: NewsItem) => void;
  deleteNews: (id: string | number) => void;
  addEvent: (item: EventItem) => void;
  updateEvent: (item: EventItem) => void;
  deleteEvent: (id: string | number) => void;
  updateFeaturedNews: (item: NewsItem) => void;
}

// Local Storage Keys
const STORAGE_KEYS = {
  FEATURED: 'vmp_featured_news',
  RECENT: 'vmp_recent_news',
  EVENTS: 'vmp_upcoming_events',
};

// Initial Mock Data
const initialFeaturedNews: NewsItem = {
  id: 'featured',
  title: "VMP Website launched",
  excerpt: "Reflecting on over a decade of transforming communities through faith-based veterinary care, with over 10,000 animals treated across 25+ countries.",
  date: "1st October 2025",
  category: "Milestone",
  image: "/src/assets/vmphotos/calf.jpg",
  imageUrl: "",
  readTime: "∞",
  link: "kenyavetsmission.org",
  author: "Admin",
  status: "Published",
  body: "<p>Reflecting on over a decade of transforming communities...</p>"
};

const initialRecentNews: NewsItem[] = [
  {
    id: 1,
    title: "Mataarba Mission",
    excerpt: "Provided essential veterinary care and spiritual support to the Mataarba community with comprehensive animal health services.",
    date: "July 15-22, 2025",
    category: "Mission Report",
    readTime: "5 min read",
    link: "/missions/mataarba/mataarba-2025",
    imageUrl: "",
    author: "Dr. John Doe",
    status: "Published",
    body: "<p>Full report on the Mataarba Mission...</p>"
  },
  {
    id: 2,
    title: "Partnership with Local Veterinary Schools",
    excerpt: "VMP announces collaborative training programs with veterinary institutions in Maasai Mara University.",
    date: "February 28, 2024", 
    category: "Partnership",
    readTime: "4 min read",
    imageUrl: "",
    author: "Jane Smith",
    status: "Published",
    body: "<p>Details about the new partnership...</p>"
  },
];

const initialUpcomingEvents: EventItem[] = [
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

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext must be used within a NewsProvider');
  }
  return context;
};

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state
  const [featuredNews, setFeaturedNews] = useState<NewsItem>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FEATURED);
    return saved ? JSON.parse(saved) : initialFeaturedNews;
  });

  const [recentNews, setRecentNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RECENT);
    return saved ? JSON.parse(saved) : initialRecentNews;
  });

  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return saved ? JSON.parse(saved) : initialUpcomingEvents;
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEATURED, JSON.stringify(featuredNews));
  }, [featuredNews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recentNews));
  }, [recentNews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(upcomingEvents));
  }, [upcomingEvents]);

  // Actions
  const updateFeaturedNews = (item: NewsItem) => {
    setFeaturedNews(item);
  };

  const addNews = (item: NewsItem) => {
    setRecentNews(prev => [item, ...prev]);
  };

  const updateNews = (updatedItem: NewsItem) => {
    setRecentNews(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const deleteNews = (id: string | number) => {
    setRecentNews(prev => prev.filter(item => item.id !== id));
  };

  const addEvent = (item: EventItem) => {
    setUpcomingEvents(prev => [...prev, item]);
  };

  const updateEvent = (updatedItem: EventItem) => {
    setUpcomingEvents(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const deleteEvent = (id: string | number) => {
    setUpcomingEvents(prev => prev.filter(item => item.id !== id));
  };

  return (
    <NewsContext.Provider value={{
      featuredNews,
      recentNews,
      upcomingEvents,
      addNews,
      updateNews,
      deleteNews,
      addEvent,
      updateEvent,
      deleteEvent,
      updateFeaturedNews
    }}>
      {children}
    </NewsContext.Provider>
  );
};
