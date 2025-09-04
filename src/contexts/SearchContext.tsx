"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Model } from '@/types';

interface SearchContextType {
  filteredModels: Model[];
  setFilteredModels: (models: Model[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedPriceRanges: string[];
  setSelectedPriceRanges: (ranges: string[]) => void;
  selectedRanges: string[];
  setSelectedRanges: (ranges: string[]) => void;
  selectedBatteryTypes: string[];
  setSelectedBatteryTypes: (types: string[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children, initialModels }: { children: ReactNode; initialModels: Model[] }) {
  const [filteredModels, setFilteredModels] = useState<Model[]>(initialModels);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
  const [selectedBatteryTypes, setSelectedBatteryTypes] = useState<string[]>([]);

  return (
    <SearchContext.Provider value={{
      filteredModels,
      setFilteredModels,
      searchQuery,
      setSearchQuery,
      selectedBrands,
      setSelectedBrands,
      selectedPriceRanges,
      setSelectedPriceRanges,
      selectedRanges,
      setSelectedRanges,
      selectedBatteryTypes,
      setSelectedBatteryTypes,
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
