"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Check, Plus } from 'lucide-react';
import { useCompare } from '@/contexts/CompareContext';
import type { Model } from '@/types';

interface HorizontalBikeCardProps {
  model: Model;
  index: number;
}

export function HorizontalBikeCard({ model, index }: HorizontalBikeCardProps) {
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompare();
  const [isAdding, setIsAdding] = useState(false);
  
  const inCompare = isInCompare(model.id);
  const canAdd = canAddMore || inCompare;

  const handleCompareToggle = async () => {
    if (inCompare) {
      removeFromCompare(model.id);
    } else {
      setIsAdding(true);
      addToCompare(model);
      // Reset the adding state after a brief delay
      setTimeout(() => setIsAdding(false), 1000);
    }
  };

  return (
    <div className="flex-shrink-0 w-80 sm:w-96">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Image Placeholder */}
        <div className={`h-48 w-full ${
          index % 5 === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
          index % 5 === 1 ? 'bg-gradient-to-br from-green-400 to-green-600' :
          index % 5 === 2 ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
          index % 5 === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
          'bg-gradient-to-br from-red-400 to-red-600'
        } flex items-center justify-center relative`}>
          {/* Popularity Badge */}
          {index < 3 && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 shadow-lg">
                #{index + 1} Popular
              </Badge>
            </div>
          )}
          <div className="text-white text-6xl opacity-20">
            🏍️
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="space-y-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {model.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {model.brand}
              </p>
            </div>
            
            {/* Specs */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Price:</span>
                <span className="font-semibold text-green-600">PKR {model.price.msrp.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Range:</span>
                <span className="font-medium">{model.specs.rangeKm} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Top Speed:</span>
                <span className="font-medium">{model.specs.topSpeedKmh} km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">0-60 km/h:</span>
                <span className="font-medium">{Math.round((60 / model.specs.topSpeedKmh) * 10)} s</span>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex gap-2 pt-2">
              <Button asChild className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <Link href={`/bikes/${model.slug}`}>
                  Details
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`flex-shrink-0 transition-all duration-200 ${
                  inCompare 
                    ? 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200' 
                    : canAdd 
                      ? 'hover:bg-green-50 hover:border-green-300' 
                      : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={handleCompareToggle}
                disabled={!canAdd}
                title={inCompare ? 'Remove from compare' : canAdd ? 'Add to compare' : 'Compare list full (3/3)'}
              >
                {isAdding ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : inCompare ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
