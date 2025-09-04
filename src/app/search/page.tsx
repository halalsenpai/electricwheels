import { Suspense } from 'react';
import { SearchResultsPage } from '@/components/SearchResultsPage';
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
      <SearchResultsPage />
    </Suspense>
  );
}
