"use client";

import { useState } from 'react';
import { SearchResults } from './SearchResults';
import { Model } from '@/types';

interface SearchPageProps {
  models: Model[];
}

export function SearchPage({ models }: SearchPageProps) {
  const [filteredModels] = useState<Model[]>(models);

  const handleModelSelect = (model: Model) => {
    window.location.href = `/bikes/${model.slug}`;
  };

  return (
    <SearchResults 
      models={filteredModels} 
      onModelSelect={handleModelSelect}
    />
  );
}
