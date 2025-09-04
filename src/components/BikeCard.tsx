import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Model } from '@/types';

export function BikeCard({ model }: { model: Model }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{model.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-1">
        <div>PKR {model.price.msrp.toLocaleString()}</div>
        <div>{model.specs.topSpeedKmh} km/h • {model.specs.rangeKm} km</div>
        <Link className="underline" href={`/bikes/${model.slug}`}>View details</Link>
      </CardContent>
    </Card>
  );
}


