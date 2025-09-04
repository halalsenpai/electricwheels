import brands from '@/mock-data/brands.json';
import models from '@/mock-data/models.json';
import dealers from '@/mock-data/dealers.json';
import type { Brand, Model, Dealer } from '@/types';

export const allBrands = brands as Brand[];
export const allModels = models as Model[];
export const allDealers = dealers as Dealer[];

export function getModelBySlug(slug: string): Model | undefined {
  return allModels.find((m) => m.slug === slug);
}

export function getModelById(id: string): Model | undefined {
  return allModels.find((m) => m.id === id);
}


