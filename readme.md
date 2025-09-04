# Electric Wheels

EV Bike Comparison site built with Next.js 15 (App Router), TypeScript, TailwindCSS, and shadcn/ui. i18n by next-intl.

## Stack
- Next.js 15 (App Router) + TypeScript
- TailwindCSS v4 + shadcn/ui
- next-intl (English, Urdu)
- zod (validation)

## Features
- Locale routes: `/[locale]`, locales: `en`, `ur`
- Pages: home, bikes slug, compare, dealers, guides (markdown)
- API: `/api/models` (ISR 7d), `/api/lead` (mock POST with zod)
- SEO: metadata, canonical, JSON-LD Product/FAQ utilities

## Getting Started
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` or `http://localhost:3000/en`.

## Project Structure
- `src/app` Next.js routes and layouts
- `src/components` UI components
- `src/mock-data` brands, models, dealers JSON
- `src/lib` helpers (seo, data, md)
- `src/messages` i18n messages
- `src/content/guides` markdown content
- `src/types` shared types

## i18n
- Middleware handles locale prefix.
- `src/app/[locale]` provides locale-aware pages.

## Theming
- Tailwind v4 with CSS variables. Accent green `#16a34a` applied.

## Deployment
- Ready for Vercel. ISR configured: models (7d). You can add per-route `revalidate` for prices (1d).

## TODO
- Add SpecTable, CompareTable, InstallmentCalculator, WhatsAppButton components
- Enhance model page with calculator and lead form
- Add sitemap/robots
