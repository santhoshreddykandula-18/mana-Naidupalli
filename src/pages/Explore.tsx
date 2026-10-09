import { Link } from 'react-router-dom';
import {
  Bell,
  Calendar,
  Building2,
  Trophy,
  Leaf,
  Landmark,
  Images,
  Users,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { quickAccessItems } from '../data/mockDb';
import { clsx } from 'clsx';
import { useLanguage } from '../context/LanguageContext';

function ExploreCard({ item }: { item: typeof quickAccessItems[0] }) {
  const iconComponents: Record<string, React.ComponentType<{ size?: number }>> = {
    bell: Bell,
    calendar: Calendar,
    'building-2': Building2,
    trophy: Trophy,
    leaf: Leaf,
    landmark: Landmark,
    images: Images,
    users: Users,
  };

  const Icon = iconComponents[item.icon] || Bell;

  const colorStyles: Record<string, string> = {
    primary: 'bg-primary-light border-primary/20',
    blue: 'bg-blue-light border-blue-primary/20',
    gold: 'bg-gold-light border-gold/20',
    secondary: 'bg-gray-100 border-gray-300/50',
  };

  const iconColorStyles: Record<string, string> = {
    primary: 'text-primary',
    blue: 'text-blue-primary',
    gold: 'text-gold',
    secondary: 'text-text-secondary',
  };

  return (
    <Link to={item.route} className="group">
      <Card
        variant="outlined"
        hoverable
        padding="lg"
        className={clsx('h-full flex flex-col', colorStyles[item.color])}
      >
        <CardContent className="flex-1 flex flex-col">
          <div className={clsx('w-16 h-16 rounded-2xl flex items-center justify-center mb-6', `${iconColorStyles[item.color]} ${colorStyles[item.color]}`)}>
            <Icon size={32} />
          </div>
          <h3 className="font-semibold text-xl text-text-primary mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
          <p className="text-text-secondary text-base flex-1 mb-6">{item.description}</p>
          <div className="flex items-center justify-end">
            <Button variant="ghost" size="sm" className="group-hover:bg-primary/10">
              Explore <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function ExplorePage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <section className="mb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {t('hero.explore')}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccessItems.map((item) => (
            <ExploreCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      {/* Village Location */}
      <section className="bg-page-bg rounded-2xl p-6 md:p-8 border border-border-color">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center">
              <Building2 className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-text-primary">Naidupalli Village</h3>
              <p className="text-text-secondary text-sm">Duttalur Mandal</p>
              <p className="text-text-secondary text-sm">SPSR Nellore District</p>
              <p className="text-text-secondary text-sm">Andhra Pradesh, India</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-text-secondary text-sm">📍 Find us on the map</p>
            <p className="text-text-secondary text-xs mt-1">PIN: 524xxx</p>
          </div>
        </div>
      </section>
    </div>
  );
}