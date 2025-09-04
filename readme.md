# Electric Wheels

EV Bike Comparison site built with Next.js 15 (App Router), TypeScript, TailwindCSS, and shadcn/ui.

## Stack
- Next.js 15 (App Router) + TypeScript
- TailwindCSS v4 + shadcn/ui
- Zod (validation)
- Marked + Gray Matter (markdown processing)

## Features
- **SEO-Optimized Routes**: Clean URLs with dynamic routing
- **Static Generation**: All pages pre-generated for optimal performance
- **Rich Metadata**: Dynamic titles, descriptions, and Open Graph tags
- **Structured Data**: JSON-LD for better search engine understanding
- **Responsive Design**: Mobile-first with TailwindCSS
- **Component Library**: Built with shadcn/ui components

## Pages & Routes
- **Home**: `/` - Landing page with featured bikes and comparison selector
- **Bikes**: `/bikes/[slug]` - Individual bike pages with specs, pricing, and lead forms
- **Compare**: `/compare/[a]/vs/[b]` - SEO-friendly bike comparison pages
- **Dealers**: `/dealers` - Dealer listings with contact information
- **Guides**: `/guides/[slug]` - Static content pages (markdown)

## API Routes
- `/api/models` - Returns bike models data (ISR 7d)
- `/api/lead` - Handles lead form submissions with Zod validation

## Getting Started
```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── bikes/[slug]/      # Individual bike pages
│   ├── compare/[a]/vs/[b]/ # Comparison pages
│   ├── dealers/           # Dealer listings
│   ├── guides/[slug]/     # Static content
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── BikeCard.tsx      # Bike display card
│   ├── CompareTable.tsx  # Side-by-side comparison
│   ├── SpecTable.tsx     # Specifications table
│   ├── InstallmentCalculator.tsx # Payment calculator
│   ├── WhatsAppButton.tsx # WhatsApp CTA
│   ├── LeadForm.tsx      # Contact form
│   └── CompareSelector.tsx # Bike selection
├── lib/                  # Utilities
│   ├── data.ts          # Data access functions
│   ├── seo.ts           # SEO utilities
│   └── md.ts            # Markdown processing
├── mock-data/           # JSON data files
│   ├── brands.json      # Brand information
│   ├── models.json      # Bike models
│   └── dealers.json     # Dealer listings
├── content/guides/      # Markdown content
└── types/              # TypeScript definitions
```

## SEO Features
- **Dynamic Metadata**: Each page has unique titles and descriptions
- **Canonical URLs**: Proper canonical tags for all pages
- **Structured Data**: JSON-LD for products and comparisons
- **Open Graph**: Social media sharing optimization
- **Static Generation**: All pages pre-built for fast loading

## Theming
- TailwindCSS v4 with CSS variables
- Accent color: Green `#16a34a`
- Dark mode support
- Responsive design

## Data Management
- Mock data in JSON format for brands, models, and dealers
- Markdown content for guides and static pages
- TypeScript interfaces for type safety

## Components
- **BikeCard**: Displays bike information with pricing
- **CompareTable**: Side-by-side feature comparison
- **SpecTable**: Detailed specifications display
- **InstallmentCalculator**: Payment calculation tool
- **WhatsAppButton**: Direct WhatsApp contact
- **LeadForm**: Contact form with validation
- **CompareSelector**: Bike selection interface

## Deployment
- **Vercel Ready**: Optimized for Vercel deployment
- **ISR Configured**: Models cached for 7 days
- **Static Generation**: All pages pre-built
- **Performance Optimized**: Fast loading and SEO-friendly

## Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Setup
No environment variables required for basic functionality. The site uses mock data and can be deployed directly to Vercel.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
MIT License - see LICENSE file for details