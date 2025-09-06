"use client";

import { useCompare } from '@/contexts/CompareContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, X, Zap, Gauge, Battery, MapPin, Weight, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const router = useRouter();

  const handleCompare = () => {
    if (compareList.length === 2) {
      // Navigate to existing 2-way compare
      router.push(`/compare/${compareList[0].slug}/vs/${compareList[1].slug}`);
    } else if (compareList.length === 3) {
      // Navigate to new 3-way compare
      router.push(`/compare/${compareList[0].slug}/vs/${compareList[1].slug}/vs/${compareList[2].slug}`);
    }
  };

  const canCompare = compareList.length >= 2;

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                <div className="h-6 w-px bg-border" />
                <h1 className="text-lg font-semibold">Compare Bikes</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Zap className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">No bikes to compare</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Add bikes to your comparison list to see detailed side-by-side comparisons of specs, prices, and features.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild>
                <Link href="/bikes">
                  Browse All Bikes
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/search">
                  Advanced Search
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold">Compare Bikes ({compareList.length}/3)</h1>
            </div>
            <div className="flex items-center gap-2">
              {compareList.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearCompare}>
                  Clear All
                </Button>
              )}
              {canCompare && (
                <Button onClick={handleCompare} className="bg-green-600 hover:bg-green-700">
                  Compare Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Compare List */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {compareList.map((model) => (
            <Card key={model.id} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => removeFromCompare(model.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <CardHeader className="pb-3">
                <div className="space-y-2">
                  <CardTitle className="text-lg font-semibold">{model.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit">{model.brand}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Price */}
                <div className="text-xl font-bold text-green-600">
                  PKR {model.price.msrp.toLocaleString()}
                </div>
                
                {/* Key Specs */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <span>{model.specs.topSpeedKmh} km/h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{model.specs.rangeKm} km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span>{model.specs.motorPowerW}W</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-muted-foreground" />
                    <span>{model.specs.batteryType}</span>
                  </div>
                </div>
                
                <Button asChild className="w-full" size="sm">
                  <Link href={`/bikes/${model.slug}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {/* Add More Slot */}
          {compareList.length < 3 && (
            <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px] text-center space-y-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-muted-foreground">Add Another Bike</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare up to 3 bikes side by side
                  </p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/bikes">
                    Browse Bikes
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
