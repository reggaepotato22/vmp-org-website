import { supabase } from '@/lib/supabase';
import { NewsItem } from '@/types';

const TABLE_NAME = 'news';

export const newsService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as NewsItem[];
    } catch (error) {
      console.error("Supabase fetch error, returning empty array:", error);
      // Return empty array instead of throwing to prevent app crash
      return []; 
    }
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as NewsItem;
  },

  async create(news: Omit<NewsItem, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert(news)
      .select()
      .single();
    
    if (error) throw error;
    return data as NewsItem;
  },

  async update(id: string, news: Partial<NewsItem>) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(news)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as NewsItem;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
