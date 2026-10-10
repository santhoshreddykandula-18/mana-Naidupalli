import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  ChevronUp,
  ChevronDown,
  Image as ImageIcon,
  Layout,
  Save,
  Loader2,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { clsx } from 'clsx';
import { sectionCardsService, storageService } from '../../lib/services';
import type { SectionCard } from '../../types';

interface SectionCardFormData {
  page_key: string;
  section_key: string;
  title: string;
  subtitle: string;
  content: string;
  image_url: string;
  image_alt: string;
  card_type: SectionCard['card_type'];
  display_order: number;
  status: 'published' | 'draft';
  is_visible: boolean;
  background_color: string;
  text_color: string;
  button_text: string;
  button_link: string;
  button_variant: SectionCard['button_variant'];
}

const PAGES = [
  { key: 'home', label: 'Home Page' },
  { key: 'explore', label: 'Explore Page' },
  { key: 'announcements', label: 'Announcements Page' },
  { key: 'events', label: 'Events Page' },
  { key: 'temples', label: 'Temples Page' },
  { key: 'cricket', label: 'Cricket Page' },
  { key: 'agriculture', label: 'Agriculture Page' },
  { key: 'government', label: 'Government Page' },
  { key: 'gallery', label: 'Gallery Page' },
  { key: 'sri-ram-youth', label: 'Sri Ram Youth Page' },
  { key: 'education', label: 'Education Page' },
  { key: 'emergency', label: 'Emergency Page' },
];

const CARD_TYPES = [
  { key: 'default', label: 'Default Card' },
  { key: 'hero', label: 'Hero Section' },
  { key: 'featured', label: 'Featured Item' },
  { key: 'grid', label: 'Grid Layout' },
  { key: 'list', label: 'List Layout' },
  { key: 'banner', label: 'Banner' },
  { key: 'highlight', label: 'Highlight Box' },
  { key: 'stats', label: 'Stats Display' },
  { key: 'cta', label: 'Call to Action' },
];

const BUTTON_VARIANTS = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'ghost', label: 'Ghost' },
  { key: 'outline', label: 'Outline' },
];

const DEFAULT_FORM: SectionCardFormData = {
  page_key: 'home',
  section_key: '',
  title: '',
  subtitle: '',
  content: '',
  image_url: '',
  image_alt: '',
  card_type: 'default',
  display_order: 0,
  status: 'draft',
  is_visible: true,
  background_color: '',
  text_color: '',
  button_text: '',
  button_link: '',
  button_variant: 'primary',
};

export function AdminSectionCards() {
  const [cards, setCards] = useState<SectionCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [pageFilter, setPageFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState<SectionCard | null>(null);
  const [formData, setFormData] = useState<SectionCardFormData>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewCard, setPreviewCard] = useState<SectionCard | null>(null);

  const fetchCards = useCallback(async () => {
    try {
      setIsLoading(true);
      const { cards: fetchedCards } = await sectionCardsService.search({
        pageKey: pageFilter === 'all' ? undefined : pageFilter,
        status: statusFilter === 'all' ? undefined : statusFilter,
        title: searchQuery || undefined,
        limit: 100,
      });
      setCards(fetchedCards);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load section cards');
    } finally {
      setIsLoading(false);
    }
  }, [pageFilter, statusFilter, searchQuery]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const validation = storageService.validateFile(file, {
        bucket: 'section-cards',
        folder: 'cards',
        allowedTypes: ['image'],
        maxSizeMB: 5,
      });
      if (!validation.valid) {
        throw new Error(validation.error);
      }
      const url = await storageService.uploadImage(file, 'section-cards', 'cards');
      setFormData(prev => ({ ...prev, image_url: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const openCreateModal = () => {
    setEditingCard(null);
    setFormData({ ...DEFAULT_FORM, display_order: cards.length });
    setShowModal(true);
  };

  const openEditModal = (card: SectionCard) => {
    setEditingCard(card);
    setFormData({
      page_key: card.page_key,
      section_key: card.section_key,
      title: card.title,
      subtitle: card.subtitle || '',
      content: card.content || '',
      image_url: card.image_url || '',
      image_alt: card.image_alt || '',
      card_type: card.card_type,
      display_order: card.display_order,
      status: card.status,
      is_visible: card.is_visible,
      background_color: card.background_color || '',
      text_color: card.text_color || '',
      button_text: card.button_text || '',
      button_link: card.button_link || '',
      button_variant: card.button_variant || 'primary',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCard(null);
    setFormData(DEFAULT_FORM);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      if (editingCard) {
        await sectionCardsService.update(editingCard.id, formData);
      } else {
        await sectionCardsService.create(formData);
      }
      closeModal();
      fetchCards();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save section card');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this section card?')) return;
    try {
      await sectionCardsService.delete(id);
      fetchCards();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete section card');
    }
  };

  const handleStatusChange = async (card: SectionCard) => {
    try {
      await sectionCardsService.setStatus(card.id, card.status === 'published' ? 'draft' : 'published');
      fetchCards();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const handleVisibilityChange = async (card: SectionCard) => {
    try {
      await sectionCardsService.update(card.id, { is_visible: !card.is_visible });
      fetchCards();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update visibility');
    }
  };

  const handleMoveUp = async (card: SectionCard, index: number) => {
    if (index === 0) return;
    const newOrder = [
      ...cards.slice(0, index - 1),
      { id: card.id, display_order: cards[index - 1].display_order },
      { id: cards[index - 1].id, display_order: card.display_order },
      ...cards.slice(index + 1),
    ];
    try {
      await sectionCardsService.reorder(newOrder);
      fetchCards();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder');
    }
  };

  const handleMoveDown = async (card: SectionCard, index: number) => {
    if (index === cards.length - 1) return;
    const newOrder = [
      ...cards.slice(0, index),
      { id: cards[index + 1].id, display_order: card.display_order },
      { id: card.id, display_order: cards[index + 1].display_order },
      ...cards.slice(index + 2),
    ];
    try {
      await sectionCardsService.reorder(newOrder);
      fetchCards();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder');
    }
  };

  const handlePreview = (card: SectionCard) => {
    setPreviewCard(card);
  };

  const closePreview = () => {
    setPreviewCard(null);
  };

  const filteredCards = cards.filter(card => {
    if (searchQuery && !card.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (statusFilter !== 'all' && card.status !== statusFilter) return false;
    if (pageFilter !== 'all' && card.page_key !== pageFilter) return false;
    return true;
  });

  const getPageLabel = (pageKey: string) => {
    return PAGES.find(p => p.key === pageKey)?.label || pageKey;
  };

  const getCardTypeLabel = (type: string) => {
    return CARD_TYPES.find(c => c.key === type)?.label || type;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-text-primary">Section Card Management</h1>
        <p className="text-text-secondary mt-1">Create and manage dynamic section cards across all pages</p>
      </div>

      {/* Filters and Search */}
      <Card variant="outlined" padding="md">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <Input
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
              className="w-full sm:w-40"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </Select>
            <Select
              value={pageFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPageFilter(e.target.value)}
              className="w-full sm:w-48"
            >
              <option value="all">All Pages</option>
              {PAGES.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
            </Select>
          </div>
          <Button onClick={openCreateModal} className="whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            Add Section Card
          </Button>
        </div>
      </Card>

      {/* Cards Table */}
      <Card variant="outlined" padding="none" className="overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-text-secondary">Loading section cards...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">{error}</div>
        ) : filteredCards.length === 0 ? (
          <div className="p-12 text-center text-text-secondary">
            <Layout className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No section cards found</p>
            <p className="text-sm mt-1">Create your first section card to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-color bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-12">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-32">Page</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-32">Section</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-28">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-28">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider w-24">Visibility</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider w-48">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {filteredCards.map((card, index) => (
                  <tr key={card.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-7 w-7"
                          onClick={() => handleMoveUp(card, index)}
                          disabled={index === 0}
                          aria-label="Move up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <span className="text-text-secondary text-sm font-medium w-8 text-center">{card.display_order}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-7 w-7"
                          onClick={() => handleMoveDown(card, index)}
                          disabled={index === filteredCards.length - 1}
                          aria-label="Move down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-text-primary truncate max-w-xs">{card.title}</p>
                        {card.subtitle && <p className="text-text-secondary text-xs truncate max-w-xs">{card.subtitle}</p>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="blue" size="sm">{getPageLabel(card.page_key)}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-text-secondary text-sm font-mono">{card.section_key}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="gray" size="sm">{getCardTypeLabel(card.card_type)}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={card.status === 'published' ? 'success' : 'gray'}
                        size="sm"
                        onClick={() => handleStatusChange(card)}
                        className="cursor-pointer"
                      >
                        {card.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={card.is_visible ? 'primary' : 'gray'}
                        size="sm"
                        onClick={() => handleVisibilityChange(card)}
                        className="cursor-pointer"
                      >
                        {card.is_visible ? 'Visible' : 'Hidden'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(card)}
                          aria-label="Preview"
                          className="p-1.5"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(card)}
                          aria-label="Edit"
                          className="p-1.5"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(card.id)}
                          aria-label="Delete"
                          className="p-1.5 text-emergency hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingCard ? 'Edit Section Card' : 'Create Section Card'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Page *</label>
              <Select
                value={formData.page_key}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, page_key: e.target.value }))}
                required
              >
                {PAGES.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Section Key *</label>
              <Input
                value={formData.section_key}
                onChange={(e) => setFormData(prev => ({ ...prev, section_key: e.target.value }))}
                placeholder="e.g., hero, announcements, events"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Section card title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Subtitle</label>
            <Input
              value={formData.subtitle}
              onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
              placeholder="Optional subtitle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Content (JSON)</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder='{"description": "...", "items": [...]}'
              className="w-full p-3 border border-border-color rounded-xl text-sm font-mono bg-gray-50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Card Type</label>
            <Select
              value={formData.card_type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, card_type: e.target.value as SectionCard['card_type'] }))}
            >
              {CARD_TYPES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Display Order</label>
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
              <Select
                value={formData.status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, status: e.target.value as 'published' | 'draft' }))}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="is_visible"
              checked={formData.is_visible}
              onChange={(e) => setFormData(prev => ({ ...prev, is_visible: e.target.checked }))}
              className="w-4 h-4 text-primary border-border-color rounded focus:ring-primary/20"
            />
            <label htmlFor="is_visible" className="text-sm text-text-secondary cursor-pointer">
              Visible on public website
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Background Color</label>
              <Input
                type="color"
                value={formData.background_color || '#ffffff'}
                onChange={(e) => setFormData(prev => ({ ...prev, background_color: e.target.value }))}
                className="h-10 w-full cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Text Color</label>
              <Input
                type="color"
                value={formData.text_color || '#1f2937'}
                onChange={(e) => setFormData(prev => ({ ...prev, text_color: e.target.value }))}
                className="h-10 w-full cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Image</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
                disabled={uploadingImage}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image-upload')?.click()}
                disabled={uploadingImage}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                {uploadingImage ? 'Uploading...' : formData.image_url ? 'Change Image' : 'Upload Image'}
              </Button>
              {formData.image_url && (
                <a href={formData.image_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  View Current
                </a>
              )}
            </div>
            {formData.image_url && (
              <div className="mt-2 relative w-48">
                <img src={formData.image_url} alt="Preview" className="w-full h-24 object-cover rounded-lg border border-border-color" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Image Alt Text</label>
            <Input
              value={formData.image_alt}
              onChange={(e) => setFormData(prev => ({ ...prev, image_alt: e.target.value }))}
              placeholder="Accessibility description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Button Text</label>
              <Input
                value={formData.button_text}
                onChange={(e) => setFormData(prev => ({ ...prev, button_text: e.target.value }))}
                placeholder="Read More"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Button Link</label>
              <Input
                value={formData.button_link}
                onChange={(e) => setFormData(prev => ({ ...prev, button_link: e.target.value }))}
                placeholder="/announcements"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Button Variant</label>
              <Select
                value={formData.button_variant}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, button_variant: e.target.value as SectionCard['button_variant'] }))}
              >
                {BUTTON_VARIANTS.map(v => <option key={v.key} value={v.key}>{v.label}</option>)}
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border-color">
            <Button type="button" variant="secondary" onClick={closeModal} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Loader2 className={clsx('w-4 h-4 mr-2', isSubmitting ? 'animate-spin' : 'hidden')} />
              <Save className={clsx('w-4 h-4 mr-2', isSubmitting ? 'hidden' : '')} />
              {isSubmitting ? 'Saving...' : editingCard ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Preview Modal */}
      {previewCard && (
        <Modal
          isOpen={true}
          onClose={closePreview}
          title="Preview Section Card"
          size="xl"
        >
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="mb-4 p-4 bg-white rounded-lg border border-border-color" style={{
              backgroundColor: previewCard.background_color || '#ffffff',
              color: previewCard.text_color || '#1f2937',
            }}>
              {previewCard.image_url && (
                <img
                  src={previewCard.image_url}
                  alt={previewCard.image_alt || previewCard.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-2xl font-bold mb-2">{previewCard.title}</h2>
              {previewCard.subtitle && <p className="text-lg opacity-80 mb-4">{previewCard.subtitle}</p>}
              {previewCard.content && (
                <div className="mb-4 text-sm opacity-90">
                  <pre className="whitespace-pre-wrap">{previewCard.content}</pre>
                </div>
              )}
              {previewCard.button_text && previewCard.button_link && (
                <a href={previewCard.button_link} className="inline-block">
                  <Button variant={previewCard.button_variant || 'primary'}>
                    {previewCard.button_text}
                  </Button>
                </a>
              )}
            </div>
            <div className="text-sm text-text-secondary">
              <p><strong>Page:</strong> {getPageLabel(previewCard.page_key)}</p>
              <p><strong>Section:</strong> {previewCard.section_key}</p>
              <p><strong>Type:</strong> {getCardTypeLabel(previewCard.card_type)}</p>
              <p><strong>Order:</strong> {previewCard.display_order}</p>
              <p><strong>Status:</strong> {previewCard.status}</p>
              <p><strong>Visible:</strong> {previewCard.is_visible ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}