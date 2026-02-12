export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  order_index: number;
  active: boolean;
}

export interface Stat {
  id: string;
  label: string;
  value: string; // e.g., "120+"
  suffix?: string;
}

export interface ServiceCard {
  id: string;
  number: string; // "01"
  title: string;
  image: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string; // Short description
  image: string;
  link: string;
  ctaText?: string;
}

export interface ProgramItem {
  id: string;
  text: string;
}

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
  content?: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  start_date: string;
  end_date: string;
  cover_image: string;
  images: string[];
  report_file?: string;
  report_summary?: string;
  gallery_link?: string;
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
  external_link?: string;
  featured?: boolean;
  mission_id?: string;
  created_at?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  order_index?: number;
  active?: boolean;
  social_links?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
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

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website_url: string;
  order_index: number;
  active: boolean;
}

export interface SiteSettings {
  hero_slides: HeroSlide[];
  partners: Partner[];
  testimonials: Testimonial[];
  id?: string;
  site_name?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  features?: {
    showDonations?: boolean;
    showMissions?: boolean;
    showGallery?: boolean;
    showTestimonials?: boolean;
    showNews?: boolean;
    showProjects?: boolean;
  };
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

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: 'active' | 'completed' | 'planned';
  cover_image: string;
  start_date?: string;
  end_date?: string;
  featured?: boolean;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  interest: string;
  message: string;
  date: string;
  read: boolean;
}
