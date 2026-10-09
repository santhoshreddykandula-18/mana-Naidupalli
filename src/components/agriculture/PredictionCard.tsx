import React from 'react';
import { ConfidenceMeter } from './ConfidenceMeter';
import { CheckCircle, AlertCircle, Bug, Activity, Layers, Sparkles, Info, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface TopPrediction {
  class_id: string;
  crop: string;
  disease_name: string;
  confidence: number;
  is_healthy: boolean;
}

interface PlantAnalysisResult {
  id: string;
  analysis_type: 'plant_disease';
  image_url: string;
  crop: string;
  prediction: string;
  class_id: string;
  confidence: number;
  is_healthy: boolean;
  status: string;
  is_low_confidence: boolean;
  confidence_warning?: string | null;
  scientific_name: string;
  severity: string;
  symptoms: string;
  causes: string;
  organic_treatment: string[];
  chemical_treatment: string[];
  prevention_tips: string[];
  top_predictions: TopPrediction[];
  inference_engine: string;
  disclaimer: string;
  created_at: string;
}

interface PredictionCardProps {
  result: PlantAnalysisResult;
  onClose: () => void;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ result, onClose }) => {
  const { t } = useLanguage();
  const isHealthy = result.is_healthy;

  return (
    <div className="bg-white rounded-2xl border border-border-color p-6 space-y-6">
      {/* Header with Crop and Status Badge */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-border-color">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {result.crop} Specimen
          </span>
          <h2 className="text-2xl font-bold text-text-primary mt-0.5">
            {result.prediction}
          </h2>
          <p className="text-xs italic text-text-secondary mt-0.5">
            Scientific: {result.scientific_name}
          </p>
        </div>

        <div>
          {isHealthy ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600" />
              {t('agriculture.result.healthy')}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
              <AlertCircle className="w-4 h-4 text-red-600" />
              {t('agriculture.result.diseased')}
            </span>
          )}
        </div>
      </div>

      {/* Confidence Meter */}
      <ConfidenceMeter confidence={result.confidence} threshold={60} />

      {/* Low Confidence Warning if triggered */}
      {result.is_low_confidence && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <span>{result.confidence_warning}</span>
        </div>
      )}

      {/* Symptoms & Causes Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-gray-50 border border-border-color">
          <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
            <Activity className="w-4 h-4 text-primary" />
            {t('agriculture.result.symptoms')}
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {result.symptoms}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gray-50 border border-border-color">
          <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
            <Bug className="w-4 h-4 text-primary" />
            {t('agriculture.result.causes')}
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {result.causes}
          </p>
        </div>
      </div>

      {/* Treatment Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-green-800 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-green-600" />
            {t('agriculture.result.organicTreatment')}
          </div>
          <ul className="text-sm text-text-secondary space-y-1">
            {result.organic_treatment.map((treatment, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0" />
                <span>{treatment}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 uppercase tracking-wider">
            <Info className="w-4 h-4 text-blue-600" />
            {t('agriculture.result.chemicalTreatment')}
          </div>
          <ul className="text-sm text-text-secondary space-y-1">
            {result.chemical_treatment.map((treatment, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <span>{treatment}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prevention Tips */}
      <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-800 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-purple-600" />
          {t('agriculture.result.prevention')}
        </div>
        <ul className="text-sm text-text-secondary space-y-1">
          {result.prevention_tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 flex-shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Alternative Differential Predictions */}
      {result.top_predictions && result.top_predictions.length > 1 && (
        <div className="pt-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-primary" />
            {t('agriculture.result.differential')}
          </h4>
          <div className="space-y-2">
            {result.top_predictions.map((pred, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50/80 border border-border-color/50 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[10px]">
                    #{idx + 1}
                  </span>
                  <span className="font-medium text-text-primary">
                    {pred.crop} — {pred.disease_name}
                  </span>
                </div>
                <span className="font-semibold text-text-secondary">
                  {pred.confidence.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engine & Scientific Disclaimer */}
      <div className="pt-2">
        <div className="p-3 rounded-lg bg-gray-50 border border-border-color/50 text-xs text-text-secondary italic">
          <span className="font-semibold text-text-primary">{t('agriculture.result.disclaimer')}</span> {result.disclaimer}
        </div>
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