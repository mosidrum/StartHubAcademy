import type { Course } from '@/types';

type Props = Pick<Course, 'duration' | 'instructors' | 'price'>;

export function CourseDetails({ duration, instructors, price }: Props) {
  return (
    <section aria-labelledby="details-heading" className="py-4">
      <h2 id="details-heading" className="text-xl">
        Course Details
      </h2>
      <dl>
        <div>
          <dt className="sr-only">Duration</dt>
          <dd>
            {duration.hours}h {duration.minutes}m
          </dd>
        </div>
        <div>
          <dt className="sr-only">Instructors</dt>
          <dd>{instructors.join(', ')}</dd>
        </div>
        <div>
          <dt className="sr-only">Price</dt>
          <dd>{price.isFree ? 'Free' : `$${price.amount}`}</dd>
        </div>
      </dl>
    </section>
  );
}
