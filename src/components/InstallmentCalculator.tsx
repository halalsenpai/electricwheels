"use client";
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function InstallmentCalculator({ price }: { price: number }) {
  const [downPct, setDownPct] = useState(20);
  const [months, setMonths] = useState(12);
  const [ratePct, setRatePct] = useState(18);

  const { downPayment, financed, monthly } = useMemo(() => {
    const downPayment = Math.round((downPct / 100) * price);
    const financed = price - downPayment;
    const monthlyRate = ratePct / 100 / 12;
    const monthly = months > 0 && monthlyRate > 0
      ? Math.round((financed * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months)))
      : Math.round(financed / Math.max(months, 1));
    return { downPayment, financed, monthly };
  }, [price, downPct, months, ratePct]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Installment Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="grid grid-cols-3 gap-2 items-center">
          <label className="text-muted-foreground">Down %</label>
          <Input type="number" value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="col-span-2" />
        </div>
        <div className="grid grid-cols-3 gap-2 items-center">
          <label className="text-muted-foreground">Months</label>
          <Input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="col-span-2" />
        </div>
        <div className="grid grid-cols-3 gap-2 items-center">
          <label className="text-muted-foreground">APR %</label>
          <Input type="number" value={ratePct} onChange={(e) => setRatePct(Number(e.target.value))} className="col-span-2" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>Down payment</div>
          <div className="text-right">PKR {downPayment.toLocaleString()}</div>
          <div>Financed</div>
          <div className="text-right">PKR {financed.toLocaleString()}</div>
          <div className="font-medium">Monthly</div>
          <div className="text-right font-medium">PKR {monthly.toLocaleString()}</div>
        </div>
      </CardContent>
    </Card>
  );
}


