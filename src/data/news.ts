import { Calendar, FileText, Image as ImageIcon, MapPin } from "lucide-react";

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: "Milestone" | "Mission Report" | "Event" | "Gallery";
  readTime?: string;
  imageUrl?: string;
  location?: string; // For events/galleries
  link?: string;
}

export const featuredNews: NewsItem = {
  id: "1",
  title: "Breaking: New Veterinary Clinic Opens in Nairobi",
  excerpt: "A state-of-the-art veterinary facility brings hope to underserved communities across Kenya, offering advanced surgical capabilities and training resources.",
  date: "Nov 15, 2024",
  category: "Milestone",
  readTime: "3 min read",
  imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" // Placeholder
};

export const recentNews: NewsItem[] = [
  {
    id: "2",
    title: "Community Outreach Success",
    excerpt: "Over 200 animals treated in recent mission to rural communities, providing essential vaccinations and deworming.",
    date: "Nov 10, 2024",
    category: "Mission Report",
    readTime: "2 min read",
    imageUrl: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "3",
    title: "Volunteer Training Workshop",
    excerpt: "Comprehensive orientation for new volunteers joining our mission. Join us at the Main Office in Nairobi.",
    date: "Dec 5, 2024",
    category: "Event",
    location: "Main Office, Nairobi",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "4",
    title: "Kenya Mission 2024 Gallery",
    excerpt: "Visual highlights from our work in Nakuru, providing livestock care to rural farming communities.",
    date: "March 2024",
    category: "Gallery",
    location: "Nakuru, Kenya",
    imageUrl: "https://images.unsplash.com/photo-1464983309814-72e549556255?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

export const missions = [
  {
    id: "mataarba-2025",
    year: "2025",
    title: "Mataarba Mission",
    location: "Mataarba Community",
    date: "July 15-22, 2025",
    team: "12 volunteers",
    description: "Provided essential veterinary care and spiritual support to the Mataarba community with comprehensive animal health services.",
    stats: {
        treated: "300+",
        value: "$15,000",
        bibles: "200+"
    }
  },
  {
    id: "turkana-2024",
    year: "2024",
    title: "Turkana Outreach",
    location: "Turkana County",
    date: "September 10-17, 2024",
    team: "15 volunteers",
    description: "Large scale veterinary mission focusing on livestock health and community education programs.",
    stats: {
        treated: "500+",
        value: "$25,000",
        bibles: "350+"
    }
  }
];

export const newsData = [featuredNews, ...recentNews];
