import { Card } from '../../components/ui/Card';
import { Settings } from 'lucide-react';

export function AdminSettings() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary mt-1">Manage system settings</p>
        </div>
      </div>

      <Card variant="outlined" padding="lg" className="text-center bg-gray-50 border-dashed">
        <Settings className="w-12 h-12 mx-auto mb-4 text-text-secondary" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">Platform Settings</h3>
        <p className="text-text-secondary mb-4">Manage admin accounts and site preferences.</p>
      </Card>
    </div>
  );
}