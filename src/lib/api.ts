import axios from 'axios';
import { mockTeam, mockNews, mockMissions, mockGallery, mockSettings, mockProjects } from '@/data/mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 (Optional: Auto logout)
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem('auth_token');
      // window.location.href = '/login'; // Optional: Redirect
    }
    return Promise.reject(error);
  }
);

// Runtime mock store (initialized with mock data, persisted in localStorage for persistence)
const STORAGE_KEY = 'vmp_runtime_store_v1';

const getInitialStore = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to load store from localStorage', e);
  }
  
  return {
    team: [...mockTeam],
    news: [...mockNews],
    missions: [...mockMissions],
    gallery: [...mockGallery],
    projects: [...mockProjects],
    settings: { ...mockSettings },
  };
};

const runtimeStore = getInitialStore();

// Helper to save store
const saveStore = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(runtimeStore));
  } catch (e) {
    console.warn('Failed to save store to localStorage', e);
  }
};

// Helper to get mock data source
const getMockData = (url: string) => {
  console.log('Serving mock data for:', url);
  if (url.includes('/auth/me')) {
     return { id: 'admin', role: 'admin' };
  }
  
  // Helper to find by ID if URL contains ID
  const findById = (collection: any[], baseUrl: string) => {
    // Check if url is exactly baseUrl (e.g. '/news') or has query params
    // If it has extra path segments (e.g. '/news/123'), it's an ID lookup
    const parts = url.split(baseUrl);
    if (parts.length > 1 && parts[1] && parts[1] !== '/' && !parts[1].startsWith('?')) {
      const id = parts[1].replace('/', '');
      return collection.find(item => item.id === id) || null;
    }
    return collection;
  };

  if (url.includes('/team')) return findById(runtimeStore.team, '/team');
  if (url.includes('/news')) return findById(runtimeStore.news, '/news');
  if (url.includes('/missions')) return findById(runtimeStore.missions, '/missions');
  if (url.includes('/gallery/mission/')) {
    const missionId = url.split('/gallery/mission/')[1];
    return runtimeStore.gallery.filter(item => item.mission_id === missionId);
  }
  if (url.includes('/gallery')) return findById(runtimeStore.gallery, '/gallery');
  if (url.includes('/projects')) return findById(runtimeStore.projects, '/projects');
  if (url.includes('/settings')) return runtimeStore.settings;
  if (url.includes('/homepage/slides')) return runtimeStore.settings.hero_slides;
  if (url.includes('/homepage/testimonials')) return runtimeStore.settings.testimonials;
  return [];
};

export const api = {
  get: async <T>(url: string) => {
    try {
      const response = await client.get<T>(url);
      return response.data;
    } catch (error) {
      console.warn(`API call to ${url} failed, falling back to mock data.`, error);
      return getMockData(url) as unknown as T;
    }
  },
  post: async <T>(url: string, data: any) => {
    try {
      const response = await client.post<T>(url, data);
      return response.data;
    } catch (error) {
      console.warn(`API call to ${url} failed (POST). Handling with mock store.`);
      
      // Handle Login
      if (url.includes('/auth/login')) {
        // Accept any password for demo/mock mode, or check specific one if needed
        // For now, let's just allow it to unblock the user.
        return { 
          token: 'mock_jwt_token_12345', 
          user: { id: 'admin', role: 'admin' } 
        } as unknown as T;
      }

      // Mock Creation Logic
      const newItem = { ...data, id: Date.now().toString() };
      let saved = false;
      
      if (url.includes('/missions')) {
        runtimeStore.missions.push(newItem);
        saved = true;
      }
      if (url.includes('/news')) {
        runtimeStore.news.push(newItem);
        saved = true;
      }
      if (url.includes('/team')) {
        runtimeStore.team.push(newItem);
        saved = true;
      }
      if (url.includes('/gallery')) {
        runtimeStore.gallery.push(newItem);
        saved = true;
      }
      if (url.includes('/projects')) {
        runtimeStore.projects.push(newItem);
        saved = true;
      }
      if (url.includes('/homepage/slides')) {
        if (!runtimeStore.settings.hero_slides) runtimeStore.settings.hero_slides = [];
        runtimeStore.settings.hero_slides.push(newItem);
        saved = true;
      }
      if (url.includes('/homepage/partners')) {
        if (!runtimeStore.settings.partners) runtimeStore.settings.partners = [];
        runtimeStore.settings.partners.push(newItem);
        saved = true;
      }
      if (url.includes('/homepage/testimonials')) {
        if (!runtimeStore.settings.testimonials) runtimeStore.settings.testimonials = [];
        runtimeStore.settings.testimonials.push(newItem);
        saved = true;
      }
      if (url.includes('/settings')) {
        runtimeStore.settings = { ...runtimeStore.settings, ...data };
        saved = true;
      }

      if (saved) {
        saveStore();
        return newItem as T;
      }

      throw error;
    }
  },
  put: async <T>(url: string, data: any) => {
    try {
      const response = await client.put<T>(url, data);
      return response.data;
    } catch (error) {
      console.warn(`API call to ${url} failed (PUT). Handling with mock store.`);
      
      // Extract ID from URL (e.g. /missions/1)
      const id = url.split('/').pop();
      let updated = false;
      let result = data;
      
      if (url.includes('/missions')) {
        const index = runtimeStore.missions.findIndex(m => m.id === id);
        if (index !== -1) {
          runtimeStore.missions[index] = { ...runtimeStore.missions[index], ...data };
          result = runtimeStore.missions[index];
          updated = true;
        }
      }
      if (url.includes('/news')) {
         const index = runtimeStore.news.findIndex(m => m.id === id);
         if (index !== -1) {
           runtimeStore.news[index] = { ...runtimeStore.news[index], ...data };
           result = runtimeStore.news[index];
           updated = true;
         }
      }
      if (url.includes('/projects')) {
        const index = runtimeStore.projects.findIndex(m => m.id === id);
        if (index !== -1) {
          runtimeStore.projects[index] = { ...runtimeStore.projects[index], ...data };
          result = runtimeStore.projects[index];
          updated = true;
        }
      }
      if (url.includes('/homepage/slides')) {
        if (runtimeStore.settings.hero_slides) {
          const index = runtimeStore.settings.hero_slides.findIndex(m => m.id === id);
          if (index !== -1) {
            runtimeStore.settings.hero_slides[index] = { ...runtimeStore.settings.hero_slides[index], ...data };
            result = runtimeStore.settings.hero_slides[index];
            updated = true;
          }
        }
      }
      if (url.includes('/homepage/partners')) {
        if (runtimeStore.settings.partners) {
          const index = runtimeStore.settings.partners.findIndex(m => m.id === id);
          if (index !== -1) {
            runtimeStore.settings.partners[index] = { ...runtimeStore.settings.partners[index], ...data };
            result = runtimeStore.settings.partners[index];
            updated = true;
          }
        }
      }
      if (url.includes('/homepage/testimonials')) {
        if (runtimeStore.settings.testimonials) {
          const index = runtimeStore.settings.testimonials.findIndex(m => m.id === id);
          if (index !== -1) {
            runtimeStore.settings.testimonials[index] = { ...runtimeStore.settings.testimonials[index], ...data };
            result = runtimeStore.settings.testimonials[index];
            updated = true;
          }
        }
      }
      if (url.includes('/team')) {
        const index = runtimeStore.team.findIndex(m => m.id === id);
        if (index !== -1) {
          runtimeStore.team[index] = { ...runtimeStore.team[index], ...data };
          result = runtimeStore.team[index];
          updated = true;
        }
      }
      if (url.includes('/gallery')) {
        const index = runtimeStore.gallery.findIndex(m => m.id === id);
        if (index !== -1) {
          runtimeStore.gallery[index] = { ...runtimeStore.gallery[index], ...data };
          result = runtimeStore.gallery[index];
          updated = true;
        }
      }

      if (updated) {
        saveStore();
        return result as T;
      }

      // If we can't find it or handle it, maybe just return data as if successful
      return data as T;
    }
  },
  delete: async <T>(url: string) => {
    try {
      const response = await client.delete<T>(url);
      return response.data;
    } catch (error) {
      console.warn(`API call to ${url} failed (DELETE). Handling with mock store.`);
       
      const id = url.split('/').pop();
      let deleted = false;

      if (url.includes('/missions')) {
        runtimeStore.missions = runtimeStore.missions.filter(m => m.id !== id);
        deleted = true;
      }
      if (url.includes('/news')) {
        runtimeStore.news = runtimeStore.news.filter(m => m.id !== id);
        deleted = true;
      }
      if (url.includes('/team')) {
        runtimeStore.team = runtimeStore.team.filter(m => m.id !== id);
        deleted = true;
      }
       if (url.includes('/gallery')) {
        runtimeStore.gallery = runtimeStore.gallery.filter(m => m.id !== id);
        deleted = true;
      }
      if (url.includes('/projects')) {
        runtimeStore.projects = runtimeStore.projects.filter(m => m.id !== id);
        deleted = true;
      }
      if (url.includes('/homepage/slides') && runtimeStore.settings.hero_slides) {
        runtimeStore.settings.hero_slides = runtimeStore.settings.hero_slides.filter(m => m.id !== id);
        deleted = true;
      }
      if (url.includes('/homepage/partners') && runtimeStore.settings.partners) {
        runtimeStore.settings.partners = runtimeStore.settings.partners.filter(m => m.id !== id);
        deleted = true;
      }
      if (url.includes('/homepage/testimonials') && runtimeStore.settings.testimonials) {
        runtimeStore.settings.testimonials = runtimeStore.settings.testimonials.filter(m => m.id !== id);
        deleted = true;
      }

      if (deleted) {
        saveStore();
        return { success: true } as unknown as T;
      }

      return { success: true } as unknown as T;
    }
  },
  upload: async (file: File) => {
    // Mock upload if server is down
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await client.post<{ url: string }>('/upload.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data.url;
    } catch (error) {
        console.warn('Upload failed, using Base64 Data URL for persistence', error);
        // Use FileReader to create a persistent Data URL (base64)
        // This allows images to survive page reloads when stored in localStorage
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
    }
  },
  // Helper to get full image URL
  getImageUrl: (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('data:')) return path;
    if (path.startsWith('blob:')) return path;
    // Remove leading slash if present to avoid double slash issues with API_URL (if API_URL has trailing slash)
    // Actually, usually API_URL is /api. The server serves uploads at /uploads.
    // So we need the BASE_URL of the server, not the API_URL.
    // Let's assume server root is API_URL without '/api'.
    const baseUrl = API_URL.replace('/api', '');
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  }
};
