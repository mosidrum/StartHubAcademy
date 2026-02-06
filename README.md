# CourseHub

A modern course discovery platform built with **Next.js 16**, **React 19**, and **SCSS Modules**. Browse, filter, and explore online courses from top providers — all server-rendered for fast load times and strong SEO.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![SCSS](https://img.shields.io/badge/SCSS_Modules-CC6699?logo=sass&logoColor=white)

## Overview

CourseHub aggregates courses from providers like Coursera, Udemy, edX, Pluralsight, and LinkedIn Learning into a single, browsable catalog. Each course page is fully server-rendered with rich metadata and structured data, making it optimized for search engines out of the box.

### Key Features

- **Server-Side Rendering** — Every page is a React Server Component. Content arrives as fully rendered HTML with zero client-side JavaScript for content pages.
- **SEO Optimized** — Dynamic `<title>`, `<meta>`, and Open Graph tags generated per page via `generateMetadata`. JSON-LD structured data (Schema.org `Course`) for Google rich snippets.
- **Responsive Design** — SCSS Modules with a design token system (variables, mixins, palette) for consistent spacing, typography, and color across breakpoints.
- **Accessible** — Semantic HTML, ARIA landmarks, `aria-labelledby` headings, and screen-reader-only labels throughout.
- **Type Safe** — Strict TypeScript with `exactOptionalPropertyTypes` enabled.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 Server Components |
| Language | TypeScript 5 (strict mode) |
| Styling | SCSS Modules + design tokens |
| Linting | ESLint 9 + Prettier |
| Compiler | React Compiler (babel plugin) |

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
git clone <repository-url>
cd hub
npm install
```

### Development

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm start          # Start production server
```

### Code Quality

```bash
npm run lint       # Run ESLint
npm run lint:fix   # Auto-fix linting issues
npm run format     # Format with Prettier
npm run format:check  # Check formatting
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, global metadata
│   ├── page.tsx                    # Home page (hero, stats, featured courses)
│   ├── _components/                # Shared components (Header, Breadcrumb)
│   ├── courses/
│   │   ├── page.tsx                # Course listing with grid cards
│   │   ├── CourseList.tsx          # Client component for progressive disclosure
│   │   └── [slug]/
│   │       ├── page.tsx            # Course detail (SSR + JSON-LD + metadata)
│   │       ├── page.module.scss    # Detail page styles (hero, cards, pills)
│   │       └── _components/        # CourseHeader, CourseDetails, CourseTopics, etc.
│   ├── robots.ts                   # Robots.txt generation
│   └── sitemap.ts                  # Sitemap.xml generation
├── lib/
│   ├── mock-data.ts                # Demo course data
│   └── getCourseBySlug.ts          # Server-only data fetching
├── styles/
│   ├── _variables.scss             # Design tokens (spacing, typography, shadows)
│   ├── _mixins.scss                # Responsive breakpoints, layout utilities
│   └── _palette.scss               # Color system
└── types/
    └── index.ts                    # Course, Provider, and utility types
```

## Architecture

### Server Components

All pages are async Server Components. Data is fetched directly in the component — no `useEffect`, no client-side fetching, no hydration overhead. Data-fetching modules use the `server-only` package to prevent accidental inclusion in client bundles.

```tsx
export default async function CoursePage({ params }) {
  const course = await getCourseBySlug(slug);
  return <article>...</article>; // Returns HTML, no JS bundle
}
```

### Dynamic Metadata & SEO

Each route exports a `generateMetadata` function that Next.js calls at request time. This produces unique `<title>`, `<meta name="description">`, Open Graph, and Twitter Card tags per page — fully crawlable without JavaScript.

### Structured Data

Course detail pages embed a `<script type="application/ld+json">` block with Schema.org `Course` markup covering name, description, provider, instructors, price, rating, and duration. Search engines use this for rich result cards.

### Styling

SCSS Modules scoped per component, backed by a shared design token system:

- **`_variables.scss`** — Spacing scale, font sizes, border radii, shadows, transitions
- **`_mixins.scss`** — Responsive breakpoints (`sm`/`md`/`lg`/`xl`), layout helpers, typography utilities
- **`_palette.scss`** — Color map with a `color()` function for type-safe access

## Performance

Targeting 90+ Lighthouse scores for both Performance and SEO:

- Zero JS shipped for server-rendered content pages
- Fonts self-hosted via `next/font` with `display: swap`
- No layout shift — content arrives fully rendered on first response
- `robots.ts` and `sitemap.ts` for automated crawlability

## License

This project is private and not currently published under an open-source license.
