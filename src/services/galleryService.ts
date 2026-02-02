import { supabase } from '@/lib/supabase';
import { GalleryItem } from '@/types';

const TABLE_NAME = 'gallery';

export const galleryService = {
  async getAll() {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as GalleryItem[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as GalleryItem;
  },

  async create(item: Omit<GalleryItem, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert(item)
      .select()
      .single();
    
    if (error) throw error;
    return data as GalleryItem;
  },

  async update(id: string, item: Partial<GalleryItem>) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(item)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as GalleryItem;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
