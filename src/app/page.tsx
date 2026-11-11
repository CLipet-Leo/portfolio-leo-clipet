import { AboutSection } from '@/components/sections/about-section';
import { HeroSection } from '@/components/sections/hero-section';
import { ProjectsSection } from '@/components/sections/projects-section';

/**
 * HomePage Component
 */
export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
    </div>
  );
}
