import { api } from '@/lib/api';
import { Mission } from '@/types';

export const missionService = {
  async getAll() {
    return await api.get<Mission[]>('/missions');
  },

  async getById(id: string) {
    return await api.get<Mission>(`/missions/${id}`);
  },

  async create(mission: Omit<Mission, 'id' | 'created_at'>) {
    return await api.post<Mission>('/missions', mission);
  },

  async update(id: string, mission: Partial<Mission>) {
    return await api.put<Mission>(`/missions/${id}`, mission);
  },

  async delete(id: string) {
    return await api.delete(`/missions/${id}`);
  }
};
