import { allModels } from "@/lib/data";
import { BikeCard } from "@/components/BikeCard";
import { CompareSelector } from "@/components/CompareSelector";

export default async function HomePage() {
  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Electric Wheels</h1>
        <p className="text-muted-foreground">
          Compare EV bikes in Pakistan. Prices, specs, dealers and guides.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="/bikes" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Browse Bikes
          </a>
          <a href="/dealers" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            Find Dealers
          </a>
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Compare models</h2>
        <CompareSelector models={allModels} />
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Featured</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {allModels.slice(0, 6).map((m) => (
            <BikeCard key={m.id} model={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
