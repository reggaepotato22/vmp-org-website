import axios from 'axios';
import { mockTeam, mockNews, mockMissions, mockGallery, mockSettings } from '@/data/mockData';

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

// Mock data handler
const getMockData = (url: string) => {
  console.log('Serving mock data for:', url);
  if (url.includes('/team')) return mockTeam;
  if (url.includes('/news')) return mockNews;
  if (url.includes('/missions')) return mockMissions;
  if (url.includes('/gallery')) return mockGallery;
  if (url.includes('/settings')) return mockSettings;
  if (url.includes('/homepage/slides')) return mockSettings.hero_slides;
  if (url.includes('/homepage/testimonials')) return mockSettings.testimonials;
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
       console.warn(`API call to ${url} failed (POST), simulating success.`, error);
       // For mock purposes, just return the data sent or a generic success response
       return { ...data, id: Math.random().toString(36).substr(2, 9) } as T;
    }
  },
  put: async <T>(url: string, data: any) => {
    try {
      const response = await client.put<T>(url, data);
      return response.data;
    } catch (error) {
       console.warn(`API call to ${url} failed (PUT), simulating success.`, error);
       return data as T;
    }
  },
  delete: async <T>(url: string) => {
    try {
      const response = await client.delete<T>(url);
      return response.data;
    } catch (error) {
       console.warn(`API call to ${url} failed (DELETE), simulating success.`, error);
       return { success: true } as unknown as T;
    }
  },
  upload: async (file: File) => {
    // Mock upload if server is down
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await client.post<{ url: string }>('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data.url;
    } catch (error) {
        console.warn('Upload failed, returning fake URL', error);
        return URL.createObjectURL(file);
    }
  },
  // Helper to get full image URL
  getImageUrl: (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    // Remove leading slash if present to avoid double slash issues with API_URL (if API_URL has trailing slash)
    // Actually, usually API_URL is /api. The server serves uploads at /uploads.
    // So we need the BASE_URL of the server, not the API_URL.
    // Let's assume server root is API_URL without '/api'.
    const baseUrl = API_URL.replace('/api', '');
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  }
};
