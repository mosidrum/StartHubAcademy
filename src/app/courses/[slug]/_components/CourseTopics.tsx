import styles from '../page.module.scss';

type Props = {
  topics: string[];
};

export function CourseTopics({ topics }: Props) {
  return (
    <section aria-labelledby="topics-heading" className={styles.section}>
      <h2 id="topics-heading" className={styles.sectionTitle}>
        Topics Covered
      </h2>
      <ul role="list" className={styles.pillList}>
        {topics.map((topic) => (
          <li key={topic} className={styles.pill}>
            {topic}
          </li>
        ))}
      </ul>
    </section>
  );
}
