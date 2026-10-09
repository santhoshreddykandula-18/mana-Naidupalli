import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Bell, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminNotifications() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Notifications</h1>
          <p className="text-text-secondary mt-1">Manage notification system</p>
        </div>
        <Link to="/admin/notifications/new">
          <Button variant="primary" size="lg" className="shrink-0 gap-2">
            <Plus size={20} />
            Send Notification
          </Button>
        </Link>
      </div>

      <Card variant="outlined" padding="lg" className="text-center bg-gray-50 border-dashed">
        <Bell className="w-12 h-12 mx-auto mb-4 text-text-secondary" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">Notifications Management</h3>
        <p className="text-text-secondary mb-4">Send important updates to villagers.</p>
        <Link to="/admin/notifications/new">
          <Button variant="primary">Send Notification</Button>
        </Link>
      </Card>
    </div>
  );
}