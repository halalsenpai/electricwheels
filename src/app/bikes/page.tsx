import { allModels } from '@/lib/data';
import { BikeCard } from '@/components/BikeCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Electric Bikes | Electric Wheels',
  description: 'Browse all electric bikes available in Pakistan. Compare prices, specs, and features of EV bikes from top brands.',
  keywords: 'electric bikes Pakistan, EV bikes, electric scooter, bike prices, Pakistan electric vehicles',
  alternates: {
    canonical: '/bikes'
  }
};

export default function BikesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs 
          items={[
            { label: "Bikes", href: "/bikes" }
          ]} 
        />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Electric Bikes</h1>
          <p className="text-muted-foreground">
            Discover the complete collection of electric bikes available in Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allModels.map((model) => (
            <BikeCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    </div>
  );
}
