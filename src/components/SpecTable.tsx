import type { Model } from '@/types';

export function SpecTable({ model }: { model: Model }) {
  const s = model.specs;
  const rows: { label: string; value?: string | number }[] = [
    { label: 'Top speed (km/h)', value: s.topSpeedKmh },
    { label: 'Range (km)', value: s.rangeKm },
    { label: 'Motor power (W)', value: s.motorPowerW },
    { label: 'Battery', value: s.batteryType },
    { label: 'Battery voltage (V)', value: s.batteryVoltageV },
    { label: 'Battery capacity (Ah)', value: s.batteryCapacityAh },
    { label: 'Charging time (h)', value: s.chargingTimeH },
    { label: 'Weight (kg)', value: s.weightKg },
    { label: 'Wheel size (in)', value: s.wheelSizeIn },
    { label: 'Brakes', value: s.brakes },
  ].filter((r) => r.value !== undefined && r.value !== null && r.value !== '');

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b last:border-b-0">
              <td className="px-4 py-2 w-1/2 text-muted-foreground">{r.label}</td>
              <td className="px-4 py-2">{r.value as any}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


