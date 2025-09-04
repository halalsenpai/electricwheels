"use client";

import { useState } from 'react';
import { BikeCard } from './BikeCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Model } from '@/types';
import { Grid, List, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

interface SearchResultsProps {
  models: Model[];
  onModelSelect?: (model: Model) => void;
  className?: string;
}

export function SearchResults({ models, onModelSelect, className = "" }: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (models.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="space-y-6">
          <div className="relative">
            <div className="text-8xl opacity-20">🔍</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              No bikes found
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              We couldn&apos;t find any electric bikes matching your search. Try adjusting your search terms or filters to discover more options.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              Clear Search
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/bikes">
                <Grid className="h-4 w-4" />
                Browse All Bikes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">Search Results</h3>
          <Badge variant="secondary" className="text-sm">
            {models.length} bike{models.length !== 1 ? 's' : ''} found
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="h-8 w-8 p-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
      }>
        {models.map((model) => (
          <div key={model.id} className="relative group">
            <BikeCard model={model} />
            {onModelSelect && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-lg cursor-pointer"
                   onClick={() => onModelSelect(model)}>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" className="gap-2">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More (if needed) */}
      {models.length >= 9 && (
        <div className="text-center pt-6">
          <Button variant="outline" className="gap-2">
            Load More Results
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
