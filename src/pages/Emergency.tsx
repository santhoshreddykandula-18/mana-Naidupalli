import { AlertTriangle, Phone, MapPin, Hospital, Shield, Flame, Ambulance, Users, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { emergencyContacts } from '../data/mockDb';
import { useLanguage } from '../context/LanguageContext';

const iconComponents: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ambulance: Ambulance,
  shield: Shield,
  flame: Flame,
  hospital: Hospital,
  phone: Phone,
  child: Users,
};

export function EmergencyPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-emergency text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 flex items-center md:justify-center gap-3">
                <AlertTriangle className="w-10 h-10 md:w-12 md:h-12" />
                {t('emergency.title')}
              </h1>
              <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto md:mx-0">
                Use these verified emergency contacts when immediate help is needed. Save these numbers for quick access.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      <SectionHeader
        title={t('emergency.contacts')}
        subtitle={t('emergency.contactsSubtitle') || 'Verified emergency numbers for immediate assistance'}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {emergencyContacts.map((contact) => {
          const Icon = iconComponents[contact.icon] || Phone;
          return (
            <Card key={contact.id} variant="default" hoverable padding="md" className="border-emergency/20 bg-red-50/30">
              <CardContent className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emergency/10 flex items-center justify-center">
                  <Icon size={32} className="text-emergency" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-1">{t(contact.service)}</h3>
                <p className="text-text-secondary text-sm mb-4">{t(contact.description)}</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                  <a href={`tel:${contact.phone}`} className="group">
                    <Button variant="danger" size="lg" className="w-full sm:w-auto gap-2 group-hover:scale-105 transition-transform">
                      <Phone size={20} className="inline-block" />
                      <span className="text-lg">{t('emergency.call')}: {contact.phone}</span>
                    </Button>
                  </a>
                </div>

                <div className="pt-3 border-t border-emergency/20 text-xs text-text-secondary">
                  <MapPin size={12} className="inline" /> Naidupalli & Surrounding Areas
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Important Notes */}
      <section className="mb-12">
        <SectionHeader title={t('emergency.whenToCall')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="outlined" padding="lg" className="border-emergency/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emergency/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} className="text-emergency" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">{t('emergency.whenToCall')}</h4>
                <ul className="text-text-secondary text-sm space-y-1 list-disc list-inside">
                  <li>Medical emergencies (chest pain, difficulty breathing, severe bleeding)</li>
                  <li>Fire or gas leak</li>
                  <li>Crime in progress or immediate threat to safety</li>
                  <li>Road accidents with injuries</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card variant="outlined" padding="lg" className="border-blue-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <HelpCircle size={20} className="text-blue-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-2">{t('emergency.nonEmergency')}</h4>
                <ul className="text-text-secondary text-sm space-y-1 list-disc list-inside">
                  <li>Local Police Station: 0866-247-xxxx</li>
                  <li>PHC Naidupalli: 0866-247-xxxx</li>
                  <li>Panchayat Office: 0866-247-xxxx</li>
                  <li>Electricity Complaints: 1912</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Disclaimer */}
      <Card variant="outlined" padding="lg" className="bg-gray-50 border-dashed">
        <p className="text-text-secondary text-sm text-center">
          <strong>Disclaimer:</strong> This website is a community information portal. Emergency numbers are provided for reference only.
          The website administrators are not responsible for any delays or issues with emergency response.
          Always verify the latest contact information from official sources.
        </p>
      </Card>
    </div>
  );
}