import { allModels, getModelBySlug } from '@/lib/data';
import { CompareTable } from '@/components/CompareTable';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';

interface ComparePageProps {
  params: Promise<{
    a: string;
    b: string;
    c: string;
  }>;
}

export async function generateStaticParams() {
  const models = allModels;
  const params = [];
  
  // Generate all possible 3-way combinations
  for (let i = 0; i < models.length; i++) {
    for (let j = i + 1; j < models.length; j++) {
      for (let k = j + 1; k < models.length; k++) {
        params.push({
          a: models[i].slug,
          b: models[j].slug,
          c: models[k].slug,
        });
      }
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { a, b, c } = await params;
  const modelA = getModelBySlug(a);
  const modelB = getModelBySlug(b);
  const modelC = getModelBySlug(c);

  if (!modelA || !modelB || !modelC) {
    return {
      title: 'Compare Electric Bikes | Electric Wheels',
      description: 'Compare electric bikes side by side.',
    };
  }

  return {
    title: `${modelA.name} vs ${modelB.name} vs ${modelC.name} | Electric Wheels`,
    description: `Compare ${modelA.name}, ${modelB.name}, and ${modelC.name}. Compare prices, specs, and features to find the perfect electric bike.`,
    keywords: `compare ${modelA.name} ${modelB.name} ${modelC.name}, electric bike comparison, EV bike specs, Pakistan electric vehicles`,
  };
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { a, b, c } = await params;
  const modelA = getModelBySlug(a);
  const modelB = getModelBySlug(b);
  const modelC = getModelBySlug(c);

  if (!modelA || !modelB || !modelC) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Bikes not found</h1>
          <p className="text-muted-foreground mb-6">
            One or more of the bikes you're trying to compare could not be found.
          </p>
          <Button asChild>
            <Link href="/bikes">Browse All Bikes</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Compare ${modelA.name} vs ${modelB.name} vs ${modelC.name}`,
    "description": `Compare ${modelA.name}, ${modelB.name}, and ${modelC.name} electric bikes`,
    "mainEntity": [
      {
        "@type": "Product",
        "name": modelA.name,
        "brand": modelA.brand,
        "description": modelA.description,
        "offers": {
          "@type": "Offer",
          "price": modelA.price.msrp,
          "priceCurrency": "PKR"
        }
      },
      {
        "@type": "Product",
        "name": modelB.name,
        "brand": modelB.brand,
        "description": modelB.description,
        "offers": {
          "@type": "Offer",
          "price": modelB.price.msrp,
          "priceCurrency": "PKR"
        }
      },
      {
        "@type": "Product",
        "name": modelC.name,
        "brand": modelC.brand,
        "description": modelC.description,
        "offers": {
          "@type": "Offer",
          "price": modelC.price.msrp,
          "priceCurrency": "PKR"
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="compare-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="max-w-5xl mx-auto p-6 space-y-6">
          <Breadcrumbs 
            items={[
              { label: "Compare", href: "/compare" },
              { label: `${modelA.name} vs ${modelB.name} vs ${modelC.name}` }
            ]} 
          />
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/compare" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Compare
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-2xl font-bold">
              Compare: {modelA.name} vs {modelB.name} vs {modelC.name}
            </h1>
          </div>

          {/* Compare Table */}
          <CompareTable models={[modelA, modelB, modelC]} />
        </div>
      </div>
    </>
  );
}
