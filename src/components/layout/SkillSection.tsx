'use client';

import skills from '@/data/skills.json';
import { cn } from '@/lib/utils';
import { Skill } from '@/types/types';
import { useState } from 'react';
import { SkillsCard } from '../ui/SkillsCard';

const categories = ['all', 'frontend', 'backend', 'tools'];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills: Skill[] = skills.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory,
  );
  return (
    <section id="skills" className="bg-secondary/30 relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          Mes <span className="text-primary"> Compétences</span>
        </h2>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'rounded-full px-5 py-2 capitalize transition-colors duration-300',
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/70 text-forefround hover:bd-secondary',
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill, key) => (
            <SkillsCard key={key} skill={skill as Skill} />
          ))}
        </div>
      </div>
    </section>
  );
};
