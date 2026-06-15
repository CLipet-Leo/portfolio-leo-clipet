import { AboutSection } from '@/components/layout/AboutSection';
import { HeroSection } from '@/components/layout/HeroSection';

/**
 * HomePage Component
 */
export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <AboutSection />
    </div>
  );
}
