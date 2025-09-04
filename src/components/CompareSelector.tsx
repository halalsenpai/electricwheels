"use client";
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Model } from '@/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap } from 'lucide-react';

export function CompareSelector({ models }: { models: Model[] }) {
  const router = useRouter();
  const [a, setA] = useState<string>(models[0]?.slug || '');
  const [b, setB] = useState<string>(models[1]?.slug || models[0]?.slug || '');

  const options = useMemo(() => models.map((m) => ({ value: m.slug, label: `${m.name} — PKR ${m.price.msrp.toLocaleString()}` })), [models]);

  function onCompare() {
    if (!a || !b || a === b) return;
    router.push(`/compare/${a}/vs/${b}`);
  }

  return (
    <Card className="p-4 sm:p-6">
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            <h3 className="text-base sm:text-lg font-semibold">Quick Comparison</h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Select two bikes to compare their features, specs, and prices
          </p>
        </div>
        
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-[1fr_auto_1fr_auto] items-end">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">First Bike</label>
            <Select value={a} onValueChange={setA}>
              <SelectTrigger className="h-10 sm:h-12">
                <SelectValue placeholder="Select first bike" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-center h-10 sm:h-12 sm:order-none order-1">
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">Second Bike</label>
            <Select value={b} onValueChange={setB}>
              <SelectTrigger className="h-10 sm:h-12">
                <SelectValue placeholder="Select second bike" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={onCompare} 
            disabled={!a || !b || a === b}
            size="lg"
            className="h-10 sm:h-12 px-4 sm:px-8 w-full sm:w-auto sm:order-none order-2"
          >
            Compare
          </Button>
        </div>
        
        {a === b && a && (
          <p className="text-xs sm:text-sm text-amber-600 text-center">
            Please select two different bikes to compare
          </p>
        )}
      </CardContent>
    </Card>
  );
}


