import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Stat, ServiceCard, Campaign, ProgramItem, TeamMember, Partner, ContactMessage, Mission } from '@/types';
import { 
  mockStats, 
  mockServiceCards, 
  mockCampaigns, 
  mockPrograms, 
  mockTeam, 
  mockSettings, 
  mockVolunteers,
  mockMessages,
  mockMissionReports
} from '@/data/mockData';

interface DataContextType {
  stats: Stat[];
  updateStat: (id: string, value: string) => void;
  
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;

  serviceCards: ServiceCard[];
  programs: ProgramItem[];
  partners: Partner[];
  settings: any;
  
  volunteers: any[]; // Placeholder for volunteer data
  addVolunteer: (volunteer: any) => void;

  messages: ContactMessage[];
  missionReports: any[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<Stat[]>(mockStats);
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [serviceCards, setServiceCards] = useState<ServiceCard[]>(mockServiceCards);
  const [programs, setPrograms] = useState<ProgramItem[]>(mockPrograms);
  const [partners, setPartners] = useState<Partner[]>(mockSettings.partners || []);
  const [volunteers, setVolunteers] = useState<any[]>(mockVolunteers);
  const [messages, setMessages] = useState<any[]>(mockMessages);
  const [missionReports, setMissionReports] = useState<any[]>(mockMissionReports);

  const updateStat = (id: string, value: string) => {
    setStats(prev => prev.map(s => s.id === id ? { ...s, value } : s));
  };

  const addCampaign = (campaign: Campaign) => {
    setCampaigns(prev => [...prev, campaign]);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const addVolunteer = (volunteer: any) => {
    setVolunteers(prev => [...prev, { ...volunteer, id: Date.now().toString(), date: new Date().toISOString() }]);
  };

  return (
    <DataContext.Provider value={{
      stats,
      updateStat,
      campaigns,
      addCampaign,
      updateCampaign,
      deleteCampaign,
      serviceCards,
      programs,
      partners,
      settings: mockSettings,
      volunteers,
      addVolunteer,
      messages,
      missionReports
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
