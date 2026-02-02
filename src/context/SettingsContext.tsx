import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SiteSettings {
  siteTitle: string;
  contactEmail: string;
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
  socialLinks: {
    twitter: "https://twitter.com/vmp-org",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
  theme: 'light',
};

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  toggleTheme: () => void;
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

  useEffect(() => {
    localStorage.setItem('vmp_settings', JSON.stringify(settings));
    
    // Apply theme
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(settings.theme);
  }, [settings]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, toggleTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};
