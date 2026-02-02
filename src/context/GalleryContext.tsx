import React, { createContext, useContext, useState, useEffect } from 'react';

export interface GalleryItem {
  id: string | number;
  title: string; // Renamed from caption to match requirements
  coverImage: string; // Renamed from src
  type: 'internal' | 'external'; // New field
  category: string;
  description?: string;
  missionId?: string;
  date?: string;
  externalLink?: string; // For external type
  internalImages?: string[]; // For internal type
}

const initialGallery: GalleryItem[] = [
  {
    id: 1,
    title: "Veterinary check-ups in Turkana",
    coverImage: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800",
    type: 'internal',
    category: "Missions",
    description: "Our team provided comprehensive veterinary check-ups for livestock in the remote Turkana region.",
    date: "2024-03-15",
    internalImages: [
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 2,
    title: "Community education session",
    coverImage: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=800",
    type: 'internal',
    category: "Community",
    description: "Educating the local community on sustainable animal husbandry practices.",
    date: "2024-02-10"
  },
  {
    id: 3,
    title: "Treatment of livestock",
    coverImage: "https://images.unsplash.com/photo-1628009368231-76033527212e?auto=format&fit=crop&q=80&w=800",
    type: 'external',
    category: "Missions",
    description: "External album example.",
    date: "2024-01-20",
    externalLink: "https://photos.google.com/share/..."
  }
];

interface GalleryContextType {
  gallery: GalleryItem[];
  addPhoto: (photo: Omit<GalleryItem, "id">) => void;
  deletePhoto: (id: string | number) => void;
  getGalleryItem: (id: string | number) => GalleryItem | undefined;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('vmp_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  useEffect(() => {
    localStorage.setItem('vmp_gallery', JSON.stringify(gallery));
  }, [gallery]);

  const addPhoto = (photo: Omit<GalleryItem, "id">) => {
    const newPhoto = { ...photo, id: Date.now() };
    setGallery([newPhoto, ...gallery]);
  };

  const deletePhoto = (id: string | number) => {
    setGallery(gallery.filter(item => item.id !== id));
  };

  const getGalleryItem = (id: string | number) => {
    return gallery.find(item => item.id == id);
  };

  return (
    <GalleryContext.Provider value={{ gallery, addPhoto, deletePhoto, getGalleryItem }}>
      {children}
    </GalleryContext.Provider>
  );
};
