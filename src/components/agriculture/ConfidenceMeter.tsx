import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface ConfidenceMeterProps {
  confidence: number;
  threshold?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  confidence,
  threshold = 60,
  size = 'md',
}) => {
  const { t } = useLanguage();
  const sizeClasses = {
    sm: 'h-1.5 text-[10px]',
    md: 'h-2.5 text-xs',
    lg: 'h-3 text-sm',
  };

  // Color logic
  const getColor = (conf: number) => {
    if (conf >= threshold) return 'bg-emerald-500';
    if (conf >= threshold * 0.5) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getLabel = (conf: number) => {
    if (conf >= threshold) return t('agriculture.confidence.high') || 'High Confidence';
    if (conf >= threshold * 0.5) return t('agriculture.confidence.moderate') || 'Moderate Confidence';
    return t('agriculture.confidence.low') || 'Low Confidence';
  };

  const getLabelColor = (conf: number) => {
    if (conf >= threshold) return 'text-emerald-700';
    if (conf >= threshold * 0.5) return 'text-amber-700';
    return 'text-rose-700';
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {t('agriculture.confidence.label') || 'Model Confidence'}
        </span>
        <span className={`font-bold ${getLabelColor(confidence)}`}>
          {confidence.toFixed(1)}% — {getLabel(confidence)}
        </span>
      </div>

      <div className="relative w-full max-w-xs">
        <div className="w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`${getColor(confidence)} ${sizeClasses[size]} rounded-full transition-all duration-700 ease-out`}
            style={{ width: `${Math.min(confidence, 100)}%` }}
          />
        </div>

        {/* Threshold marker */}
        <div
          className="absolute top-full left-0 mt-1 flex items-center gap-1 text-[10px] text-text-secondary"
          style={{ left: `${(threshold / 100) * 100}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-0.5 h-1.5 bg-text-secondary" />
          <span className="font-medium text-text-secondary">{t('agriculture.confidence.threshold') || 'Threshold'}: {threshold}%</span>
        </div>
      </div>

      {/* Color legend */}
      <div className="flex items-center gap-4 text-[10px] text-text-secondary">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1.5 bg-emerald-500 rounded" />
          <span>≥ {threshold}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1.5 bg-amber-500 rounded" />
          <span>{Math.round(threshold * 0.5)}% – {threshold - 1}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-1.5 bg-rose-500 rounded" />
          <span>{'<'}{Math.round(threshold * 0.5)}%</span>
        </div>
      </div>
    </div>
  );
};