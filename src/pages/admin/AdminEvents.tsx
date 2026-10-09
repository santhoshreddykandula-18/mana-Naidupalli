import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Loader2, Save, X } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { eventsService } from '../../lib/services';
import type { Event } from '../../types';

export function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Event>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const statuses = ['All', 'published', 'draft'];

  // Fetch events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await eventsService.getAllAdmin();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Failed to load events. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || e.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      const newEvent = await eventsService.create(editData as Omit<Event, 'id'>);
      setEvents(prev => [newEvent, ...prev]);
      setShowCreateModal(false);
      setEditData({});
    } catch (err) {
      console.error('Failed to create event:', err);
      setError('Failed to create event. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const updated = await eventsService.update(id, editData);
      setEvents(prev => prev.map(e => e.id === id ? updated : e));
      setIsEditing(null);
      setEditData({});
    } catch (err) {
      console.error('Failed to update event:', err);
      setError('Failed to update event. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventsService.delete(id);
      setEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Failed to delete event:', err);
      setError('Failed to delete event. Please try again.');
    }
  };

  const startEdit = (event: Event) => {
    setIsEditing(event.id);
    setEditData({ ...event });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Events</h1>
          <p className="text-text-secondary mt-1">Manage village events</p>
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
          <h1 className="text-3xl font-bold text-text-primary">Events</h1>
          <p className="text-text-secondary mt-1">Manage village events</p>
        </div>
        <Button variant="primary" size="lg" className="shrink-0 gap-2" onClick={() => { setEditData({ status: 'draft' }); setShowCreateModal(true); }}>
          <Plus size={20} />
          Add Event
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
              placeholder="Search events..."
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
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {isEditing === event.id ? (
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <p className="font-medium text-text-primary line-clamp-1">{event.title}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-sm whitespace-nowrap">
                    {isEditing === event.id ? (
                      <input
                        type="date"
                        value={editData.date || ''}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing === event.id ? (
                      <input
                        type="text"
                        value={editData.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <span className="text-text-secondary">{event.location}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing === event.id ? (
                      <select
                        value={editData.status || 'draft'}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    ) : (
                      <Badge variant={event.status === 'published' ? 'success' : 'gray'} size="sm">
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {isEditing === event.id ? (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => handleUpdate(event.id)} isLoading={isCreating}>
                            <Save size={18} />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setIsEditing(null)} className="text-text-secondary hover:text-emergency">
                            <Trash2 size={18} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" size="sm" className="px-2 text-text-secondary hover:text-blue-primary" onClick={() => startEdit(event)}>
                            <Edit size={18} />
                          </Button>
                          <Button variant="ghost" size="sm" className="px-2 text-text-secondary hover:text-emergency" onClick={() => handleDelete(event.id)}>
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
        {filteredEvents.length === 0 && (
          <div className="p-8 text-center text-text-secondary">
            No events found matching your criteria.
          </div>
        )}
      </Card>

      {/* Create/Edit Modal */}
      {(showCreateModal || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border-color">
              <h2 className="text-lg font-semibold text-text-primary">
                {isEditing ? 'Edit Event' : 'Create Event'}
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
                <label className="block text-sm font-medium text-text-primary mb-1">Title *</label>
                <Input
                  value={editData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Description *</label>
                <textarea
                  value={editData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter event description"
                  rows={4}
                  className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Date *</label>
                  <input
                    type="date"
                    value={editData.date || new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Time *</label>
                  <input
                    type="time"
                    value={editData.time || ''}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Location *</label>
                <Input
                  value={editData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter event location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Category *</label>
                <Input
                  value={editData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="e.g., Festival, Sports, Cultural"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Organizer</label>
                <Input
                  value={editData.organizer || ''}
                  onChange={(e) => handleInputChange('organizer', e.target.value)}
                  placeholder="Enter organizer name"
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
                    isEditing ? 'Save Changes' : 'Create Event'
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