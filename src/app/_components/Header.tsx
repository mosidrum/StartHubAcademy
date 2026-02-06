import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>CH</span>
          CourseHub
        </Link>

        <div className={styles.actions}>
          <button className={styles.btnOutline}>Log in</button>
          <button className={styles.btnPrimary}>Sign up</button>
        </div>
      </div>
    </header>
  );
}
