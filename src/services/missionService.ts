import { supabase } from '@/lib/supabase';
import { Mission } from '@/types';

const TABLE_NAME = 'missions';

export const missionService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('start_date', { ascending: false });
      
      if (error) throw error;
      return data as Mission[];
    } catch (error) {
      console.warn("Failed to fetch missions from Supabase, falling back to local storage", error);
      const localData = localStorage.getItem(TABLE_NAME);
      return localData ? JSON.parse(localData) : [];
    }
  },

  async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Mission;
    } catch (error) {
       console.warn("Failed to fetch mission from Supabase, checking local storage", error);
       const localData = localStorage.getItem(TABLE_NAME);
       const missions = localData ? JSON.parse(localData) : [];
       const mission = missions.find((m: Mission) => m.id === id);
       if (mission) return mission;
       throw error;
    }
  },

  async create(mission: Omit<Mission, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert(mission)
        .select()
        .single();
      
      if (error) throw error;
      return data as Mission;
    } catch (error) {
      console.warn("Failed to create mission in Supabase, saving to local storage", error);
      const localData = localStorage.getItem(TABLE_NAME);
      const missions = localData ? JSON.parse(localData) : [];
      
      const newMission = {
        ...mission,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      };
      
      missions.unshift(newMission);
      localStorage.setItem(TABLE_NAME, JSON.stringify(missions));
      return newMission as Mission;
    }
  },

  async update(id: string, mission: Partial<Mission>) {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .update(mission)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Mission;
    } catch (error) {
      console.warn("Failed to update mission in Supabase, updating local storage", error);
      const localData = localStorage.getItem(TABLE_NAME);
      let missions = localData ? JSON.parse(localData) : [];
      
      let updatedMission = null;
      missions = missions.map((m: Mission) => {
        if (m.id === id) {
          updatedMission = { ...m, ...mission };
          return updatedMission;
        }
        return m;
      });
      
      localStorage.setItem(TABLE_NAME, JSON.stringify(missions));
      if (updatedMission) return updatedMission;
      throw error;
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.warn("Failed to delete mission from Supabase, removing from local storage", error);
      const localData = localStorage.getItem(TABLE_NAME);
      if (localData) {
        const missions = JSON.parse(localData);
        const filteredMissions = missions.filter((m: Mission) => m.id !== id);
        localStorage.setItem(TABLE_NAME, JSON.stringify(filteredMissions));
      }
    }
  }
};
