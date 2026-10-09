import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  message: string;
  suggested_actions?: string[];
  related_topics?: string[];
  disclaimer?: string;
  created_at: string;
}

const ASSISTANT_PROMPT_CHIPS = [
  "agriculture.chat.chip1",
  "agriculture.chat.chip2",
  "agriculture.chat.chip3",
  "agriculture.chat.chip4",
  "agriculture.chat.chip5",
];

interface ChatInterfaceProps {
  initialCropContext?: string;
  initialDiseaseContext?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialCropContext,
  initialDiseaseContext,
}) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      message: t('agriculture.chat.welcome'),
      suggested_actions: [
        t('agriculture.chat.chip1') || 'How to prevent Early Blight in tomatoes',
        t('agriculture.chat.chip2') || 'Managing soil cracking and moisture',
        t('agriculture.chat.chip3') || 'Organic pest prevention protocols',
      ],
      created_at: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Simulate AI response with offline fallback (since we don't have a backend)
  const generateMockResponse = (query: string, _contextCrop?: string, _contextDisease?: string): Promise<ChatMessage> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        let responseMessage = "";
        let suggested_actions: string[] = [];
        let disclaimer = t('agriculture.chat.disclaimer');

        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('early blight') || lowerQuery.includes('blight')) {
          responseMessage = `**Early Blight Prevention in Tomatoes:**

**Cultural Practices:**
- **Crop Rotation**: Rotate with non-solanaceous crops (beans, corn, cereals) for 2-3 years
- **Sanitation**: Remove and destroy infected plant debris after harvest
- **Spacing**: Plant with adequate spacing (60-90cm) for air circulation
- **Mulching**: Apply straw or plastic mulch to prevent soil splash onto leaves

**Water Management:**
- Avoid overhead irrigation; use drip irrigation instead
- Water early morning so foliage dries quickly
- Maintain consistent soil moisture to reduce plant stress

**Resistant Varieties:**
- Choose tomato varieties with resistance genes (e.g., 'Defiant', 'Mountain Magic', 'Iron Lady')

**Organic Treatments:**
- Copper-based fungicides (preventive application)
- Bacillus subtilis or Bacillus amyloliquefaciens formulations
- Neem oil applications (7-10 day intervals)

**Chemical Options (if needed):**
- Chlorothalonil, mancozeb, or azoxystrobin (follow label rates and PHI)`;
          suggested_actions = [
            'Tomato Late Blight management',
            'Copper fungicide application timing',
            'Disease-resistant tomato varieties for my region'
          ];
        } else if (lowerQuery.includes('soil') && (lowerQuery.includes('crack') || lowerQuery.includes('moisture') || lowerQuery.includes('water'))) {
          responseMessage = `**Soil Surface Cracking & Moisture Management:**

**What Cracking Indicates:**
- **High crack density (>15%)**: Severe moisture deficit, hydrophobic soil
- **Moderate cracking (5-15%)**: Inadequate irrigation scheduling
- **Fine surface cracks (<5%)**: Normal drying cycle, monitor closely

**Immediate Actions:**
1. **Deep Irrigation**: Apply water slowly to penetrate 30-45cm depth
2. **Mulching**: Apply 5-10cm organic mulch (straw, leaves, compost)
3. **Cover Crops**: Plant legumes or grasses to maintain soil structure

**Long-term Solutions:**
- **Increase Organic Matter**: Add compost, green manure, or FYM annually
- **Conservation Tillage**: Reduce disturbance to preserve soil aggregates
- **Subsoiling**: Break hardpans if compaction is the root cause

**Monitoring:**
- Check soil moisture at 15cm depth daily using probe or tensiometer
- Target 60-80% field capacity for most crops`;
          suggested_actions = [
            'How to build soil organic matter quickly',
            'Best mulching materials for my crops',
            'Irrigation scheduling for sandy vs clay soils'
          ];
        } else if (lowerQuery.includes('organic') && (lowerQuery.includes('pest') || lowerQuery.includes('disease') || lowerQuery.includes('mildew'))) {
          responseMessage = `**Organic Pest & Disease Management (IPM Approach):**

**Preventive Cultural Controls:**
- **Crop Rotation**: Break pest/disease cycles (3-4 year rotations)
- **Companion Planting**: Marigolds, basil, nasturtiums repel many pests
- **Trap Crops**: Plant sacrificial crops (mustard for flea beetles, nasturtium for aphids)
- **Sanitation**: Remove crop residues, weeds, and alternate hosts

**Biological Controls:**
- **Beneficial Insects**: Release ladybugs, lacewings, parasitic wasps
- **Microbial Products**:
  - *Bacillus thuringiensis* (Bt) for caterpillars
  - *Beauveria bassiana* for whiteflies, aphids, thrips
  - *Trichoderma* spp. for soil-borne diseases

**Botanical/Organic Sprays:**
- **Neem Oil** (1-2%): Broad-spectrum, disrupts insect growth
- **Pyrethrin** (from chrysanthemum): Quick knockdown for soft-bodied insects
- **Potassium Bicarbonate**: Powdery mildew control (5g/L weekly)
- **Copper/Sulfur**: Preventive fungicides (use sparingly, soil accumulation)

**Soil Health for Resilience:**
- Compost teas for foliar application
- Mycorrhizal inoculants at planting
- Balanced nutrition (avoid excess N)`;
          suggested_actions = [
            'How to make compost tea for foliar spray',
            'Beneficial insect habitat creation',
            'Powdery mildew organic treatment schedule'
          ];
        } else if (lowerQuery.includes('nitrogen') || lowerQuery.includes('deficienc')) {
          responseMessage = `**Distinguishing Nitrogen Deficiency from Disease:**

**Nitrogen Deficiency Symptoms:**
- **Uniform yellowing** of older/lower leaves first (chlorosis)
- **Stunted growth**, reduced leaf size
- **Thin, spindly stems**
- **Early maturity**, reduced yield
- **No distinct lesions or spots** - just general chlorosis

**Disease Symptoms (Key Differences):**
- **Irregular patterns**: Patches, spots, lesions with margins
- **Fungal structures**: Spores, mycelium, fruiting bodies visible
- **Progressive spread**: From infection points outward
- **Specific host patterns**: Diseases target certain plant families

**Diagnostic Steps:**
1. **Check newest growth**: N deficiency affects old leaves; diseases often affect new growth
2. **Look for patterns**: Uniform = nutrient; Patchy/spotted = disease
3. **Examine roots**: N deficiency = healthy roots; Root rot = brown/mushy roots
4. **Soil test**: Confirm N levels (nitrate-N should be 20-30 ppm for vegetables)

**Quick Field Test:**
- Apply urea solution (1%) to a few plants
- **Response in 3-5 days** = N deficiency
- **No response** = likely disease or other constraint`;
          suggested_actions = [
            'How to take a proper soil sample for testing',
            'Foliar nitrogen application rates and timing',
            'Other nutrient deficiency identification guide'
          ];
        } else if (lowerQuery.includes('cover crop') || lowerQuery.includes('organic matter') || lowerQuery.includes('soil health')) {
          responseMessage = `**Best Cover Crops for Soil Organic Matter:**

**Legumes (Nitrogen Fixers):**
- **Sunn Hemp** (Crotalaria): 5-8 t/ha biomass, 150-200 kg N/ha
- **Cowpea**: Fast-growing, drought-tolerant, 3-5 t/ha
- **Cluster Bean (Guar)**: Deep roots, breaks hardpans
- **Berseem Clover**: Cool season, 4-6 t/ha biomass

**Grasses (Carbon Builders):**
- **Sorghum-Sudangrass**: Massive roots, 8-12 t/ha, suppresses nematodes
- **Pearl Millet**: Heat/drought tolerant, excellent for sandy soils
- **Cereal Rye**: Winter hardy, allelopathic weed suppression

**Brassicas (Biofumigants):**
- **Mustard/Radish**: Glucosinolates suppress soil pathogens
- **Rapeseed**: Deep taproot, scavenges nutrients

**Mixtures (Best of Both):**
- **Legume + Grass**: e.g., Cowpea + Sorghum-Sudangrass (balanced C:N ratio)
- **3-Way Mix**: Legume + Grass + Brassica for maximum diversity

**Management Tips:**
- **Terminate at flowering** for max N (legumes) or biomass (grasses)
- **Incorporate 2-3 weeks** before next crop planting
- **Roller-crimp** for no-till systems instead of tillage
- **Seeding rates**: Increase 25-50% for weed suppression`;
          suggested_actions = [
            'Cover crop seeding calendar for my region',
            'How to terminate cover crops without tillage',
            'Cover crop mixtures for specific soil problems'
          ];
        } else {
          // General response
          const generalResponses = [
            `Thank you for your question about "${query}". As your AI Farming Assistant, I provide guidance based on integrated pest management (IPM), soil health principles, and sustainable agriculture practices.

For specific crop issues, could you please share:
1. **Crop type and variety**
2. **Growth stage** (seedling, vegetative, flowering, fruiting)
3. **Symptoms observed** (photos help tremendously)
4. **Recent weather** (rain, humidity, temperature)
5. **Management history** (fertilizers, pesticides, irrigation)

This context helps me give more targeted, actionable advice.`,
            `I'm here to help with your farming questions! Whether it's about:
- **Crop disease identification** and management
- **Soil health** improvement strategies
- **Irrigation scheduling** and water management
- **Nutrient management** (organic and conventional)
- **Pest control** using IPM approaches
- **Variety selection** for your region

Please provide more details about your specific situation for the most relevant guidance.`,
          ];
          responseMessage = generalResponses[Math.floor(Math.random() * generalResponses.length)];
          suggested_actions = ASSISTANT_PROMPT_CHIPS.slice(0, 3);
        }

        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          message: responseMessage,
          suggested_actions,
          disclaimer,
          created_at: new Date().toISOString(),
        };

        resolve(assistantMsg);
      }, 1000 + Math.random() * 1500);
    });
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      message: query.trim(),
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await generateMockResponse(query.trim(), initialCropContext, initialDiseaseContext);
      setMessages((prev) => [...prev, response]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        message: `I encountered an issue: ${err.message || 'Please try again.'}`,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-border-color flex flex-col h-[700px] max-h-[85vh] overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 sm:px-6 border-b border-border-color bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-green-500 flex items-center justify-center text-white shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary text-base flex items-center gap-2">
              <span>{t('agriculture.chat.title')}</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </h3>
            <p className="text-xs text-text-secondary">
              {t('agriculture.chat.subtitle')}
            </p>
          </div>
        </div>

        {initialCropContext && (
          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary">
            {t('agriculture.chat.context')}: {initialCropContext}
          </span>
        )}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-white text-text-primary border border-border-color rounded-tl-none space-y-3'
              }`}
            >
              {/* Message Body */}
              <div className="whitespace-pre-line space-y-2">
                {msg.message.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={pIdx} className="font-bold text-base text-primary pt-1">
                        {paragraph.replace('### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <p key={pIdx} className="font-semibold">{paragraph.replace(/\*\*/g, '')}</p>;
                  }
                  return <p key={pIdx}>{paragraph}</p>;
                })}
              </div>

              {/* Suggested Action Chips */}
              {msg.suggested_actions && msg.suggested_actions.length > 0 && (
                <div className="pt-2 border-t border-gray-100 space-y-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                    {t('agriculture.chat.suggested')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggested_actions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        type="button"
                        onClick={() => handleSend(act)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-light hover:bg-primary/20:bg-primary-dark/40 text-primary text-xs font-medium transition-colors"
                      >
                        <span>{act}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              {msg.disclaimer && (
                <p className="text-[10px] text-text-secondary italic pt-1 border-t border-gray-100">
                  {msg.disclaimer}
                </p>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-gray-200 text-text-secondary flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-text-secondary text-sm">
            <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <span className="text-xs font-medium">{t('agriculture.chat.thinking')}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Prompt Chips */}
      <div className="px-4 py-2 bg-gray-50/80 border-t border-border-color/60 overflow-x-auto flex gap-2 no-scrollbar">
        {ASSISTANT_PROMPT_CHIPS.map((chipKey, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(t(chipKey))}
            className="shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-white border border-border-color hover:border-primary hover:text-primary text-text-secondary transition-all shadow-2xs"
          >
            {t(chipKey)}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-4 bg-white border-t border-border-color/80 flex items-center gap-3"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={t('agriculture.chat.placeholder')}
          className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-border-color focus:outline-none focus:ring-2 focus:ring-primary text-sm text-text-primary placeholder:text-text-secondary"
        />

        <button
          type="submit"
          disabled={!inputMessage.trim() || loading}
          className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-medium text-white bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};