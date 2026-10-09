export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  author: string;
  image_url?: string;
  status: 'published' | 'draft';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image_url?: string;
  organizer?: string;
  status: 'published' | 'draft';
}

export interface Temple {
  id: string;
  name: string;
  deity: string;
  description: string;
  timings: string;
  festival: string;
  image_url?: string;
  status: 'published' | 'draft';
}

export interface Match {
  id: string;
  teams: [string, string];
  date: string;
  time: string;
  ground: string;
  status: 'upcoming' | 'live' | 'completed';
  score?: string;
  winner?: string;
}

export interface CricketTeam {
  id: string;
  name: string;
  captain: string;
  players: number;
  logo?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  video_url?: string;
  type?: 'photo' | 'video';
  date?: string;
  status: 'published' | 'draft';
}

export interface EmergencyContact {
  id: string;
  service: string;
  phone: string;
  description: string;
  icon: string;
}

export interface CropInfo {
  id: string;
  name: string;
  season: string;
  water_requirement: string;
  common_diseases: string;
  tips: string;
  image_url?: string;
  status: 'published' | 'draft';
}

export interface EducationPost {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
}

export interface GovernmentService {
  id: string;
  service_name: string;
  short_description: string;
  link: string;
  icon: string;
  status: 'published' | 'draft';
}
