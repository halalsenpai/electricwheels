import { notFound } from 'next/navigation';
import { getModelBySlug, allModels } from '@/lib/data';
import { CompareTable } from '@/components/CompareTable';
import type { Metadata } from 'next';
import Script from 'next/script';

interface ComparePageProps {
  params: Promise<{ a: string; b: string }>;
}

export async function generateStaticParams() {
  const models = allModels;
  const params: { a: string; b: string }[] = [];
  
  // Generate comparison pairs for static generation
  for (let i = 0; i < models.length; i++) {
    for (let j = i + 1; j < models.length; j++) {
      params.push({
        a: models[i].slug,
        b: models[j].slug
      });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { a, b } = await params;
  const modelA = getModelBySlug(a);
  const modelB = getModelBySlug(b);
  
  if (!modelA || !modelB) {
    return {
      title: 'Compare Bikes',
      description: 'Compare electric bikes in Pakistan'
    };
  }
  
  return {
    title: `${modelA.name} vs ${modelB.name} - Electric Bike Comparison`,
    description: `Compare ${modelA.name} vs ${modelB.name}. Price: ${modelA.name} PKR ${modelA.price.msrp.toLocaleString()}, ${modelB.name} PKR ${modelB.price.msrp.toLocaleString()}. Specs, features, and detailed comparison.`,
    alternates: {
      canonical: `/compare/${a}/vs/${b}`
    },
    openGraph: {
      title: `${modelA.name} vs ${modelB.name}`,
      description: `Compare ${modelA.name} vs ${modelB.name} electric bikes`,
      url: `/compare/${a}/vs/${b}`,
      type: 'website'
    }
  };
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { a, b } = await params;
  const A = getModelBySlug(a);
  const B = getModelBySlug(b);
  
  if (!A || !B) notFound();

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ComparisonPage",
    "name": `${A.name} vs ${B.name}`,
    "description": `Compare ${A.name} vs ${B.name} electric bikes`,
    "url": `/compare/${a}/vs/${b}`,
    "mainEntity": [
      {
        "@type": "Product",
        "name": A.name,
        "brand": A.brand,
        "description": `${A.name} electric bike`,
        "offers": {
          "@type": "Offer",
          "price": A.price.msrp,
          "priceCurrency": "PKR"
        }
      },
      {
        "@type": "Product",
        "name": B.name,
        "brand": B.brand,
        "description": `${B.name} electric bike`,
        "offers": {
          "@type": "Offer",
          "price": B.price.msrp,
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
        <h1 className="text-3xl font-bold">{A.name} vs {B.name}</h1>
        <p className="text-muted-foreground">
          Detailed comparison of {A.name} and {B.name} electric bikes
        </p>
        <CompareTable a={A} b={B} />
        </div>
      </div>
    </>
  );
}
