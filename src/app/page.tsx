import { ClosingSection } from '@/components/sections/closing-section';
import { OpeningSection } from '@/components/sections/opening-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { TimelineSection } from '@/components/sections/timeline-section';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <OpeningSection />
      <TimelineSection />
      <SkillsSection />
      <ClosingSection />
    </div>
  );
}
