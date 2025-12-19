import React, { createContext, useState, useContext } from 'react';
import { Interview, AppSettings, User, SubscriptionPlan } from '../types';
import { MOCK_INTERVIEWS } from '../constants';

interface DataContextType {
  interviews: Interview[];
  appSettings: AppSettings;
  currentUser: User | null;
  addInterview: (interview: Interview) => void;
  updateInterview: (id: string, updates: Partial<Interview>) => void;
  deleteInterview: (id: string) => void;
  updateAppSettings: (settings: Partial<AppSettings>) => void;
  login: (email: string) => boolean;
  register: (name: string, email: string, company: string) => void;
  logout: () => void;
}

const DEFAULT_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-micro',
    name: 'Social Solo (Article / Individual Reel)',
    basePrice: 1998,
    discountPercentage: 50,
    features: ['Single Editorial Article', 'Instagram Reels Unit', 'YouTube Shorts Unit', 'LinkedIn Post Unit']
  },
  {
    id: 'plan-creator',
    name: 'Video Creator (Videos + Reels + YT)',
    basePrice: 3998,
    discountPercentage: 50,
    features: ['Full Video Pitch', 'All Social Reels', 'YouTube Video Upload', 'Multi-channel Distribution']
  },
  {
    id: 'plan-publisher',
    name: 'Authority (Articles + All Video Channels)',
    basePrice: 9998,
    discountPercentage: 50,
    features: ['Premium Feature Articles', 'Complete Video Studio Access', 'All Distribution Channels', 'Priority PR Support']
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interviews, setInterviews] = useState<Interview[]>(MOCK_INTERVIEWS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [appSettings, setAppSettings] = useState<AppSettings>({
    maxLiveDuration: 1800,
    subscriptionPlans: DEFAULT_PLANS
  });

  const addInterview = (interview: Interview) => {
    setInterviews(prev => [interview, ...prev]);
  };

  const updateInterview = (id: string, updates: Partial<Interview>) => {
    setInterviews(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteInterview = (id: string) => {
    setInterviews(prev => prev.filter(i => i.id !== id));
  };

  const updateAppSettings = (settings: Partial<AppSettings>) => {
    setAppSettings(prev => ({ ...prev, ...settings }));
  };

  const login = (email: string) => {
    if (email.includes('admin')) {
      setCurrentUser({
        id: 'admin-1',
        name: 'Admin User',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
        role: 'admin'
      });
      return true;
    } else {
      setCurrentUser({
        id: 'user-' + Date.now(),
        name: 'Elena Rostova',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        role: 'founder',
        company: 'Nebula AI'
      });
      return true;
    }
  };

  const register = (name: string, email: string, company: string) => {
    setCurrentUser({
      id: 'user-' + Date.now(),
      name: name,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      role: 'founder',
      company: company
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <DataContext.Provider value={{ 
      interviews, 
      appSettings, 
      currentUser,
      addInterview, 
      updateInterview, 
      deleteInterview, 
      updateAppSettings,
      login,
      register,
      logout
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
