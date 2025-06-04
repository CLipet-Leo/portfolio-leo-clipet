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

export interface Tags {
  id: string;
  name: string;
  color: string;
}
