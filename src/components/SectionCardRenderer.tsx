import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Building,
  Trophy,
  Leaf,
  Video,
  Users,
  Image as ImageIcon,
  Bell,
  Landmark,
} from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { clsx } from 'clsx';
import type { SectionCard } from '../types';

interface SectionCardRendererProps {
  card: SectionCard;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  calendar: Calendar,
  clock: Clock,
  mapPin: MapPin,
  building: Building,
  trophy: Trophy,
  leaf: Leaf,
  video: Video,
  users: Users,
  image: ImageIcon,
  bell: Bell,
  landmark: Landmark,
};

function getIconComponent(iconName: string): React.ComponentType<{ size?: number }> {
  return ICON_MAP[iconName] || ImageIcon;
}

function parseContent(content?: string): Record<string, unknown> {
  if (!content) return {};
  try {
    return JSON.parse(content);
  } catch {
    return {};
  }
}


export function SectionCardRenderer({ card }: SectionCardRendererProps) {
  const content = parseContent(card.content) as Record<string, unknown>;

  const containerStyle: React.CSSProperties = {
    backgroundColor: card.background_color || undefined,
    color: card.text_color || undefined,
  };

  // Render based on card type
  switch (card.card_type) {
    case 'hero':
      return renderHeroCard(card, content, containerStyle);
    case 'featured':
      return renderFeaturedCard(card, content, containerStyle);
    case 'grid':
      return renderGridCard(card, content, containerStyle);
    case 'list':
      return renderListCard(card, content, containerStyle);
    case 'banner':
      return renderBannerCard(card, content, containerStyle);
    case 'highlight':
      return renderHighlightCard(card, content, containerStyle);
    case 'stats':
      return renderStatsCard(card, content, containerStyle);
    case 'cta':
      return renderCTACard(card, content, containerStyle);
    default:
      return renderDefaultCard(card, content, containerStyle);
  }
}

function renderHeroCard(card: SectionCard, content: any, containerStyle: React.CSSProperties) {

  if (!card.image_url) {
    return (
      <div style={containerStyle} className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-primary/50" />
        <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[320px] md:min-h-[384px] lg:min-h-[500px] flex items-center">
          <div className="w-full text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">{card.title}</h1>
            {card.subtitle && <p className="text-xl md:text-2xl mb-6 font-medium opacity-90">{card.subtitle}</p>}
            {content.description && <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">{content.description as string}</p>}
            {card.button_text && card.button_link && (
              <Link to={card.button_link}>
                <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 border-white/30 text-white">
                  {card.button_text} <ArrowRight size={20} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle} className="relative rounded-3xl overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={card.image_url}
          alt={card.image_alt || card.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-primary/50" />
      </div>
      <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[320px] md:min-h-[384px] lg:min-h-[500px] flex items-center">
        <div className="w-full text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">{card.title}</h1>
          {card.subtitle && <p className="text-xl md:text-2xl mb-6 font-medium opacity-90">{card.subtitle}</p>}
          {content.description && <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">{content.description as string}</p>}
          {card.button_text && card.button_link && (
            <Link to={card.button_link}>
              <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 border-white/30 text-white">
                {card.button_text} <ArrowRight size={20} />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function renderFeaturedCard(card: SectionCard, content: any, containerStyle: React.CSSProperties) {
  return (
    <Card variant="outlined" hoverable padding="none" className="h-full overflow-hidden" style={containerStyle}>
      {card.image_url && (
        <div className="relative h-64 md:h-80">
          <img
            src={card.image_url}
            alt={card.image_alt || card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {card.subtitle && <Badge variant="gold" className="mb-2">{card.subtitle}</Badge>}
            <h3 className="text-2xl font-bold mb-1">{card.title}</h3>
            {content.category && <p className="text-gold-light">{String(content.category)}</p>}
          </div>
        </div>
      )}
      <CardContent className="p-6">
        <h3 className="font-semibold text-text-primary mb-2">{card.title}</h3>
        {content.category && <p className="text-gold text-sm font-medium mb-3">{String(content.category)}</p>}
        {content.description && <p className="text-text-secondary text-sm mb-4 line-clamp-2">{String(content.description)}</p>}
        <div className="space-y-2 text-sm text-text-secondary mb-4">
          {content.timings && (
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{String(content.timings)}</span>
            </div>
          )}
          {content.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{String(content.location)}</span>
            </div>
          )}
        </div>
        {card.button_text && card.button_link && (
          <Link to={card.button_link}>
            <Button variant="secondary" size="sm" className="w-full">
              {card.button_text}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

function renderGridCard(card: SectionCard, content: any, containerStyle: React.CSSProperties) {
  const items = (content.items as Array<any>) || [];

  return (
    <div style={containerStyle} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">{card.title}</h2>
        {card.subtitle && <p className="text-text-secondary">{card.subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Link key={index} to={String(item.link) || '#'} className="group">
            <Card variant="default" hoverable padding="md" className="h-full flex flex-col">
              {item.image_url && (
                <div className="relative -mx-6 -mt-6 mb-4">
                  <img
                    src={String(item.image_url)}
                    alt={String(item.title) || ''}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  />
                </div>
              )}
              <CardContent className="flex-1 flex flex-col">
                <h4 className="font-semibold text-text-primary mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                  {String(item.title)}
                </h4>
                <p className="text-text-secondary text-sm flex-1 line-clamp-3">
                  {String(item.description) || ''}
                </p>
                {card.button_text && (
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-color">
                    <span className="text-text-secondary text-xs">View Details</span>
                    <ArrowRight size={14} className="text-primary" />
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {card.button_text && card.button_link && (
        <div className="text-center">
          <Link to={card.button_link}>
            <Button variant="ghost" size="sm">
              {card.button_text} <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function renderListCard(card: SectionCard, content: any, containerStyle: React.CSSProperties) {
  const items = (content.items as Array<any>) || [];

  return (
    <div style={containerStyle} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">{card.title}</h2>
        {card.subtitle && <p className="text-text-secondary">{card.subtitle}</p>}
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <Link key={index} to={String(item.link) || '#'} className="group">
            <Card variant="default" hoverable padding="md" className="h-full flex flex-col">
              <CardContent className="flex-1 flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary-light flex flex-col items-center justify-center text-primary-dark">
                    <span className="text-2xl font-bold">{item.day || index + 1}</span>
                    {item.month && <span className="text-xs font-medium uppercase">{String(item.month)}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-text-primary mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {String(item.title)}
                    </h4>
                    <div className="flex items-center gap-2 text-text-secondary text-sm">
                      <Clock size={14} />
                      <span>{String(item.time) || ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary text-sm">
                      <MapPin size={14} />
                      <span className="truncate">{String(item.location) || ''}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {card.button_text && card.button_link && (
        <div className="text-center">
          <Link to={card.button_link}>
            <Button variant="ghost" size="sm">
              {card.button_text} <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function renderBannerCard(card: SectionCard, content: any, containerStyle: React.CSSProperties) {
  return (
    <Card variant="outlined" hoverable padding="lg" className="overflow-hidden" style={containerStyle}>
      <CardContent className="flex flex-col items-center text-center">
        {card.image_url && (
          <div className="relative w-full h-48 md:h-64 mb-6 rounded-xl overflow-hidden">
            <img
              src={card.image_url}
              alt={card.image_alt || card.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">{card.title}</h2>
        {card.subtitle && <p className="text-lg text-text-secondary mb-6 max-w-2xl">{card.subtitle}</p>}
        {content.description && <p className="text-text-secondary mb-6 max-w-2xl">{String(content.description)}</p>}
        {card.button_text && card.button_link && (
          <Link to={card.button_link}>
            <Button variant={card.button_variant || 'primary'} size="lg">
              {card.button_text} <ArrowRight size={20} />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

function renderHighlightCard(card: SectionCard, content: any, containerStyle: React.CSSProperties) {
  return (
    <Card variant="outlined" hoverable padding="lg" className="bg-primary-light/30 border-primary/20 overflow-hidden" style={containerStyle}>
      <CardContent className="flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Trophy size={20} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-text-primary">{card.title}</h3>
        </div>

        {content.featured && (
          <div className="space-y-4 mb-6">
            <div className="text-center">
              <span className="text-primary text-sm font-medium">{String(content.featuredLabel) || 'Featured'}</span>
              <div className="flex items-center justify-center gap-4 mt-2 flex-wrap">
                <div className="text-center">
                  <p className="font-semibold text-text-primary">{String(content.featuredItem1)}</p>
                </div>
                {content.featuredItem2 && (
                  <>
                    <span className="text-primary font-bold text-lg">VS</span>
                    <div className="text-center">
                      <p className="font-semibold text-text-primary">{String(content.featuredItem2)}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-text-secondary flex-wrap">
                {content.date && (
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{String(content.date)}</span>
                  </div>
                )}
                {content.time && (
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{String(content.time)}</span>
                  </div>
                )}
                {content.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{String(content.location)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {content.recent && (
          <div className="border-t border-primary/20 pt-4">
            <span className="text-primary text-sm font-medium">{String(content.recentLabel) || 'Recent'}</span>
            <p className="text-text-secondary text-sm mt-2">{String(content.recentDescription)}</p>
            <p className="text-primary font-medium text-sm mt-1">{String(content.recentExtra) || ''}</p>
          </div>
        )}

        {card.button_text && card.button_link && (
          <Link to={card.button_link}>
            <Button variant="primary" size="sm" className="w-full mt-6">
              {card.button_text} <ArrowRight size={16} />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

function renderStatsCard(card: SectionCard, content: any, containerStyle: React.CSSProperties) {
  const stats = (content.stats as Array<any>) || [];

  return (
    <div style={containerStyle} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">{card.title}</h2>
        {card.subtitle && <p className="text-text-secondary">{card.subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card variant="outlined" padding="lg" key={index} className="h-full hover:shadow-lg transition-shadow duration-200">
            <CardContent className="flex items-start justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">{String(stat.label)}</p>
                <p className="text-3xl font-bold text-text-primary mt-1">{String(stat.value)}</p>
                <p className="text-text-secondary text-xs mt-2">{String(stat.trend) || ''}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary-light text-primary">
                {stat.icon && (() => {
                  const StatIcon = getIconComponent(String(stat.icon));
                  return <StatIcon size={24} />;
                })()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function renderCTACard(card: SectionCard, content: any, containerStyle: React.CSSProperties) {
  return (
    <Card variant="outlined" hoverable padding="lg" className="bg-primary-light/30 border-primary/20 text-center" style={containerStyle}>
      <CardContent>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">{card.title}</h2>
        {card.subtitle && <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">{card.subtitle}</p>}
        {content.description && <p className="text-text-secondary mb-6 max-w-2xl mx-auto">{String(content.description)}</p>}
        {card.button_text && card.button_link && (
          <Link to={card.button_link}>
            <Button variant={card.button_variant || 'primary'} size="lg">
              {card.button_text} <ArrowRight size={20} />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

function renderDefaultCard(card: SectionCard, content: any, containerStyle: React.CSSProperties) {
  return (
    <Card variant="default" hoverable padding="md" className="h-full flex flex-col" style={containerStyle}>
      {card.image_url && (
        <div className="relative -mx-6 -mt-6 mb-4">
          <img
            src={card.image_url}
            alt={card.image_alt || card.title}
            className="w-full h-40 object-cover rounded-t-2xl"
          />
        </div>
      )}
      <CardContent className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          {card.subtitle && <Badge variant="primary" size="sm">{card.subtitle}</Badge>}
        </div>
        <h4 className="font-semibold text-text-primary mb-2 line-clamp-2">{card.title}</h4>
        <p className="text-text-secondary text-sm flex-1 line-clamp-3">
          {String(content.description) || card.content || ''}
        </p>
        {card.button_text && card.button_link && (
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-color">
            <Link to={card.button_link}>
              <Button variant="ghost" size="sm">
                {card.button_text} <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Helper component to render section cards by page and section key
export function SectionCardContainer({ pageKey, sectionKey, className }: { pageKey: string; sectionKey: string; className?: string }) {
  const [cards, setCards] = useState<SectionCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { sectionCardsService } = await import('../lib/services');
        const fetchedCards = await sectionCardsService.getByPageAndSection(pageKey, sectionKey);
        setCards(fetchedCards);
      } catch (err) {
        console.error('Failed to load section cards:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCards();
  }, [pageKey, sectionKey]);

  if (isLoading) {
    return (
      <div className={clsx('space-y-4', className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card variant="default" padding="md" key={i}>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-8 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/4 mt-2" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className={clsx('space-y-4', className)}>
      {cards.map((card) => (
        <SectionCardRenderer key={card.id} card={card} />
      ))}
    </div>
  );
}