'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/types';
import styles from './page.module.scss';

const INITIAL_COUNT = 6;

function getProviderName(providerId: string): string {
  const map: Record<string, string> = {
    prov_1: 'Coursera',
    prov_2: 'Udemy',
    prov_3: 'edX',
    prov_4: 'Pluralsight',
    prov_5: 'LinkedIn Learning',
  };
  return map[providerId] ?? 'Unknown';
}

function formatEnrollment(count?: number): string {
  if (!count) return '';
  if (count >= 1000) return `${(count / 1000).toFixed(0)}k`;
  return count.toString();
}

export default function CourseList({ courses }: { courses: Course[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? courses : courses.slice(0, INITIAL_COUNT);
  const hasMore = courses.length > INITIAL_COUNT;

  return (
    <>
      <ul className={styles.courseGrid}>
        {visible.map((course) => (
          <li key={course.id} className={styles.courseCard}>
            <Link href={`/courses/${course.slug}`}>
              {course.thumbnail && (
                <div className={styles.thumbnailWrapper}>
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    width={400}
                    height={225}
                    className={styles.thumbnail}
                  />
                  <span className={styles.levelBadge}>{course.level}</span>
                </div>
              )}
              <div className={styles.cardBody}>
                <span className={styles.provider}>
                  {getProviderName(course.providerId)}
                </span>
                <h2 className={styles.courseTitle}>{course.title}</h2>
                <p className={styles.courseDescription}>
                  {course.shortDescription}
                </p>
                <p className={styles.instructors}>
                  {course.instructors.join(', ')}
                </p>
                <div className={styles.cardFooter}>
                  <span className={styles.rating}>
                    {course.metadata.rating && (
                      <>
                        <span className={styles.star}>&#9733;</span>{' '}
                        {course.metadata.rating}
                        {course.metadata.reviewCount && (
                          <span className={styles.reviewCount}>
                            ({formatEnrollment(course.metadata.reviewCount)})
                          </span>
                        )}
                      </>
                    )}
                  </span>
                  <span className={styles.duration}>
                    {course.duration.hours}h{' '}
                    {course.duration.minutes > 0 &&
                      `${course.duration.minutes}m`}
                  </span>
                  <span className={styles.price}>
                    {course.price.isFree
                      ? 'Free'
                      : `$${course.price.amount}`}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && !showAll && (
        <div className={styles.viewMoreWrapper}>
          <button
            className={styles.viewMoreBtn}
            onClick={() => setShowAll(true)}
          >
            View More Courses ({courses.length - INITIAL_COUNT} more)
          </button>
        </div>
      )}
    </>
  );
}
