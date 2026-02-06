import type { Metadata } from 'next';
import { courses } from '@/lib/mock-data';
import Breadcrumb from '@/app/_components/Breadcrumb';
import CourseList from './CourseList';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse our catalog of online courses from top providers',
};

export default function CoursesPage() {
  return (
    <main className="container py-8">
      <Breadcrumb href="/" label="Home" />
      <h1>Courses</h1>
      <p className="text-secondary">Browse our catalog of online courses</p>
      <CourseList courses={courses} />
    </main>
  );
}
