import { api } from '@/lib/api';
import { SiteSettings } from '@/types';

export const settingsService = {
  async getSettings() {
    // API returns object { key: value }
    // Frontend expects SiteSettings interface which has hero_slides, etc.
    const settings = await api.get<Record<string, any>>('/settings');
    
    // Parse JSON strings if necessary (though API might have sent them as strings if stored as TEXT)
    // In routes/settings.js, we just return the values.
    // If we stored JSON.stringify value, we need to parse it here or in backend.
    // Let's parse here to be safe if backend sends strings.
    
    const parsedSettings: any = {};
    for (const [key, value] of Object.entries(settings)) {
      try {
        parsedSettings[key] = JSON.parse(value);
      } catch {
        parsedSettings[key] = value;
      }
    }
    
    return parsedSettings as SiteSettings;
  },

  async updateSettings(settings: Partial<SiteSettings>) {
    // Convert objects to JSON strings for storage
    const payload: Record<string, any> = {};
    for (const [key, value] of Object.entries(settings)) {
      if (typeof value === 'object') {
        payload[key] = JSON.stringify(value);
      } else {
        payload[key] = value;
      }
    }
    
    return await api.post('/settings', payload);
  }
};
