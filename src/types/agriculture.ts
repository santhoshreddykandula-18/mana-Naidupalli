/**
 * TypeScript Interfaces for Agriculture AI Components
 */

export interface TopPrediction {
  class_id: string;
  crop: string;
  disease_name: string;
  confidence: number;
  is_healthy: boolean;
}

export interface PlantAnalysisResult {
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

export interface SoilMoistureMetrics {
  moisture_score: number;
  moisture_level: string;
  description: string;
  mean_brightness_value: number;
}

export interface SoilCrackingMetrics {
  cracking_detected: boolean;
  crack_density_pct: number;
  crack_count: number;
  severity: string;
  description: string;
}

export interface SoilColorMetrics {
  dominant_rgb: [number, number, number];
  dominant_hex: string;
  category: string;
  characteristics: string;
}

export interface SoilResidueMetrics {
  green_coverage_pct: number;
  residue_level: string;
  description: string;
}

export interface SoilTextureMetrics {
  roughness_score: number;
  roughness_level: string;
  description: string;
}

export interface SoilRecommendation {
  title: string;
  category: string;
  action: string;
}

export interface SoilAnalysisResult {
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

export type AnalysisResult = PlantAnalysisResult | SoilAnalysisResult;

export interface AnalysisSummary {
  id: string;
  analysis_type: 'plant_disease' | 'soil_surface';
  image_url: string;
  title: string;
  subtitle: string;
  status: string;
  confidence?: number | null;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  message: string;
  suggested_actions?: string[];
  related_topics?: string[];
  disclaimer?: string;
  created_at: string;
}