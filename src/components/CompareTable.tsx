import type { Model } from '@/types';

export function CompareTable({ a, b }: { a: Model; b: Model }) {
  const rows: { label: string; get: (m: Model) => string | number | undefined }[] = [
    { label: 'Price (PKR)', get: (m) => m.price.msrp.toLocaleString() },
    { label: 'Top speed (km/h)', get: (m) => m.specs.topSpeedKmh },
    { label: 'Range (km)', get: (m) => m.specs.rangeKm },
    { label: 'Motor (W)', get: (m) => m.specs.motorPowerW },
    { label: 'Battery', get: (m) => m.specs.batteryType },
    { label: 'Charging (h)', get: (m) => m.specs.chargingTimeH },
  ];

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left" />
            <th className="px-4 py-2 text-left">{a.name}</th>
            <th className="px-4 py-2 text-left">{b.name}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b last:border-b-0">
              <td className="px-4 py-2 w-1/3 text-muted-foreground">{r.label}</td>
              <td className="px-4 py-2 w-1/3">{r.get(a) as any}</td>
              <td className="px-4 py-2 w-1/3">{r.get(b) as any}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


