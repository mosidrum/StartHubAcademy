// Provider types
export type ProviderSlug =
  | 'coursera'
  | 'udemy'
  | 'edx'
  | 'pluralsight'
  | 'linkedin-learning';

export interface Provider {
  id: string;
  slug: ProviderSlug;
  name: string;
  description: string;
  website: string;
  logo?: string;
}

// Course types
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseStatus = 'draft' | 'published' | 'archived';

export interface CourseDuration {
  hours: number;
  minutes: number;
}

export interface CoursePrice {
  amount: number;
  currency: string;
  isFree: boolean;
}

export interface CourseMetadata {
  language: string;
  subtitles: string[];
  lastUpdated: string;
  enrollmentCount?: number;
  rating?: number;
  reviewCount?: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  providerId: string;
  providerCourseId: string;
  providerUrl: string;
  instructors: string[];
  thumbnail?: string;
  level: CourseLevel;
  status: CourseStatus;
  duration: CourseDuration;
  price: CoursePrice;
  topics: string[];
  skills: string[];
  metadata: CourseMetadata;
  createdAt: string;
  updatedAt: string;
}

// Utility types
export type CoursePreview = Pick<
  Course,
  | 'id'
  | 'slug'
  | 'title'
  | 'shortDescription'
  | 'thumbnail'
  | 'level'
  | 'duration'
  | 'price'
> & {
  providerName: string;
};

export type CourseCreateInput = Omit<Course, 'id' | 'createdAt' | 'updatedAt'>;
export type CourseUpdateInput = Partial<CourseCreateInput>;
