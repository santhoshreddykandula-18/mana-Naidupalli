import type { Announcement, Event, Temple, Match, CricketTeam, GalleryItem, EmergencyContact, CropInfo, EducationPost, GovernmentService } from '../types';

// All mock data removed - only user-provided data should be used
// The following arrays are kept empty or with real public information only

export const announcements: Announcement[] = [];

export const events: Event[] = [];

export const temples: Temple[] = [
  {
    id: '1',
    name: 'Gurrapa Swami Temple',
    festival: 'Annual Jatara in March',
    location: 'Mana Naidupalli Village Center',
    image_url: '/temples/Gurrapa Swami Temple.png',
    status: 'published',
  },
  {
    id: '2',
    name: 'Poleramma Thalli Temple',
    festival: 'Annual Poleramma Jatara in April',
    location: 'North Street, Mana Naidupalli',
    image_url: '/temples/Poleramma thalli Temple.png',
    status: 'published',
  },
  {
    id: '3',
    name: 'Shivalayam',
    festival: 'Maha Shivaratri',
    location: 'Main Road, Mana Naidupalli',
    image_url: '/temples/Shivalayam.png',
    status: 'published',
  },
  {
    id: '4',
    name: 'Vinayaka Swami Temple',
    festival: 'Vinayaka Chavithi',
    location: 'Temple Street, Mana Naidupalli',
    image_url: '/temples/Vinayaka Swami Temple.png',
    status: 'published',
  },
];

export const matches: Match[] = [];

export const cricketTeams: CricketTeam[] = [
  { id: '1', name: 'Naidupalli Pirates', captain: 'Captain Name', players: 37 }
];

export const galleryItems: GalleryItem[] = [];

export const emergencyContacts: EmergencyContact[] = [
  { id: '1', service: 'Ambulance', phone: '108', description: 'Emergency Medical Assistance', icon: 'ambulance' },
  { id: '2', service: 'Police', phone: '100', description: 'Police Emergency', icon: 'shield' },
  { id: '3', service: 'Fire', phone: '101', description: 'Fire Emergency', icon: 'flame' },
  { id: '4', service: 'Government Hospital', phone: '0866-247-xxxx', description: 'Nearest Government Hospital', icon: 'hospital' },
  { id: '5', service: 'Women Helpline', phone: '1091', description: 'Women Safety Helpline', icon: 'phone' },
  { id: '6', service: 'Child Helpline', phone: '1098', description: 'Child Protection Helpline', icon: 'child' },
];

export const crops: CropInfo[] = [];

export const educationPosts: EducationPost[] = [];

export const governmentServices: GovernmentService[] = [
  { id: '1', service_name: 'AP State Government', short_description: 'Official Andhra Pradesh Government information and services', link: 'https://ap.gov.in', icon: 'landmark', status: 'published' },
  { id: '2', service_name: 'SPSR Nellore District', short_description: 'District administration and public information', link: 'https://spsrnellore.nic.in', icon: 'building-2', status: 'published' },
  { id: '3', service_name: 'AP Seva', short_description: 'Citizen services and applications portal', link: 'https://www.aps.gov.in', icon: 'id-card', status: 'published' },
  { id: '4', service_name: 'Grama/Ward Sachivalayam', short_description: 'Village and ward secretariat services', link: 'https://gsws.ap.gov.in', icon: 'building-2', status: 'published' },
  { id: '5', service_name: 'Spandana', short_description: 'Public grievance redressal platform', link: 'https://spandana.ap.gov.in', icon: 'file-text', status: 'published' },
  { id: '6', service_name: 'AP Panchayat Services', short_description: 'Panchayat-related services including house tax, trade license, property valuation', link: 'https://panchayat.ap.gov.in', icon: 'users', status: 'published' },
  { id: '7', service_name: 'MeeBhoomi', short_description: 'Land and revenue records', link: 'https://meebhoomi.ap.gov.in', icon: 'file-text', status: 'published' },
  { id: '8', service_name: 'Agriculture Department', short_description: 'Agriculture department information and farmer schemes', link: 'https://agri.ap.gov.in', icon: 'leaf', status: 'published' },
  { id: '9', service_name: 'Health & Family Welfare', short_description: 'Health, Medical & Family Welfare Department services', link: 'https://hmfw.ap.gov.in', icon: 'hospital', status: 'published' },
  { id: '10', service_name: 'Birth/Death Certificates', short_description: 'Register and download certificates online', link: 'https://crsorgi.gov.in', icon: 'file-check', status: 'published' },
  { id: '11', service_name: 'AP State Portal', short_description: 'Unified portal for all AP government services', link: 'https://ap.gov.in', icon: 'globe', status: 'published' },
  { id: '12', service_name: 'RTI Online', short_description: 'Right to Information portal for Andhra Pradesh', link: 'https://rtionline.ap.gov.in', icon: 'file-text', status: 'published' },
  { id: '13', service_name: 'AP eProcurement', short_description: 'Government e-procurement platform', link: 'https://tender.apeprocurement.gov.in', icon: 'file-text', status: 'published' },
  { id: '14', service_name: 'CM Dashboard', short_description: 'Chief Minister dashboard for governance', link: 'https://cmdashboard.ap.gov.in', icon: 'layout-dashboard', status: 'published' },
];

export const quickAccessItems = [
  { title: 'Latest Announcements', description: 'Latest village updates and notices', icon: 'bell', color: 'primary', route: '/announcements' },
  { title: 'Events', description: 'Upcoming festivals and gatherings', icon: 'calendar', color: 'blue', route: '/events' },
  { title: 'Temples', description: 'Temple timings and festivals', icon: 'building-2', color: 'gold', route: '/temples' },
  { title: 'Cricket', description: 'Matches, teams and scores', icon: 'trophy', color: 'primary', route: '/cricket' },
  { title: 'Agriculture', description: 'Farming tips and crop guidance', icon: 'leaf', color: 'primary', route: '/agriculture' },
  { title: 'Sri Ram Youth', description: 'Youth community activities and media', icon: 'users', color: 'gold', route: '/sri-ram-youth' },
  { title: 'Government', description: 'Official government services and links', icon: 'landmark', color: 'blue', route: '/government' },
  { title: 'Gallery', description: 'Village photos and memories', icon: 'images', color: 'secondary', route: '/gallery' },
];

export const navItems = [
  { label: 'Home', route: '/' },
  { label: 'Announcements', route: '/announcements' },
  { label: 'Events', route: '/events' },
  { label: 'Temples', route: '/temples' },
  { label: 'Cricket', route: '/cricket' },
  { label: 'Agriculture', route: '/agriculture' },
  { label: 'Education', route: '/education' },
  { label: 'Government', route: '/government' },
  { label: 'Emergency', route: '/emergency' },
  { label: 'Gallery', route: '/gallery' },
];

export const adminNavItems = [
  { label: 'Dashboard', route: '/admin' },
  { label: 'Announcements', route: '/admin/announcements' },
  { label: 'Events', route: '/admin/events' },
  { label: 'Temples', route: '/admin/temples' },
  { label: 'Cricket', route: '/admin/cricket' },
  { label: 'Agriculture', route: '/admin/agriculture' },
  { label: 'Sri Ram Youth', route: '/admin/sri-ram-youth' },
  { label: 'Government', route: '/admin/government' },
  { label: 'Gallery', route: '/admin/gallery' },
  { label: 'Notifications', route: '/admin/notifications' },
  { label: 'Settings', route: '/admin/settings' },
];