// src/types/project.d.ts

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  content: string;
  githubUrl: string;
}

export interface Skill {
  name: string;
  level: number; // 1 to 100
  category: string; // e.g., 'Frontend', 'Backend', 'DevOps'
}

export interface Tags {
  id: string;
  name: string;
  color: string;
}
