# Course Hub

Next.js 16 app. Courses rendered server-side, with structured data for SEO.

## How SSR works here

Every page is a Server Component. No `useEffect`, no client-side fetches for content. The component is `async`, fetches data directly, and returns HTML. The browser gets fully rendered markup on the first response — nothing to hydrate.

```tsx
export default async function CoursePage({ params }) {
  const course = await getCourseBySlug(slug);
  // returns HTML, no JS bundle for this page
}
```

Data-fetching modules use the `server-only` package so they can't accidentally end up in a client bundle.

## Dynamic metadata

Each course page exports a `generateMetadata` function. Next.js calls it at request time before rendering. It sets the `<title>`, `<meta name="description">`, and Open Graph tags from the course data — so every page has unique, crawlable metadata without any client JS.

## Structured data (JSON-LD)

Course pages include a `<script type="application/ld+json">` block with Schema.org `Course` markup. It covers name, description, provider, instructors, price, rating, and duration. Google picks this up for rich snippets in search results.

The JSON-LD sits inside `<main>`, not `<head>` — search engines parse it from anywhere in the DOM.

## Performance

The goal is 90+ on Lighthouse for both Performance and SEO.

What keeps the scores high:
- Server Components mean zero JS shipped for content pages
- Fonts use `display: swap` and are self-hosted via `next/font`
- No layout shift — content arrives fully rendered
- `robots.ts` and `sitemap.ts` handle crawlability out of the box

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # root layout, fonts, base metadata
│   ├── courses/
│   │   ├── page.tsx            # /courses listing
│   │   └── [slug]/
│   │       ├── page.tsx        # course detail (SSR + JSON-LD + metadata)
│   │       └── _components/    # presentational pieces
│   ├── robots.ts
│   └── sitemap.ts
├── lib/
│   ├── mock-data.ts            # fake courses for demo
│   └── getCourseBySlug.ts      # data fetch (server-only)
├── styles/                     # SCSS tokens and mixins
└── types/
```

## Dev

```bash
npm run dev
npm run build
npm run lint
```
