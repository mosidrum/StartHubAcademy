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
      <article aria-labelledby="course-title">
        <header>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </p>
          <h1 id="course-title">{course.title}</h1>
          <p className="text-[var(--color-text-secondary)]">
            {course.description}
          </p>
        </header>

        <section aria-labelledby="details-heading" className="py-4">
          <h2 id="details-heading" className="text-xl">
            Course Details
          </h2>
          <dl>
            <div>
              <dt className="sr-only">Duration</dt>
              <dd>
                {course.duration.hours}h {course.duration.minutes}m
              </dd>
            </div>
            <div>
              <dt className="sr-only">Instructors</dt>
              <dd>{course.instructors.join(', ')}</dd>
            </div>
            <div>
              <dt className="sr-only">Price</dt>
              <dd>
                {course.price.isFree ? 'Free' : `$${course.price.amount}`}
              </dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="topics-heading" className="py-4">
          <h2 id="topics-heading" className="text-xl">
            Topics Covered
          </h2>
          <ul role="list">
            {course.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="skills-heading" className="py-4">
          <h2 id="skills-heading" className="text-xl">
            Skills You'll Gain
          </h2>
          <ul role="list">
            {course.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <footer className="py-4 text-sm text-[var(--color-text-muted)]">
          <p>
            Last updated:{' '}
            <time dateTime={course.metadata.lastUpdated}>
              {new Date(course.metadata.lastUpdated).toLocaleDateString()}
            </time>
          </p>
        </footer>
      </article>
    </main>
  );
}
