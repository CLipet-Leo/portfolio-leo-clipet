import { AboutSection } from '@/components/sections/AboutSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';

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
