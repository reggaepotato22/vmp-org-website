import { api } from "@/lib/api";
import { HeroSlide, Testimonial } from "@/types";

export const homepageService = {
  // Hero Slides
  async getSlides() {
    return await api.get<HeroSlide[]>('/homepage/slides');
  },

  async updateSlide(id: string, updates: Partial<HeroSlide>) {
    return await api.put<HeroSlide>(`/homepage/slides/${id}`, updates);
  },

  async createSlide(slide: Omit<HeroSlide, 'id'>) {
    return await api.post<HeroSlide>('/homepage/slides', slide);
  },

  async deleteSlide(id: string) {
    return await api.delete(`/homepage/slides/${id}`);
  },

  // Testimonials
  async getTestimonials() {
    return await api.get<Testimonial[]>('/homepage/testimonials');
  },

  async updateTestimonial(id: string, updates: Partial<Testimonial>) {
    return await api.put<Testimonial>(`/homepage/testimonials/${id}`, updates);
  },

  async createTestimonial(testimonial: Omit<Testimonial, 'id'>) {
    return await api.post<Testimonial>('/homepage/testimonials', testimonial);
  },

  async deleteTestimonial(id: string) {
    return await api.delete(`/homepage/testimonials/${id}`);
  }
};
