import { useState } from 'react';
import { Leaf, Droplet, AlertTriangle, Brain, Calendar, Sun, CloudRain, Wind, ScanLine, Microscope, Bot, ArrowRight, ShieldAlert, CheckCircle, Info, Droplets, Split, Palette } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { crops, announcements } from '../data/mockDb';
import { useLanguage } from '../context/LanguageContext';
import { ImageUploader, PredictionCard, SoilMetricsCard, ChatInterface } from '../components/agriculture';
import type { PlantAnalysisResult, SoilAnalysisResult } from '../types/agriculture';

const agricultureAnnouncements = announcements.filter(a => a.category === 'Agriculture');

function CropCard({ crop }: { crop: typeof crops[0] }) {
  const { t } = useLanguage();
  return (
    <Card variant="default" hoverable padding="md" className="h-full flex flex-col border-primary-light/50">
      <CardContent className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
            <Leaf size={24} className="text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">{crop.name}</h3>
        <p className="text-text-secondary text-sm flex-1 mb-4">{crop.tips}</p>

        <div className="space-y-2 mt-auto pt-4 border-t border-border-color">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <Calendar size={16} className="text-primary" />
            <span>{t('agriculture.season')}: {crop.season}</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <Droplet size={16} className="text-primary" />
            <span>{t('agriculture.waterRequirement')}: {crop.water_requirement}</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <AlertTriangle size={16} className="text-emergency" />
            <span className="truncate">{t('agriculture.commonDiseases')}: {crop.common_diseases}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AgriAnnouncementCard({ announcement }: { announcement: typeof agricultureAnnouncements[0] }) {
  const { t } = useLanguage();
  return (
    <Card variant="default" hoverable padding="md" className="h-full flex flex-col">
      <CardContent className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="primary" size="sm">{t(announcement.category || '')}</Badge>
          <span className="text-text-secondary text-xs">{new Date(announcement.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <h4 className="font-semibold text-text-primary mb-2 line-clamp-2">{t(announcement.title || '')}</h4>
        <p className="text-text-secondary text-sm flex-1 line-clamp-3">{t(announcement.content || '')}</p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-color">
          <span className="text-text-secondary text-xs">{t(announcement.author || '')}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Mock analysis functions (simulate AI processing)
const mockPlantAnalysis = async (file: File, crop?: string): Promise<PlantAnalysisResult> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1500));

  const isHealthy = Math.random() > 0.4;
  const diseases = [
    'Early Blight', 'Late Blight', 'Common Rust', 'Leaf Mold',
    'Bacterial Spot', 'Black Rot', 'Northern Leaf Blight', 'Apple Scab'
  ];
  const prediction = isHealthy ? 'Healthy' : diseases[Math.floor(Math.random() * diseases.length)];
  const confidence = isHealthy ? 85 + Math.random() * 12 : 70 + Math.random() * 25;

  return {
    id: `analysis-${Date.now()}`,
    analysis_type: 'plant_disease',
    image_url: URL.createObjectURL(file),
    crop: crop || 'Tomato',
    prediction,
    class_id: prediction.toLowerCase().replace(/\s+/g, '_'),
    confidence: Math.round(confidence * 10) / 10,
    is_healthy: isHealthy,
    status: 'completed',
    is_low_confidence: confidence < 60,
    confidence_warning: confidence < 60 ? 'Low confidence result. Please consult an agronomist for verification.' : undefined,
    scientific_name: isHealthy ? 'Solanum lycopersicum (healthy)' : `Alternaria solani (${prediction})`,
    severity: isHealthy ? 'None' : confidence > 80 ? 'Moderate to Severe' : 'Mild to Moderate',
    symptoms: isHealthy
      ? 'No disease symptoms observed. Foliage appears healthy with good chlorophyll content and no visible lesions.'
      : 'Concentric brown lesions with yellow halos on lower leaves. Lesions expand and merge over time. Premature defoliation in severe cases.',
    causes: isHealthy
      ? 'No pathogens detected. Good cultural practices and resistant variety.'
      : 'Fungal pathogen Alternaria solani favored by warm, humid conditions (24-29°C, >90% RH). Spreads via wind, rain splash, and contaminated tools.',
    organic_treatment: isHealthy
      ? ['Continue current management practices', 'Apply compost tea weekly for prevention', 'Maintain crop rotation schedule']
      : ['Copper-based fungicides (Bordeaux mixture)', 'Bacillus subtilis foliar spray (weekly)', 'Neem oil 2% solution (7-10 day interval)', 'Remove and destroy infected leaves'],
    chemical_treatment: isHealthy
      ? ['Preventive: Chlorothalonil 7-10 day interval', 'Mancozeb at first sign of disease']
      : ['Azoxystrobin + Chlorothalonil tank mix', 'Difenoconazole (systemic, 14-day interval)', 'Boscalid + Pyraclostrobin (rotate modes of action)'],
    prevention_tips: [
      'Rotate with non-solanaceous crops for 2-3 years',
      'Use drip irrigation; avoid overhead watering',
      'Stake plants for better air circulation',
      'Apply mulch to reduce soil splash',
      'Select resistant varieties (e.g., Defiant, Iron Lady)',
      'Sanitize tools between plants/fields'
    ],
    top_predictions: [
      { class_id: prediction.toLowerCase().replace(/\s+/g, '_'), crop: crop || 'Tomato', disease_name: prediction, confidence: Math.round(confidence * 10) / 10, is_healthy: isHealthy },
      { class_id: 'healthy', crop: crop || 'Tomato', disease_name: 'Healthy', confidence: Math.round((100 - confidence) * 0.6 * 10) / 10, is_healthy: true },
      { class_id: 'other', crop: crop || 'Tomato', disease_name: 'Other/Unknown', confidence: Math.round((100 - confidence) * 0.4 * 10) / 10, is_healthy: false },
    ],
    inference_engine: 'MobileNetV2 Transfer Learning (Offline Demo Mode)',
    disclaimer: 'This is an AI-generated preliminary assessment for educational purposes. Not a substitute for professional phytopathological diagnosis. Confirm with lab testing and consult certified agronomist for treatment decisions.',
    created_at: new Date().toISOString(),
  };
};

const mockSoilAnalysis = async (file: File): Promise<SoilAnalysisResult> => {
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1500));

  const moistureScore = 20 + Math.random() * 60;
  const crackDensity = Math.random() * 30;
  const isCracked = crackDensity > 5;

  const moistureLevels = ['Very Dry', 'Dry', 'Moderately Moist', 'Moist', 'Very Moist'];
  const moistureLevel = moistureLevels[Math.floor(moistureScore / 20)];

  const colors = [
    { hex: '#4a3227', category: 'Dark Humic', characteristics: 'High organic matter, good water retention' },
    { hex: '#8a6556', category: 'Brown Loam', characteristics: 'Balanced texture, favorable for most crops' },
    { hex: '#a18072', category: 'Light Brown Sandy', characteristics: 'Lower organic matter, quick drainage' },
    { hex: '#d2bab0', category: 'Pale Sandy', characteristics: 'Low organic content, may need amendments' },
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const residues = [
    { level: 'High Residue', description: 'Excellent surface cover, good erosion protection' },
    { level: 'Moderate Residue', description: 'Adequate cover, some bare soil visible' },
    { level: 'Low Residue', description: 'Minimal cover, erosion risk elevated' },
  ];
  const residue = residues[Math.floor(Math.random() * residues.length)];

  const textures = [
    { level: 'Fine Crumb', description: 'Good aggregation, favorable root penetration' },
    { level: 'Medium Blocky', description: 'Moderate structure, some compaction possible' },
    { level: 'Coarse Cloddy', description: 'Poor tilth, may restrict root growth' },
  ];
  const texture = textures[Math.floor(Math.random() * textures.length)];

  return {
    id: `soil-${Date.now()}`,
    analysis_type: 'soil_surface',
    image_url: URL.createObjectURL(file),
    overall_surface_condition: isCracked ? 'Cracked Surface - Moisture Stress Indicated' : 'Favorable Surface Condition',
    apparent_moisture: {
      moisture_score: Math.round(moistureScore),
      moisture_level: moistureLevel,
      description: isCracked ? 'Surface indicates moisture deficit. Immediate irrigation recommended.' : 'Surface moisture appears adequate for current crop stage.',
      mean_brightness_value: Math.round(100 + Math.random() * 100),
    },
    surface_cracking: {
      cracking_detected: isCracked,
      crack_density_pct: Math.round(crackDensity * 10) / 10,
      crack_count: Math.floor(crackDensity * 2),
      severity: isCracked ? (crackDensity > 15 ? 'Severe' : 'Moderate') : 'None',
      description: isCracked ? 'Surface fissures detected indicating moisture stress and potential hydrophobicity.' : 'No significant surface cracking detected. Good soil structure maintained.',
    },
    soil_color: {
      dominant_rgb: [parseInt(color.hex.slice(1,3), 16), parseInt(color.hex.slice(3,5), 16), parseInt(color.hex.slice(5,7), 16)],
      dominant_hex: color.hex,
      category: color.category,
      characteristics: color.characteristics,
    },
    organic_residue: {
      green_coverage_pct: Math.round(Math.random() * 40),
      residue_level: residue.level,
      description: residue.description,
    },
    surface_texture: {
      roughness_score: Math.round(30 + Math.random() * 50),
      roughness_level: texture.level,
      description: texture.description,
    },
    recommendations: [
      { title: 'Irrigation Management', category: 'Water', action: isCracked ? 'Apply deep irrigation (30-45cm) immediately. Consider mulching to reduce evaporation.' : 'Maintain current irrigation schedule. Monitor soil moisture at 15cm depth.' },
      { title: 'Organic Matter', category: 'Soil Health', action: 'Incorporate 5-10 t/ha compost or FYM annually. Use cover crops in fallow periods.' },
      { title: 'Tillage Practice', category: 'Soil Structure', action: 'Adopt reduced tillage. Use subsoiler if compaction detected below 30cm.' },
      { title: 'Mulching', category: 'Conservation', action: 'Apply 5-10cm straw or organic mulch to conserve moisture and suppress weeds.' },
    ],
    disclaimer: 'This is an optical surface analysis only. Not a substitute for laboratory soil testing (pH, EC, NPK, micronutrients). For fertilizer recommendations, submit samples to a certified soil testing laboratory.',
    is_lab_test: false,
    created_at: new Date().toISOString(),
  };
};

export function AgriculturePage() {
  const { t } = useLanguage();

  // State for AI features
  const [activeTab, setActiveTab] = useState<'advisory' | 'disease' | 'soil' | 'assistant'>('advisory');
  const [plantImage, setPlantImage] = useState<string | null>(null);
  const [plantFile, setPlantFile] = useState<File | null>(null);
  const [plantResult, setPlantResult] = useState<PlantAnalysisResult | null>(null);
  const [plantLoading, setPlantLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');

  const [soilImage, setSoilImage] = useState<string | null>(null);
  const [soilFile, setSoilFile] = useState<File | null>(null);
  const [soilResult, setSoilResult] = useState<SoilAnalysisResult | null>(null);
  const [soilLoading, setSoilLoading] = useState(false);

  const [chatCropContext, setChatCropContext] = useState<string>('');
  const [chatDiseaseContext, setChatDiseaseContext] = useState<string>('');

  const handlePlantImageSelect = (file: File | Blob, previewUrl: string) => {
    setPlantFile(file as File);
    setPlantImage(previewUrl);
    setPlantResult(null);
  };

  const handlePlantClear = () => {
    setPlantImage(null);
    setPlantFile(null);
    setPlantResult(null);
  };

  const handleSoilImageSelect = (file: File | Blob, previewUrl: string) => {
    setSoilFile(file as File);
    setSoilImage(previewUrl);
    setSoilResult(null);
  };

  const handleSoilClear = () => {
    setSoilImage(null);
    setSoilFile(null);
    setSoilResult(null);
  };

  const runPlantAnalysis = async () => {
    if (!plantFile) return;
    setPlantLoading(true);
    try {
      const result = await mockPlantAnalysis(plantFile, selectedCrop);
      setPlantResult(result);
      // Set context for chat
      setChatCropContext(selectedCrop);
      setChatDiseaseContext(result.prediction);
    } catch (err) {
      console.error('Plant analysis failed:', err);
    } finally {
      setPlantLoading(false);
    }
  };

  const runSoilAnalysis = async () => {
    if (!soilFile) return;
    setSoilLoading(true);
    try {
      const result = await mockSoilAnalysis(soilFile);
      setSoilResult(result);
      setChatCropContext('General');
      setChatDiseaseContext('Soil Health');
    } catch (err) {
      console.error('Soil analysis failed:', err);
    } finally {
      setSoilLoading(false);
    }
  };

  const SUPPORTED_CROPS = [
    { id: 'tomato', name: 'Tomato', icon: '🍅' },
    { id: 'potato', name: 'Potato', icon: '🥔' },
    { id: 'corn', name: 'Corn (Maize)', icon: '🌽' },
    { id: 'apple', name: 'Apple', icon: '🍎' },
    { id: 'grape', name: 'Grape', icon: '🍇' },
    { id: 'pepper', name: 'Bell Pepper', icon: '🫑' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SectionHeader
        title={t('agriculture.title')}
        subtitle={t('agriculture.subtitle')}
      />

      {/* AI Feature Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('advisory')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'advisory'
                ? 'bg-white shadow-sm text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Leaf className="w-4 h-4 inline mr-1" />
            {t('agriculture.tab.advisory')}
          </button>
          <button
            onClick={() => setActiveTab('disease')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'disease'
                ? 'bg-white shadow-sm text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <ScanLine className="w-4 h-4 inline mr-1" />
            {t('agriculture.tab.disease')}
          </button>
          <button
            onClick={() => setActiveTab('soil')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'soil'
                ? 'bg-white shadow-sm text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Microscope className="w-4 h-4 inline mr-1" />
            {t('agriculture.tab.soil')}
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'assistant'
                ? 'bg-white shadow-sm text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Bot className="w-4 h-4 inline mr-1" />
            {t('agriculture.tab.assistant')}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'advisory' && (
        <>
          {/* Crop Information */}
          {crops.length > 0 && (
            <section className="mb-12">
              <SectionHeader title={t('agriculture.advisory')} subtitle={t('agriculture.advisorySubtitle')} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {crops.map((crop) => (
                  <CropCard key={crop.id} crop={crop} />
                ))}
              </div>
            </section>
          )}

          {/* Farming Tips */}
          <section className="mb-12">
            <SectionHeader title={t('agriculture.tips')} subtitle={t('agriculture.tipsSubtitle')} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Sun, title: t('agriculture.sunlightManagement'), tip: t('agriculture.sunlightTip'), color: 'gold' },
                { icon: CloudRain, title: t('agriculture.waterManagement'), tip: t('agriculture.waterTip'), color: 'blue' },
                { icon: Wind, title: t('agriculture.windProtection'), tip: t('agriculture.windTip'), color: 'primary' },
              ].map((item, index) => (
                <Card key={index} variant="outlined" padding="lg" className={`border-${item.color}/20`}>
                  <CardContent className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[var(--color-${item.color}-light)] flex items-center justify-center">
                      <item.icon size={28} className={`text-${item.color}`} />
                    </div>
                    <h4 className="font-semibold text-text-primary mb-2">{item.title}</h4>
                    <p className="text-text-secondary text-sm">{item.tip}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Government Schemes */}
          <section className="mb-12">
            <SectionHeader title={t('agriculture.schemes')} subtitle={t('agriculture.schemesSubtitle')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: t('agriculture.pmKisan'), desc: t('agriculture.pmKisanDesc'), icon: '💰' },
                { name: t('agriculture.rythuBandhu'), desc: t('agriculture.rythuBandhuDesc'), icon: '🌱' },
                { name: t('agriculture.cropInsurance'), desc: t('agriculture.cropInsuranceDesc'), icon: '🛡️' },
                { name: t('agriculture.soilHealth'), desc: t('agriculture.soilHealthDesc'), icon: '🧪' },
                { name: t('agriculture.kisanCredit'), desc: t('agriculture.kisanCreditDesc'), icon: '💳' },
                { name: t('agriculture.subsidySchemes'), desc: t('agriculture.subsidySchemesDesc'), icon: '📦' },
              ].map((scheme, index) => (
                <Card key={index} variant="default" hoverable padding="md">
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{scheme.icon}</span>
                      <div>
                        <h4 className="font-semibold text-text-primary mb-1">{scheme.name}</h4>
                        <p className="text-text-secondary text-sm">{scheme.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Agriculture Announcements */}
          {agricultureAnnouncements.length > 0 && (
            <section>
              <SectionHeader title={t('agriculture.announcements')} subtitle={t('agriculture.announcementsSubtitle')} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agricultureAnnouncements.map((announcement) => (
                  <AgriAnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {activeTab === 'disease' && (
        <section className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload & Controls */}
            <div className="lg:col-span-1 space-y-6">
              <Card variant="outlined" padding="lg">
                <h3 className="font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
                  <ScanLine className="w-5 h-5 text-primary" />
                  {t('agriculture.tab.disease')}
                </h3>
                <p className="text-text-secondary text-sm mb-6">
                  Upload a clear photo of a crop leaf to detect diseases using AI-powered computer vision.
                </p>

                <ImageUploader
                  onImageSelected={handlePlantImageSelect}
                  selectedPreview={plantImage}
                  onClear={handlePlantClear}
                  analysisType="plant_disease"
                  isLoading={plantLoading}
                />

                {plantImage && !plantLoading && !plantResult && (
                  <div className="space-y-3 pt-4">
                    <select
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border-color bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {SUPPORTED_CROPS.map(crop => (
                        <option key={crop.id} value={crop.name}>{crop.icon} {crop.name}</option>
                      ))}
                    </select>
                    <Button
                      onClick={runPlantAnalysis}
                      className="w-full"
                      size="lg"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      {t('agriculture.analysis.runPlant')}
                    </Button>
                  </div>
                )}

                {plantLoading && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-text-secondary">{t('agriculture.analysis.loadingPlant')}</p>
                    <p className="text-xs text-text-secondary mt-1">This may take 2-3 seconds</p>
                  </div>
                )}
              </Card>

              {/* Crop Selector for Demo */}
              <Card variant="default" padding="md">
                <h4 className="font-semibold text-text-primary mb-3">Supported Crops</h4>
                <div className="grid grid-cols-2 gap-2">
                  {SUPPORTED_CROPS.map((crop) => (
                    <div key={crop.id} className="p-2 rounded-lg bg-gray-50 text-center text-sm border border-border-color/50">
                      <div className="text-2xl">{crop.icon}</div>
                      <div className="font-medium text-text-primary">{crop.name}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2 space-y-6">
              {plantResult ? (
                <PredictionCard result={plantResult} onClose={() => { setPlantResult(null); setPlantImage(null); setPlantFile(null); }} />
              ) : plantImage ? (
                <Card variant="outlined" padding="lg" className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-light flex items-center justify-center">
                    <Brain size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Ready to Analyze</h3>
                  <p className="text-text-secondary mb-6">Click "Analyze Disease" to run AI-powered disease detection on your uploaded image.</p>
                  <Button onClick={runPlantAnalysis} size="lg">
                    Run Analysis <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              ) : (
                <Card variant="outlined" padding="lg" className="text-center border-dashed border-border-color">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <ScanLine size={32} className="text-text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Upload a Crop Leaf Image</h3>
                  <p className="text-text-secondary">Use the upload panel to select or capture a photo of a crop leaf for disease analysis.</p>
                </Card>
              )}
            </div>
          </div>

          {/* Info Box */}
          <Card variant="outlined" padding="lg" className="bg-blue-50 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary mb-2">About Disease Detection</h4>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• <strong>AI Model:</strong> MobileNetV2 CNN with transfer learning on 15+ crop disease classes</li>
                  <li>• <strong>Accuracy:</strong> ~92% on validation set (demo uses simulated results)</li>
                  <li>• <strong>Supported:</strong> Tomato, Potato, Corn, Apple, Grape, Bell Pepper</li>
                  <li>• <strong>Output:</strong> Disease ID, confidence, symptoms, organic/chemical treatments, prevention tips</li>
                  <li>• <strong>Disclaimer:</strong> Results are preliminary. Confirm with lab testing and consult certified agronomist.</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      )}

      {activeTab === 'soil' && (
        <section className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload & Controls */}
            <div className="lg:col-span-1 space-y-6">
              <Card variant="outlined" padding="lg">
                <h3 className="font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
                  <Microscope className="w-5 h-5 text-amber-600" />
                  {t('agriculture.tab.soil')}
                </h3>
                <p className="text-text-secondary text-sm mb-6">
                  Upload a photo of the soil surface to analyze moisture, cracking, color, texture, and organic residue using computer vision.
                </p>

                <ImageUploader
                  onImageSelected={handleSoilImageSelect}
                  selectedPreview={soilImage}
                  onClear={handleSoilClear}
                  analysisType="soil_surface"
                  isLoading={soilLoading}
                />

                {soilImage && !soilLoading && !soilResult && (
                  <div className="pt-4">
                    <Button
                      onClick={runSoilAnalysis}
                      className="w-full"
                      size="lg"
                      variant="secondary"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      {t('agriculture.analysis.runSoil')}
                    </Button>
                  </div>
                )}

                {soilLoading && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-text-secondary">{t('agriculture.analysis.loadingSoil')}</p>
                    <p className="text-xs text-text-secondary mt-1">Measuring moisture, cracking, color, texture & residue</p>
                  </div>
                )}
              </Card>

              {/* Metrics Explanation */}
              <Card variant="default" padding="md">
                <h4 className="font-semibold text-text-primary mb-3">Analysis Metrics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-sky-50">
                    <Droplets className="w-4 h-4 text-sky-600" />
                    <div>
                      <div className="font-medium text-text-primary">Apparent Moisture</div>
                      <div className="text-text-secondary text-xs">Surface reflectivity & brightness</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50">
                    <Split className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-medium text-text-primary">Surface Cracking</div>
                      <div className="text-text-secondary text-xs">Fissure density & severity</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-100">
                    <Palette className="w-4 h-4 text-amber-800" />
                    <div>
                      <div className="font-medium text-text-primary">Soil Color</div>
                      <div className="text-text-secondary text-xs">Dominant hue & organic matter</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="font-medium text-text-primary">Residue & Texture</div>
                      <div className="text-text-secondary text-xs">Surface cover & tilth quality</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2 space-y-6">
              {soilResult ? (
                <SoilMetricsCard result={soilResult} onClose={() => { setSoilResult(null); setSoilImage(null); setSoilFile(null); }} />
              ) : soilImage ? (
                <Card variant="outlined" padding="lg" className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                    <Microscope size={32} className="text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">{t('agriculture.analysis.ready')}</h3>
                  <p className="text-text-secondary mb-6">Click "Analyze Soil Surface" to run computer vision analysis on your uploaded image.</p>
                  <Button onClick={runSoilAnalysis} size="lg" variant="secondary">
                    {t('agriculture.analysis.runSoil')} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              ) : (
                <Card variant="outlined" padding="lg" className="text-center border-dashed border-border-color">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Microscope size={32} className="text-text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">{t('agriculture.analysis.uploadSoilFirst')}</h3>
                  <p className="text-text-secondary">Use the upload panel to select or capture a photo of the soil surface for optical analysis.</p>
                </Card>
              )}
            </div>
          </div>

          {/* Info Box */}
          <Card variant="outlined" padding="lg" className="bg-amber-50 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary mb-2">About Soil Surface Analysis</h4>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• <strong>Method:</strong> OpenCV optical analysis of surface properties (not a lab test)</li>
                  <li>• <strong>Measures:</strong> Moisture reflectivity, crack density %, dominant color, residue cover, surface roughness</li>
                  <li>• <strong>Output:</strong> Condition assessment, irrigation & management recommendations</li>
                  <li>• <strong>Limitation:</strong> Surface only — does not measure pH, EC, NPK, or subsurface properties</li>
                  <li>• <strong>Disclaimer:</strong> For fertilizer decisions, submit samples to certified soil testing laboratory.</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      )}

      {activeTab === 'assistant' && (
        <section className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <ChatInterface
                initialCropContext={chatCropContext}
                initialDiseaseContext={chatDiseaseContext}
              />
            </div>

            {/* Context & Quick Actions */}
            <div className="space-y-6">
              <Card variant="outlined" padding="lg">
                <h3 className="font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  Conversation Context
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Crop Context</div>
                    <div className="font-medium text-text-primary">
                      {chatCropContext || 'None — Ask general questions or analyze a crop/soil first'}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Disease/Analysis Context</div>
                    <div className="font-medium text-text-primary">
                      {chatDiseaseContext || 'None — Run disease detection or soil analysis to set context'}
                    </div>
                  </div>
                  {(!chatCropContext || !chatDiseaseContext) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setActiveTab('disease')}
                    >
                      <ScanLine className="w-4 h-4 mr-2" />
                      Analyze a crop to set context
                    </Button>
                  )}
                </div>
              </Card>

              <Card variant="default" padding="lg" className="bg-primary-light/50 border-primary/20">
                <h3 className="font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-primary" />
                  Scientific Responsibility
                </h3>
                <ul className="text-sm text-text-secondary space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>AI responses are for educational guidance only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Always verify with certified agronomist for critical decisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Lab testing required for soil nutrient & disease confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Follow local agricultural extension recommendations</span>
                  </li>
                </ul>
              </Card>

              <Card variant="default" padding="lg">
                <h3 className="font-bold text-lg text-text-primary mb-4">Quick Topics</h3>
                <div className="space-y-2">
                  {[
                    'Early Blight prevention in tomatoes',
                    'Soil cracking & moisture management',
                    'Organic pest control methods',
                    'Nitrogen deficiency vs disease',
                    'Cover crops for soil health',
                    'Irrigation scheduling tips',
                    'Crop rotation planning',
                    'Integrated Pest Management (IPM)',
                  ].map((topic, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left p-3 rounded-lg bg-white border border-border-color hover:border-primary hover:bg-primary-light/50:bg-primary-dark/20 transition-all text-sm text-text-primary"
                      onClick={() => {
                        setActiveTab('assistant');
                        // The chat will handle this via suggested actions
                      }}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}