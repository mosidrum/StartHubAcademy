import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCourseBySlug } from '@/lib/getCourseBySlug';
import type { Course } from '@/types';

import {
  CourseHeader,
  CourseDetails,
  CourseTopics,
  CourseSkills,
  CourseFooter,
} from './_components';

function generateCourseJsonLd(course: Course): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.providerId,
      sameAs: course.providerUrl,
    },
    instructor: course.instructors.map((name) => ({
      '@type': 'Person',
      name,
    })),
    educationalLevel: course.level,
    inLanguage: course.metadata.language,
    datePublished: course.createdAt,
    dateModified: course.updatedAt,
    ...(course.thumbnail && { image: course.thumbnail }),
    ...(course.metadata.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: course.metadata.rating,
        reviewCount: course.metadata.reviewCount,
      },
    }),
    offers: {
      '@type': 'Offer',
      price: course.price.amount,
      priceCurrency: course.price.currency,
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      duration: `PT${course.duration.hours}H${course.duration.minutes}M`,
    },
  };
}

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  const description = course.shortDescription ?? course.description;

  return {
    title: course.title,
    description,
    keywords: [...course.topics, ...course.skills],
    openGraph: {
      title: course.title,
      description,
      type: 'article',
      siteName: 'Course Hub',
      locale: course.metadata.language,
      authors: course.instructors,
      publishedTime: course.createdAt,
      modifiedTime: course.updatedAt,
      tags: course.topics,
      ...(course.thumbnail && {
        images: [{ url: course.thumbnail, alt: course.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description,
      ...(course.thumbnail && { images: [course.thumbnail] }),
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const jsonLd = generateCourseJsonLd(course);

  return (
    <main className="container py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <article aria-labelledby="course-title">
        <CourseHeader
          title={course.title}
          description={course.description}
          level={course.level}
        />
        <CourseDetails
          duration={course.duration}
          instructors={course.instructors}
          price={course.price}
        />
        <CourseTopics topics={course.topics} />
        <CourseSkills skills={course.skills} />
        <CourseFooter lastUpdated={course.metadata.lastUpdated} />
      </article>
    </main>
  );
}
