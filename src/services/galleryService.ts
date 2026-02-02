import { api } from '@/lib/api';
import { GalleryItem } from '@/types';

export const galleryService = {
  async getAll() {
    return await api.get<GalleryItem[]>('/gallery');
  },

  async getById(id: string) {
    // We don't have a single item endpoint in API yet, but we can filter or add it.
    // For now, let's just fetch all and find (or add endpoint later).
    // Actually, it's better to add the endpoint to routes/gallery.js if needed.
    // But usually gallery items are fetched in bulk.
    // Let's assume we can fetch all.
    const items = await api.get<GalleryItem[]>('/gallery');
    return items.find(i => i.id === id);
  },

  async getByMissionId(missionId: string) {
    return await api.get<GalleryItem[]>(`/gallery/mission/${missionId}`);
  },

  async create(item: Omit<GalleryItem, 'id' | 'created_at'>) {
    return await api.post<GalleryItem>('/gallery', item);
  },

  async update(id: string, item: Partial<GalleryItem>) {
    return await api.put<GalleryItem>(`/gallery/${id}`, item);
  },

  async delete(id: string) {
    return await api.delete(`/gallery/${id}`);
  }
};
