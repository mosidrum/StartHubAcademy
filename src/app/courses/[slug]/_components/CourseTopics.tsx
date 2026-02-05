type Props = {
  topics: string[];
};

export function CourseTopics({ topics }: Props) {
  return (
    <section aria-labelledby="topics-heading" className="py-4">
      <h2 id="topics-heading" className="text-xl">
        Topics Covered
      </h2>
      <ul role="list">
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </section>
  );
}
