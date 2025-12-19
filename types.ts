
export interface Interview {
  id: string;
  founderName: string;
  author?: string; // Specific author name for articles
  readTime?: string; // "5 min read"
  companyName: string;
  position: string;
  email: string;
  phoneNumber?: string;
  city?: string;
  title: string;
  description?: string;
  longContent?: string; // For long-form articles
  tags?: string[]; // For SEO and categorization
  thumbnail: string;
  videoUrl?: string; 
  youtubeUrl?: string; 
  embedUrl?: string; 
  format: 'horizontal' | 'vertical'; 
  status: 'live' | 'upcoming' | 'recorded' | 'pending' | 'rejected';
  category: 'featured' | 'latest' | 'news' | 'success' | 'article'; 
  views: number;
  date: string;
  metaKeywords?: string[]; 
  displayOnHome: boolean; 
  primaryPlatform?: 'youtube' | 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'custom';
  socialLinks?: {
    youtube?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  applicationType?: 'upload' | 'live'; 
  scheduledDate?: string; 
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'founder';
  company?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  basePrice: number;
  discountPercentage: number;
  features: string[];
}

export interface AppSettings {
  maxLiveDuration: number;
  subscriptionPlans: SubscriptionPlan[];
}

export enum ApplicationStatus {
  IDLE,
  SUBMITTING,
  SUCCESS,
}

export interface SoundEffect {
  id: string;
  label: string;
  icon: string; 
  color: string;
}
