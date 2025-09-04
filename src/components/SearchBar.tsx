"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchSuggestions } from './SearchSuggestions';
import { Model } from '@/types';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  models: Model[];
  className?: string;
}

export function SearchBar({ 
  placeholder = "Search electric bikes...", 
  onSearch, 
  models,
  className = "" 
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setIsLoading(false);
      }
    }, 300);

    if (query.trim()) {
      setIsLoading(true);
    }

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsSuggestionsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setIsSuggestionsOpen(false);
    inputRef.current?.focus();
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsSuggestionsOpen(false);
    inputRef.current?.blur();
    
    // Navigate to search page with the suggestion
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsSuggestionsOpen(true);
  };

  const handleInputFocus = () => {
    if (query.length >= 2 || query.length === 0) {
      setIsSuggestionsOpen(true);
    }
  };

  const handleInputBlur = () => {
    // Delay closing to allow clicking on suggestions
    setTimeout(() => setIsSuggestionsOpen(false), 150);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={cn(
              "pl-12 pr-12 h-14 text-base border-2 transition-all duration-200",
              "focus:border-green-500 focus:ring-2 focus:ring-green-500/20",
              "hover:border-gray-300 dark:hover:border-gray-600",
              isSuggestionsOpen && "rounded-b-none"
            )}
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
            {query && !isLoading && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-8 w-8 p-0 hover:bg-muted rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>

      <SearchSuggestions
        query={query}
        models={models}
        onSelect={handleSuggestionSelect}
        onClose={() => setIsSuggestionsOpen(false)}
        isOpen={isSuggestionsOpen}
        className="w-full"
      />
    </div>
  );
}
