// src/types/types.d.ts

export interface IProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  // content: string;
}

export interface ISkill {
  name: string;
  level: number; // 1 to 100
  category: string; // e.g., 'Frontend', 'Backend', 'DevOps'
}

export interface ITags {
  id: string;
  name: string;
  color: string;
}
