import { allDealers } from '@/lib/data';
import Link from 'next/link';

export const revalidate = 86400; // 1 day

export default async function DealersPage() {
  
  return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dealers</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          {allDealers.map((d) => (
            <div key={d.id} className="border rounded-xl p-4">
              <div className="font-medium">{d.name}</div>
              <div className="text-sm text-muted-foreground">{d.city}</div>
              {d.phone && <div className="text-sm">{d.phone}</div>}
              {d.whatsapp && (
                <a className="text-sm underline" href={`https://wa.me/${d.whatsapp.replace(/\D/g, '')}`}>WhatsApp</a>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="#lead-form" className="underline">List your dealership</Link>
        </div>
        </div>
      </div>
  );
}
