import type { Course } from '@/types';
import styles from '../page.module.scss';

type Props = Pick<Course, 'title' | 'description' | 'level'>;

export function CourseHeader({ title, description, level }: Props) {
  return (
    <header className={styles.hero}>
      <span className={styles.levelBadge}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </span>
      <h1 id="course-title" className={styles.heroTitle}>
        {title}
      </h1>
      <p className={styles.heroDescription}>{description}</p>
    </header>
  );
}
