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
  festival: string;
  location: string;
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

export interface SectionCard {
  id: string;
  page_key: string;
  section_key: string;
  title: string;
  subtitle?: string;
  content?: string; // JSON string for rich content
  image_url?: string;
  image_alt?: string;
  card_type: 'default' | 'hero' | 'featured' | 'grid' | 'list' | 'banner' | 'highlight' | 'stats' | 'cta';
  display_order: number;
  status: 'published' | 'draft';
  is_visible: boolean;
  background_color?: string;
  text_color?: string;
  button_text?: string;
  button_link?: string;
  button_variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  published_at?: string;
}
