import type { Skill } from '@/types/types';

export const SkillsCard = ({ skill }: { skill: Skill }) => {
  // Le cercle prendra toute la largeur de la carte (ex: 72px)
  const size = 72;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (skill.level / 100) * circumference;

  return (
    <div className="bg-card card-hover flex w-28 min-w-[90px] flex-col items-center rounded-lg p-3 shadow-xs">
      <h3 className="mb-2 text-center text-base font-semibold">{skill.name}</h3>
      <div
        className="relative flex w-full items-center justify-center"
        style={{ height: size }}
      >
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="text-primary transition-all duration-700"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-primary absolute text-sm font-semibold">
          {skill.level}%
        </span>
      </div>
    </div>
  );
};
