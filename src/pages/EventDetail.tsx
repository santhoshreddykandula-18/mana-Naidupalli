import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { events } from '../data/mockDb';
import { useLanguage } from '../context/LanguageContext';

const categoryColors: Record<string, string> = {
  Festival: 'gold',
  Temple: 'gold',
  Cricket: 'primary',
  Cultural: 'gold',
  Education: 'blue',
  'Village Meeting': 'blue',
  Other: 'default',
};

export function EventDetail() {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">{t('common.error')}: Event Not Found</h2>
        <p className="text-text-secondary mb-6">{t('common.noData')}</p>
        <Link to="/events">
          <Button variant="primary" className="gap-2">
            <ArrowLeft size={16} />
            {t('common.viewAll')} {t('events.title')}
          </Button>
        </Link>
      </div>
    );
  }

  const variant = categoryColors[event.category] || 'default';
  const eventDate = new Date(event.date);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/events" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6">
        <ArrowLeft size={18} />
        {t('common.viewAll')} {t('events.title')}
      </Link>

      <article>
        {event.image_url && (
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge variant={variant as any} className="shadow-lg">{event.category}</Badge>
            </div>
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{event.title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-text-secondary">
              <Calendar size={18} className="text-primary" />
              <div>
                <p className="text-text-primary font-medium">{eventDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="text-text-secondary flex items-center gap-1">
                  <Clock size={14} />
                  {event.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <MapPin size={18} className="text-primary" />
              <div>
                <p className="text-text-primary font-medium">{t('common.location') || 'Location'}</p>
                <p className="text-text-secondary">{event.location}</p>
              </div>
            </div>
            {event.organizer && (
              <div className="flex items-center gap-2 text-text-secondary">
                <Users size={18} className="text-primary" />
                <div>
                  <p className="text-text-primary font-medium">{t('common.organizer') || 'Organizer'}</p>
                  <p className="text-text-secondary">{event.organizer}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        <Card variant="outlined" padding="lg">
          <CardContent>
            <h2 className="text-xl font-semibold text-text-primary mb-4">{t('common.about') || 'About This Event'}</h2>
            <div className="prose prose-gray max-w-none text-text-secondary leading-relaxed">
              <p className="whitespace-pre-line">{event.description}</p>
            </div>
          </CardContent>
        </Card>

        {event.organizer && (
          <Card variant="outlined" padding="lg" className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 size={20} className="text-primary" />
                {t('common.relatedAnnouncements') || 'Related Announcements'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">Check related announcements for more details about this event.</p>
            </CardContent>
          </Card>
        )}
      </article>
    </div>
  );
}