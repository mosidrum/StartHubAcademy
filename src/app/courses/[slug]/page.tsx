import { notFound } from 'next/navigation';

import { getCourseBySlug } from '@/lib/getCourseBySlug';

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="container py-8">
      <span className="text-sm text-[var(--color-text-secondary)]">
        {course.level}
      </span>
      <h1>{course.title}</h1>
      <p className="text-[var(--color-text-secondary)]">{course.description}</p>

      <section className="py-4">
        <h2 className="text-xl">Details</h2>
        <ul>
          <li>Duration: {course.duration.hours}h {course.duration.minutes}m</li>
          <li>Instructors: {course.instructors.join(', ')}</li>
          <li>Price: {course.price.isFree ? 'Free' : `$${course.price.amount}`}</li>
        </ul>
      </section>

      <section className="py-4">
        <h2 className="text-xl">Topics</h2>
        <ul>
          {course.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
