import Link from 'next/link';
import styles from './Breadcrumb.module.scss';

interface BreadcrumbProps {
  href: string;
  label: string;
}

export default function Breadcrumb({ href, label }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      <Link href={href} className={styles.link}>
        &larr; Back to {label}
      </Link>
    </nav>
  );
}
