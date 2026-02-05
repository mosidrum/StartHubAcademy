import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse our catalog of online courses from top providers',
};

export default function CoursesPage() {
  return (
    <main className="container py-8">
      <h1>Courses</h1>
    </main>
  );
}
