import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Camera,
  Image as ImageIcon,
  X,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ImageUploaderProps {
  onImageSelected: (file: File | Blob, previewUrl: string) => void;
  selectedPreview: string | null;
  onClear: () => void;
  analysisType: 'plant_disease' | 'soil_surface';
  isLoading?: boolean;
}

const SAMPLE_TEST_CASES = [
  {
    type: 'plant',
    label: 'Tomato Early Blight (Foliar)',
    description: 'Dark concentric brown rings on lower leaves',
    color: '#845327',
  },
  {
    type: 'plant',
    label: 'Corn Common Rust (Pustules)',
    description: 'Elongated reddish-cinnamon pustules',
    color: '#c2410c',
  },
  {
    type: 'plant',
    label: 'Healthy Bell Pepper Leaf',
    description: 'Vibrant green chlorophyll foliage',
    color: '#15803d',
  },
  {
    type: 'soil',
    label: 'Dry Soil with Surface Cracking',
    description: 'High fissure density, pale dry crusting',
    color: '#a18072',
  },
  {
    type: 'soil',
    label: 'Moist Humic Agricultural Loam',
    description: 'Dark brown crumb texture with organic residue',
    color: '#4a3227',
  },
];

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  selectedPreview,
  onClear,
  analysisType,
  isLoading = false,
}) => {
  const { t } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setErrorMsg(null);
    const validFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!validFormats.includes(file.type)) {
      setErrorMsg(t('agriculture.upload.invalidFormat') || 'Invalid file format. Please upload JPG, PNG, or WEBP images.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg(t('agriculture.upload.fileTooLarge') || 'File exceeds maximum 10MB limit.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onImageSelected(file, previewUrl);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  // Helper to generate quick synthetic sample for instant demonstration
  const handleLoadSample = (sample: typeof SAMPLE_TEST_CASES[0]) => {
    setErrorMsg(null);
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background color representative of test case
    ctx.fillStyle = sample.color;
    ctx.fillRect(0, 0, 400, 400);

    // Draw realistic patterns
    if (sample.type === 'plant') {
      // Leaf vein & spot textures
      ctx.fillStyle = '#166534';
      ctx.beginPath();
      ctx.ellipse(200, 200, 150, 90, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();

      if (sample.label.includes('Blight')) {
        // Brown concentric spots
        ctx.fillStyle = '#451a03';
        ctx.beginPath();
        ctx.arc(170, 160, 35, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 4;
        ctx.stroke();
      } else if (sample.label.includes('Rust')) {
        // Orange rust pustules
        ctx.fillStyle = '#ea580c';
        for (let i = 0; i < 20; i++) {
          ctx.beginPath();
          ctx.arc(130 + (i * 12) % 140, 140 + (i * 15) % 120, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    } else {
      // Soil cracking lines
      ctx.strokeStyle = '#291e18';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(50, 80);
      ctx.lineTo(220, 190);
      ctx.lineTo(350, 170);
      ctx.moveTo(220, 190);
      ctx.lineTo(190, 330);
      ctx.stroke();
    }

    canvas.toBlob((blob) => {
      if (blob) {
        const previewUrl = URL.createObjectURL(blob);
        onImageSelected(blob, previewUrl);
      }
    }, 'image/jpeg', 0.95);
  };

  return (
    <div className="w-full space-y-4">
      {/* Error Banner */}
      {errorMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Upload Box or Preview */}
      {!selectedPreview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
            dragActive
              ? 'border-primary bg-primary-light/50 scale-[1.01]'
              : 'border-border-color hover:border-primary bg-white/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />

          <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-light border border-primary/20 text-primary flex items-center justify-center shadow-inner">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div>
              <p className="text-base font-semibold text-text-primary">
                {analysisType === 'plant_disease'
                  ? t('agriculture.upload.dragDrop')
                  : t('agriculture.upload.dragDropSoil')}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {t('agriculture.upload.supports')}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white bg-primary hover:bg-primary-dark transition-all text-sm"
              >
                <ImageIcon className="w-4 h-4" />
                {t('agriculture.upload.browse')}
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-text-primary bg-white border border-border-color hover:bg-gray-50 shadow-sm transition-all text-sm"
              >
                <Camera className="w-4 h-4" />
                {t('agriculture.upload.takePhoto')}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Image Preview View */
        <div className="relative rounded-2xl overflow-hidden border border-border-color bg-slate-900/5 p-4">
          <div className="relative max-h-[380px] w-full flex items-center justify-center overflow-hidden rounded-xl bg-black/40">
            <img
              src={selectedPreview || ''}
              alt="Selected specimen"
              className="max-h-[360px] w-auto rounded-lg object-contain"
            />

            {!isLoading && (
              <button
                type="button"
                onClick={onClear}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 hover:bg-red-600 text-white backdrop-blur-md transition-colors shadow-lg"
                title={t('agriculture.upload.remove')}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quick Demonstration Samples */}
      {!selectedPreview && (
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              {t('agriculture.upload.samples')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {SAMPLE_TEST_CASES.filter((s) => (analysisType === 'plant_disease' ? s.type === 'plant' : s.type === 'soil')).map(
              (sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLoadSample(sample)}
                  className="flex items-start gap-2.5 p-3 text-left rounded-xl border border-border-color bg-white/70 hover:border-primary hover:bg-primary-light/40 transition-all text-xs group"
                >
                  <div
                    className="w-4 h-4 rounded-full mt-0.5 shrink-0 shadow-sm"
                    style={{ backgroundColor: sample.color }}
                  />
                  <div>
                    <p className="font-semibold text-text-primary group-hover:text-primary">
                      {t(`agriculture.upload.${sample.label.replace(/\s+/g, '').replace(/\(.*\)/, '').replace(/[^a-zA-Z]/g, '').toLowerCase()}`) || sample.label}
                    </p>
                    <p className="text-[11px] text-text-secondary">
                      {sample.description}
                    </p>
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};