import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Gauge, Battery, MapPin, Bike, ArrowRight } from 'lucide-react';
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
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs w-fit">
                {model.brand}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-xs w-fit ${
                  model.vehicleType === 'scooter' 
                    ? 'border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-800' 
                    : 'border-purple-200 text-purple-700 bg-purple-50 dark:bg-purple-950/20 dark:text-purple-300 dark:border-purple-800'
                }`}
              >
                {model.vehicleType === 'scooter' ? (
                  <>
                    <Zap className="h-3 w-3 mr-1" />
                    Scooter
                  </>
                ) : (
                  <>
                    <Bike className="h-3 w-3 mr-1" />
                    Motorcycle
                  </>
                )}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        {/* Price */}
        <div className="space-y-1">
          <div className="text-xl sm:text-2xl font-bold text-green-600">
            PKR {model.price.msrp.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">
            Starting price
          </div>
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
        <Button asChild className="w-full mt-auto bg-green-600 hover:bg-green-700 transition-colors" size="sm">
          <Link href={`/bikes/${model.slug}`}>
            View Details
            <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}


