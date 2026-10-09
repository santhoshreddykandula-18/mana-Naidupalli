import { ExternalLink, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { governmentServices } from '../data/mockDb';
import { useLanguage } from '../context/LanguageContext';

export function GovernmentPage() {
  const { t } = useLanguage();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Disclaimer */}
      <div className="bg-blue-50 border-l-4 border-blue-primary p-4 rounded-r-lg mb-8 flex items-start gap-3">
        <AlertTriangle className="text-blue-primary mt-0.5" size={20} />
        <div>
          <h3 className="text-blue-900 font-medium">{t('government.panchayat')}</h3>
          <p className="text-blue-800 text-sm mt-1">
            {t('government.officialWebsite')}
          </p>
        </div>
      </div>

      <SectionHeader
        title={t('government.title')}
        subtitle={t('government.subtitle')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {governmentServices.map((service) => (
          <Card key={service.id} variant="default" hoverable padding="md" className="flex flex-col border-blue-light/50">
            <CardContent className="flex-1 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  {/* Using an emoji or text fallback since we don't have dynamic Icon mapping easily here without a robust map, but let's use the first letter of service */}
                   {service.service_name.charAt(0)}
                 </div>
                 <h3 className="font-bold text-text-primary text-lg">{service.service_name}</h3>
              </div>
              <p className="text-text-secondary text-sm flex-1 mb-6">{service.short_description}</p>

              <a href={service.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button variant="secondary" className="w-full justify-between group border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <span>{t('government.officialWebsite')}</span>
                  <ExternalLink size={16} className="text-blue-400 group-hover:text-white transition-colors" />
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Panchayat Info placeholders */}
      <section>
         <SectionHeader title={t('government.schemes')} subtitle={t("Recent publications from the Gram Panchayat")} />
         <Card variant="outlined" padding="lg" className="text-center bg-gray-50 border-dashed">
            <p className="text-text-secondary">{t('government.noNotices')}</p>
         </Card>
      </section>

    </div>
  );
}