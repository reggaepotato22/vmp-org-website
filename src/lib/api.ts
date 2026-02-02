import axios from 'axios';

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

export const api = {
  get: async <T>(url: string) => {
    const response = await client.get<T>(url);
    return response.data;
  },
  post: async <T>(url: string, data: any) => {
    const response = await client.post<T>(url, data);
    return response.data;
  },
  put: async <T>(url: string, data: any) => {
    const response = await client.put<T>(url, data);
    return response.data;
  },
  delete: async <T>(url: string) => {
    const response = await client.delete<T>(url);
    return response.data;
  },
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await client.post<{ url: string }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.url; // Returns relative path e.g. /uploads/file.jpg
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
