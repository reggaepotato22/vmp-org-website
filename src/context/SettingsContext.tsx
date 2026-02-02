import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingsService } from '@/services/settingsService';

export interface SiteSettings {
  id?: string; // Optional ID for DB
  siteTitle: string;
  contactEmail: string;
  phone: string;
  address: string;
  socialLinks: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  theme: 'light' | 'dark';
}

const defaultSettings: SiteSettings = {
  siteTitle: "Veterinarians With a Mission Programme",
  contactEmail: "info@kenyavetsmission.org",
  phone: "0116-922-908",
  address: "Ultimate House, Oloolua Road, Ngong Town",
  socialLinks: {
    twitter: "https://twitter.com/vmp-org",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
  theme: 'light',
};

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  toggleTheme: () => void;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('vmp_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const data = await settingsService.getSettings();
        if (data) {
          // Merge with default settings to ensure all fields exist
          setSettings(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    // Apply theme whenever settings change
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(settings.theme);
  }, [settings.theme]);

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    // Optimistic UI update
    setSettings(prev => ({ ...prev, ...newSettings }));
    
    // Persist to service (DB + LocalStorage)
    await settingsService.updateSettings(newSettings);
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: newTheme });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, toggleTheme, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};
