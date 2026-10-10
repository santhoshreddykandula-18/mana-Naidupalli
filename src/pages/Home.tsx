import { SectionCardContainer } from '../components/SectionCardRenderer';

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dynamic Hero Section */}
      <SectionCardContainer pageKey="home" sectionKey="hero" className="mb-16" />

      {/* Dynamic Announcements Section */}
      <SectionCardContainer pageKey="home" sectionKey="announcements" className="mb-16" />

      {/* Dynamic Events Section */}
      <SectionCardContainer pageKey="home" sectionKey="events" className="mb-16" />

      {/* Dynamic Temples Section */}
      <SectionCardContainer pageKey="home" sectionKey="temples" className="mb-16" />

      {/* Dynamic Sri Ram Youth Section */}
      <SectionCardContainer pageKey="home" sectionKey="sri-ram-youth" className="mb-16" />

      {/* Dynamic Cricket Section */}
      <SectionCardContainer pageKey="home" sectionKey="cricket" className="mb-16" />

      {/* Dynamic Gallery Section */}
      <SectionCardContainer pageKey="home" sectionKey="gallery" className="mb-16" />

      {/* Dynamic Location Section */}
      <SectionCardContainer pageKey="home" sectionKey="location" className="mb-16" />
    </div>
  );
}