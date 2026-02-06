import styles from '../page.module.scss';

type Props = {
  skills: string[];
};

export function CourseSkills({ skills }: Props) {
  return (
    <section aria-labelledby="skills-heading" className={styles.section}>
      <h2 id="skills-heading" className={styles.sectionTitle}>
        Skills You&apos;ll Gain
      </h2>
      <ul role="list" className={styles.pillList}>
        {skills.map((skill) => (
          <li key={skill} className={styles.pill}>
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
