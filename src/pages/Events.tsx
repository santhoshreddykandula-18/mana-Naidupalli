import { useState, useMemo } from 'react';
import { Search, Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { events } from '../data/mockDb';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const tabs = [
  { key: 'Upcoming', label: 'events.tab.upcoming' },
  { key: 'Past', label: 'events.tab.past' },
  { key: 'All', label: 'events.tab.all' }
];
const categories = [
  { key: 'All', label: 'events.category.all' },
  { key: 'Festival', label: 'events.category.festival' },
  { key: 'Temple', label: 'events.category.temple' },
  { key: 'Cricket', label: 'events.category.cricket' },
  { key: 'Cultural', label: 'events.category.cultural' },
  { key: 'Education', label: 'events.category.education' },
  { key: 'Village Meeting', label: 'events.category.villageMeeting' },
  { key: 'Other', label: 'events.category.other' }
];

const categoryColors: Record<string, string> = {
  Festival: 'gold',
  Temple: 'gold',
  Cricket: 'primary',
  Cultural: 'gold',
  Education: 'blue',
  'Village Meeting': 'blue',
  Other: 'default',
};

function EventCard({ event }: { event: typeof events[0] }) {
  const variant = categoryColors[event.category] || 'default';
  const { t } = useLanguage();

  return (
    <Link to={`/events/${event.id}`}>
      <Card variant="default" hoverable padding="none" className="h-full flex flex-col overflow-hidden">
        {event.image_url && (
          <div className="relative h-48">
            <img
              src={event.image_url}
              alt={t(event.title)}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <Badge variant={variant as any} className="shadow-lg">{t(event.category)}</Badge>
            </div>
          </div>
        )}
        <CardContent className="flex-1 flex flex-col p-5">
          <div className="flex items-start gap-4 mb-3">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary-light flex flex-col items-center justify-center text-primary-dark">
              <span className="text-2xl font-bold">{new Date(event.date).getDate()}</span>
              <span className="text-xs font-medium uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-text-primary mb-1 line-clamp-1 group-hover:text-primary transition-colors">{t(event.title)}</h4>
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
          <p className="text-text-secondary text-sm line-clamp-2 flex-1">{t(event.description)}</p>
          {event.organizer && (
            <div className="mt-3 pt-3 border-t border-border-color text-text-secondary text-xs">
              {t('common.organizer') || 'Organized by'}: {event.organizer}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export function EventsPage() {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past' | 'All'>('Upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { t } = useLanguage();

  const now = useMemo(() => new Date(), []);

  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => {
        const eventDate = new Date(e.date);
        const isUpcoming = eventDate >= now;
        const matchesTab = activeTab === 'All' || (activeTab === 'Upcoming' && isUpcoming) || (activeTab === 'Past' && !isUpcoming);
        const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
        return matchesTab && matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return activeTab === 'Past' ? dateB - dateA : dateA - dateB;
      });
  }, [activeTab, searchQuery, selectedCategory, now]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title={t('events.title')}
        subtitle={t('events.subtitle')}
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'Upcoming' | 'Past' | 'All')}
            className={clsx(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
              activeTab === tab.key
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-text-secondary hover:text-text-primary hover:bg-gray-50 border border-border-color'
            )}
          >
            {t(tab.label)}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <Card variant="outlined" padding="md" className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder={t('common.search') + '...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border-color rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
          >
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>{t(cat.label)}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <Card variant="outlined" padding="lg" className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Calendar className="text-text-secondary" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">{t('events.noEvents')}</h3>
          <p className="text-text-secondary">{t('events.adjustFilters')}</p>
        </Card>
      )}
    </div>
  );
}