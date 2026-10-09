import React from 'react';
import { Droplets, Split, Palette, Leaf, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SoilMoistureMetrics {
  moisture_score: number;
  moisture_level: string;
  description: string;
  mean_brightness_value: number;
}

interface SoilCrackingMetrics {
  cracking_detected: boolean;
  crack_density_pct: number;
  crack_count: number;
  severity: string;
  description: string;
}

interface SoilColorMetrics {
  dominant_rgb: [number, number, number];
  dominant_hex: string;
  category: string;
  characteristics: string;
}

interface SoilResidueMetrics {
  green_coverage_pct: number;
  residue_level: string;
  description: string;
}

interface SoilTextureMetrics {
  roughness_score: number;
  roughness_level: string;
  description: string;
}

interface SoilRecommendation {
  title: string;
  category: string;
  action: string;
}

interface SoilAnalysisResult {
  id: string;
  analysis_type: 'soil_surface';
  image_url: string;
  overall_surface_condition: string;
  apparent_moisture: SoilMoistureMetrics;
  surface_cracking: SoilCrackingMetrics;
  soil_color: SoilColorMetrics;
  organic_residue: SoilResidueMetrics;
  surface_texture: SoilTextureMetrics;
  recommendations: SoilRecommendation[];
  disclaimer: string;
  is_lab_test: boolean;
  created_at: string;
}

interface SoilMetricsCardProps {
  result: SoilAnalysisResult;
  onClose: () => void;
}

export const SoilMetricsCard: React.FC<SoilMetricsCardProps> = ({ result, onClose }) => {
  const { t } = useLanguage();
  const moisture = result.apparent_moisture;
  const cracking = result.surface_cracking;
  const color = result.soil_color;
  const residue = result.organic_residue;
  const texture = result.surface_texture;

  return (
    <div className="bg-white rounded-2xl border border-border-color p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-border-color">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            {t('agriculture.soil.title') || 'Soil Surface Optical Inspection'}
          </span>
          <h2 className="text-2xl font-bold text-text-primary mt-0.5">
            {result.overall_surface_condition}
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            {t('agriculture.soil.colorCategory') || 'Color Category'}: {color.category}
          </p>
        </div>

        <div>
          {cracking.cracking_detected ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              {cracking.severity}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600" />
              {t('agriculture.soil.intact') || 'Intact Surface'}
            </span>
          )}
        </div>
      </div>

      {/* Grid of 4 Key Visual Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. Apparent Moisture Indicator */}
        <div className="p-4 rounded-xl bg-gray-50 border border-border-color space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 uppercase tracking-wider">
              <Droplets className="w-4 h-4" />
              {t('agriculture.soil.moisture')}
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
              {moisture.moisture_level}
            </span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full"
              style={{ width: `${moisture.moisture_score}%` }}
            />
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            {moisture.description}
          </p>
        </div>

        {/* 2. Surface Cracking & Fissures */}
        <div className="p-4 rounded-xl bg-gray-50 border border-border-color space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider">
              <Split className="w-4 h-4" />
              {t('agriculture.soil.cracking')}
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              {t('agriculture.soil.density') || 'Density'}: {cracking.crack_density_pct}%
            </span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            {cracking.description}
          </p>
        </div>

        {/* 3. Soil Color Spectrum */}
        <div className="p-4 rounded-xl bg-gray-50 border border-border-color space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <Palette className="w-4 h-4" />
              {t('agriculture.soil.color')}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <div
                className="w-3.5 h-3.5 rounded-full border border-gray-300"
                style={{ backgroundColor: color.dominant_hex }}
              />
              <span>{color.dominant_hex}</span>
            </div>
          </div>

          <p className="text-xs font-medium text-text-primary">
            {color.category}
          </p>
          <p className="text-xs text-text-secondary leading-relaxed">
            {color.characteristics}
          </p>
        </div>

        {/* 4. Surface Residue & Texture */}
        <div className="p-4 rounded-xl bg-gray-50 border border-border-color space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-wider">
              <Leaf className="w-4 h-4" />
              {t('agriculture.soil.residue')}
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-green-100 text-green-800">
              {residue.residue_level}
            </span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            {texture.roughness_level} — {residue.description}
          </p>
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            {t('agriculture.result.recommendations') || 'Recommended Actions'}
          </h4>
          <div className="space-y-2">
            {result.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-gray-50 border border-border-color/50 text-xs"
              >
                <div className="font-semibold text-text-primary mb-1">{rec.title}</div>
                <div className="text-text-secondary">{rec.action}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mandatory Scientific Disclaimer */}
      <div className="p-3 rounded-lg bg-gray-50 border border-border-color/50 text-xs text-text-secondary italic">
        <span className="font-semibold text-text-primary">{t('agriculture.result.disclaimer')}</span> {result.disclaimer}
      </div>

      {/* Close Button */}
      <div className="pt-4 border-t border-border-color">
        <button
          onClick={onClose}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-primary bg-primary-light/50 hover:bg-primary-light transition-all"
        >
          {t('agriculture.result.done')}
        </button>
      </div>
    </div>
  );
};