import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Building, ArrowLeft, Bell, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { temples } from '../data/mockDb';
import { useLanguage } from '../context/LanguageContext';

export function TempleDetail() {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const temple = temples.find(t => t.id === id);

  if (!temple) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">{t('common.error')}: Temple Not Found</h2>
        <p className="text-text-secondary mb-6">{t('common.noData')}</p>
        <Link to="/temples">
          <Button variant="primary" className="gap-2">
            <ArrowLeft size={16} className="mr-2" />
            {t('common.viewAll')} {t('temples.title')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/temples" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6">
        <ArrowLeft size={18} />
        {t('common.viewAll')} {t('temples.title')}
      </Link>

      <article>
        {temple.image_url && (
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <img
              src={temple.image_url}
              alt={temple.name}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <Badge variant="gold" className="mb-2">{temple.festival}</Badge>
              <h1 className="text-2xl md:text-3xl font-bold">{temple.name}</h1>
            </div>
          </div>
        )}

        {!temple.image_url && (
          <header className="mb-8">
            <Badge variant="gold" className="mb-3">{temple.festival}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{temple.name}</h1>
          </header>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card variant="outlined" padding="lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame size={20} className="text-gold" />
                  {t('common.festivals') || 'Festivals & Celebrations'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">{temple.festival}</p>
                <p className="text-text-secondary mt-2 text-sm">Special poojas and cultural events are organized during the annual festival. The temple is beautifully decorated and attracts devotees from neighboring villages.</p>
              </CardContent>
            </Card>

            <Card variant="outlined" padding="lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building size={20} className="text-primary" />
                  {t('common.visitInfo') || 'Visit Information'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                      <Calendar size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{t('common.annualFestival') || 'Annual Festival'}</p>
                      <p className="text-text-secondary">{temple.festival}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{t('common.location') || 'Location'}</p>
                      <p className="text-text-secondary">{temple.location || 'Naidupalli Village'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card variant="outlined" padding="lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={20} className="text-gold" />
                  {t('common.quickInfo') || 'Quick Info'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="pt-4 border-t border-border-color">
                  <p className="text-text-secondary text-sm font-medium">{t('common.annualFestival') || 'Annual Festival'}</p>
                  <p className="text-text-primary font-semibold">{temple.festival}</p>
                </div>
                <div className="pt-4 border-t border-border-color">
                  <p className="text-text-secondary text-sm font-medium">{t('common.location') || 'Location'}</p>
                  <p className="text-text-primary font-semibold">{temple.location || 'Naidupalli Village'}</p>
                </div>
              </CardContent>
            </Card>

            <Card variant="outlined" padding="lg" className="bg-gold-light/30 border-gold/20">
              <CardContent className="text-center">
                <p className="text-text-secondary text-sm mb-4">{t('common.contribute') || 'Want to contribute to temple maintenance or events?'}</p>
                <a href="mailto:temple@mananaidupalli.in" className="inline-block">
                  <Button variant="secondary" className="border-gold text-gold hover:bg-gold hover:text-white">
                    {t('common.contactCommittee') || 'Contact Temple Committee'}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </article>
    </div>
  );
}