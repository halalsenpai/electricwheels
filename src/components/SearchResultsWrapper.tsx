"use client";

import { useSearch } from '@/contexts/SearchContext';
import { SearchResults } from './SearchResults';
import { Model } from '@/types';

export function SearchResultsWrapper() {
  const { filteredModels } = useSearch();

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
