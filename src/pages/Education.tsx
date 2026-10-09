import { GraduationCap, Award, BookOpen, Star } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { educationPosts } from '../data/mockDb';
import { useLanguage } from '../context/LanguageContext';

function EducationCard({ post }: { post: typeof educationPosts[0] }) {
  const { t } = useLanguage();
  return (
    <Card variant="default" hoverable padding="md" className="h-full flex flex-col border-blue-primary/20">
      <CardContent className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="blue" size="sm">{t(post.category)}</Badge>
          <span className="text-text-secondary text-xs">{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
        <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-text-secondary text-sm flex-1 line-clamp-3">{post.description}</p>
        <div className="mt-4 pt-3 border-t border-border-color">
          <Button variant="ghost" size="sm" className="w-full text-blue-primary hover:text-blue-700 hover:bg-blue-50">
            {t('Learn More')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function EducationPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-blue-primary text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-3">
                <GraduationCap className="w-10 h-10 md:w-12 md:h-12" />
                {t('education.title')}
              </h1>
              <p className="text-blue-100 text-lg md:text-xl">
                {t('Information on schools, scholarships, exams, and student achievements in Naidupalli.')}
              </p>
            </div>
            
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-12">

          {educationPosts.length > 0 && (


          <section>
            <SectionHeader title={t('education.updates')} subtitle="{t('Latest news, scholarships, and exams')}" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educationPosts.map((post) => (
                <EducationCard key={post.id} post={post} />
              ))}
            </div>
          </section>


          )}

          <section>
            <SectionHeader title={t('education.schools')} subtitle={t('education.schools')} />
            <div className="space-y-4">
              {[
                { name: 'Zilla Parishad High School', type: 'High School (Govt)', classes: '6th to 10th', stats: '400+ Students' },
                { name: 'Mandal Parishad Primary School', type: 'Primary School (Govt)', classes: '1st to 5th', stats: '250+ Students' }
              ].map((school, index) => (
                <Card key={index} variant="outlined" padding="md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-light flex items-center justify-center">
                        <BookOpen size={24} className="text-blue-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-text-primary text-lg">{t(school.name)}</h4>
                        <p className="text-text-secondary text-sm">{t(school.type)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <Badge variant="gray">{t(school.classes)}</Badge>
                       <Badge variant="blue">{t(school.stats)}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card variant="outlined" padding="lg">
            <h3 className="font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
              <Award className="text-gold" size={20} />
              {t('education.achievements')}
            </h3>
            <div className="space-y-4">
               {/* Example Achievement Widget */}
              <div className="border-l-2 border-gold pl-4 py-1">
                <p className="font-semibold text-text-primary">{t('Lakshmi Priya')}</p>
                <p className="text-text-secondary text-sm mb-1">{t('State Level Essay Writing - 1st Prize')}</p>
                <span className="text-xs text-gray-500">2026</span>
              </div>
              <div className="border-l-2 border-gold pl-4 py-1">
                <p className="font-semibold text-text-primary">{t('K. Vinay')}</p>
                <p className="text-text-secondary text-sm mb-1">{t('District Sports Meet - Gold in 100m')}</p>
                <span className="text-xs text-gray-500">2026</span>
              </div>
            </div>
          </Card>

          <Card variant="default" padding="lg" className="bg-blue-50 border-blue-200">
             <h3 className="font-bold text-lg text-text-primary mb-2 flex items-center gap-2">
              <Star className="text-blue-primary" size={20} />
              {t('education.resources')}
            </h3>
            <p className="text-text-secondary text-sm mb-4">{t('Access online study materials and mock tests provided by the state education board.')}</p>
            <Button variant="info" className="w-full">
              {t('Access Materials')}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}