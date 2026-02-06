export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface Mission {
  id: number;
  title: string;
  location?: string;
  description?: string;
  content?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  start_date?: string;
  end_date?: string;
  cover_image?: string;
  images?: string[];
  stats?: { label: string; value: string }[];
  report_file?: string;
  report_summary?: string;
  created_at?: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description?: string;
  status: 'active' | 'completed' | 'planned';
  cover_image?: string;
  start_date?: string;
  end_date?: string;
  featured: boolean;
  created_at?: string;
}

export interface GalleryItem {
  id: number;
  title?: string;
  category: string;
  image_url: string;
  description?: string;
  mission_id?: number;
  project_id?: number;
  featured: boolean;
  created_at?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  category: 'news' | 'event';
  date?: string;
  created_at?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role?: string;
  photo_url?: string;
  bio?: string;
  email?: string;
  phone?: string;
  social_links?: { platform: string; url: string }[];
  display_order: number;
  active: boolean;
  created_at?: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  status: 'draft' | 'published';
  mission_id?: number;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}
