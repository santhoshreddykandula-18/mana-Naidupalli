import { useState, useMemo } from 'react';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { galleryItems } from '../data/mockDb';
import { clsx } from 'clsx';
import { useLanguage } from '../context/LanguageContext';

const categories = [
  { key: 'All', label: 'gallery.category.all' },
  { key: 'Village', label: 'gallery.category.village' },
  { key: 'Temples', label: 'gallery.category.temples' },
  { key: 'Cricket', label: 'gallery.category.cricket' },
  { key: 'Festivals', label: 'gallery.category.festivals' },
  { key: 'Education', label: 'gallery.category.education' },
  { key: 'Culture', label: 'gallery.category.culture' },
  { key: 'Nature', label: 'gallery.category.nature' },
];

export function GalleryPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title={t('gallery.title')}
        subtitle={t('gallery.subtitle')}
      />

      {/* Filters & Search */}
      <Card variant="outlined" padding="md" className="mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border',
                    activeCategory === cat.key
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-white text-text-secondary border-border-color hover:text-text-primary hover:bg-gray-50'
                  )}
                >
                  {t(cat.label)}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder={`${t('common.search')}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-color rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      {/* Masonry-style Grid Container */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer rounded-2xl overflow-hidden relative bg-gray-100 aspect-square md:aspect-auto md:h-64 lg:h-72"
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.image_url}
                alt={t(item.title)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <Badge variant="gray" size="sm" className="mb-2 bg-white/20 text-white border border-white/30 backdrop-blur-md">{t(item.category)}</Badge>
                <h3 className="font-semibold text-lg line-clamp-1">{t(item.title)}</h3>
                {item.date && (
                  <p className="text-white/80 text-xs mt-1">
                    {new Date(item.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card variant="outlined" padding="lg" className="text-center bg-gray-50 border-dashed">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Search className="text-text-secondary" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">{t('common.noData')}</h3>
          <p className="text-text-secondary">Try adjusting your category or search query.</p>
        </Card>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && filteredItems[currentIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          {/* Navigation Controls */}
          {filteredItems.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
                onClick={prevImage}
              >
                <ChevronLeft size={36} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
                onClick={nextImage}
              >
                <ChevronRight size={36} />
              </button>
            </>
          )}

          {/* Main Image or Video */}
          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center px-12" onClick={e => e.stopPropagation()}>
            {filteredItems[currentIndex].type === 'video' || filteredItems[currentIndex].video_url ? (
              <video
                src={filteredItems[currentIndex].video_url || filteredItems[currentIndex].image_url}
                controls
                autoPlay
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
            ) : (
              <img
                src={filteredItems[currentIndex].image_url}
                alt={t(filteredItems[currentIndex].title)}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
            )}
            <div className="text-center mt-6 text-white max-w-2xl">
              <Badge variant="gray" className="mb-3 bg-white/10 text-white border-white/20">{t(filteredItems[currentIndex].category)}</Badge>
              <h3 className="text-2xl font-bold mb-2">{t(filteredItems[currentIndex].title)}</h3>
              {filteredItems[currentIndex].date && (
                <p className="text-white/60 text-sm">
                  {new Date(filteredItems[currentIndex].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}