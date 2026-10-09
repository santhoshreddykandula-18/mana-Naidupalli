import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Loader2, Save, X } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { governmentService } from '../../lib/services';
import type { GovernmentService } from '../../types';

export function AdminGovernment() {
  const [services, setServices] = useState<GovernmentService[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<GovernmentService>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const statuses = ['All', 'published', 'draft'];

  // Fetch services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const data = await governmentService.getAllAdmin();
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch government services:', err);
        setError('Failed to load government services. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(s => {
    const matchesSearch = s.service_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      const newService = await governmentService.create(editData as Omit<GovernmentService, 'id'>);
      setServices(prev => [newService, ...prev]);
      setShowCreateModal(false);
      setEditData({});
    } catch (err) {
      console.error('Failed to create government service:', err);
      setError('Failed to create government service. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const updated = await governmentService.update(id, editData);
      setServices(prev => prev.map(s => s.id === id ? updated : s));
      setIsEditing(null);
      setEditData({});
    } catch (err) {
      console.error('Failed to update government service:', err);
      setError('Failed to update government service. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this government service?')) return;
    try {
      await governmentService.delete(id);
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Failed to delete government service:', err);
      setError('Failed to delete government service. Please try again.');
    }
  };

  const startEdit = (service: GovernmentService) => {
    setIsEditing(service.id);
    setEditData({ ...service });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Government</h1>
          <p className="text-text-secondary mt-1">Manage government services info</p>
        </div>
        <Card variant="outlined" padding="lg" className="animate-pulse">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Government</h1>
          <p className="text-text-secondary mt-1">Manage government services info</p>
        </div>
        <Button variant="primary" size="lg" className="shrink-0 gap-2" onClick={() => { setEditData({ status: 'draft' }); setShowCreateModal(true); }}>
          <Plus size={20} />
          Add Service
        </Button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">×</button>
        </div>
      )}

      <Card variant="outlined" padding="md" className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search government services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-color rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white min-w-[150px]"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </Card>

      <Card variant="outlined" padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-border-color">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Service Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Link</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {isEditing === service.id ? (
                      <input
                        type="text"
                        value={editData.service_name || ''}
                        onChange={(e) => handleInputChange('service_name', e.target.value)}
                        className="w-full px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <p className="font-medium text-text-primary line-clamp-1">{service.service_name}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing === service.id ? (
                      <input
                        type="text"
                        value={editData.short_description || ''}
                        onChange={(e) => handleInputChange('short_description', e.target.value)}
                        className="w-full px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <span className="text-text-secondary line-clamp-1">{service.short_description}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing === service.id ? (
                      <input
                        type="url"
                        value={editData.link || ''}
                        onChange={(e) => handleInputChange('link', e.target.value)}
                        className="w-full px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <a href={service.link} target="_blank" rel="noopener noreferrer" className="text-blue-primary hover:underline text-sm">{service.link}</a>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing === service.id ? (
                      <select
                        value={editData.status || 'draft'}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    ) : (
                      <Badge variant={service.status === 'published' ? 'success' : 'gray'} size="sm">
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {isEditing === service.id ? (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => handleUpdate(service.id)} isLoading={isCreating}>
                            <Save size={18} />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setIsEditing(null)} className="text-text-secondary hover:text-emergency">
                            <Trash2 size={18} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" size="sm" className="px-2 text-text-secondary hover:text-blue-primary" onClick={() => startEdit(service)}>
                            <Edit size={18} />
                          </Button>
                          <Button variant="ghost" size="sm" className="px-2 text-text-secondary hover:text-emergency" onClick={() => handleDelete(service.id)}>
                            <Trash2 size={18} />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredServices.length === 0 && (
          <div className="p-8 text-center text-text-secondary">
            No government services found matching your criteria.
          </div>
        )}
      </Card>

      {/* Create/Edit Modal */}
      {(showCreateModal || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border-color">
              <h2 className="text-lg font-semibold text-text-primary">
                {isEditing ? 'Edit Government Service' : 'Add Government Service'}
              </h2>
              <button
                onClick={() => { setShowCreateModal(false); setIsEditing(null); setEditData({}); }}
                className="p-1 text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={isEditing ? (e) => { e.preventDefault(); handleUpdate(isEditing); } : handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Service Name *</label>
                <Input
                  value={editData.service_name || ''}
                  onChange={(e) => handleInputChange('service_name', e.target.value)}
                  placeholder="Enter service name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Short Description *</label>
                <Input
                  value={editData.short_description || ''}
                  onChange={(e) => handleInputChange('short_description', e.target.value)}
                  placeholder="Enter short description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Link *</label>
                <input
                  type="url"
                  value={editData.link || ''}
                  onChange={(e) => handleInputChange('link', e.target.value)}
                  placeholder="https://example.gov.in"
                  className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Icon *</label>
                <Input
                  value={editData.icon || ''}
                  onChange={(e) => handleInputChange('icon', e.target.value)}
                  placeholder="e.g., landmark, building-2, id-card, file-text"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
                <select
                  value={editData.status || 'draft'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border-color">
                <Button type="button" variant="ghost" onClick={() => { setShowCreateModal(false); setIsEditing(null); setEditData({}); }}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" isLoading={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Saving...
                    </>
                  ) : (
                    isEditing ? 'Save Changes' : 'Add Service'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}