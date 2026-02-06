import Image from 'next/image';
import type { CourseLevel } from '@/types';
import styles from '../page.module.scss';

const PROVIDER_NAMES: Record<string, string> = {
  prov_1: 'Coursera',
  prov_2: 'Udemy',
  prov_3: 'edX',
  prov_4: 'Pluralsight',
  prov_5: 'LinkedIn Learning',
};

interface Props {
  title: string;
  description: string;
  level: CourseLevel;
  thumbnail?: string | undefined;
  providerId: string;
  rating?: number | undefined;
  reviewCount?: number | undefined;
}

export function CourseHeader({
  title,
  description,
  level,
  thumbnail,
  providerId,
  rating,
  reviewCount,
}: Props) {
  const providerName = PROVIDER_NAMES[providerId] ?? 'Unknown';

  return (
    <header className={styles.hero}>
      {thumbnail && (
        <div className={styles.heroImageWrapper}>
          <Image
            src={thumbnail}
            alt={title}
            width={800}
            height={450}
            className={styles.heroImage}
            priority
          />
        </div>
      )}
      <div className={styles.heroContent}>
        <div className={styles.heroBadges}>
          <span className={styles.levelBadge}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </span>
          <span className={styles.providerBadge}>{providerName}</span>
        </div>
        <h1 id="course-title" className={styles.heroTitle}>
          {title}
        </h1>
        <p className={styles.heroDescription}>{description}</p>
        {rating != null && (
          <div className={styles.heroRating}>
            <span className={styles.star}>&#9733;</span> {rating}
            {reviewCount != null && (
              <span className={styles.heroReviewCount}>
                ({reviewCount.toLocaleString()} reviews)
              </span>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
