type Props = {
  lastUpdated: string;
};

export function CourseFooter({ lastUpdated }: Props) {
  return (
    <footer className="py-4 text-sm text-muted">
      <p>
        Last updated:{' '}
        <time dateTime={lastUpdated}>
          {new Date(lastUpdated).toLocaleDateString()}
        </time>
      </p>
    </footer>
  );
}
