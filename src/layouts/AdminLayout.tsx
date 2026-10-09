import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Megaphone, Calendar, Building2, Trophy, Leaf, Landmark, Users, Image, Bell, Settings, LogOut, Menu, X, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { Logo } from '../components/ui/Logo';

const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', route: '/admin', icon: LayoutDashboard },
  { label: 'Announcements', route: '/admin/announcements', icon: Megaphone },
  { label: 'Events', route: '/admin/events', icon: Calendar },
  { label: 'Temples', route: '/admin/temples', icon: Building2 },
  { label: 'Cricket', route: '/admin/cricket', icon: Trophy },
  { label: 'Agriculture', route: '/admin/agriculture', icon: Leaf },
  { label: 'Government', route: '/admin/government', icon: Landmark },
  { label: 'Sri Ram Youth', route: '/admin/sri-ram-youth', icon: Users },
  { label: 'Gallery', route: '/admin/gallery', icon: Image },
  { label: 'Notifications', route: '/admin/notifications', icon: Bell },
  { label: 'Settings', route: '/admin/settings', icon: Settings },
];

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session');
    window.location.href = '/';
  };

  // Sidebar widths: w-64 = 16rem (256px) expanded, w-16 = 4rem (64px) collapsed
  const sidebarWidth = isSidebarCollapsed ? '4rem' : '16rem';

  return (
    <div className="min-h-screen bg-gray-50 lg:grid" style={{
      gridTemplateColumns: `${sidebarWidth} minmax(0, 1fr)`,
      gridTemplateRows: 'auto 1fr'
    }}>
      {/* Desktop Sidebar - spans both header and content rows (hidden on mobile) */}
      <aside
        className={clsx(
          'hidden lg:flex lg:flex-col bg-white border-r border-border-color transition-all duration-300',
          isSidebarCollapsed ? 'w-16' : 'w-64'
        )}
        style={{ gridColumn: '1 / 2', gridRow: '1 / 3' }}
      >
        {/* Sidebar Header */}
        <div className={clsx('flex items-center justify-between h-16 px-4 border-b border-border-color', isSidebarCollapsed && 'justify-center')}>
          {!isSidebarCollapsed && (
            <Link to="/admin" className="flex-shrink-0 flex items-center gap-2">
              <Logo />
            </Link>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex ml-auto p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors"
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft size={20} className={clsx("transition-transform duration-300", isSidebarCollapsed && "rotate-180")} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Admin navigation">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.route;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.route}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary-light text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                )}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <Icon size={20} className="flex-shrink-0" aria-hidden="true" />
                {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-border-color">
          <button
            onClick={handleLogout}
            className={clsx(
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-emergency hover:bg-red-50 transition-colors',
              isSidebarCollapsed && 'justify-center'
            )}
            title={isSidebarCollapsed ? 'Logout' : undefined}
          >
            <LogOut size={20} className="flex-shrink-0" aria-hidden="true" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-border-color lg:hidden transform transition-transform duration-300',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border-color">
          <Link to="/admin" className="flex-shrink-0 flex items-center gap-2">
            <Logo />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Admin navigation">
          {ADMIN_NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.route;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.route}
                onClick={() => setIsSidebarOpen(false)}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary-light text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                )}
              >
                <Icon size={20} className="flex-shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border-color">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-emergency hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} className="flex-shrink-0" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content - no margins needed, grid handles layout */}
      <main className="min-h-screen" style={{ gridColumn: '2 / 3', gridRow: '1 / 3' }}>
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-border-color shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors"
              aria-label="Open admin menu"
            >
              <Menu size={24} />
            </button>
            <span className="font-semibold text-text-primary">Admin Dashboard</span>
            <div className="w-10" />
          </div>
        </header>

        <div className="p-4 lg:p-8 pt-4 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}