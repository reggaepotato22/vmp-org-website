import { api } from '@/lib/api';
import { NewsItem } from '@/types';

export const newsService = {
  async getAll() {
    return await api.get<NewsItem[]>('/news');
  },

  async getById(id: string) {
    return await api.get<NewsItem>(`/news/${id}`);
  },

  async create(news: Omit<NewsItem, 'id' | 'created_at'>) {
    return await api.post<NewsItem>('/news', news);
  },

  async update(id: string, news: Partial<NewsItem>) {
    return await api.put<NewsItem>(`/news/${id}`, news);
  },

  async delete(id: string) {
    return await api.delete(`/news/${id}`);
  }
};
