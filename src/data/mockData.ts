
import { TeamMember, NewsItem, Mission, GalleryItem, SiteSettings, HeroSlide, Testimonial } from '@/types';
import hero1 from '@/assets/vmphotos/heroslide1.png';

export const mockTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Sarah Kimani',
    role: 'Lead Veterinarian',
    bio: 'Dr. Kimani has over 15 years of experience in wildlife and domestic animal medicine. She leads our field missions with compassion and expertise.',
    image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    social_links: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: '2',
    name: 'Dr. James Ochieng',
    role: 'Field Surgeon',
    bio: 'Specializing in orthopedic surgery, Dr. Ochieng ensures that even the most severe cases get a second chance at life during our mobile clinics.',
    image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
    social_links: {
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: '3',
    name: 'Grace Wanjiku',
    role: 'Community Outreach',
    bio: 'Grace bridges the gap between our veterinary teams and the communities we serve, organizing education workshops and vaccination drives.',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
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
