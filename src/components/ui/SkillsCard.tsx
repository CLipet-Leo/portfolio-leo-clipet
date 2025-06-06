import type { Skill } from '@/types/types';

export const SkillsCard = ({ skill }: { skill: Skill }) => {
  return (
    <div className="bg-card card-hover rounded-lg p-6 shadow-xs">
      <div className="mb-4 text-left">
        <h3 className="text-lg font-semibold"> {skill.name}</h3>
      </div>
      <div className="bg-secondary/50 h-2 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-2 origin-left animate-[grow_1.5s_ease-out] rounded-full"
          style={{ width: skill.level + '%' }}
        />
      </div>

      <div className="mt-1 text-right">
        <span className="text-muted-foreground text-sm">{skill.level}%</span>
      </div>
    </div>
  );
};
