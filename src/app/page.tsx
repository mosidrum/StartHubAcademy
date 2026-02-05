import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <h1>Course Hub</h1>
        <p className={styles.description}>
          Discover and learn from top online courses
        </p>
        <Link href="/courses" className={styles.link}>
          Browse Courses
        </Link>
      </main>
    </div>
  );
}
