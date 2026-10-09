import { useState, useEffect } from 'react';
import { Megaphone, Calendar, Building2, Trophy, Leaf, Image, Bell, Video, Users, Settings, BarChart3, FileText, Globe, Megaphone as MegaphoneIcon, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { dashboardService } from '../../lib/services';

// Fix TS implicitly has any type errors
type ColorType = 'primary' | 'blue' | 'gold' | 'emergency' | 'success' | 'green';
type ActivityType = 'announcement' | 'event' | 'temple' | 'gallery' | 'cricket' | 'agriculture' | 'sri-ram-youth';

interface StatData {
  label: string;
  count: number;
  icon: React.ElementType;
  color: ColorType;
  trend: string;
  route: string;
}

interface ActivityItemData {
  action: string;
  target: string;
  time: string;
  type: ActivityType;
}

interface QuickActionData {
  label: string;
  route: string;
  icon: React.ElementType;
  color: ColorType;
  description?: string;
}

// Navigation sections with better organization
const adminNavSections = [
  {
    title: 'Content Management',
    icon: FileText,
    color: 'primary' as ColorType,
    items: [
      { label: 'Announcements', route: '/admin/announcements', icon: MegaphoneIcon, color: 'primary' as ColorType, description: 'Post village announcements & notices' },
      { label: 'Events', route: '/admin/events', icon: Calendar, color: 'blue' as ColorType, description: 'Schedule festivals & community events' },
      { label: 'Temples', route: '/admin/temples', icon: Building2, color: 'gold' as ColorType, description: 'Manage temple information & timings' },
      { label: 'Sri Ram Youth', route: '/admin/sri-ram-youth', icon: Video, color: 'gold' as ColorType, description: 'Youth cultural content & media' },
    ],
  },
  {
    title: 'Community & Sports',
    icon: Users,
    color: 'primary' as ColorType,
    items: [
      { label: 'Cricket', route: '/admin/cricket', icon: Trophy, color: 'primary' as ColorType, description: 'Teams, matches, scores & trophies' },
      { label: 'Gallery', route: '/admin/gallery', icon: Image, color: 'blue' as ColorType, description: 'Village photos & celebration images' },
      { label: 'Agriculture', route: '/admin/agriculture', icon: Leaf, color: 'green' as ColorType, description: 'Farming tips, crops & schemes' },
    ],
  },
  {
    title: 'Services & Administration',
    icon: Settings,
    color: 'blue' as ColorType,
    items: [
      { label: 'Government', route: '/admin/government', icon: Globe, color: 'blue' as ColorType, description: 'Official service links & portals' },
      { label: 'Notifications', route: '/admin/notifications', icon: Bell, color: 'emergency' as ColorType, description: 'Push alerts to villagers' },
      { label: 'Settings', route: '/admin/settings', icon: Settings, color: 'primary' as ColorType, description: 'Platform configuration & analytics' },
    ],
  },
];

const quickActions: QuickActionData[] = [
  { label: 'Create Announcement', route: '/admin/announcements', icon: MegaphoneIcon, color: 'primary', description: 'Post new village announcements' },
  { label: 'Add Event', route: '/admin/events', icon: Calendar, color: 'blue', description: 'Schedule festivals & gatherings' },
  { label: 'Add Temple', route: '/admin/temples', icon: Building2, color: 'gold', description: 'Manage temple information' },
  { label: 'Manage Cricket', route: '/admin/cricket', icon: Trophy, color: 'primary', description: 'Matches, teams & scores' },
  { label: 'Upload Photos', route: '/admin/gallery', icon: Image, color: 'blue', description: 'Upload village photos' },
  { label: 'Add Youth Media', route: '/admin/sri-ram-youth', icon: Video, color: 'gold', description: 'Photos & videos for youth' },
  { label: 'Agriculture Post', route: '/admin/agriculture', icon: Leaf, color: 'green', description: 'Farming tips & crop info' },
  { label: 'Government Services', route: '/admin/government', icon: Globe, color: 'blue', description: 'Manage official service links' },
  { label: 'Send Notification', route: '/admin/notifications', icon: Bell, color: 'emergency', description: 'Push notifications to villagers' },
  { label: 'View Analytics', route: '/admin/settings', icon: BarChart3, color: 'primary', description: 'Platform analytics & settings' },
];

function StatCard({ label, count, icon: Icon, color, trend }: StatData) {
  const colorStyles: Record<ColorType, string> = {
    primary: 'bg-primary-light text-primary border-primary/20',
    blue: 'bg-blue-light text-blue-primary border-blue-primary/20',
    gold: 'bg-gold-light text-gold border-gold/20',
    emergency: 'bg-red-100 text-emergency border-red-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    success: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <Card variant="outlined" padding="lg" className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardContent className="flex items-start justify-between">
        <div>
          <p className="text-text-secondary text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-text-primary mt-1">{count.toLocaleString()}</p>
          <p className="text-text-secondary text-xs mt-2">{trend}</p>
        </div>
        <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center', colorStyles[color])}>
          <Icon size={24} />
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ action, target, time, type }: ActivityItemData) {
  const typeIcons: Record<ActivityType, React.ElementType> = {
    announcement: MegaphoneIcon,
    event: Calendar,
    temple: Building2,
    gallery: Image,
    cricket: Trophy,
    agriculture: Leaf,
    'sri-ram-youth': Video,
  };

  const typeColors: Record<ActivityType, ColorType> = {
    announcement: 'primary',
    event: 'blue',
    temple: 'gold',
    gallery: 'primary',
    cricket: 'primary',
    agriculture: 'success',
    'sri-ram-youth': 'gold',
  };

  const Icon = typeIcons[type];
  const color = typeColors[type];

  const colorStyles: Record<ColorType, string> = {
    primary: 'bg-primary-light text-primary',
    blue: 'bg-blue-light text-blue-primary',
    gold: 'bg-gold-light text-gold',
    emergency: 'bg-red-100 text-emergency',
    green: 'bg-green-100 text-green-700',
    success: 'bg-green-100 text-green-700',
  };

  // Map ColorType to Badge variant (Badge doesn't have 'green' variant)
  const badgeVariantMap: Record<ColorType, 'default' | 'primary' | 'blue' | 'gold' | 'emergency' | 'success' | 'gray'> = {
    primary: 'primary',
    blue: 'blue',
    gold: 'gold',
    emergency: 'emergency',
    green: 'success',
    success: 'success',
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', colorStyles[color])}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-text-primary">{action}</p>
        <p className="text-text-secondary text-sm mt-0.5">{target}</p>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-text-secondary text-xs">{time}</span>
        <Badge variant={badgeVariantMap[color]} size="sm" className="mt-1">{type}</Badge>
      </div>
    </div>
  );
}

function QuickActionCard({ label, route, icon: Icon, color, description }: QuickActionData) {
  const colorStyles: Record<ColorType, string> = {
    primary: 'bg-primary-light text-primary hover:bg-primary/20 border-primary/20',
    blue: 'bg-blue-light text-blue-primary hover:bg-blue-primary/10 border-blue-primary/20',
    gold: 'bg-gold-light text-gold hover:bg-gold/10 border-gold/20',
    emergency: 'bg-red-100 text-emergency hover:bg-red-100 border-red-200',
    green: 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200',
    success: 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200',
  };

  return (
    <Link to={route}>
      <Card variant="outlined" hoverable padding="md" className={clsx('h-full', colorStyles[color])}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon size={22} />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-text-primary">{label}</p>
            {description && <p className="text-text-secondary text-sm mt-0.5">{description}</p>}
          </div>
        </div>
      </Card>
    </Link>
  );
}

function NavSectionCard({ title, icon: SectionIcon, color, items, sectionDescription }: { title: string; icon: React.ElementType; color: ColorType; items: { label: string; route: string; icon: React.ElementType; color: ColorType; description: string }[]; sectionDescription?: string }) {
  const colorStyles: Record<ColorType, string> = {
    primary: 'bg-primary-light text-primary hover:bg-primary/20 border-primary/20',
    blue: 'bg-blue-light text-blue-primary hover:bg-blue-primary/10 border-blue-primary/20',
    gold: 'bg-gold-light text-gold hover:bg-gold/10 border-gold/20',
    emergency: 'bg-red-100 text-emergency hover:bg-red-100 border-red-200',
    green: 'bg-green-light text-green-700 hover:bg-green-100 border-green-200',
    success: 'bg-green-light text-green-700 hover:bg-green-100 border-green-200',
  };

  const headerColorStyles: Record<ColorType, string> = {
    primary: 'bg-primary/5 text-primary',
    blue: 'bg-blue-primary/5 text-blue-primary',
    gold: 'bg-gold/5 text-gold',
    emergency: 'bg-red-100 text-emergency',
    green: 'bg-green-100 text-green-700',
    success: 'bg-green-100 text-green-700',
  };

  return (
    <Card variant="outlined" padding="none" className="overflow-hidden">
      <div className={clsx('px-5 py-4 border-b border-border-color', headerColorStyles[color])}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center">
            <SectionIcon size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{title}</h3>
            {sectionDescription && <p className="text-text-secondary text-xs mt-0.5">{sectionDescription}</p>}
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2">
        {items.map((item) => (
          <Link key={item.label} to={item.route}>
            <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform', colorStyles[item.color].replace('hover:', '').replace('border-', ''))}>
                <item.icon size={18} />
              </div>
              <div className="flex-1 text-left min-w-0">
                <span className="font-medium text-text-primary group-hover:text-primary transition-colors">{item.label}</span>
                <p className="text-text-secondary text-xs mt-0.5 truncate">{item.description}</p>
              </div>
              <MoreHorizontal className="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-colors opacity-0 group-hover:opacity-100" />
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}

export function AdminDashboard() {
  const [stats, setStats] = useState<StatData[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [statsData, activityData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getRecentActivity(10),
        ]);

        // Transform stats data to match UI structure
        const statItems: StatData[] = [
          { label: 'Announcements', count: statsData.announcements, icon: Megaphone, color: 'primary', trend: 'View all', route: '/admin/announcements' },
          { label: 'Events', count: statsData.events, icon: Calendar, color: 'blue', trend: 'View all', route: '/admin/events' },
          { label: 'Temples', count: statsData.temples, icon: Building2, color: 'gold', trend: 'View all', route: '/admin/temples' },
          { label: 'Cricket Teams', count: statsData.cricketTeams, icon: Trophy, color: 'primary', trend: 'View all', route: '/admin/cricket' },
          { label: 'Agriculture Posts', count: statsData.agriculturePosts, icon: Leaf, color: 'green', trend: 'View all', route: '/admin/agriculture' },
          { label: 'Gallery Images', count: statsData.galleryImages, icon: Image, color: 'blue', trend: 'View all', route: '/admin/gallery' },
        ];

        // Transform activity data
        const activities: ActivityItemData[] = activityData.map(a => ({
          action: a.action,
          target: a.target,
          time: new Date(a.time).toLocaleString(),
          type: a.type as ActivityType,
        }));

        setStats(statItems);
        setRecentActivity(activities);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
          <p className="text-text-secondary mt-1">Overview of your village platform</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {[...Array(6)].map((_, i) => (
            <Card variant="outlined" padding="lg" key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-8 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-1/4 mt-2" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <Card variant="outlined" padding="lg" className="bg-red-50 border-red-200">
          <p className="text-red-700">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
        <p className="text-text-secondary mt-1">Overview of your village platform</p>
      </div>

      {/* Stats Grid */}
      <SectionHeader title="Statistics" subtitle="Key metrics at a glance" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-4">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.route} className="block">
            <StatCard {...stat} />
          </Link>
        ))}
      </div>

      {/* Navigation Sections - Dynamic and well organized */}
      <SectionHeader title="Admin Sections" subtitle="Manage all aspects of the village platform" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {adminNavSections.map((section) => (
          <NavSectionCard
            key={section.title}
            title={section.title}
            icon={section.icon}
            color={section.color}
            items={section.items}
            sectionDescription={`Manage ${section.title.toLowerCase()} for the village`}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <SectionHeader title="Recent Activity" subtitle="Latest changes across the platform" />
          <Card variant="outlined" padding="none" className="overflow-hidden">
            <div className="divide-y divide-border-color">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))
              ) : (
                <div className="p-8 text-center text-text-secondary">
                  No recent activity found.
                </div>
              )}
            </div>
            <div className="p-4 border-t border-border-color">
              <Link to="/admin/announcements" className="block w-full">
                <Button variant="ghost" size="sm" className="w-full">
                  View All Activity
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <SectionHeader title="Quick Actions" subtitle="Common administrative tasks" />
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <QuickActionCard key={action.label} {...action} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}