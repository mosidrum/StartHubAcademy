import type { Metadata } from 'next';
import Link from 'next/link';
import { courses } from '@/lib/mock-data';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse our catalog of online courses from top providers',
};

export default function CoursesPage() {
  return (
    <main className="container py-8">
      <h1>Courses</h1>
      <p className="text-secondary">Browse our catalog of online courses</p>
      <ul className={styles.courseList}>
        {courses.map((course) => (
          <li key={course.id} className={styles.courseItem}>
            <Link href={`/courses/${course.slug}`}>
              <h2 className={styles.courseTitle}>{course.title}</h2>
              <p className={styles.courseDescription}>
                {course.shortDescription}
              </p>
              <span className={styles.courseMeta}>
                {course.level} · {course.duration.hours}h {course.duration.minutes}m
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
