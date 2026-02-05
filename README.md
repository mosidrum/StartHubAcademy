# Course Hub

A Next.js 16 application demonstrating production-grade SSR and SEO patterns.

## Architecture Decisions

### Server-Side Rendering (SSR)

All course pages are **Server Components by default**. This approach:

- Eliminates client-side JavaScript for content pages
- Enables direct data fetching in components via `async/await`
- Reduces Time to First Byte (TTFB) with server-rendered HTML
- Ensures search engines receive complete content on first request

```tsx
// Data fetching happens at the component level, not in useEffect
export default async function CoursePage({ params }) {
  const course = await getCourseBySlug(slug); // Runs on server only
}
```

The `server-only` package marks data-fetching modules to prevent accidental client imports.

### SEO Strategy

**Dynamic Metadata**: Each route exports `generateMetadata` for unique titles, descriptions, and Open Graph tags resolved at request time.

**JSON-LD Structured Data**: Course pages include Schema.org `Course` markup for rich search results. The schema is serialized server-side and injected as `<script type="application/ld+json">`.

**Crawlability**:

- `robots.ts` generates `/robots.txt` allowing all crawlers
- `sitemap.ts` generates `/sitemap.xml` with all routes and last-modified dates

### Component Architecture

```
src/app/courses/[slug]/
├── page.tsx              # Data fetching + composition
├── layout.tsx            # Route-specific layout boundary
└── _components/          # Presentational server components
    ├── CourseHeader.tsx
    ├── CourseDetails.tsx
    ├── CourseTopics.tsx
    ├── CourseSkills.tsx
    └── CourseFooter.tsx
```

Components use `Pick<Course, ...>` for props to receive only required data, avoiding prop drilling of entire objects.

### Styling

Pure SCSS architecture with CSS Custom Properties for theming:

```
src/styles/
├── _palette.scss     # Color definitions + color() helper
├── _variables.scss   # Design tokens (spacing, typography, shadows)
└── _mixins.scss      # Responsive breakpoints, utilities
```

- **CSS Modules** for component-scoped styles (`*.module.scss`)
- **Global utilities** defined in `globals.scss`
- **CSS Custom Properties** for runtime theming
- Dark mode is automatic via `prefers-color-scheme` media queries

### Type Safety

Strict TypeScript configuration with additional checks:

- `noUnusedLocals` / `noUnusedParameters`
- `noUncheckedIndexedAccess`
- `exactOptionalPropertyTypes`

Domain types in `src/types/index.ts` with utility types for common patterns:

- `CoursePreview` for list views
- `CourseCreateInput` / `CourseUpdateInput` for mutations

## Development

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run lint      # ESLint
npm run format    # Prettier
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── globals.scss        # Global styles
│   ├── robots.ts           # robots.txt generation
│   ├── sitemap.ts          # sitemap.xml generation
│   └── courses/
│       ├── page.tsx        # /courses listing
│       └── [slug]/         # /courses/:slug dynamic route
├── lib/                    # Server utilities
│   ├── mock-data.ts        # Mock courses/providers
│   └── getCourseBySlug.ts  # Data fetching (server-only)
├── styles/                 # SCSS architecture
└── types/                  # TypeScript definitions
```
