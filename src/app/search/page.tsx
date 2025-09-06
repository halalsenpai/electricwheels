import { Suspense } from 'react';
import { SearchResultsPage } from '@/components/SearchResultsPage';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Search Electric Bikes | Electric Wheels",
  description: "Search and filter electric bikes in Pakistan. Find the perfect EV bike with advanced filters for price, range, brand, and more.",
  alternates: {
    canonical: "/search"
  },
  openGraph: {
    title: "Search Electric Bikes | Electric Wheels",
    description: "Search and filter electric bikes in Pakistan. Find the perfect EV bike with advanced filters.",
    url: "/search"
  }
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs 
            items={[
              { label: "Search", href: "/search" }
            ]} 
          />
        </div>
        <SearchResultsPage />
      </div>
    </Suspense>
  );
}
