import { api } from '@/lib/api';
import { Project } from '@/types';

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    return await api.get<Project[]>('/projects');
  },

  getById: async (id: string): Promise<Project> => {
    return await api.get<Project>(`/projects/${id}`);
  },

  create: async (project: Omit<Project, 'id' | 'created_at'>): Promise<Project> => {
    return await api.post<Project>('/projects', project);
  },

  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    return await api.put<Project>(`/projects/${id}`, project);
  },

  delete: async (id: string): Promise<void> => {
    return await api.delete<void>(`/projects/${id}`);
  }
};
