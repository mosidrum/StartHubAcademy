import type { Course } from '@/types';
import styles from '../page.module.scss';

type Props = Pick<Course, 'duration' | 'instructors' | 'price'>;

export function CourseDetails({ duration, instructors, price }: Props) {
  const priceDisplay = price.isFree ? 'Free' : `$${price.amount}`;

  return (
    <section aria-labelledby="details-heading" className={styles.metaGrid}>
      <h2 id="details-heading" className="sr-only">
        Course Details
      </h2>
      <div className={styles.metaCard}>
        <span className={styles.metaLabel}>Duration</span>
        <span className={styles.metaValue}>
          {duration.hours}h {duration.minutes}m
        </span>
      </div>
      <div className={styles.metaCard}>
        <span className={styles.metaLabel}>Instructors</span>
        <span className={styles.metaValue}>{instructors.join(', ')}</span>
      </div>
      <div className={styles.metaCard}>
        <span className={styles.metaLabel}>Price</span>
        <span className={`${styles.metaValue}${price.isFree ? ` ${styles.free}` : ''}`}>
          {priceDisplay}
        </span>
      </div>
    </section>
  );
}
