"use client";
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { Model } from '@/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-end">
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">First model</label>
        <Select value={a} onValueChange={setA}>
          <SelectTrigger><SelectValue placeholder="Select model" /></SelectTrigger>
          <SelectContent className="max-h-72">
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-muted-foreground">Second model</label>
        <Select value={b} onValueChange={setB}>
          <SelectTrigger><SelectValue placeholder="Select model" /></SelectTrigger>
          <SelectContent className="max-h-72">
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onCompare} disabled={!a || !b || a === b}>Compare</Button>
    </div>
  );
}


