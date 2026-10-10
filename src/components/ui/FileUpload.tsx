import { useState, useCallback } from 'react';
import { Upload, X, Video, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { clsx } from 'clsx';

export interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onPreviewChange?: (previewUrl: string | null) => void;
  accept?: string;
  allowedTypes?: ('image' | 'video')[];
  maxSizeMB?: number;
  label?: string;
  placeholder?: string;
  bucket?: string;
  folder?: string;
  className?: string;
  disabled?: boolean;
  showPreview?: boolean;
  // Explicit format support for better UX
  supportedFormats?: {
    images?: string[];
    videos?: string[];
  };
}

export function FileUpload({
  value,
  onChange,
  onPreviewChange,
  accept = 'image/*,video/*',
  allowedTypes = ['image', 'video'],
  maxSizeMB = 10,
  label = 'Upload Media',
  placeholder = 'Click or drag to upload',
  bucket,
  folder,
  className = '',
  disabled = false,
  showPreview = true,
  supportedFormats,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewIsVideo, setPreviewIsVideo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File): boolean => {
    const sizeLimit = maxSizeMB * 1024 * 1024;
    if (file.size > sizeLimit) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return false;
    }

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (isImage && !allowedTypes.includes('image')) {
      setError('Images not allowed');
      return false;
    }
    if (isVideo && !allowedTypes.includes('video')) {
      setError('Videos not allowed');
      return false;
    }

    // Check against explicit supported formats if provided
    if (supportedFormats) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext) {
        if (isImage && supportedFormats.images && !supportedFormats.images.includes(ext)) {
          setError(`Image format .${ext} not supported. Supported: ${supportedFormats.images.join(', ')}`);
          return false;
        }
        if (isVideo && supportedFormats.videos && !supportedFormats.videos.includes(ext)) {
          setError(`Video format .${ext} not supported. Supported: ${supportedFormats.videos.join(', ')}`);
          return false;
        }
      }
    }

    setError(null);
    return true;
  }, [allowedTypes, maxSizeMB, supportedFormats]);

  const generatePreview = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPreviewIsVideo(false);
      onPreviewChange?.(url);
    } else if (file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPreviewIsVideo(true);
      onPreviewChange?.(url);
    }
  }, [onPreviewChange]);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    generatePreview(file);

    try {
      // If bucket and folder provided, upload to Supabase
      if (bucket && folder) {
        const { storageService } = await import('../../lib/services');
        const url = await storageService.uploadFile(file, bucket, folder);
        onChange(url);
      } else {
        // Otherwise just use object URL for preview
        const url = URL.createObjectURL(file);
        onChange(url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
      setPreviewUrl(null);
      onPreviewChange?.(null);
    } finally {
      setIsUploading(false);
    }
  }, [bucket, folder, onChange, onPreviewChange, validateFile, generatePreview]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [disabled, handleFileSelect]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleRemove = useCallback(() => {
    setPreviewUrl(null);
    setPreviewIsVideo(false);
    onChange('');
    onPreviewChange?.(null);
    setError(null);
  }, [onChange, onPreviewChange]);

  const handleUrlInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(url);
    if (url) {
      setPreviewUrl(url);
      setPreviewIsVideo(url.match(/\.(mp4|webm|ogg|mov)$/i) !== null);
      onPreviewChange?.(url);
    } else {
      setPreviewUrl(null);
      setPreviewIsVideo(false);
      onPreviewChange?.(null);
    }
  }, [onChange, onPreviewChange]);

  // Use provided value or preview for display
  const displayPreview = previewUrl || value;
  const isVideo = previewIsVideo ||
                   displayPreview?.match(/\.(mp4|webm|ogg|mov)$/i) !== null ||
                   value?.match(/\.(mp4|webm|ogg|mov)$/i) !== null;

  return (
    <div className={clsx('space-y-3', className)}>
      <label className="block text-sm font-medium text-text-primary mb-1">{label}</label>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2" role="alert">
          <X className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Zone */}
      <div
        className={clsx(
          'relative border-2 border-dashed rounded-2xl p-8 text-center transition-all',
          isDragging
            ? 'border-primary bg-primary-light/10'
            : 'border-border-color hover:border-primary/50 hover:bg-gray-50',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleInputChange}
          disabled={disabled || isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-text-secondary">Uploading...</p>
          </div>
        ) : displayPreview && showPreview ? (
          <div className="relative max-w-md mx-auto">
            {isVideo ? (
              <video
                src={displayPreview}
                controls
                className="w-full max-h-64 rounded-lg"
                muted
              />
            ) : (
              <img
                src={displayPreview}
                alt="Preview"
                className="w-full max-h-64 rounded-lg object-cover"
              />
            )}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/90 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-primary-light/50 flex items-center justify-center">
              {allowedTypes.includes('video') && !allowedTypes.includes('image') ? (
                <Video className="w-7 h-7 text-primary" />
              ) : allowedTypes.includes('image') && !allowedTypes.includes('video') ? (
                <ImageIcon className="w-7 h-7 text-primary" />
              ) : (
                <Upload className="w-7 h-7 text-primary" />
              )}
            </div>
            <p className="text-text-primary font-medium">{placeholder}</p>
            <p className="text-text-secondary text-sm">
              {(() => {
                if (supportedFormats) {
                  const parts: string[] = [];
                  if (allowedTypes.includes('image')) {
                    parts.push(supportedFormats.images ? `Images: ${supportedFormats.images.join(', ').toUpperCase()}` : 'JPG, PNG, WebP, GIF');
                  }
                  if (allowedTypes.includes('video')) {
                    parts.push(supportedFormats.videos ? `Videos: ${supportedFormats.videos.join(', ').toUpperCase()}` : 'MP4, WebM, MOV');
                  }
                  return parts.join(' / ');
                }
                return `${allowedTypes.includes('image') ? 'JPG, PNG, WebP, GIF' : ''}${allowedTypes.includes('image') && allowedTypes.includes('video') ? ' / ' : ''}${allowedTypes.includes('video') ? 'MP4, WebM, MOV' : ''} • Max ${maxSizeMB}MB`;
              })()}
            </p>
            <Button variant="secondary" size="sm" className="mt-2" disabled={disabled}>
              Choose File
            </Button>
          </div>
        )}
      </div>

      {/* URL Input Alternative */}
      <div className="pt-2 border-t border-border-color">
        <p className="text-sm text-text-secondary mb-2">Or enter a direct URL:</p>
        <input
          type="url"
          value={value || ''}
          onChange={handleUrlInput}
          placeholder="https://example.com/media.jpg"
          disabled={disabled || isUploading}
          className="w-full px-4 py-2 border border-border-color rounded-xl text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );
}