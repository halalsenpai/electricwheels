import type { Model } from '@/types';

interface CompareTableProps {
  a?: Model;
  b?: Model;
  models?: Model[];
}

export function CompareTable({ a, b, models }: CompareTableProps) {
  // Support both old 2-model format and new multi-model format
  const compareModels = models || (a && b ? [a, b] : []);
  
  const rows: { label: string; get: (m: Model) => string | number | undefined }[] = [
    { label: 'Price (PKR)', get: (m) => m.price.msrp.toLocaleString() },
    { label: 'Top speed (km/h)', get: (m) => m.specs.topSpeedKmh },
    { label: 'Range (km)', get: (m) => m.specs.rangeKm },
    { label: 'Motor (W)', get: (m) => m.specs.motorPowerW },
    { label: 'Battery', get: (m) => m.specs.batteryType },
    { label: 'Charging (h)', get: (m) => m.specs.chargingTimeH },
    { label: 'Weight (kg)', get: (m) => m.specs.weightKg },
    { label: 'Wheel Size (in)', get: (m) => m.specs.wheelSizeIn },
    { label: 'Brakes', get: (m) => m.specs.brakes },
  ];

  if (compareModels.length === 0) {
    return <div>No models to compare</div>;
  }

  const getColumnWidth = () => {
    const totalColumns = compareModels.length + 1; // +1 for the label column
    return `w-1/${totalColumns}`;
  };

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left" />
            {compareModels.map((model) => (
              <th key={model.id} className="px-4 py-2 text-left">
                <div className="space-y-1">
                  <div className="font-semibold">{model.name}</div>
                  <div className="text-xs text-muted-foreground">{model.brand}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b last:border-b-0">
              <td className="px-4 py-2 text-muted-foreground font-medium">{r.label}</td>
              {compareModels.map((model) => (
                <td key={model.id} className="px-4 py-2">
                  {r.get(model) as string | number || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


