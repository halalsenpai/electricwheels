"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Model } from '@/types';

interface CompareContextType {
  compareList: Model[];
  addToCompare: (model: Model) => void;
  removeFromCompare: (modelId: string) => void;
  clearCompare: () => void;
  isInCompare: (modelId: string) => boolean;
  canAddMore: boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<Model[]>([]);

  const addToCompare = (model: Model) => {
    setCompareList(prev => {
      // Don't add if already in list or if we have 3 items
      if (prev.some(item => item.id === model.id) || prev.length >= 3) {
        return prev;
      }
      return [...prev, model];
    });
  };

  const removeFromCompare = (modelId: string) => {
    setCompareList(prev => prev.filter(item => item.id !== modelId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (modelId: string) => {
    return compareList.some(item => item.id === modelId);
  };

  const canAddMore = compareList.length < 3;

  return (
    <CompareContext.Provider value={{
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
      canAddMore
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
