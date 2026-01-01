import { AboutSection } from '@/components/layout/AboutSection';
import { HomeSection } from '@/components/layout/HomeSection';

/**
 * HomePage Component
 */
export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <HomeSection />
      <AboutSection />
    </div>
  );
}
