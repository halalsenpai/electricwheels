import type { Model } from '@/types';

export function productJsonLd(model: Model) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: model.name,
    brand: model.brandId,
    sku: model.id,
    description: model.description,
    image: model.images?.[0],
    offers: {
      '@type': 'Offer',
      priceCurrency: model.price.currency,
      price: model.price.msrp,
      url: `https://www.electricwheels.pk/bikes/${model.slug}`,
      availability: 'https://schema.org/InStock',
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Top speed (km/h)', value: model.specs.topSpeedKmh },
      { '@type': 'PropertyValue', name: 'Range (km)', value: model.specs.rangeKm },
      { '@type': 'PropertyValue', name: 'Motor power (W)', value: model.specs.motorPowerW },
    ],
  } as const;
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } as const;
}


