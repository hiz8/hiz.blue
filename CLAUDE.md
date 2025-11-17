# CLAUDE.md - AI Assistant Guide for hiz.blue

This document provides comprehensive guidance for AI assistants working on the hiz.blue codebase. It covers the architecture, patterns, conventions, and workflows necessary to contribute effectively.

## Project Overview

**hiz.blue** is a personal website and blog built with modern web technologies, deployed on Cloudflare Pages using edge computing for optimal performance. The site uses Notion as a headless CMS for blog content management.

**Key Characteristics:**
- Full-stack React application with server-side rendering (SSR)
- Edge-deployed on Cloudflare infrastructure
- Type-safe throughout with TypeScript
- Component-based architecture with co-located styles
- Cache-first data loading strategy
- Accessible UI with React Aria Components

## Technology Stack

### Core Framework
- **React Router v7** (formerly Remix) - Full-stack React framework with file-based routing
- **React 18.3.1** - UI library with concurrent features
- **TypeScript 5.7.3** - Strict type checking enabled

### Runtime & Deployment
- **Cloudflare Pages** - Static hosting with edge functions
- **Cloudflare Workers** - Edge runtime for SSR
- **Wrangler 3** - Development and deployment tooling

### Styling & UI
- **Vanilla Extract** - Type-safe CSS-in-TypeScript with zero runtime
- **@hiz8/blue-ui** - Custom component library (private GitHub package)
- **React Aria Components** - Accessible, unstyled UI primitives

### Content Management
- **Notion API (@notionhq/client)** - Headless CMS integration
- **@9gustin/react-notion-render** - Renders Notion blocks as React components

### Build Tools
- **Vite 6** - Fast build tool and dev server
- **Biome** - Fast linter and formatter (replaces ESLint/Prettier)

### Development Requirements
- **Node.js 20.11.1+** (specified in `.node-version`)
- **NPM** with GitHub Packages access for `@hiz8/blue-ui`

## Project Structure

```
/home/user/hiz.blue/
├── app/                           # Application source code
│   ├── routes/                    # Route components (file-based routing)
│   │   ├── layout/                # Layout wrapper components
│   │   │   ├── index.tsx          # Main layout with header/nav/footer
│   │   │   ├── app-banner.tsx     # Site header component
│   │   │   ├── app-nav.tsx        # Navigation component
│   │   │   └── app-footer.tsx     # Footer component
│   │   ├── home/                  # Homepage/feed (/)
│   │   ├── blog/                  # Blog listing page (/blog)
│   │   ├── blog.$slug/            # Individual blog posts (/blog/:slug)
│   │   ├── works/                 # Portfolio/works page (/works)
│   │   └── about.tsx              # About page (/about)
│   ├── utils/                     # Shared utilities
│   │   ├── notion.ts              # Notion API client wrapper
│   │   ├── cache.ts               # Cloudflare cache abstraction
│   │   └── post-from-notion.ts    # Data transformation utilities
│   ├── entry.client.tsx           # Client-side hydration entry
│   ├── entry.server.tsx           # SSR entry with streaming
│   ├── root.tsx                   # Root component (HTML structure)
│   ├── routes.ts                  # Route configuration
│   ├── env.ts                     # TypeScript type augmentation
│   ├── root.css.ts                # Global styles
│   └── styles.css.ts              # Design system tokens
├── functions/                     # Cloudflare Pages Functions
│   └── [[path]].ts                # Catch-all SSR handler
├── public/                        # Static assets
│   ├── fonts/                     # Web fonts (Inter, Noto Sans CJK JP)
│   ├── images/                    # Static images
│   ├── _headers                   # Cache-Control headers
│   └── _routes.json               # Cloudflare routing config
├── load-context.ts                # Cloudflare context setup
├── react-router.config.ts         # React Router configuration
├── vite.config.ts                 # Vite build configuration
├── tsconfig.json                  # TypeScript configuration
├── biome.json                     # Biome linter/formatter config
├── package.json                   # Dependencies and scripts
└── .npmrc                         # NPM config for GitHub Packages
```

## Development Workflow

### Available Commands

```bash
npm install        # Install dependencies (requires GitHub token for @hiz8/blue-ui)
npm run dev        # Start development server at localhost:8788
npm run start      # Start production preview at localhost:8788
npm run build      # Build for production
npm run typecheck  # Run TypeScript type checking
npm run lint       # Lint code with Biome
npm run fmt        # Format code with Biome
```

### Development Server

The dev server runs on `localhost:8788` and provides:
- Hot module replacement (HMR) via Vite
- Edge runtime emulation via Wrangler
- SSR with streaming
- Cloudflare cache simulation

### Building for Production

```bash
npm run build
```

Outputs to `./build/` with client and server bundles optimized for Cloudflare Pages deployment.

## Key Patterns and Conventions

### Route File Structure

Each route follows this pattern:

```typescript
// app/routes/example/index.tsx

import type { Route } from "./+types";
import { useLoaderData, Await } from "react-router";
import { Suspense } from "react";
import * as styles from "./index.css";

// Type-safe meta tags
export const meta: MetaFunction = () => {
  return [
    { title: "Page Title - hiz" },
    { name: "description", content: "Page description" }
  ];
};

// Server-side data loader
export async function loader({ context, request }: Route.LoaderArgs) {
  // Cache-first pattern
  const cache = new Cache<DataType>(request, context.caches);
  const cacheMatch = await cache.get();

  if (cacheMatch) return cacheMatch;

  // Fetch data
  const data = await fetchData(context);

  // Set cache in background
  context.ctx.waitUntil(cache.set({ data }));

  return { data };
}

// Component
export default function Example() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className={styles.root}>
      <Suspense fallback={<Placeholder />}>
        <Await resolve={data}>
          {(resolvedData) => (
            // Render UI
          )}
        </Await>
      </Suspense>
    </div>
  );
}
```

### Co-located Styles

Every route/component has a corresponding `.css.ts` file:

```typescript
// app/routes/example/index.css.ts
import { style } from "@vanilla-extract/css";
import { responsive } from "~/styles.css";

export const root = style({
  padding: "20px",
  ...responsive({
    md: { padding: "40px" },
    lg: { padding: "60px" }
  })
});
```

### Styling Conventions

**Design System Usage:**
```typescript
import { themeVars, responsive } from "~/styles.css";

export const title = style({
  color: themeVars.color.text.primary,
  fontSize: themeVars.typography.size.xl,
  marginBottom: themeVars.spacing.md,

  // Responsive
  ...responsive({
    md: { fontSize: themeVars.typography.size["2xl"] }
  })
});
```

**Breakpoints:**
- `sm`: 600px
- `md`: 840px
- `lg`: 1280px
- `xl`: 1920px

### Data Loading Pattern

**Cache-First Strategy:**

1. Check Cloudflare edge cache first
2. If cache hit, return immediately
3. If cache miss, fetch from source (Notion API)
4. Set cache in background using `context.ctx.waitUntil`
5. Return data for immediate rendering

```typescript
export async function loader({ context, request }: Route.LoaderArgs) {
  const cache = new Cache<Data>(request, context.caches);
  const cacheMatch = await cache.get();

  if (cacheMatch) return cacheMatch;

  const data = fetchDataFromSource(context);
  context.ctx.waitUntil(setCache(data, cache));

  return { data };
}
```

**Cache TTL:** 1 hour (3600 seconds) - defined in `app/utils/cache.ts:51`

### Suspense & Streaming

All async data MUST be wrapped in Suspense boundaries:

```typescript
<Suspense fallback={<Placeholder><PlaceholderLine /></Placeholder>}>
  <Await resolve={data}>
    {(resolvedData) => <RenderComponent data={resolvedData} />}
  </Await>
</Suspense>
```

This enables:
- Progressive rendering
- Better perceived performance
- Graceful loading states
- SEO-friendly streaming SSR

## Working with Routes

### Route Configuration

Routes are defined programmatically in `app/routes.ts`:

```typescript
import { type RouteConfig, route, layout, index } from "@react-router/dev/routes";

export default [
  layout("routes/layout/index.tsx", [
    index("routes/home/index.tsx"),           // /
    route("blog", "routes/blog/index.tsx"),   // /blog
    route("blog/:slug", "routes/blog.$slug/index.tsx"), // /blog/:slug
    route("works", "routes/works/index.tsx"), // /works
    route("about", "routes/about.tsx"),       // /about
  ]),
] satisfies RouteConfig;
```

### Adding a New Route

1. Create route file: `app/routes/newpage/index.tsx`
2. Create styles: `app/routes/newpage/index.css.ts`
3. Add to `app/routes.ts`:
   ```typescript
   route("newpage", "routes/newpage/index.tsx"),
   ```
4. Implement loader if data needed
5. Add navigation link if needed in `app/routes/layout/app-nav.tsx`

### Dynamic Routes

Use `$param` syntax in filenames:
- File: `app/routes/blog.$slug/index.tsx`
- Route: `/blog/:slug`
- Access: `params.slug` in loader/component

## Notion CMS Integration

### Environment Variables

Required in Cloudflare environment:
- `NOTION_API_KEY` - Notion integration secret
- `NOTION_DATABASE_ID` - Database ID for blog posts

Access via: `context.env.NOTION_API_KEY`

### Notion Client Usage

```typescript
import { Client } from "~/utils/notion";

const client = new Client(context.env.NOTION_API_KEY);
const posts = await client.getDatabase(context.env.NOTION_DATABASE_ID);
```

### Data Transformation

Notion responses are transformed to typed Post objects:

```typescript
import { postFromNotionResponse, type Post } from "~/utils/post-from-notion";

const posts: Post[] = notionResults.map(postFromNotionResponse);
```

### Blog Post Requirements

Notion database must have these properties:
- `Name` (title) - Title of the post
- `Slug` (rich_text) - URL slug
- `Published` (checkbox) - Publish status
- `Date` (date) - Publication date

Only posts with `Published: true` are fetched.

## Caching Strategy

### Edge Cache

**Location:** Cloudflare's global edge network

**Implementation:** `app/utils/cache.ts`

**TTL:** 1 hour (3600 seconds)

**Usage:**
```typescript
const cache = new Cache<DataType>(request, context.caches);
const cached = await cache.get();

if (cached) return cached;

// Fetch fresh data
const fresh = await fetchData();

// Cache in background (non-blocking)
context.ctx.waitUntil(cache.set({ data: fresh }));

return { data: fresh };
```

### Static Asset Caching

Defined in `public/_headers`:

```
/favicon.ico
  Cache-Control: public, max-age=3600

/fonts/*
  Cache-Control: public, max-age=604800

/build/*
  Cache-Control: public, max-age=31536000, immutable
```

## TypeScript Configuration

### Path Aliases

```typescript
// tsconfig.json
{
  "paths": {
    "~/*": ["./app/*"]
  }
}
```

**Usage:**
```typescript
import { Client } from "~/utils/notion";
import { themeVars } from "~/styles.css";
```

### Type Augmentation

Environment types are augmented in `app/env.ts`:

```typescript
declare module "react-router" {
  interface AppLoadContext {
    env: {
      NOTION_API_KEY: string;
      NOTION_DATABASE_ID: string;
    };
    caches: CacheStorage;
    ctx: ExecutionContext;
  }
}
```

### Route Types

React Router generates types automatically:

```typescript
import type { Route } from "./+types";

export async function loader({ context, request, params }: Route.LoaderArgs) {
  // context, request, params are fully typed
}
```

## Code Quality & Formatting

### Biome Configuration

**Location:** `biome.json`

**Features:**
- Import organization (auto-sort)
- Recommended linting rules
- 2-space indentation
- Consistent formatting

### Running Checks

```bash
npm run lint      # Check for issues
npm run fmt       # Auto-fix formatting
npm run typecheck # Type checking
```

### Pre-commit Best Practices

Before committing:
1. Run `npm run typecheck` - Ensure no type errors
2. Run `npm run lint` - Check for linting issues
3. Run `npm run fmt` - Format code consistently
4. Test locally with `npm run dev`
5. Build successfully with `npm run build`

## Component Library (@hiz8/blue-ui)

### Authentication

Requires GitHub token in `.npmrc`:
```
@hiz8:registry=https://npm.pkg.github.com
```

Set `TOKEN_FOR_GITHUB` environment variable during installation.

### Available Components

Commonly used components from `@hiz8/blue-ui`:

- `<Headline>` - Page titles
- `<Icon type="...">` - SVG icons
- `<Placeholder>` / `<PlaceholderLine>` - Loading skeletons
- `<Link>` - React Aria link with styling
- `<Box>` - Layout primitive

Import:
```typescript
import { Headline, Icon, Placeholder } from "@hiz8/blue-ui";
```

## Deployment

### Platform

**Cloudflare Pages** with automatic deployments.

### Build Output

- Client bundle: `./build/client/`
- Server bundle: `./build/server/`
- Functions: `./functions/`

### Deployment Process

1. Push to main branch
2. Cloudflare automatically builds and deploys
3. Edge functions run at closest location to user
4. Global CDN for static assets

### Environment Variables

Set in Cloudflare dashboard:
- `NOTION_API_KEY`
- `NOTION_DATABASE_ID`

## Common Tasks for AI Assistants

### Task 1: Add a New Page

```typescript
// 1. Create app/routes/newpage/index.tsx
import type { Route } from "./+types";
import * as styles from "./index.css";

export const meta: MetaFunction = () => [
  { title: "New Page - hiz" }
];

export default function NewPage() {
  return (
    <div className={styles.root}>
      <h1>New Page</h1>
    </div>
  );
}

// 2. Create app/routes/newpage/index.css.ts
import { style } from "@vanilla-extract/css";

export const root = style({
  padding: "20px"
});

// 3. Add to app/routes.ts
route("newpage", "routes/newpage/index.tsx"),
```

### Task 2: Add Navigation Link

Edit `app/routes/layout/app-nav.tsx`:

```typescript
<Link href="/newpage" className={styles.navLink}>
  <Icon type="iconName" />
  <span>New Page</span>
</Link>
```

### Task 3: Fetch Data from Notion

```typescript
import { Client } from "~/utils/notion";
import { Cache } from "~/utils/cache";

export async function loader({ context, request }: Route.LoaderArgs) {
  const cache = new Cache<Data>(request, context.caches);
  const cached = await cache.get();
  if (cached) return cached;

  const client = new Client(context.env.NOTION_API_KEY);
  const data = await client.getDatabase(context.env.NOTION_DATABASE_ID);

  context.ctx.waitUntil(cache.set({ data }));
  return { data };
}
```

### Task 4: Add Responsive Styles

```typescript
import { style } from "@vanilla-extract/css";
import { responsive } from "~/styles.css";

export const container = style({
  padding: "16px",
  ...responsive({
    md: { padding: "32px" },
    lg: { padding: "48px" }
  })
});
```

### Task 5: Update Meta Tags

```typescript
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data.title} - hiz` },
    { name: "description", content: data.description },
    { property: "og:title", content: data.title },
    { property: "og:description", content: data.description }
  ];
};
```

## Important Considerations for AI Assistants

### DO

✅ **Always use TypeScript** - No JavaScript files
✅ **Follow cache-first pattern** - Use Cache utility for data fetching
✅ **Wrap async data in Suspense** - Provide loading fallbacks
✅ **Co-locate styles** - Each component has `.css.ts` file
✅ **Use path aliases** - Import with `~/` prefix
✅ **Use React Aria Components** - For accessible UI primitives
✅ **Run type checking** - Before committing changes
✅ **Format with Biome** - Use `npm run fmt`
✅ **Check existing patterns** - Maintain consistency with codebase
✅ **Use design system tokens** - Import from `~/styles.css`
✅ **Document complex logic** - Add JSDoc comments

### DON'T

❌ **Don't bypass cache** - Always implement caching for external data
❌ **Don't use inline styles** - Use Vanilla Extract
❌ **Don't skip Suspense** - Required for streaming SSR
❌ **Don't hardcode colors/spacing** - Use theme variables
❌ **Don't ignore TypeScript errors** - Fix all type issues
❌ **Don't mix CSS methodologies** - Only Vanilla Extract
❌ **Don't create global styles** - Keep styles scoped
❌ **Don't skip error handling** - Catch and handle errors gracefully
❌ **Don't fetch in components** - Use loaders only
❌ **Don't use client-side routing** - Use React Router Link

### Performance Considerations

- Keep bundle size small - code split by route
- Preload critical fonts (already configured)
- Use Cloudflare cache aggressively
- Implement proper Cache-Control headers
- Optimize images before adding to `/public`
- Minimize JavaScript for faster hydration

### Accessibility Requirements

- Use semantic HTML elements
- Provide ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers when possible
- Use React Aria Components for complex interactions
- Maintain proper heading hierarchy (h1 → h2 → h3)

### Security Considerations

- Never commit API keys or secrets
- Use environment variables for sensitive data
- Validate user input if adding forms
- Sanitize content from Notion API
- Be cautious with dynamic imports
- Follow Cloudflare Workers security best practices

## Testing

**Current Status:** No testing framework configured

**Recommended Setup:**
- Vitest for unit/integration tests
- Testing Library for component tests
- Playwright for E2E tests

**TODO:** Add testing infrastructure

## Troubleshooting

### Build Errors

**"Module not found" errors:**
- Check path aliases in `tsconfig.json`
- Verify import paths use `~/` prefix
- Ensure file exists at specified path

**Vanilla Extract errors:**
- Check `.css.ts` files have valid exports
- Ensure no circular dependencies in styles
- Verify imports are from `@vanilla-extract/css`

**Type errors:**
- Run `npm run typecheck` to see all errors
- Check `Route.LoaderArgs` typing
- Verify context types in `app/env.ts`

### Development Server Issues

**Port 8788 in use:**
```bash
lsof -ti:8788 | xargs kill -9
npm run dev
```

**Cache issues:**
- Clear browser cache
- Restart dev server
- Check Cloudflare cache TTL

**Hot reload not working:**
- Check Vite config
- Restart dev server
- Check for syntax errors

### Notion Integration Issues

**API errors:**
- Verify `NOTION_API_KEY` is set
- Check Notion integration has database access
- Ensure database ID is correct
- Verify database properties match expected schema

## Additional Resources

- **React Router Docs:** https://reactrouter.com
- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages
- **Vanilla Extract Docs:** https://vanilla-extract.style
- **Notion API Docs:** https://developers.notion.com
- **Biome Docs:** https://biomejs.dev

## Maintenance Notes

**Last Updated:** 2025-11-17

**Package Updates:**
- Review dependencies quarterly
- Test thoroughly after major version updates
- Check for breaking changes in React Router
- Monitor Cloudflare Workers API changes

**Content Management:**
- Notion database serves as single source of truth
- Blog posts managed entirely in Notion
- Static content (works, about) managed in code

---

*This document should be updated whenever significant architectural changes are made to the codebase.*
