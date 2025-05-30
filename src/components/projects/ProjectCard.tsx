import { Project } from '@/types/project';
import Link from 'next/link';
import styles from './ProjectCard.module.scss';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className={styles.card}>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </Link>
  );
}
