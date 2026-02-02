import { supabase } from "@/lib/supabase";
import { HeroSlide, Testimonial } from "@/types";

export const homepageService = {
  // Hero Slides
  async getSlides() {
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) throw error;
    return data as HeroSlide[];
  },

  async updateSlide(id: string, updates: Partial<HeroSlide>) {
    const { data, error } = await supabase
      .from('hero_slides')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as HeroSlide;
  },

  async createSlide(slide: Omit<HeroSlide, 'id'>) {
    const { data, error } = await supabase
      .from('hero_slides')
      .insert(slide)
      .select()
      .single();
    
    if (error) throw error;
    return data as HeroSlide;
  },

  async deleteSlide(id: string) {
    const { error } = await supabase
      .from('hero_slides')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Testimonials
  async getTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Testimonial[];
  },

  async updateTestimonial(id: string, updates: Partial<Testimonial>) {
    const { data, error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Testimonial;
  },

  async createTestimonial(testimonial: Omit<Testimonial, 'id'>) {
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonial)
      .select()
      .single();
    
    if (error) throw error;
    return data as Testimonial;
  },

  async deleteTestimonial(id: string) {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
