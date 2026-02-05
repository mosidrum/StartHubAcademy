// Importing 'server-only' causes a build error if this module is imported
// from a Client Component, ensuring data fetching stays server-side.
import 'server-only';

import type { Course } from '@/types';
import { courses } from './mock-data';

const SIMULATED_DELAY_MS = 100;

/**
 * Fetches a course by slug. Replace with actual API/database call in production.
 * Next.js automatically deduplicates multiple calls with the same arguments.
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  // Simulate network latency for realistic loading behavior
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

  return courses.find((course) => course.slug === slug) ?? null;
}
