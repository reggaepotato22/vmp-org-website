import { api } from '@/lib/api';
import { TeamMember } from '@/types';

export const teamService = {
  async getAll() {
    return await api.get<TeamMember[]>('/team_members');
  },

  async getById(id: string) {
    return await api.get<TeamMember>(`/team_members/${id}`);
  },

  async create(member: Omit<TeamMember, 'id' | 'created_at'>) {
    return await api.post<TeamMember>('/team_members', member);
  },

  async update(id: string, member: Partial<TeamMember>) {
    return await api.put<TeamMember>(`/team_members/${id}`, member);
  },

  async delete(id: string) {
    return await api.delete(`/team_members/${id}`);
  }
};
