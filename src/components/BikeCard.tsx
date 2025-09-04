import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Gauge, Battery, MapPin } from 'lucide-react';
import type { Model } from '@/types';

export function BikeCard({ model }: { model: Model }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-base sm:text-lg font-semibold group-hover:text-green-600 transition-colors leading-tight">
              {model.name}
            </CardTitle>
            <Badge variant="secondary" className="text-xs w-fit">
              {model.brandId}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        {/* Price */}
        <div className="text-xl sm:text-2xl font-bold text-green-600">
          PKR {model.price.msrp.toLocaleString()}
        </div>
        
        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm flex-1">
          <div className="flex items-center gap-1 sm:gap-2">
            <Gauge className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{model.specs.topSpeedKmh} km/h</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{model.specs.rangeKm} km</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{model.specs.motorPowerW}W</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Battery className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{model.specs.batteryType}</span>
          </div>
        </div>
        
        {/* CTA */}
        <Button asChild className="w-full mt-auto" size="sm">
          <Link href={`/bikes/${model.slug}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}


