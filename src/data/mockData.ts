
import { TeamMember, NewsItem, Mission, GalleryItem, SiteSettings, HeroSlide, Testimonial, Partner, Stat, ServiceCard, Campaign, ProgramItem } from '@/types';
import hero1 from '@/assets/vmphotos/heroslide1.png';
import hero2 from '@/assets/vmphotos/heroslide2.png';
import hero3 from '@/assets/vmphotos/heroslide3.png';
import hero4 from '@/assets/vmphotos/heroslide4.png';
import hero5 from '@/assets/vmphotos/heroslide5.png';
import hero6 from '@/assets/vmphotos/heroslide6.png';
import hero7 from '@/assets/vmphotos/heroslide7.jpg';

import cvm from "@/assets/vmphotos/cvm.webp";
import maf from "@/assets/vmphotos/maf.jpg";
import citam from "@/assets/vmphotos/citam.jpg";
import uvs from "@/assets/vmphotos/uvs.svg";

// --- New Landing Page Data ---

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
}

export interface MissionReport {
  id: string;
  title: string;
  location: string;
  date: string;
  summary: string;
  status: 'completed' | 'ongoing' | 'planned';
}

export const mockStats: Stat[] = [
  { id: '1', label: 'Missions Completed', value: '150' },
  { id: '2', label: 'Volunteers Engaged', value: '10,245' },
  { id: '3', label: 'Animals Treated', value: '524,000' },
  { id: '4', label: 'Counties Reached', value: '47' },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    name: 'Dr. James Wilson',
    email: 'james.wilson@vetcare.com',
    subject: 'Partnership Inquiry',
    message: 'I am interested in volunteering my services for the upcoming Samburu mission. I have 10 years of experience in livestock health.',
    date: '2024-03-12',
    status: 'unread'
  },
  {
    id: '2',
    name: 'Mercy Wanjiku',
    email: 'mercyw@foundation.org',
    subject: 'Donation Receipt Request',
    message: 'Could you please send me a receipt for my donation made last week? Thank you for the great work.',
    date: '2024-03-11',
    status: 'read'
  }
];

export const mockMissionReports: MissionReport[] = [
  {
    id: '1',
    title: 'Samburu Drought Response',
    location: 'Samburu County',
    date: 'Feb 2024',
    summary: 'Provided emergency vaccinations and deworming for 5,000 cattle.',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Turkana Mobile Clinic',
    location: 'Turkana West',
    date: 'Mar 2024',
    summary: 'Currently providing clinical services to pastoralist communities.',
    status: 'ongoing'
  }
];

export const mockServiceCards: ServiceCard[] = [
  { id: '1', number: '01', title: 'Livestock Health', image: 'https://images.unsplash.com/photo-1542810634-71277d95dc24?auto=format&fit=crop&q=80&w=600' },
  { id: '2', number: '02', title: 'Rabies Control', image: 'https://images.unsplash.com/photo-1576091160550-2187d80a1a44?auto=format&fit=crop&q=80&w=600' },
  { id: '3', number: '03', title: 'Surgical Missions', image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=600' },
  { id: '4', number: '04', title: 'Community Training', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600' },
];

export const mockCampaigns: Campaign[] = [
  { 
    id: '1', 
    title: 'URGENT: DROUGHT RELIEF FOR SAMBURU LIVESTOCK', 
    description: 'Provide critical veterinary care and nutrition to herds suffering from the ongoing drought in Northern Kenya.', 
    image: 'https://images.unsplash.com/photo-1541976844346-f18aeac57230?auto=format&fit=crop&q=80&w=800',
    link: '/donate',
    ctaText: 'Donate now'
  },
  { 
    id: '2', 
    title: 'SPONSOR A VET STUDENT', 
    description: 'Help the next generation of veterinary professionals gain hands-on field experience through our mentorship program.', 
    image: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&q=80&w=800',
    link: '/volunteer',
    ctaText: 'Learn More'
  },
  { 
    id: '3', 
    title: 'ANNUAL RABIES VACCINATION DRIVE', 
    description: 'Support our mission to eliminate rabies in rural communities through mass dog vaccination and education.', 
    image: 'https://images.unsplash.com/photo-1518398046578-8cca5778f452?auto=format&fit=crop&q=80&w=600',
    link: '/donate',
    ctaText: 'Donate now'
  },
];

export const mockPrograms: ProgramItem[] = [
  { id: '1', text: 'Mobile Veterinary Clinics in remote pastoralist regions' },
  { id: '2', text: 'Professional Veterinary Mentorship & Training' },
  { id: '3', text: 'Spay/Neuter and Rabies Control Programs' },
  { id: '4', text: 'Spiritual Outreach & Gospel Sharing' },
  { id: '5', text: 'Community Animal Health Worker (CAHW) Training' },
];

// --- Existing Data ---
export const mockTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Josiah Mandieka',
    role: 'Lead Veterinarian',
    bio: 'Dr. Kimani has over 15 years of experience in wildlife and domestic animal medicine. She leads our field missions with compassion and expertise.',
    // image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    social_links: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: '2',
    name: 'Dr. Ezra Saitoti',
    role: 'Field Surgeon',
    bio: 'Specializing in orthopedic surgery, Dr. Ochieng ensures that even the most severe cases get a second chance at life during our mobile clinics.',
    // image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
    social_links: {
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: '3',
    name: 'Joseph Mburu',
    role: 'Community Outreach',
    bio: 'Grace bridges the gap between our veterinary teams and the communities we serve, organizing education workshops and vaccination drives.',
    // image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    social_links: {
      email: 'grace@example.com'
    }
  }
];

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Rabies Vaccination Drive in Turkana',
    content: '<p>We successfully vaccinated over 500 dogs in Turkana county...</p>',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    category: 'news',
    date: '2025-01-15'
  },
  {
    id: '2',
    title: 'Upcoming Gala Dinner',
    content: '<p>Join us for an evening of celebration and fundraising...</p>',
    image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    category: 'event',
    date: '2025-03-20'
  }
];

export const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Samburu Livestock Support',
    description: 'Providing veterinary care to livestock in drought-affected Samburu.',
    location: 'Samburu County',
    status: 'completed',
    start_date: '2024-11-01',
    end_date: '2024-11-14',
    cover_image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800',
    images: [],
    stats: {
      treated: 1200,
      value: 50000,
      bibles: 150
    }
  },
  {
    id: '2',
    title: 'Nairobi Slum Outreach',
    description: 'Spay and neuter campaign in Kibera.',
    location: 'Nairobi',
    status: 'ongoing',
    start_date: '2025-02-01',
    end_date: '2025-02-28',
    cover_image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
    images: []
  }
];

export const mockProjects = [
  {
    id: '1',
    title: 'Mobile Veterinary Clinic',
    description: 'Equipping a 4x4 vehicle to reach remote pastoralist communities.',
    category: 'Infrastructure',
    image_url: 'https://images.unsplash.com/photo-1618477461853-5f8dd1458006?auto=format&fit=crop&q=80&w=800',
    date_completed: '2024-06-01'
  },
  {
    id: '2',
    title: 'Rabies Education Program',
    description: 'School-based curriculum teaching children about dog bite prevention.',
    category: 'Education',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    date_completed: '2024-08-15'
  },
  {
    id: '3',
    title: 'Community Cattle Dip',
    description: 'Rehabilitating a cattle dip to control tick-borne diseases.',
    category: 'Community',
    image_url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800',
    date_completed: '2024-12-01'
  },
  {
    id: '4',
    title: 'Vet Student Mentorship',
    description: 'Pairing senior vet students with experienced field veterinarians.',
    category: 'Training',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    date_completed: 'Ongoing'
  }
];

export const mockVolunteers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Veterinarian', date: '2025-02-10', status: 'approved' },
  { id: '2', name: 'Michael Chen', email: 'michael@example.com', role: 'Vet Student', date: '2025-02-11', status: 'pending' },
  { id: '3', name: 'Emma Wilson', email: 'emma@example.com', role: 'General Volunteer', date: '2025-02-12', status: 'pending' },
];

export const mockGallery: GalleryItem[] = [
  {
    id: '1',
    title: 'Field Operation',
    category: 'Missions',
    image_url: 'https://images.unsplash.com/photo-1599463428489-49780e920d3f?auto=format&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: '2',
    title: 'Community Training',
    category: 'Education',
    image_url: 'https://images.unsplash.com/photo-1529209074138-51015498c7a9?auto=format&fit=crop&q=80&w=800',
    featured: false
  },
  {
    id: '3',
    title: 'Healthy Puppy',
    category: 'Patients',
    image_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800',
    featured: false
  }
];

export const mockSettings: SiteSettings = {
  id: '1',
  site_name: 'Veterinarians with a Mission',
  contact_email: 'info@vmp.org',
  contact_phone: '+254 700 000 000',
  features: {
    showDonations: true,
    showMissions: true,
    showGallery: true,
    showTestimonials: true,
    showNews: true
  },
  hero_slides: [
    {
      id: '1',
      title: 'Healing Animals, Transforming Lives',
      description: 'Veterinary care with a mission of compassion.',
      image: hero1,
      order_index: 0,
      active: true
    },
    {
      id: '2',
      title: 'Reaching the Unreached',
      description: 'Serving remote pastoral communities with essential care.',
      image: hero2,
      order_index: 1,
      active: true
    },
    {
      id: '3',
      title: 'Empowering Communities',
      description: 'Training locals in animal health and sustainable practices.',
      image: hero3,
      order_index: 2,
      active: true
    },
    {
      id: '4',
      title: 'Partners in Hope',
      description: 'Working together for a better future.',
      image: hero4,
      order_index: 3,
      active: true
    },
    {
      id: '5',
      title: 'Veterinary Outreach',
      description: 'bringing professional care to where it is needed most.',
      image: hero5,
      order_index: 4,
      active: true
    },
    {
      id: '6',
      title: 'Compassion in Action',
      description: 'Demonstrating love through service.',
      image: hero6,
      order_index: 5,
      active: true
    },
    {
      id: '7',
      title: 'Sustainable Livelihoods',
      description: 'Healthy animals mean healthy families.',
      image: hero7,
      order_index: 6,
      active: true
    }
  ],
  partners: [
    {
      id: '1',
      name: 'CITAM',
      logo: citam,
      website_url: 'https://citam.org',
      order_index: 0,
      active: true
    },
    {
      id: '2',
      name: 'Christian Veterinary Mission',
      logo: cvm,
      website_url: 'https://cvm.org',
      order_index: 1,
      active: true
    },
    {
      id: '3',
      name: 'Ultimate VetServe',
      logo: uvs,
      website_url: 'https://ultimatevetserve.com',
      order_index: 2,
      active: true
    },
    {
      id: '4',
      name: 'Mission Aviation Fellowship',
      logo: maf,
      website_url: 'https://maf.org',
      order_index: 3,
      active: true
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'John Doe',
      role: 'Farmer',
      content: 'The VMP team saved my herd during the drought. I am forever grateful.',
      image_url: '',
      rating: 5
    }
  ]
};
