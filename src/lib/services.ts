import { supabase, handleSupabaseError } from './supabase';
import type { Announcement, Event, Temple, Match, CricketTeam, GalleryItem, CropInfo, GovernmentService } from '../types';

// ============================================
// ANNOUNCEMENTS SERVICE
// ============================================
export const announcementsService = {
  // Fetch all announcements (public - only published)
  async getAll(): Promise<Announcement[]> {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: false });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  // Fetch all announcements for admin (includes drafts)
  async getAllAdmin(): Promise<Announcement[]> {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  // Get single announcement by ID
  async getById(id: string): Promise<Announcement | null> {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  // Create new announcement
  async create(announcement: Omit<Announcement, 'id'>): Promise<Announcement> {
    const { data, error } = await supabase
      .from('announcements')
      .insert([announcement])
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  // Update announcement
  async update(id: string, updates: Partial<Announcement>): Promise<Announcement> {
    const { data, error } = await supabase
      .from('announcements')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  // Delete announcement
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) throw new Error(handleSupabaseError(error));
  },

  // Publish/Unpublish announcement
  async setStatus(id: string, status: 'published' | 'draft'): Promise<Announcement> {
    return this.update(id, { status } as Partial<Announcement>);
  },
};

// ============================================
// EVENTS SERVICE
// ============================================
export const eventsService = {
  async getAll(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: false });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getAllAdmin(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async create(event: Omit<Event, 'id'>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async update(id: string, updates: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw new Error(handleSupabaseError(error));
  },

  async setStatus(id: string, status: 'published' | 'draft'): Promise<Event> {
    return this.update(id, { status } as Partial<Event>);
  },
};

// ============================================
// TEMPLES SERVICE
// ============================================
export const templesService = {
  async getAll(): Promise<Temple[]> {
    const { data, error } = await supabase
      .from('temples')
      .select('*')
      .eq('status', 'published')
      .order('name', { ascending: true });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getAllAdmin(): Promise<Temple[]> {
    const { data, error } = await supabase
      .from('temples')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getById(id: string): Promise<Temple | null> {
    const { data, error } = await supabase
      .from('temples')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async create(temple: Omit<Temple, 'id'>): Promise<Temple> {
    const { data, error } = await supabase
      .from('temples')
      .insert([temple])
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async update(id: string, updates: Partial<Temple>): Promise<Temple> {
    const { data, error } = await supabase
      .from('temples')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('temples')
      .delete()
      .eq('id', id);

    if (error) throw new Error(handleSupabaseError(error));
  },

  async setStatus(id: string, status: 'published' | 'draft'): Promise<Temple> {
    return this.update(id, { status } as Partial<Temple>);
  },
};

// ============================================
// CRICKET SERVICE
// ============================================
export const cricketService = {
  // Matches
  async getMatches(): Promise<Match[]> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getMatchById(id: string): Promise<Match | null> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async createMatch(match: Omit<Match, 'id'>): Promise<Match> {
    const { data, error } = await supabase
      .from('matches')
      .insert([match])
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async updateMatch(id: string, updates: Partial<Match>): Promise<Match> {
    const { data, error } = await supabase
      .from('matches')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async deleteMatch(id: string): Promise<void> {
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', id);

    if (error) throw new Error(handleSupabaseError(error));
  },

  // Teams
  async getTeams(): Promise<CricketTeam[]> {
    const { data, error } = await supabase
      .from('cricket_teams')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async createTeam(team: Omit<CricketTeam, 'id'>): Promise<CricketTeam> {
    const { data, error } = await supabase
      .from('cricket_teams')
      .insert([team])
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async updateTeam(id: string, updates: Partial<CricketTeam>): Promise<CricketTeam> {
    const { data, error } = await supabase
      .from('cricket_teams')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async deleteTeam(id: string): Promise<void> {
    const { error } = await supabase
      .from('cricket_teams')
      .delete()
      .eq('id', id);

    if (error) throw new Error(handleSupabaseError(error));
  },
};

// ============================================
// AGRICULTURE SERVICE
// ============================================
export const agricultureService = {
  async getAll(): Promise<CropInfo[]> {
    const { data, error } = await supabase
      .from('agriculture_posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getAllAdmin(): Promise<CropInfo[]> {
    const { data, error } = await supabase
      .from('agriculture_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getById(id: string): Promise<CropInfo | null> {
    const { data, error } = await supabase
      .from('agriculture_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async create(post: Omit<CropInfo, 'id'>): Promise<CropInfo> {
    const { data, error } = await supabase
      .from('agriculture_posts')
      .insert([post])
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async update(id: string, updates: Partial<CropInfo>): Promise<CropInfo> {
    const { data, error } = await supabase
      .from('agriculture_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('agriculture_posts')
      .delete()
      .eq('id', id);

    if (error) throw new Error(handleSupabaseError(error));
  },

  async setStatus(id: string, status: 'published' | 'draft'): Promise<CropInfo> {
    return this.update(id, { status } as Partial<CropInfo>);
  },
};

// ============================================
// GALLERY SERVICE
// ============================================
export const galleryService = {
  async getAll(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: false });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getAllAdmin(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getById(id: string): Promise<GalleryItem | null> {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async create(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
    const { data, error } = await supabase
      .from('gallery_items')
      .insert([item])
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async update(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem> {
    const { data, error } = await supabase
      .from('gallery_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', id);

    if (error) throw new Error(handleSupabaseError(error));
  },

  async setStatus(id: string, status: 'published' | 'draft'): Promise<GalleryItem> {
    return this.update(id, { status } as Partial<GalleryItem>);
  },
};

// ============================================
// SRI RAM YOUTH SERVICE
// ============================================
export interface SriRamYouthItem {
  id: string;
  title: string;
  description: string;
  type: 'photo' | 'video' | 'event' | 'highlight';
  media_url: string;
  thumbnail_url?: string;
  date: string;
  category: string;
  status: 'published' | 'draft';
  tags?: string[];
}

export const sriRamYouthService = {
  async getAll(): Promise<SriRamYouthItem[]> {
    const { data, error } = await supabase
      .from('sri_ram_youth')
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: false });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getAllAdmin(): Promise<SriRamYouthItem[]> {
    const { data, error } = await supabase
      .from('sri_ram_youth')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getById(id: string): Promise<SriRamYouthItem | null> {
    const { data, error } = await supabase
      .from('sri_ram_youth')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async create(item: Omit<SriRamYouthItem, 'id'>): Promise<SriRamYouthItem> {
    const { data, error } = await supabase
      .from('sri_ram_youth')
      .insert([item])
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async update(id: string, updates: Partial<SriRamYouthItem>): Promise<SriRamYouthItem> {
    const { data, error } = await supabase
      .from('sri_ram_youth')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('sri_ram_youth')
      .delete()
      .eq('id', id);

    if (error) throw new Error(handleSupabaseError(error));
  },

  async setStatus(id: string, status: 'published' | 'draft'): Promise<SriRamYouthItem> {
    return this.update(id, { status } as Partial<SriRamYouthItem>);
  },
};

// ============================================
// GOVERNMENT SERVICE
// ============================================
export const governmentService = {
  async getAll(): Promise<GovernmentService[]> {
    const { data, error } = await supabase
      .from('government_services')
      .select('*')
      .eq('status', 'published')
      .order('service_name', { ascending: true });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getAllAdmin(): Promise<GovernmentService[]> {
    const { data, error } = await supabase
      .from('government_services')
      .select('*')
      .order('service_name', { ascending: true });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async getById(id: string): Promise<GovernmentService | null> {
    const { data, error } = await supabase
      .from('government_services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async create(service: Omit<GovernmentService, 'id'>): Promise<GovernmentService> {
    const { data, error } = await supabase
      .from('government_services')
      .insert([service])
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async update(id: string, updates: Partial<GovernmentService>): Promise<GovernmentService> {
    const { data, error } = await supabase
      .from('government_services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('government_services')
      .delete()
      .eq('id', id);

    if (error) throw new Error(handleSupabaseError(error));
  },

  async setStatus(id: string, status: 'published' | 'draft'): Promise<GovernmentService> {
    return this.update(id, { status } as Partial<GovernmentService>);
  },
};

// ============================================
// STORAGE SERVICE (Media Uploads - Images & Videos)
// ============================================
export type MediaType = 'image' | 'video';

export interface UploadOptions {
  bucket: string;
  folder: string;
  allowedTypes?: MediaType[];
  maxSizeMB?: number;
}

export const storageService = {
  // Default allowed mime types by media type
  getAllowedMimeTypes(type: MediaType): string[] {
    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const videoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    return type === 'image' ? imageTypes : videoTypes;
  },

  // Validate file before upload
  validateFile(file: File, options: UploadOptions): { valid: boolean; error?: string } {
    const allowedTypes = options.allowedTypes || ['image'];
    const maxSize = (options.maxSizeMB || 10) * 1024 * 1024; // Default 10MB

    if (file.size > maxSize) {
      return { valid: false, error: `File size exceeds ${options.maxSizeMB || 10}MB limit` };
    }

    const allAllowedMimes = allowedTypes.flatMap(t => this.getAllowedMimeTypes(t));
    if (!allAllowedMimes.includes(file.type)) {
      return { valid: false, error: `File type ${file.type} not allowed. Allowed: ${allAllowedMimes.join(', ')}` };
    }

    return { valid: true };
  },

  // Upload file to Supabase Storage
  async uploadFile(file: File, bucket: string, folder: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw new Error(handleSupabaseError(uploadError));

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  },

  // Upload image (convenience method)
  async uploadImage(file: File, bucket: string, folder: string): Promise<string> {
    return this.uploadFile(file, bucket, folder);
  },

  // Upload video (convenience method)
  async uploadVideo(file: File, bucket: string, folder: string): Promise<string> {
    return this.uploadFile(file, bucket, folder);
  },

  // Delete file from storage
  async deleteFile(bucket: string, path: string): Promise<void> {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw new Error(handleSupabaseError(error));
  },

  // Get public URL for a file
  getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  // Get file type from mime type
  getFileType(mimeType: string): MediaType {
    return mimeType.startsWith('video/') ? 'video' : 'image';
  },

  // Generate thumbnail URL for video (if supported by storage)
  async generateVideoThumbnail(_bucket: string, _videoPath: string): Promise<string | null> {
    // Note: This would require a separate edge function or service
    // For now, return null - thumbnail must be uploaded separately
    return null;
  },
};

// ============================================
// NOTIFICATIONS SERVICE
// ============================================
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'event' | 'emergency' | 'general';
  targetAudience: 'all' | 'subscribers';
  status: 'draft' | 'sent' | 'scheduled';
  scheduledFor?: string;
  sentAt?: string;
  createdAt: string;
}

export const notificationsService = {
  async getAll(): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw new Error(handleSupabaseError(error));
    return data || [];
  },

  async create(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{ ...notification, createdAt: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async update(id: string, updates: Partial<Notification>): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(handleSupabaseError(error));
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);

    if (error) throw new Error(handleSupabaseError(error));
  },

  async send(id: string): Promise<Notification> {
    return this.update(id, { status: 'sent', sentAt: new Date().toISOString() });
  },
};

// ============================================
// DASHBOARD STATS SERVICE
// ============================================
export const dashboardService = {
  async getStats() {
    const [
      announcements,
      events,
      temples,
      teams,
      agriculture,
      gallery,
    ] = await Promise.all([
      supabase.from('announcements').select('id', { count: 'exact', head: true }),
      supabase.from('events').select('id', { count: 'exact', head: true }),
      supabase.from('temples').select('id', { count: 'exact', head: true }),
      supabase.from('cricket_teams').select('id', { count: 'exact', head: true }),
      supabase.from('agriculture_posts').select('id', { count: 'exact', head: true }),
      supabase.from('gallery_items').select('id', { count: 'exact', head: true }),
    ]);

    return {
      announcements: announcements.count || 0,
      events: events.count || 0,
      temples: temples.count || 0,
      cricketTeams: teams.count || 0,
      agriculturePosts: agriculture.count || 0,
      galleryImages: gallery.count || 0,
    };
  },

  async getRecentActivity(limit = 10) {
    // This would ideally come from an activity_log table
    // For now, we'll fetch recent items from each table
    const [
      recentAnnouncements,
      recentEvents,
      recentTemples,
      recentGallery,
    ] = await Promise.all([
      supabase.from('announcements').select('id, title, updated_at').order('updated_at', { ascending: false }).limit(limit),
      supabase.from('events').select('id, title, updated_at').order('updated_at', { ascending: false }).limit(limit),
      supabase.from('temples').select('id, name, updated_at').order('updated_at', { ascending: false }).limit(limit),
      supabase.from('gallery_items').select('id, title, updated_at').order('updated_at', { ascending: false }).limit(limit),
    ]);

    const activities = [
      ...(recentAnnouncements.data || []).map(a => ({ action: 'Published announcement', target: a.title, time: a.updated_at, type: 'announcement' })),
      ...(recentEvents.data || []).map(e => ({ action: 'Updated event', target: e.title, time: e.updated_at, type: 'event' })),
      ...(recentTemples.data || []).map(t => ({ action: 'Updated temple info', target: t.name, time: t.updated_at, type: 'temple' })),
      ...(recentGallery.data || []).map(g => ({ action: 'Uploaded gallery image', target: g.title, time: g.updated_at, type: 'gallery' })),
    ];

    return activities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, limit);
  },
};