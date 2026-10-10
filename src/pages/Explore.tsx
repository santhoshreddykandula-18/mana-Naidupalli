import { SectionCardContainer } from '../components/SectionCardRenderer';

export function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dynamic Header Section */}
      <SectionCardContainer pageKey="explore" sectionKey="header" className="mb-16" />

      {/* Dynamic Quick Access Grid */}
      <SectionCardContainer pageKey="explore" sectionKey="quick-access" className="mb-16" />

      {/* Dynamic Village Location */}
      <SectionCardContainer pageKey="explore" sectionKey="location" className="mb-16" />
    </div>
  );
}