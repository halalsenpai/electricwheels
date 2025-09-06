import { ComparePage } from '@/components/ComparePage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Electric Bikes | Electric Wheels',
  description: 'Compare up to 3 electric bikes side by side. Compare prices, specs, and features to find the perfect EV bike for you.',
  keywords: 'compare electric bikes, EV bike comparison, electric scooter comparison, Pakistan electric vehicles',
};

export default function Compare() {
  return <ComparePage />;
}
