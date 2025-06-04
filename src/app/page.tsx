import { AboutSection } from '@/components/layout/AboutSection';
import { ContactSection } from '@/components/layout/ContactSection';
import { HomeSection } from '@/components/layout/HomeSection';
import { ProjectsSection } from '@/components/layout/ProjectsSection';
import { SkillsSection } from '@/components/layout/SkillSection';

/**
 * HomePage Component
 */
export default function HomePage() {
  return (
    <div>
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
