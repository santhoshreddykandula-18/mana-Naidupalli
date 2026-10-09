import { useState, useEffect } from 'react';
import { Search, BookOpen, Tag, Loader2, RefreshCw } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { announcementsService } from '../lib/services';
import type { Announcement } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const AnnouncementsPage = () => {
  const { t } = useLanguage();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "General", "Festival", "Temple", "Government", "Education", "Cricket", "Agriculture", "Emergency", "Other"];

  // Fetch true data
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      // Fallback/mock data until service is active, then override
      setAnnouncements(fallbackAnnouncements as any);

      // Attempt actual fetch
      const data = await announcementsService.getAll();
      if (data && data.length > 0) {
        setAnnouncements(data);
      }
    } catch (err) {
      console.error('Failed to load announcements:', err);
      // Keep fallback data if error
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Emergency': return 'emergency';
      case 'Agriculture': return 'green';
      case 'Government': return 'blue';
      case 'Temple':
      case 'Festival': return 'gold';
      default: return 'gray';
    }
  };

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ann.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || ann.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-100 to-white pt-12 pb-10 border-b border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-200 text-gray-700 mb-5">
            <BookOpen className="w-7 h-7" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {t('announcements.title')}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            {t('announcements.subtitle')}
          </p>
        </div>
      </section>

      {/* Filter and Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-border-color sticky top-[64px] z-10 bg-white/95 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
          {/* Categories */}
          <div className="flex-1 w-full overflow-x-auto pb-2 -mb-2 no-scrollbar">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-page-bg text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {t(`announcements.categories.${cat.toLowerCase()}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="w-full lg:w-72 flex-shrink-0 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`${t('common.search')}...`}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-color focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow bg-white"
            />
            <Search className="w-5 h-5 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div className="space-y-6 max-w-4xl mx-auto">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-text-secondary">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <p>Loading announcements...</p>
            </div>
          ) : filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((ann) => (
              <Card key={ann.id} variant="bordered" hoverable className="overflow-hidden flex flex-col md:flex-row">
                {ann.image_url && (
                  <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 relative">
                    <img src={ann.image_url} alt={ann.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <Badge variant={getCategoryColor(ann.category) as any}>{ann.category}</Badge>
                    <span className="text-sm font-medium text-text-secondary">
                      {new Date(ann.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-2">
                    {ann.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                    <Tag className="w-4 h-4" />
                    <span>{t('common.by')}: {ann.author}</span>
                  </div>

                  <p className="text-text-secondary mb-6 line-clamp-3">
                    {ann.content}
                  </p>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">{t('announcements.noResults')}</h3>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">
                We couldn't find any announcements matching your search criteria. Try selecting "All" categories or changing your search terms.
              </p>
              <Button variant="ghost" className="gap-2" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
                <RefreshCw className="w-4 h-4" /> {t('common.clearFilters')}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Fallback mock data - empty array since no mock data provided by user
const fallbackAnnouncements: any[] = [];