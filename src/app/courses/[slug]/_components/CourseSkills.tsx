type Props = {
  skills: string[];
};

export function CourseSkills({ skills }: Props) {
  return (
    <section aria-labelledby="skills-heading" className="py-4">
      <h2 id="skills-heading" className="text-xl">
        Skills You&apos;ll Gain
      </h2>
      <ul role="list">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}
