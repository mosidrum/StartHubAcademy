import styles from '../page.module.scss';

type Props = {
  lastUpdated: string;
};

export function CourseFooter({ lastUpdated }: Props) {
  return (
    <footer className={styles.footer}>
      <p>
        Last updated:{' '}
        <time dateTime={lastUpdated}>
          {new Date(lastUpdated).toLocaleDateString()}
        </time>
      </p>
    </footer>
  );
}
