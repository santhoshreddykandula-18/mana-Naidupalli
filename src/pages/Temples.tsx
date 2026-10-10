import { Calendar, Info, MapPin } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { temples } from '../data/mockDb';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function TempleCard({ temple }: { temple: typeof temples[0] }) {
  const { t } = useLanguage();
  return (
    <Link to={`/temples/${temple.id}`}>
      <Card variant="default" hoverable padding="md" className="h-full flex flex-col border-gold-light/50 overflow-hidden">
        {temple.image_url && (
          <div className="relative -mx-6 -mt-6 mb-4">
            <img
              src={temple.image_url}
              alt={t(temple.name)}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <Badge variant="gold" className="mb-1">{temple.festival}</Badge>
            </div>
          </div>
        )}
        <CardContent className="flex-1 flex flex-col pt-2">
          <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-1 group-hover:text-gold transition-colors">{t(temple.name)}</h3>

          <div className="space-y-2 mt-auto pt-4 border-t border-border-color">
            <div className="flex items-center gap-2 text-text-secondary text-sm">
              <Calendar size={16} className="text-gold" />
              <span className="truncate">{temple.festival}</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary text-sm">
              <MapPin size={16} className="text-gold" />
              <span className="truncate">{temple.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function TemplesPage() {
  const { t } = useLanguage();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title={t('temples.title')}
        subtitle={t('temples.subtitle')}
      />

      {/* Featured Temple (First Temple in list) */}
      {temples.length > 0 && (
        <section className="mb-12">
          <Card variant="outlined" padding="none" className="bg-gold-light/20 border-gold/20 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {temples[0].image_url && (
                <div className="h-64 md:h-full relative">
                  <img
                    src={temples[0].image_url}
                    alt={temples[0].name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 md:from-black/40 via-transparent to-transparent" />
                </div>
              )}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <Badge variant="gold" className="w-fit mb-4">{t('temples.featured')}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">{temples[0].name}</h2>
                <h3 className="text-gold font-medium mb-4">{temples[0].festival}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-text-secondary text-sm">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Calendar size={16} className="text-gold" />
                    </div>
                    <span>{temples[0].festival}</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary text-sm">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <MapPin size={16} className="text-gold" />
                    </div>
                    <span>{temples[0].location}</span>
                  </div>
                </div>
                <Link to={`/temples/${temples[0].id}`}>
                  <Button variant="secondary" className="w-fit border-gold text-gold hover:bg-gold hover:text-white">
                    <Info size={16} className="mr-2" />
                    {t('common.viewAll') || 'View Details'}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* All Temples Grid */}
      {temples.length > 1 && (
        <>
          <h3 className="text-xl font-bold text-text-primary mb-6">{t('temples.otherTemples')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {temples.slice(1).map((temple) => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}