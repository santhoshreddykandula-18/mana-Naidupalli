import { Link } from 'react-router-dom';
import {
  Calendar,
  Trophy,
  ArrowRight,
  Building,
  MapPin,
  Clock,
  Video,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import {
  announcements,
  events,
  temples,
  matches,
  galleryItems,
} from '../data/mockDb';
import { useLanguage } from '../context/LanguageContext';

function AnnouncementCard({ announcement }: { announcement: typeof announcements[0] }) {
  const { t } = useLanguage();
  return (
    <Link to={`/announcements/${announcement.id}`}>
      <Card variant="default" hoverable padding="md" className="h-full flex flex-col">
        <CardContent className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="primary" size="sm">{announcement.category}</Badge>
            <span className="text-text-secondary text-xs">{new Date(announcement.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <h4 className="font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">{t(announcement.title || '')}</h4>
          <p className="text-text-secondary text-sm flex-1 line-clamp-3">{announcement.content}</p>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-color">
            <span className="text-text-secondary text-xs">{announcement.author}</span>
            <ArrowRight size={14} className="text-primary" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function EventCard({ event }: { event: typeof events[0] }) {
  const { t } = useLanguage();
  return (
    <Link to={`/events/${event.id}`}>
      <Card variant="default" hoverable padding="md" className="h-full flex flex-col">
        {event.image_url && (
          <div className="relative -mx-6 -mt-6 mb-4">
            <img
              src={event.image_url}
              alt={t(event.title || '')}
              className="w-full h-40 object-cover rounded-t-2xl"
            />
          </div>
        )}
        <CardContent className="flex-1 flex flex-col">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary-light flex flex-col items-center justify-center text-primary-dark">
              <span className="text-2xl font-bold">{new Date(event.date).getDate()}</span>
              <span className="text-xs font-medium uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
            </div>
            <div className="flex-1 min-w-0">
              <Badge variant="blue" size="sm" className="mb-2">{event.category}</Badge>
              <h4 className="font-semibold text-text-primary mb-1 line-clamp-1 group-hover:text-primary transition-colors">{t(event.title || '')}</h4>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <Clock size={14} />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MapPin size={14} />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function TempleHighlightCard({ temple }: { temple: typeof temples[0] }) {
  const { t } = useLanguage();
  return (
    <Card variant="outlined" hoverable padding="none" className="h-full bg-gold-light/30 border-gold/20 overflow-hidden">
      {temple.image_url && (
        <div className="relative h-64 md:h-80">
          <img
            src={temple.image_url}
            alt={temple.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <Badge variant="gold" className="mb-2">{t('temples.featured')}</Badge>
            <h3 className="text-2xl font-bold mb-1">{temple.name}</h3>
            <p className="text-gold-light">{temple.deity}</p>
          </div>
        </div>
      )}
      <CardContent className="p-6">
        <h3 className="font-semibold text-text-primary mb-2">{temple.name}</h3>
        <p className="text-gold text-sm font-medium mb-3">{temple.deity}</p>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{temple.description}</p>
        <div className="space-y-2 text-sm text-text-secondary mb-4">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{temple.timings}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building size={16} />
            <span>{temple.festival}</span>
          </div>
        </div>
        <Link to={`/temples/${temple.id}`}>
          <Button variant="secondary" size="sm" className="w-full">
            {t('common.viewAll')}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function CricketHighlightCard() {
  const { t } = useLanguage();
  const upcomingMatch = matches.find(m => m.status === 'upcoming');
  const recentMatch = matches.find(m => m.status === 'completed');

  return (
    <Card variant="outlined" hoverable padding="none" className="h-full bg-primary-light/30 border-primary/20 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Trophy size={20} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-text-primary">{t('Naidupalli Cricket')}</h3>
        </div>

        {upcomingMatch && (
          <div className="space-y-4 mb-6">
            <div className="text-center">
              <span className="text-primary text-sm font-medium">{t('Upcoming Match')}</span>
              <div className="flex items-center justify-center gap-4 mt-2 flex-wrap">
                <div className="text-center">
                  <p className="font-semibold text-text-primary">{upcomingMatch.teams[0]}</p>
                </div>
                <span className="text-primary font-bold text-lg">VS</span>
                <div className="text-center">
                  <p className="font-semibold text-text-primary">{upcomingMatch.teams[1]}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-text-secondary flex-wrap">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(upcomingMatch.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{upcomingMatch.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{upcomingMatch.ground}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {recentMatch && (
          <div className="border-t border-primary/20 pt-4">
            <span className="text-primary text-sm font-medium">{t('Recent Result')}</span>
            <p className="text-text-secondary text-sm mt-2">{recentMatch.score}</p>
            <p className="text-primary font-medium text-sm mt-1">{t('Winner:')} {recentMatch.winner}</p>
          </div>
        )}

        <Link to="/cricket">
          <Button variant="primary" size="sm" className="w-full mt-6">
            {t('View Cricket Section')} <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

function GalleryGrid() {
  const { t } = useLanguage();
  const displayItems = galleryItems.slice(0, 6);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {displayItems.map((item) => (
        <Link key={item.id} to={`/gallery`} className="group">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
            <img
              src={item.image_url}
              alt={t(item.title || '')}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 right-3 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <Badge variant="gray" className="mb-1">{t(item.category || '')}</Badge>
              <p className="font-medium text-sm">{t(item.title || '')}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function SriRamYouthHighlight() {
  const { t } = useLanguage();
  return (
    <section className="mb-16">
      <SectionHeader
        title={t('sriRamYouth.title')}
        subtitle={t('sriRamYouth.subtitle')}
        action={
          <Link to="/sri-ram-youth">
            <Button variant="ghost" size="sm">
              {t('sriRamYouth.gallery')} <ArrowRight size={14} />
            </Button>
          </Link>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Featured Photo 1 */}
        <Link to="/sri-ram-youth" className="overflow-hidden group">
          <Card variant="outlined" hoverable padding="none" className="h-full">
          <div className="relative aspect-square">
            <img
              src="/sri-ram-youth/photos/youth-committee-banner.jpg"
              alt={t("Sri Ram Youth celebration")}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-semibold line-clamp-1">{t('sriRamYouth.sriRamaNavami')} 2026</h3>
              <p className="text-white/80 text-sm">{t('sriRamYouth.procession')}</p>
            </div>
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 rounded-full bg-gold text-gold-dark text-xs font-medium">{t('sriRamYouth.photo')}</span>
            </div>
          </div>
          </Card>
        </Link>

        {/* Featured Photo 2 */}
        <Link to="/sri-ram-youth" className="overflow-hidden group">
          <Card variant="outlined" hoverable padding="none" className="h-full">
          <div className="relative aspect-square">
            <img
              src="/sri-ram-youth/photos/bg3.png"
              alt={t("Sri Ram Youth community service")}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-semibold line-clamp-1">{t('sriRamYouth.communityService')}</h3>
              <p className="text-white/80 text-sm">{t('sriRamYouth.cleanup')}</p>
            </div>
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 rounded-full bg-gold text-gold-dark text-xs font-medium">{t('sriRamYouth.photo')}</span>
            </div>
          </div>
          </Card>
        </Link>

        {/* Featured Video 1 */}
        <Link to="/sri-ram-youth" className="overflow-hidden group">
          <Card variant="outlined" hoverable padding="none" className="h-full">
          <div className="relative aspect-square bg-gray-200">
            <img
              src="/sri-ram-youth/photos/bg2.png"
              alt={t("Video thumbnail")}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg text-gold cursor-pointer hover:scale-110 transition-transform group-hover:scale-110">
                <Video size={24} className="ml-1" />
              </div>
            </div>
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 rounded-full bg-blue-primary text-white text-xs font-medium">{t('sriRamYouth.video')}</span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="font-semibold">{t('sriRamYouth.kalyanam')}</h3>
              <p className="text-white/80 text-sm">{t('05 October 2026')}</p>
            </div>
          </div>
          </Card>
        </Link>

        {/* Featured Video 2 */}
        <Link to="/sri-ram-youth" className="overflow-hidden group">
          <Card variant="outlined" hoverable padding="none" className="h-full">
          <div className="relative aspect-square bg-gray-200">
            <img
              src="/sri-ram-youth/photos/ganesha-main.jpeg"
              alt={t("Video thumbnail")}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg text-gold cursor-pointer hover:scale-110 transition-transform group-hover:scale-110">
                <Video size={24} className="ml-1" />
              </div>
            </div>
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 rounded-full bg-blue-primary text-white text-xs font-medium">{t('sriRamYouth.video')}</span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="font-semibold">{t('sriRamYouth.culturalFestival')}</h3>
              <p className="text-white/80 text-sm">{t('25 December 2025')}</p>
            </div>
          </div>
          </Card>
        </Link>
      </div>
    </section>
  );
}

export function Home() {
  const { t } = useLanguage();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden mb-16">
        <div className="relative min-h-[320px] md:min-h-[384px] lg:min-h-[500px] flex items-center py-12">
          <div className="absolute inset-0 z-0">
            <img
              src="/sri-ram-youth/photos/bg3.png"
              alt="{t('Naidupalli Village')}"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-primary/50" />
          </div>
          <div className="relative z-10 w-full px-6 md:px-12 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-gold-light font-medium">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
              {t('A digital platform connecting our village, our people, our culture and our future.')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/explore">
                <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 border-white/30 text-white">
                  {t('hero.explore')} <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Announcements */}
      {announcements.length > 0 && (
      <section className="mb-16">
        <SectionHeader
          title={t('announcements.title')}
          subtitle={t('announcements.subtitle')}
          action={
            <Link to="/announcements">
              <Button variant="ghost" size="sm">
                {t('common.viewAll')} <ArrowRight size={14} />
              </Button>
            </Link>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.slice(0, 3).map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
      <section className="mb-16">
        <SectionHeader
          title={t('events.upcoming')}
          subtitle={t("Don't miss out on village festivals and gatherings")}
          action={
            <Link to="/events">
              <Button variant="ghost" size="sm">
                {t('common.viewAll')} <ArrowRight size={14} />
              </Button>
            </Link>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
      )}

      {/* Temple Highlight */}
      {temples.length > 0 && (
      <section className="mb-16">
        <SectionHeader
          title={t('Temples of Naidupalli')}
          subtitle={t('Our spiritual heritage and cultural centers')}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TempleHighlightCard temple={temples[0]} />
          <div className="grid grid-cols-1 gap-4">
            {temples.slice(1).map((temple) => (
              <Link key={temple.id} to={`/temples/${temple.id}`}>
                <Card variant="default" hoverable padding="md" className="h-full">
                  <CardContent className="flex flex-col">
                    <div className="flex items-start gap-3">
                      {temple.image_url && (
                        <img
                          src={temple.image_url}
                          alt={temple.name}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">{temple.name}</h4>
                        <p className="text-gold text-sm font-medium mb-2">{temple.deity}</p>
                        <p className="text-text-secondary text-sm line-clamp-2">{temple.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border-color">
                      <div className="flex items-center gap-2 text-text-secondary text-xs">
                        <Clock size={12} />
                        <span>{temple.timings}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary text-xs mt-1">
                        <Building size={12} />
                        <span>{temple.festival}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Sri Ram Youth Highlight */}
      <SriRamYouthHighlight />

      {/* Cricket Highlight */}
      <section className="mb-16">
        <SectionHeader
          title={t('cricket.title')}
          subtitle={t('cricket.subtitle')}
        />
        <CricketHighlightCard />
      </section>

      {/* Gallery Preview */}
      {galleryItems.length > 0 && (
      <section className="mb-16">
        <SectionHeader
          title={t('gallery.title')}
          subtitle={t('gallery.subtitle')}
          action={
            <Link to="/gallery">
              <Button variant="ghost" size="sm">
                {t('gallery.videos')} <ArrowRight size={14} />
              </Button>
            </Link>
          }
        />
        <GalleryGrid />
      </section>
      )}

      {/* Village Location */}
      <section className="bg-page-bg rounded-2xl p-6 md:p-8 border border-border-color">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-text-primary">{t('Naidupalli Village')}</h3>
              <p className="text-text-secondary text-sm">{t('Duttalur Mandal')}</p>
              <p className="text-text-secondary text-sm">{t('SPSR Nellore District')}</p>
              <p className="text-text-secondary text-sm">{t('Andhra Pradesh, India')}</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-text-secondary text-sm">📍 {t('Find us on the map')}</p>
            <p className="text-text-secondary text-xs mt-1">{t('PIN: 524xxx')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}