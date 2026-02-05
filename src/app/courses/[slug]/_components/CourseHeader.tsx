import type { Course } from '@/types';

type Props = Pick<Course, 'title' | 'description' | 'level'>;

export function CourseHeader({ title, description, level }: Props) {
  return (
    <header>
      <p className="text-sm text-[var(--color-text-secondary)]">
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </p>
      <h1 id="course-title">{title}</h1>
      <p className="text-[var(--color-text-secondary)]">{description}</p>
    </header>
  );
}
