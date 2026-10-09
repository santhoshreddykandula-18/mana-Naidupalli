import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Loader2, Save, X } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FileUpload } from '../../components/ui/FileUpload';
import { sriRamYouthService, type SriRamYouthItem } from '../../lib/services';

export function AdminSriRamYouth() {
  const [items, setItems] = useState<SriRamYouthItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<SriRamYouthItem>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const types = ['All', 'photo', 'video', 'event', 'highlight'];
  const statuses = ['All', 'published', 'draft'];

  // Fetch items on mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const data = await sriRamYouthService.getAllAdmin();
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch Sri Ram Youth items:', err);
        setError('Failed to load Sri Ram Youth items. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      const newItem = await sriRamYouthService.create(editData as Omit<SriRamYouthItem, 'id'>);
      setItems(prev => [newItem, ...prev]);
      setShowCreateModal(false);
      setEditData({});
    } catch (err) {
      console.error('Failed to create Sri Ram Youth item:', err);
      setError('Failed to create item. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const updated = await sriRamYouthService.update(id, editData);
      setItems(prev => prev.map(i => i.id === id ? updated : i));
      setIsEditing(null);
      setEditData({});
    } catch (err) {
      console.error('Failed to update Sri Ram Youth item:', err);
      setError('Failed to update item. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await sriRamYouthService.delete(id);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error('Failed to delete Sri Ram Youth item:', err);
      setError('Failed to delete item. Please try again.');
    }
  };

  const startEdit = (item: SriRamYouthItem) => {
    setIsEditing(item.id);
    setEditData({ ...item });
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Sri Ram Youth</h1>
          <p className="text-text-secondary mt-1">Manage Sri Ram Youth cultural content</p>
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
          <h1 className="text-3xl font-bold text-text-primary">Sri Ram Youth</h1>
          <p className="text-text-secondary mt-1">Manage Sri Ram Youth cultural content</p>
        </div>
        <Button variant="primary" size="lg" className="shrink-0 gap-2" onClick={() => { setEditData({ status: 'draft' }); setShowCreateModal(true); }}>
          <Plus size={20} />
          Add Media
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
              placeholder="Search Sri Ram Youth content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-color rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white min-w-[150px]"
          >
            {types.map((t) => (
              <option key={t} value={t}>{t === 'All' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
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
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {isEditing === item.id ? (
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <p className="font-medium text-text-primary line-clamp-1">{item.title}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing === item.id ? (
                      <select
                        value={editData.type || 'photo'}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="photo">Photo</option>
                        <option value="video">Video</option>
                        <option value="event">Event</option>
                        <option value="highlight">Highlight</option>
                      </select>
                    ) : (
                      <Badge variant="blue" size="sm">{item.type}</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing === item.id ? (
                      <input
                        type="text"
                        value={editData.category || ''}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <span className="text-text-secondary">{item.category}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-sm whitespace-nowrap">
                    {isEditing === item.id ? (
                      <input
                        type="date"
                        value={editData.date || ''}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing === item.id ? (
                      <select
                        value={editData.status || 'draft'}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    ) : (
                      <Badge variant={item.status === 'published' ? 'success' : 'gray'} size="sm">
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {isEditing === item.id ? (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => handleUpdate(item.id)} isLoading={isCreating}>
                            <Save size={18} />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setIsEditing(null)} className="text-text-secondary hover:text-emergency">
                            <Trash2 size={18} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" size="sm" className="px-2 text-text-secondary hover:text-blue-primary" onClick={() => startEdit(item)}>
                            <Edit size={18} />
                          </Button>
                          <Button variant="ghost" size="sm" className="px-2 text-text-secondary hover:text-emergency" onClick={() => handleDelete(item.id)}>
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
        {filteredItems.length === 0 && (
          <div className="p-8 text-center text-text-secondary">
            No Sri Ram Youth items found matching your criteria.
          </div>
        )}
      </Card>

      {/* Create/Edit Modal */}
      {(showCreateModal || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border-color">
              <h2 className="text-lg font-semibold text-text-primary">
                {isEditing ? 'Edit Media' : 'Add Media'}
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
                  placeholder="Enter title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Description *</label>
                <textarea
                  value={editData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter description"
                  rows={3}
                  className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Type *</label>
                  <select
                    value={editData.type || 'photo'}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                    required
                  >
                    <option value="photo">Photo</option>
                    <option value="video">Video</option>
                    <option value="event">Event</option>
                    <option value="highlight">Highlight</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Category *</label>
                  <Input
                    value={editData.category || ''}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="e.g., Festival, Community Service, Cultural"
                    required
                  />
                </div>
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
                  <FileUpload
                    value={editData.media_url || ''}
                    onChange={(url) => handleInputChange('media_url', url)}
                    allowedTypes={['image', 'video']}
                    maxSizeMB={10}
                    label="Media URL *"
                    placeholder="Click or drag to upload (JPG, PNG, MP4, WebM, MOV • Max 10MB)"
                    bucket="sri-ram-youth"
                    folder="media"
                    showPreview={true}
                    disabled={isCreating}
                    supportedFormats={{
                      images: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
                      videos: ['mp4', 'webm', 'mov', 'ogg']
                    }}
                  />
                </div>
              </div>

              <div>
                <FileUpload
                  value={editData.thumbnail_url || ''}
                  onChange={(url) => handleInputChange('thumbnail_url', url)}
                  allowedTypes={['image']}
                  maxSizeMB={2}
                  label="Thumbnail Image (Optional)"
                  placeholder="Click or drag to upload thumbnail (JPG, PNG, WebP, GIF • Max 2MB)"
                  bucket="sri-ram-youth"
                  folder="thumbnails"
                  showPreview={true}
                  disabled={isCreating}
                  supportedFormats={{
                    images: ['jpg', 'jpeg', 'png', 'webp', 'gif']
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={Array.isArray(editData.tags) ? editData.tags.join(', ') : ''}
                  onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(t => t.trim()))}
                  placeholder="e.g., festival, youth, community"
                  className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                    isEditing ? 'Save Changes' : 'Add Media'
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