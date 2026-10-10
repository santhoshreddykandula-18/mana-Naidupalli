import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { Logo } from '../ui/Logo';
import { AdminLoginModal } from '../auth/AdminLoginModal';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { NotificationBell } from '../NotificationBell';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';

// Navbar items per v2 spec - NO Login, NO Admin, NO Announcements, NO Education, NO Emergency
const NAV_ITEMS = [
  { labelKey: 'nav.home', route: '/' },
  { labelKey: 'nav.events', route: '/events' },
  { labelKey: 'nav.temples', route: '/temples' },
  { labelKey: 'nav.cricket', route: '/cricket' },
  { labelKey: 'nav.agriculture', route: '/agriculture' },
  { labelKey: 'nav.sriRamYouth', route: '/sri-ram-youth' },
  { labelKey: 'nav.government', route: '/government' },
  { labelKey: 'nav.gallery', route: '/gallery' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const handleMobileMenuClick = () => setIsMobileMenuOpen(false);

  const handleAdminLogin = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user) {
      // Check if user has admin role
      const role = data.user.user_metadata?.role || data.user.app_metadata?.role;
      if (role === 'admin' || data.user.email === 'admin@mana-naidupalli.in') {
        window.location.href = '/admin';
      } else {
        await supabase.auth.signOut();
        throw new Error('Access denied. Admin privileges required.');
      }
    } else {
      throw new Error('Login failed');
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-border-color shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <Logo onAdminTrigger={() => setIsAdminModalOpen(true)} />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex sm:items-center sm:space-x-1 overflow-x-auto no-scrollbar">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.route;
                return (
                  <Link
                    key={item.labelKey}
                    to={item.route}
                    className={clsx(
                      'px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
                      isActive
                        ? 'text-primary bg-primary-light/50'
                        : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}
              <LanguageSwitcher />
              <NotificationBell />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden gap-2">
              <LanguageSwitcher />
              <NotificationBell />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-border-color absolute w-full shadow-lg">
            <div className="pt-2 pb-3 space-y-1 px-4">
              {/* Primary Navigation */}
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.route;
                return (
                  <Link
                    key={item.labelKey}
                    to={item.route}
                    onClick={handleMobileMenuClick}
                    className={clsx(
                      'block px-3 py-3 rounded-md text-base font-medium',
                      isActive
                        ? 'text-primary-dark bg-primary-light'
                        : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="border-t border-border-color my-2" />

              {/* Notification Bell in Mobile Menu */}
              <div className="pt-2">
                <NotificationBell />
              </div>

              {/* Language Switcher in Mobile Menu */}
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLogin={handleAdminLogin}
      />
    </>
  );
}