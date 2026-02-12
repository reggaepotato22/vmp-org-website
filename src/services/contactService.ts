import axios from 'axios';
import { ContactMessage } from '@/types';

const PHP_API_URL = '/api/contact.php';
const STORAGE_KEY = 'vmp_contact_messages_mock';

export const contactService = {
  async sendMessage(data: Omit<ContactMessage, 'id' | 'date' | 'read'>) {
    try {
      // Try sending to PHP backend first
      const response = await axios.post(PHP_API_URL, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      // Check if response is valid JSON and successful
      if (response.status === 200 && response.data && typeof response.data === 'object' && !response.data.error) {
        return response.data;
      }
      throw new Error('Invalid response from server');
    } catch (error) {
      // Fallback for development/local environment without PHP
      console.warn('PHP backend unavailable, falling back to local mock storage', error);
      
      const newMessage: ContactMessage = {
        id: crypto.randomUUID(),
        ...data,
        date: new Date().toISOString(),
        read: false
      };
      
      const messages = this.getLocalMessages();
      messages.unshift(newMessage);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, message: 'Message sent successfully (Mock)' };
    }
  },

  async getMessages() {
    try {
      const response = await axios.get<ContactMessage[]>(PHP_API_URL);
      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data;
      }
      throw new Error('Invalid response from server');
    } catch (error) {
      console.warn('PHP backend unavailable, serving from local mock storage');
      return this.getLocalMessages();
    }
  },

  getLocalMessages(): ContactMessage[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
};
