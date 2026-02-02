import React, { createContext, useContext, useState, useEffect } from 'react';
import { missions as initialMissionsData } from "@/data/news";

export interface Mission {
  id: string;
  year: string;
  title: string; // missionTitle
  missionCoverImage: string; // New field (Required)
  location: string;
  date: string;
  team: string;
  description: string;
  outcome?: string;
  status?: 'Upcoming' | 'Completed' | 'Ongoing'; // Updated Enum
  stats: {
    treated: string;
    value: string;
    bibles: string;
  };
}

interface MissionContextType {
  missions: Mission[];
  addMission: (mission: Mission) => void;
  updateMission: (mission: Mission) => void;
  deleteMission: (id: string) => void;
  getMission: (id: string) => Mission | undefined;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const useMissions = () => {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMissions must be used within a MissionProvider');
  }
  return context;
};

export const MissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem('vmp_missions');
    return saved ? JSON.parse(saved) : initialMissionsData;
  });

  useEffect(() => {
    localStorage.setItem('vmp_missions', JSON.stringify(missions));
  }, [missions]);

  const addMission = (mission: Mission) => {
    setMissions([mission, ...missions]);
  };

  const updateMission = (updatedMission: Mission) => {
    setMissions(missions.map(m => m.id === updatedMission.id ? updatedMission : m));
  };

  const deleteMission = (id: string) => {
    setMissions(missions.filter(m => m.id !== id));
  };

  const getMission = (id: string) => {
    return missions.find(m => m.id === id);
  };

  return (
    <MissionContext.Provider value={{ missions, addMission, updateMission, deleteMission, getMission }}>
      {children}
    </MissionContext.Provider>
  );
};
