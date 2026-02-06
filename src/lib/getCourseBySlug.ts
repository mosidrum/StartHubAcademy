import 'server-only';

import type { Course } from '@/types';
import { courses } from './mock-data';

const SIMULATED_DELAY_MS = 100;

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

  return courses.find((course) => course.slug === slug) ?? null;
}
