import { notFound } from 'next/navigation';
import { getModelBySlug, allModels } from '@/lib/data';
import { productJsonLd } from '@/lib/seo';
import { SpecTable } from '@/components/SpecTable';
import { InstallmentCalculator } from '@/components/InstallmentCalculator';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { LeadForm } from '@/components/LeadForm';

export async function generateStaticParams() {
  return allModels.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) return {};
  return {
    title: `${model.name} Price & Specs in Pakistan`,
    description: model.description,
    alternates: { canonical: `/bikes/${model.slug}` },
  };
}

export const revalidate = 60 * 60 * 24; // 1 day for price updates

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) notFound();
  const jsonLd = productJsonLd(model);
  
  
  return (
      <div className="mx-auto max-w-5xl p-6 space-y-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">{model.name}</h1>
          <div className="text-muted-foreground">
            PKR {model.price.msrp.toLocaleString()} (updated {new Date(model.price.updatedAt).toLocaleDateString()})
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <SpecTable model={model} />
            <div className="flex gap-3">
              <WhatsAppButton phone={"+923001234567"} text={`Interested in ${model.name}`} />
            </div>
          </div>
          <div className="md:col-span-1 space-y-6">
            <InstallmentCalculator price={model.price.msrp} />
            <LeadForm modelId={model.id} />
          </div>
        </div>
      </div>
  );
}
