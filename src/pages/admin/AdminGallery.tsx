import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Loader2, Save, X } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { FileUpload } from '../../components/ui/FileUpload';
import { galleryService } from '../../lib/services';
import type { GalleryItem } from '../../types';

export function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<GalleryItem>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [_previewImage, setPreviewImage] = useState<string | null>(null);

  // Use setPreviewImage for FileUpload component's onPreviewChange callback
  // _previewImage state is kept for backwards compatibility with existing handlers

  const categories = ['All', 'Village', 'Temples', 'Cricket', 'Festivals', 'Education', 'Nature', 'Culture', 'Other'];
  const statuses = ['All', 'published', 'draft'];

  // Fetch items on mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const data = await galleryService.getAllAdmin();
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch gallery items:', err);
        setError('Failed to load gallery items. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      const newItem = await galleryService.create(editData as Omit<GalleryItem, 'id'>);
      setItems(prev => [newItem, ...prev]);
      setShowCreateModal(false);
      setEditData({});
      setPreviewImage(null);
    } catch (err) {
      console.error('Failed to create gallery item:', err);
      setError('Failed to create gallery item. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const updated = await galleryService.update(id, editData);
      setItems(prev => prev.map(i => i.id === id ? updated : i));
      setIsEditing(null);
      setEditData({});
      setPreviewImage(null);
    } catch (err) {
      console.error('Failed to update gallery item:', err);
      setError('Failed to update gallery item. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await galleryService.delete(id);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error('Failed to delete gallery item:', err);
      setError('Failed to delete gallery item. Please try again.');
    }
  };

  const startEdit = (item: GalleryItem) => {
    setIsEditing(item.id);
    setEditData({ ...item });
    if (item.image_url) setPreviewImage(item.image_url);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
    if (field === 'image_url') setPreviewImage(value);
  };

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Gallery</h1>
          <p className="text-text-secondary mt-1">Manage village gallery</p>
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
          <h1 className="text-3xl font-bold text-text-primary">Gallery</h1>
          <p className="text-text-secondary mt-1">Manage village gallery</p>
        </div>
        <Button variant="primary" size="lg" className="shrink-0 gap-2" onClick={() => { setEditData({ status: 'draft' }); setShowCreateModal(true); }}>
          <Plus size={20} />
          Upload Photos
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
              placeholder="Search gallery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-color rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white min-w-[150px]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
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
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Preview</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Title</th>
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
                        type="url"
                        value={editData.image_url || ''}
                        onChange={(e) => handleInputChange('image_url', e.target.value)}
                        placeholder="Image URL"
                        className="w-20 px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                  </td>
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
                        value={editData.category || ''}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="px-2 py-1 border border-primary rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {categories.slice(1).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    ) : (
                      <Badge variant="gray" size="sm">{item.category}</Badge>
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
                      item.date ? new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'
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
            No gallery items found matching your criteria.
          </div>
        )}
      </Card>

      {/* Create/Edit Modal */}
      {(showCreateModal || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border-color">
              <h2 className="text-lg font-semibold text-text-primary">
                {isEditing ? 'Edit Gallery Item' : 'Upload Photo'}
              </h2>
              <button
                onClick={() => { setShowCreateModal(false); setIsEditing(null); setEditData({}); setPreviewImage(null); }}
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
                  placeholder="Enter photo title"
                  required
                />
              </div>

              <div>
                <FileUpload
                  value={editData.image_url || ''}
                  onChange={(url) => handleInputChange('image_url', url)}
                  onPreviewChange={setPreviewImage}
                  allowedTypes={['image']}
                  maxSizeMB={5}
                  label="Upload Image *"
                  placeholder="Click or drag to upload (JPG, PNG, WebP, GIF • Max 5MB)"
                  bucket="gallery"
                  folder="gallery"
                  showPreview={true}
                  disabled={isCreating}
                  supportedFormats={{
                    images: ['jpg', 'jpeg', 'png', 'webp', 'gif']
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Category *</label>
                <select
                  value={editData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-border-color rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                  required
                >
                  <option value="">Select category</option>
                  {categories.slice(1).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

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
                <Button type="button" variant="ghost" onClick={() => { setShowCreateModal(false); setIsEditing(null); setEditData({}); setPreviewImage(null); }}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" isLoading={isCreating}>
                  {isCreating ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Saving...
                    </>
                  ) : (
                    isEditing ? 'Save Changes' : 'Upload Photo'
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