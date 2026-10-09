import { useState } from 'react';
import { Heart, Camera, Film, Calendar, ArrowRight, Play, Image as ImageIcon, Users, Award, MapPin, Clock, Music, Coffee, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface PhotoItem {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  image_url: string;
}

interface VideoItem {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: string;
  thumbnail_url: string;
  video_url: string;
}

interface EventItem {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image_url?: string;
  isUpcoming: boolean;
}

interface HighlightItem {
  id: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const photoGallery: PhotoItem[] = [
  { id: 1, title: 'Sri Rama Navami Celebration 2026', description: 'Grand procession with decorated chariot and cultural performances', date: '2026-04-15', category: 'Festival', image_url: '/sri-ram-youth/photos/memories/01.jpeg' },
  { id: 2, title: 'Sri Rama Navami Procession', description: 'Devotees carrying the deity through village streets', date: '2026-04-15', category: 'Festival', image_url: '/sri-ram-youth/photos/memories/02.jpeg' },
  { id: 3, title: 'Cultural Performances', description: 'Traditional dance and music by youth members', date: '2026-04-15', category: 'Culture', image_url: '/sri-ram-youth/photos/memories/03.jpeg' },
  { id: 4, title: 'Annadanam Distribution', description: 'Free food distribution to all devotees', date: '2026-04-15', category: 'Service', image_url: '/sri-ram-youth/photos/memories/04.jpeg' },
  { id: 5, title: 'Temple Decorations', description: 'Beautiful floral decorations at Sri Rama Temple', date: '2026-04-15', category: 'Festival', image_url: '/sri-ram-youth/photos/memories/05.jpeg' },
  { id: 6, title: 'Vinayaka Chavithi 2025 Idol', description: 'Ganesha idol for the 2025 festival', date: '2025-09-15', category: 'Festival', image_url: '/sri-ram-youth/photos/idols/2025.png' },
  { id: 7, title: 'Vinayaka Chavithi 2024 Idol', description: 'Ganesha idol for the 2024 festival', date: '2024-09-15', category: 'Festival', image_url: '/sri-ram-youth/photos/idols/2024.png' },
  { id: 8, title: 'Vinayaka Chavithi 2023 Idol', description: 'Ganesha idol for the 2023 festival', date: '2023-09-15', category: 'Festival', image_url: '/sri-ram-youth/photos/idols/2023.png' },
  { id: 9, title: 'Laddu Making Competition Winner 1', description: 'First prize winner in laddu making competition', date: '2026-09-15', category: 'Competition', image_url: '/sri-ram-youth/photos/winners/laddu-winner-1.jpeg' },
  { id: 10, title: 'Laddu Making Competition Winner 2', description: 'Second prize winner in laddu making competition', date: '2026-09-15', category: 'Competition', image_url: '/sri-ram-youth/photos/winners/laddu-winner-2.jpeg' },
  { id: 11, title: 'Musical Chair Winner 1', description: 'First prize winner in musical chair competition', date: '2026-09-15', category: 'Competition', image_url: '/sri-ram-youth/photos/winners/musical-chair-winner-1.jpeg' },
  { id: 12, title: 'Musical Chair Winner 2', description: 'Second prize winner in musical chair competition', date: '2026-09-15', category: 'Competition', image_url: '/sri-ram-youth/photos/winners/musical-chair-winner-2.jpeg' },
  { id: 13, title: 'Musical Chair Winner 3', description: 'Third prize winner in musical chair competition', date: '2026-09-15', category: 'Competition', image_url: '/sri-ram-youth/photos/winners/musical-chair-winner-3.jpeg' },
  { id: 14, title: 'Youth Committee Banner', description: 'Sri Ram Youth Association committee banner', date: '2026-01-01', category: 'Organization', image_url: '/sri-ram-youth/photos/youth-committee-banner.jpg' },
  { id: 15, title: 'Festival Background', description: 'Decorative background from festival celebrations', date: '2026-04-15', category: 'Festival', image_url: '/sri-ram-youth/photos/bg2.png' },
  { id: 16, title: 'Main Ganesha Idol', description: 'Main deity for Vinayaka Chavithi celebrations', date: '2026-09-15', category: 'Festival', image_url: '/sri-ram-youth/photos/ganesha-main.jpeg' },
  { id: 17, title: 'Festival Background 2', description: 'Additional festival decoration background', date: '2026-04-15', category: 'Festival', image_url: '/sri-ram-youth/photos/bg3.png' },
];

const videoGallery: VideoItem[] = [
  { id: 1, title: 'Sri Rama Navami Kalyanam 2026', description: 'Complete wedding ceremony of Lord Rama and Sita Devi', date: '2026-04-15', duration: '45:32', thumbnail_url: '/sri-ram-youth/photos/memories/01.jpeg', video_url: '/sri-ram-youth/videos/video1.mp4' },
  { id: 2, title: 'Community Service Drive 2026', description: 'Village cleanup and tree plantation drive', date: '2026-03-10', duration: '12:15', thumbnail_url: '/sri-ram-youth/photos/memories/02.jpeg', video_url: '/sri-ram-youth/videos/video2.mp4' },
  { id: 3, title: 'Youth Cultural Festival 2025', description: 'Traditional dance, music and drama performances', date: '2025-12-25', duration: '1:23:45', thumbnail_url: '/sri-ram-youth/photos/memories/03.jpeg', video_url: '/sri-ram-youth/videos/video1.mp4' },
];

const youthEvents: EventItem[] = [
  { id: 1, title: 'Sri Rama Navami Celebrations', description: 'Grand annual celebrations at Sri Rama Temple with special poojas, cultural programs, and annadanam.', date: '2026-04-15', time: '06:00 AM - 09:00 PM', location: 'Sri Rama Temple, Naidupalli', category: 'Festival', isUpcoming: true, image_url: '/sri-ram-youth/photos/bg2.png' },
  { id: 2, title: 'Youth Leadership Camp', description: 'Three-day leadership development camp for village youth focusing on communication, teamwork, and community service.', date: '2026-05-10', time: '09:00 AM - 05:00 PM', location: 'Community Hall, Naidupalli', category: 'Education', isUpcoming: true, image_url: '/sri-ram-youth/photos/bg3.png' },
  { id: 3, title: 'Blood Donation Camp', description: 'Annual blood donation drive in collaboration with Red Cross Society.', date: '2026-06-14', time: '08:00 AM - 02:00 PM', location: 'Primary Health Center, Naidupalli', category: 'Health', isUpcoming: true, image_url: '/sri-ram-youth/photos/youth-committee-banner.jpg' },
  { id: 4, title: 'Environment Day Tree Plantation', description: 'Planting 500+ saplings across village roads and school premises.', date: '2026-06-05', time: '07:00 AM - 11:00 AM', location: 'Village Roads & Schools', category: 'Environment', isUpcoming: true, image_url: '/sri-ram-youth/photos/memories/04.jpeg' },
  { id: 5, title: 'Annual Sports Tournament', description: 'Kabaddi, Volleyball, and Cricket tournament for youth.', date: '2025-12-20', time: '08:00 AM - 06:00 PM', location: 'Village Sports Ground', category: 'Sports', isUpcoming: false, image_url: '/sri-ram-youth/photos/memories/05.jpeg' },
  { id: 6, title: 'Diwali Cultural Evening', description: 'Traditional dance, music, and drama performances by youth members.', date: '2025-10-31', time: '06:00 PM - 10:00 PM', location: 'Community Hall, Naidupalli', category: 'Culture', isUpcoming: false, image_url: '/sri-ram-youth/photos/memories/01.jpeg' },
];

const highlights: HighlightItem[] = [
  { id: 1, icon: Heart, title: 'Community Spirit', description: 'Bringing youth together through devotion, culture and service since 2010.', color: 'text-gold', bgColor: 'bg-gold-light' },
  { id: 2, icon: Users, title: '150+ Active Volunteers', description: 'Dedicated youth members serving the community across various initiatives.', color: 'text-primary', bgColor: 'bg-primary-light' },
  { id: 3, icon: Award, title: 'District Best Youth Org', description: 'Awarded "Best Youth Organization" by SPSR Nellore District for 3 consecutive years.', color: 'text-emerald', bgColor: 'bg-emerald-light' },
  { id: 4, icon: Users, title: '5000+ Hours Service', description: 'Cumulative community service hours contributed by our volunteers annually.', color: 'text-blue', bgColor: 'bg-blue-light' },
  { id: 5, icon: Music, title: 'Cultural Preservation', description: 'Preserving traditional art forms - Kolatam, Burrakatha, and Harikatha.', color: 'text-purple', bgColor: 'bg-purple-light' },
  { id: 6, icon: Coffee, title: 'Youth Fellowship', description: 'Weekly gatherings for spiritual growth, skill development, and fellowship.', color: 'text-orange', bgColor: 'bg-orange-light' },
];

export const SriRamYouthPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'events' | 'highlights'>('photos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredPhotos = photoGallery;
  const filteredVideos = videoGallery;
  const upcomingEvents = youthEvents.filter(e => e.isUpcoming);
  const pastEvents = youthEvents.filter(e => !e.isUpcoming);

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const openVideoModal = (video: VideoItem) => {
    setSelectedVideo(video);
    setVideoModalOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setSelectedVideo(null);
  };
  const nextPhoto = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentPhotoIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1)); };
  const prevPhoto = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentPhotoIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1)); };

  return (
    <div className="min-h-screen bg-page-bg">
      {/* Header */}
      <section className="bg-gradient-to-r from-gold-light/50 via-white to-gold-light/50 pt-12 pb-16 border-b border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-light text-gold mb-6 shadow-lg">
            <Heart className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 flex items-center justify-center gap-3">
            <span role="img" aria-label="praying hands">🙏</span> {t('sriRamYouth.title')}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
            A vibrant youth community dedicated to preserving culture, serving society, and building leadership since 2010.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gold/30 text-text-secondary text-sm">
              <Users size={14} className="inline mr-1" /> 150+ Active Members
            </span>
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gold/30 text-text-secondary text-sm">
              <Award size={14} className="inline mr-1" /> 15+ Years of Service
            </span>
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gold/30 text-text-secondary text-sm">
              <Heart size={14} className="inline mr-1" /> 5000+ Service Hours/Year
            </span>
          </div>
        </div>
      </section>

      {/* Tabs / Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sticky top-20 z-10 bg-white/95 backdrop-blur-sm border-b border-border-color">
        <div className="flex justify-center border-b border-border-color">
          <div className="flex space-x-1" role="tablist">
            <button role="tab" aria-selected={activeTab === 'photos'} onClick={() => setActiveTab('photos')} className={`px-4 py-3 font-medium transition-all border-b-2 ${activeTab === 'photos' ? 'border-gold text-gold' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
              <Camera className="w-4 h-4 inline mr-2" /> {t('sriRamYouth.photos')}
            </button>
            <button role="tab" aria-selected={activeTab === 'videos'} onClick={() => setActiveTab('videos')} className={`px-4 py-3 font-medium transition-all border-b-2 ${activeTab === 'videos' ? 'border-gold text-gold' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
              <Film className="w-4 h-4 inline mr-2" /> {t('sriRamYouth.videos')}
            </button>
            <button role="tab" aria-selected={activeTab === 'events'} onClick={() => setActiveTab('events')} className={`px-4 py-3 font-medium transition-all border-b-2 ${activeTab === 'events' ? 'border-gold text-gold' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
              <Calendar className="w-4 h-4 inline mr-2" /> {t('sriRamYouth.events')}
            </button>
            <button role="tab" aria-selected={activeTab === 'highlights'} onClick={() => setActiveTab('highlights')} className={`px-4 py-3 font-medium transition-all border-b-2 ${activeTab === 'highlights' ? 'border-gold text-gold' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
              <ImageIcon className="w-4 h-4 inline mr-2" /> {t('sriRamYouth.highlights')}
            </button>
          </div>
        </div>
      </section>

      {/* Photo Gallery Tab */}
      {activeTab === 'photos' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gold-light flex items-center justify-center">
                <Camera className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">{t('sriRamYouth.gallery')}</h2>
                <p className="text-text-secondary text-sm">{filteredPhotos.length} photos • Updated regularly</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-gold hover:bg-gold/10">
                <ArrowRight size={16} className="mr-1" /> {t('sriRamYouth.photos')}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredPhotos.map((photo, index) => (
              <article key={photo.id} className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-white" onClick={() => openLightbox(index)}>
                <div className="relative aspect-square">
                  <img
                    src={photo.image_url}
                    alt={t(photo.title)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded-full bg-gold text-gold-dark text-xs font-medium">{t(photo.category)}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="font-semibold text-lg line-clamp-1">{t(photo.title)}</h3>
                    <p className="text-white/80 text-sm">{new Date(photo.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg text-gold hover:bg-white transition-colors" onClick={(e) => { e.stopPropagation(); openLightbox(index); }}>
                      <ImageIcon size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-text-secondary text-sm line-clamp-2">{t(photo.description)}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/sri-ram-youth">
              <Button variant="secondary" size="lg" className="gap-2">
                {t('common.viewAll')} {t('sriRamYouth.photos')}
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Video Gallery Tab */}
      {activeTab === 'videos' && (
        <section className="bg-page-bg/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold-light flex items-center justify-center">
                  <Film className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">{t('sriRamYouth.videos')}</h2>
                  <p className="text-text-secondary text-sm">{filteredVideos.length} videos • HD quality</p>
                </div>
              </div>
              <Button variant="ghost" className="text-gold hover:bg-gold/10" disabled>
                <ArrowRight size={16} className="mr-1" /> {t('sriRamYouth.videos')}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <article key={video.id} className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video bg-gray-200">
                    <img
                      src={video.thumbnail_url}
                      alt={t(video.title)}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => openVideoModal(video)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <button
                        className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-xl text-gold cursor-pointer pointer-events-auto hover:scale-110 transition-transform group-hover:scale-110"
                        onClick={() => openVideoModal(video)}
                      >
                        <Play className="w-6 h-6 ml-1" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="px-2 py-1 rounded-full bg-gold text-gold-dark text-xs font-medium">VIDEO</span>
                      <span className="ml-2 text-xs bg-black/50 px-2 py-1 rounded">{video.duration}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-text-primary mb-2 group-hover:text-gold transition-colors line-clamp-1">{t(video.title)}</h3>
                    <p className="text-text-secondary text-sm mb-3 line-clamp-2">{t(video.description)}</p>
                    <div className="flex items-center justify-between text-sm text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(video.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <Button variant="ghost" size="sm" className="text-gold hover:bg-gold/10 p-1" onClick={() => openVideoModal(video)}>
                        <Play size={14} className="mr-1" /> {t('sriRamYouth.watch') || 'Watch'}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Upcoming Events */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold-light flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">{t('sriRamYouth.upcomingEvents')}</h2>
                  <p className="text-text-secondary text-sm">{upcomingEvents.length} events scheduled</p>
                </div>
              </div>
              <Button variant="ghost" className="text-gold hover:bg-gold/10" disabled>
                <ArrowRight size={16} className="mr-1" /> {t('sriRamYouth.events')}
              </Button>
            </div>

            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} variant="bordered" hoverable padding="none" className="overflow-hidden bg-gradient-to-r from-white to-gold-light/20">
                  <div className="flex flex-col md:flex-row">
                    {event.image_url && (
                      <div className="relative md:w-64 flex-shrink-0">
                        <img
                          src={event.image_url}
                          alt={t(event.title)}
                          className="w-full h-full md:h-auto object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent" />
                      </div>
                    )}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="gold">{t(event.category)}</Badge>
                        <Badge variant="primary" className="bg-primary/10 text-primary">{t('common.upcoming') || 'Upcoming'}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary mb-3">{t(event.title)}</h3>
                      <p className="text-text-secondary mb-4 flex-1">{t(event.description)}</p>
                      <div className="flex flex-wrap gap-6 text-sm text-text-secondary border-t border-border-color pt-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gold" />
                          <span>{new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gold" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-gold" />
                          <span className="truncate max-w-xs">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">{t('sriRamYouth.pastEvents')}</h2>
                  <p className="text-text-secondary text-sm">{pastEvents.length} completed events</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} variant="outlined" hoverable padding="lg" className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-text-secondary" />
                    </div>
                    <div>
                      <Badge variant="gray" size="sm">{t(event.category)}</Badge>
                      <Badge variant="gray" className="ml-2 bg-gray-100 text-text-secondary">{t('common.completed') || 'Completed'}</Badge>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-text-primary mb-2">{t(event.title)}</h3>
                  <p className="text-text-secondary text-sm mb-4 flex-1">{t(event.description)}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-text-secondary pt-4 border-t border-border-color">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights Tab */}
      {activeTab === 'highlights' && (
        <section className="bg-page-bg/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold-light flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">{t('sriRamYouth.highlights')}</h2>
                  <p className="text-text-secondary text-sm">Key achievements and milestones</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((highlight) => {
                const Icon = highlight.icon;
                return (
                  <Card key={highlight.id} variant="bordered" hoverable padding="lg" className="text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-gold/5 group-hover:to-transparent transition-all duration-500" />
                    <div className="relative">
                      <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${highlight.bgColor} transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                        <Icon size={36} className={highlight.color} />
                      </div>
                      <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-gold transition-colors">{t(highlight.title)}</h3>
                      <p className="text-text-secondary leading-relaxed">{t(highlight.description)}</p>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* About Section */}
            <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gold-light/30 via-white to-primary-light/30 border border-gold/20">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-3xl font-bold text-text-primary mb-6 flex items-center justify-center gap-3">
                  <Heart className="w-8 h-8 text-gold" />
                  {t('sriRamYouth.about')}
                </h3>
                <div className="prose prose-gray max-w-none text-text-secondary leading-relaxed text-left">
                  <p className="mb-4 text-lg">
                    Sri Ram Youth Association, established in 2010, is a community-driven organization dedicated to the holistic development of youth in Naidupalli village.
                    We believe in the power of collective action to bring positive change to our community.
                  </p>
                  <p className="mb-4">
                    Our mission encompasses three core pillars: <strong className="text-text-primary">Cultural Preservation</strong> - keeping our traditions alive through festivals, arts, and heritage activities;
                    <strong className="text-text-primary">Community Service</strong> - serving society through health camps, environmental initiatives, and social welfare programs; and
                    <strong className="text-text-primary">Youth Development</strong> - nurturing leadership, skills, and values among young people.
                  </p>
                  <p className="mb-4">
                    Over the past 15 years, we have organized 200+ events, engaged 150+ active volunteers, contributed 50,000+ service hours,
                    and touched the lives of thousands in our village and surrounding areas. Our work has been recognized at district and state levels.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center p-4 bg-white/50 rounded-xl">
                      <div className="text-3xl font-bold text-gold mb-1">15+</div>
                      <div className="text-text-secondary text-sm">Years of Service</div>
                    </div>
                    <div className="text-center p-4 bg-white/50 rounded-xl">
                      <div className="text-3xl font-bold text-gold mb-1">200+</div>
                      <div className="text-text-secondary text-sm">Events Organized</div>
                    </div>
                    <div className="text-center p-4 bg-white/50 rounded-xl">
                      <div className="text-3xl font-bold text-gold mb-1">50K+</div>
                      <div className="text-text-secondary text-sm">Service Hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Join Us CTA */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 p-6 bg-gold text-gold-dark rounded-2xl">
                <div className="w-14 h-14 rounded-full bg-gold-dark/20 flex items-center justify-center">
                  <Users className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-bold mb-1">{t('sriRamYouth.joinUs')}</h4>
                  <p className="text-gold-dark/90">Be part of our growing family. Volunteer, participate, and make a difference.</p>
                </div>
                <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-gold-dark ml-4">
                  {t('sriRamYouth.joinUs')} <ArrowRight size={20} />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal for Photos */}
      {lightboxOpen && filteredPhotos[currentPhotoIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <button className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50" onClick={closeLightbox} aria-label="Close lightbox">
            <X size={32} />
          </button>

          {filteredPhotos.length > 1 && (
            <>
              <button className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50" onClick={prevPhoto} aria-label="Previous photo">
                <ChevronLeft size={36} />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50" onClick={nextPhoto} aria-label="Next photo">
                <ChevronRight size={36} />
              </button>
            </>
          )}

          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center px-12" onClick={e => e.stopPropagation()}>
            <img
              src={filteredPhotos[currentPhotoIndex].image_url}
              alt={t(filteredPhotos[currentPhotoIndex].title)}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="text-center mt-6 text-white max-w-2xl">
              <Badge variant="gray" className="mb-3 bg-white/10 text-white border-white/20">{t(filteredPhotos[currentPhotoIndex].category)}</Badge>
              <h3 className="text-2xl font-bold mb-2">{t(filteredPhotos[currentPhotoIndex].title)}</h3>
              <p className="text-white/60 text-sm mb-4">{t(filteredPhotos[currentPhotoIndex].description)}</p>
              <p className="text-white/40 text-sm">
                {new Date(filteredPhotos[currentPhotoIndex].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="text-white/50 text-sm">{currentPhotoIndex + 1} / {filteredPhotos.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModalOpen && selectedVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={closeVideoModal}
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
        >
          <button className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50" onClick={closeVideoModal} aria-label="Close video">
            <X size={32} />
          </button>

          <div className="relative max-w-5xl w-full flex flex-col items-center justify-center px-4 sm:px-12" onClick={e => e.stopPropagation()}>
            <video
              src={selectedVideo.video_url}
              poster={selectedVideo.thumbnail_url}
              controls
              autoPlay
              className="w-full max-h-[70vh] object-contain rounded-lg shadow-2xl bg-black"
            />
            <div className="text-center mt-6 text-white max-w-2xl w-full">
              <h3 className="text-2xl font-bold mb-2">{t(selectedVideo.title)}</h3>
              <p className="text-white/60 text-sm mb-4">{t(selectedVideo.description)}</p>
              <div className="flex justify-center items-center gap-4 text-white/40 text-sm">
                <span>
                  {new Date(selectedVideo.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span>•</span>
                <span>{selectedVideo.duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};