import { useState, useEffect, useCallback } from 'react';
import { Bell, BellOff, Loader2, X, Check } from 'lucide-react';
import { usePushNotifications, sendTestNotification } from '../hooks/usePushNotifications';
import { notificationsService } from '../lib/services';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { clsx } from 'clsx';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'event' | 'emergency' | 'general';
  created_at: string;
  read?: boolean;
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    isSupported,
    permission,
    isSubscribed,
    loading: pushLoading,
    toggle,
  } = usePushNotifications();

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await notificationsService.getAll();
      // Filter to published/sent notifications for public display
      const published = data.filter(n => n.status === 'sent');
      setNotifications(published.map(n => ({
        id: n.id,
        title: n.title,
        message: n.message,
        type: n.type,
        created_at: n.createdAt,
        read: false, // In a real app, track read status per user
      })));
      setUnreadCount(published.filter(n => !n.read).length);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotificationClick = (notification: NotificationItem) => {
    // Mark as read (in real app, call API)
    setNotifications(prev => prev.map(n =>
      n.id === notification.id ? { ...n, read: true } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleSubscribeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggle();
  };

  const handleTestClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await sendTestNotification();
  };

  if (!isSupported) {
    return null; // Don't show if not supported
  }

  const typeColors: Record<string, 'primary' | 'blue' | 'emergency' | 'success' | 'gray'> = {
    announcement: 'primary',
    event: 'blue',
    emergency: 'emergency',
    general: 'gray',
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'relative p-2 rounded-full transition-colors',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'text-text-secondary hover:text-primary'
        )}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        aria-expanded={isOpen}
      >
        {unreadCount > 0 ? (
          <Bell className="w-5 h-5 text-primary" fill="currentColor" />
        ) : (
          <Bell className="w-5 h-5" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-emergency text-white text-xs font-medium rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}

      {isOpen && (
        <div className="fixed top-14 right-4 z-50 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-border-color overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border-color">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-light dark:bg-primary-dark/30 flex items-center justify-center">
                {isSubscribed ? (
                  <Bell className="w-5 h-5 text-primary" fill="currentColor" />
                ) : (
                  <BellOff className="w-5 h-5 text-text-secondary" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Notifications</h3>
                <p className="text-xs text-text-secondary">
                  {isSubscribed ? 'Push enabled' : 'Push disabled'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSubscribeClick}
                disabled={pushLoading || permission === 'denied'}
                className={clsx(isSubscribed && 'bg-primary/10 text-primary')}
              >
                {pushLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isSubscribed ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Bell className="w-4 h-4" />
                )}
              </Button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-text-secondary hover:text-text-primary rounded-lg hover:bg-gray-100"
                aria-label="Close notifications"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
                <p className="text-text-secondary text-sm">Loading...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-text-secondary/50 mx-auto mb-3" />
                <p className="text-text-secondary">No notifications yet</p>
                <p className="text-text-secondary text-xs mt-1">New announcements will appear here</p>
              </div>
            ) : (
              <div className="divide-y divide-border-color">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={(e) => { e.stopPropagation(); handleNotificationClick(notification); }}
                    className={clsx(
                      'w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
                      !notification.read && 'bg-primary/5 dark:bg-primary/10'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Badge
                        variant={typeColors[notification.type] || 'gray'}
                        size="sm"
                        className="flex-shrink-0 mt-0.5"
                      >
                        {notification.type}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className={clsx('font-medium text-text-primary', !notification.read && 'font-semibold')}>
                          {notification.title}
                        </p>
                        <p className="text-text-secondary text-sm mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-text-secondary text-xs mt-2">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border-color bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>{notifications.length} total notifications</span>
              <Button variant="ghost" size="sm" onClick={handleTestClick} className="text-xs">
                Test Push
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}