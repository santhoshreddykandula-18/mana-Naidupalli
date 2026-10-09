import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-text-primary text-sm font-medium transition-colors"
        aria-label={language === 'en' ? 'Switch to Telugu' : 'Switch to English'}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{language === 'en' ? 'తెలుగు' : 'English'}</span>
      </button>
    </div>
  );
}