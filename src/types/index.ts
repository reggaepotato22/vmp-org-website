export interface NewsItem {
  id: string;
  title: string;
  content: string;
  image_url: string;
  category: 'news' | 'event';
  date: string;
  created_at?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  start_date: string;
  end_date: string;
  cover_image: string;
  images: string[];
  report_file?: string;
  report_summary?: string;
  stats?: {
    treated: string | number;
    value: string | number;
    bibles: string | number;
  };
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  description?: string;
  featured?: boolean;
  mission_id?: string;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image_url: string;
  rating: number;
  created_at?: string;
}

export interface SiteSettings {
  hero_slides: HeroSlide[];
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  order_index: number;
  active: boolean;
}
