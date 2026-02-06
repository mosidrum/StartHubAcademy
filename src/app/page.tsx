import Image from 'next/image';
import Link from 'next/link';
import { courses, providers } from '@/lib/mock-data';
import styles from './page.module.scss';

const FEATURED_COUNT = 8;
const featured = courses.slice(0, FEATURED_COUNT);

const topics = [
  'Python',
  'React',
  'TypeScript',
  'AWS',
  'Docker',
  'Machine Learning',
  'System Design',
  'Cybersecurity',
  'Rust',
  'UI/UX Design',
  'SQL',
  'Next.js',
];

function getProviderName(providerId: string): string {
  return providers.find((p) => p.id === providerId)?.name ?? '';
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

const totalStudents = courses.reduce(
  (sum, c) => sum + (c.metadata.enrollmentCount ?? 0),
  0,
);
const totalInstructors = new Set(courses.flatMap((c) => c.instructors)).size;
const avgRating =
  courses.reduce((sum, c) => sum + (c.metadata.rating ?? 0), 0) /
  courses.length;

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Learn without limits</h1>
            <p className={styles.heroSubtitle}>
              Start, switch, or advance your career with thousands of courses
              from world-class instructors and institutions.
            </p>
            <div className={styles.heroCta}>
              <Link href="/courses" className={styles.btnPrimary}>
                Explore Courses
              </Link>
              <Link href="/courses" className={styles.btnGhost}>
                View Plans
              </Link>
            </div>
            <p className={styles.heroNote}>
              Starting at <strong>Free</strong> &mdash; cancel anytime
            </p>
          </div>
          <div className={styles.heroVisual}>
            <Image
              src="https://picsum.photos/seed/hero-learning/600/400"
              alt="Online learning"
              width={600}
              height={400}
              priority
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className={styles.statsBar}>
        <div className={styles.statsInner}>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {formatCount(totalStudents)}+
            </span>
            <span className={styles.statLabel}>Learners</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{courses.length}+</span>
            <span className={styles.statLabel}>Courses</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{totalInstructors}+</span>
            <span className={styles.statLabel}>Instructors</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{avgRating.toFixed(1)}</span>
            <span className={styles.statLabel}>Avg. Rating</span>
          </div>
        </div>
      </section>

      {/* ── Topics ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Browse by Topic</h2>
          <p className={styles.sectionSubtitle}>
            Explore courses across the most in-demand skills
          </p>
          <div className={styles.topicList}>
            {topics.map((topic) => (
              <Link
                key={topic}
                href="/courses"
                className={styles.topicPill}
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Featured Courses</h2>
              <p className={styles.sectionSubtitle}>
                Hand-picked by our team for quality and relevance
              </p>
            </div>
            <Link href="/courses" className={styles.viewAll}>
              View all &rarr;
            </Link>
          </div>
          <div className={styles.courseGrid}>
            {featured.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className={styles.card}
              >
                {course.thumbnail && (
                  <div className={styles.cardThumb}>
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      width={400}
                      height={225}
                      className={styles.cardImage}
                    />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{course.title}</h3>
                  <p className={styles.cardInstructors}>
                    {course.instructors.join(', ')}
                  </p>
                  <div className={styles.cardRating}>
                    <span className={styles.ratingValue}>
                      {course.metadata.rating}
                    </span>
                    <span className={styles.stars}>
                      {'★'.repeat(Math.round(course.metadata.rating ?? 0))}
                    </span>
                    <span className={styles.ratingCount}>
                      ({formatCount(course.metadata.reviewCount ?? 0)})
                    </span>
                  </div>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardDuration}>
                      {course.duration.hours}h total
                    </span>
                    <span className={styles.cardLevel}>{course.level}</span>
                  </div>
                  <p className={styles.cardPrice}>
                    {course.price.isFree ? (
                      <span className={styles.free}>Free</span>
                    ) : (
                      `$${course.price.amount}`
                    )}
                  </p>
                </div>
                <span className={styles.providerTag}>
                  {getProviderName(course.providerId)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Become an instructor</h2>
          <p className={styles.ctaText}>
            Top instructors from around the world teach millions of learners on
            CourseHub. We provide the tools and skills to teach what you love.
          </p>
          <Link href="/courses" className={styles.btnPrimaryCta}>
            Start teaching today
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>CourseHub</span>
            <p className={styles.footerTagline}>
              Top online learning platform
            </p>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/courses">Courses</Link>
            <Link href="/courses">About</Link>
            <Link href="/courses">Careers</Link>
            <Link href="/courses">Blog</Link>
          </div>
          <p className={styles.footerCopy}>
            &copy; {new Date().getFullYear()} CourseHub. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
