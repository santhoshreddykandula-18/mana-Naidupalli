import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { announcements } from '../data/mockDb';
import { useLanguage } from '../context/LanguageContext';

const categoryColors: Record<string, string> = {
  General: 'default',
  Festival: 'gold',
  Temple: 'gold',
  Government: 'blue',
  Education: 'blue',
  Cricket: 'primary',
  Agriculture: 'primary',
  Emergency: 'emergency',
};

export function AnnouncementDetail() {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const announcement = announcements.find(a => a.id === id);

  if (!announcement) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">Announcement Not Found</h2>
        <p className="text-text-secondary mb-6">The announcement you're looking for doesn't exist.</p>
        <Link to="/announcements">
          <Button variant="primary" className="gap-2">
            <ArrowLeft size={16} />
            {t('common.viewAll')} {t('announcements.title')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/announcements" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6">
        <ArrowLeft size={18} />
        {t('common.viewAll')} {t('announcements.title')}
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge variant={categoryColors[announcement.category] as any}>{announcement.category}</Badge>
            <span className="text-text-secondary text-sm">{new Date(announcement.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{announcement.title}</h1>
          <div className="flex items-center gap-4 text-text-secondary text-sm">
            <span className="flex items-center gap-1">
              <User size={16} />
              {t('common.by') || 'By'} {announcement.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {new Date(announcement.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </header>

        {announcement.image_url && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img
              src={announcement.image_url}
              alt={announcement.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        )}

        <Card variant="outlined" padding="lg">
          <CardContent>
            <div className="prose prose-gray max-w-none text-text-secondary leading-relaxed">
              <p className="whitespace-pre-line">{announcement.content}</p>
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}