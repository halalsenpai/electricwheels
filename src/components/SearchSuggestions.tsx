"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Clock, TrendingUp } from 'lucide-react';
import { Model } from '@/types';
import { cn } from '@/lib/utils';

interface SearchSuggestionsProps {
  query: string;
  models: Model[];
  onSelect: (suggestion: string) => void;
  onClose: () => void;
  isOpen: boolean;
  className?: string;
}

interface Suggestion {
  text: string;
  type: 'brand' | 'model' | 'feature';
  count?: number;
}

export function SearchSuggestions({ 
  query, 
  models, 
  onSelect, 
  onClose, 
  isOpen, 
  className = "" 
}: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Popular searches (could be dynamic based on analytics)
  const popularSearches = useMemo(() => [
    { text: "Evee C1", type: 'model' as const },
    { text: "Vlektra Bolt", type: 'model' as const },
    { text: "Lithium battery", type: 'feature' as const },
    { text: "Under 200k", type: 'feature' as const },
    { text: "Metro", type: 'brand' as const }
  ], []);

  // Generate suggestions based on query
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions(popularSearches);
      return;
    }

    const queryLower = query.toLowerCase();

    // Brand suggestions
    const brandMatches = [...new Set(models.map(m => m.brand))]
      .filter(brand => brand.toLowerCase().includes(queryLower))
      .map(brand => ({
        text: brand,
        type: 'brand' as const,
        count: models.filter(m => m.brand === brand).length
      }));

    // Model suggestions
    const modelMatches = models
      .filter(model => 
        model.name.toLowerCase().includes(queryLower) ||
        model.brand.toLowerCase().includes(queryLower)
      )
      .slice(0, 5)
      .map(model => ({
        text: model.name,
        type: 'model' as const
      }));

    // Feature suggestions
    const featureMatches = [
      { text: "Lithium battery", type: 'feature' as const },
      { text: "Lead acid battery", type: 'feature' as const },
      { text: "Under 100k", type: 'feature' as const },
      { text: "Under 200k", type: 'feature' as const },
      { text: "Over 80km range", type: 'feature' as const },
      { text: "Disc brakes", type: 'feature' as const }
    ].filter(feature => 
      feature.text.toLowerCase().includes(queryLower)
    );

    // Combine and limit suggestions
    const allSuggestions = [
      ...brandMatches,
      ...modelMatches,
      ...featureMatches
    ].slice(0, 8);

    setSuggestions(allSuggestions);
    setSelectedIndex(-1);
  }, [query, models, popularSearches]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
            onSelect(suggestions[selectedIndex].text);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, suggestions, onSelect, onClose]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen || suggestions.length === 0) return null;

  const getSuggestionIcon = (type: Suggestion['type']) => {
    switch (type) {
      case 'brand':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'model':
        return <Search className="h-4 w-4 text-green-500" />;
      case 'feature':
        return <Clock className="h-4 w-4 text-purple-500" />;
    }
  };

  const getSuggestionLabel = (type: Suggestion['type']) => {
    switch (type) {
      case 'brand':
        return 'Brand';
      case 'model':
        return 'Model';
      case 'feature':
        return 'Feature';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "absolute top-full left-0 right-0 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-b-lg shadow-lg max-h-80 overflow-y-auto",
        className
      )}
    >
      <div className="p-2">
        {query.length < 2 && (
          <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 mb-2">
            Popular Searches
          </div>
        )}
        
        {suggestions.map((suggestion, index) => (
          <button
            key={`${suggestion.type}-${suggestion.text}-${index}`}
            onClick={() => onSelect(suggestion.text)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-md transition-colors",
              "hover:bg-gray-50 dark:hover:bg-gray-800",
              selectedIndex === index && "bg-gray-100 dark:bg-gray-800"
            )}
          >
            {getSuggestionIcon(suggestion.type)}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                {suggestion.text}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {getSuggestionLabel(suggestion.type)}
                {suggestion.count && ` • ${suggestion.count} models`}
              </div>
            </div>
          </button>
        ))}
        
        {query.length >= 2 && suggestions.length === 0 && (
          <div className="px-3 py-4 text-center text-gray-500 dark:text-gray-400">
            <Search className="h-6 w-6 mx-auto mb-2 opacity-50" />
            <div className="text-sm">No suggestions found</div>
            <div className="text-xs">Try a different search term</div>
          </div>
        )}
      </div>
    </div>
  );
}
