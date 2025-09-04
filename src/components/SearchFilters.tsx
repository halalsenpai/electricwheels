"use client";

import { useMemo, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { FilterDropdown } from './FilterDropdown';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';
import { Model } from '@/types';
import { useSearch } from '@/contexts/SearchContext';

interface SearchFiltersProps {
  models: Model[];
  className?: string;
}

export function SearchFilters({ models, className = "" }: SearchFiltersProps) {
  const {
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
    setFilteredModels
  } = useSearch();

  // Generate filter options from models data
  const filterOptions = useMemo(() => {
    const brands = [...new Set(models.map(m => m.brand))].map(brand => ({
      value: brand,
      label: brand,
      count: models.filter(m => m.brand === brand).length
    }));

    const priceRanges = [
      { value: 'under-100k', label: 'Under PKR 100K', count: models.filter(m => m.price.msrp < 100000).length },
      { value: '100k-200k', label: 'PKR 100K - 200K', count: models.filter(m => m.price.msrp >= 100000 && m.price.msrp < 200000).length },
      { value: '200k-300k', label: 'PKR 200K - 300K', count: models.filter(m => m.price.msrp >= 200000 && m.price.msrp < 300000).length },
      { value: '300k-500k', label: 'PKR 300K - 500K', count: models.filter(m => m.price.msrp >= 300000 && m.price.msrp < 500000).length },
      { value: 'over-500k', label: 'Over PKR 500K', count: models.filter(m => m.price.msrp >= 500000).length }
    ];

    const ranges = [
      { value: 'under-50km', label: 'Under 50 km', count: models.filter(m => m.specs.rangeKm && m.specs.rangeKm < 50).length },
      { value: '50-80km', label: '50 - 80 km', count: models.filter(m => m.specs.rangeKm && m.specs.rangeKm >= 50 && m.specs.rangeKm < 80).length },
      { value: '80-120km', label: '80 - 120 km', count: models.filter(m => m.specs.rangeKm && m.specs.rangeKm >= 80 && m.specs.rangeKm < 120).length },
      { value: 'over-120km', label: 'Over 120 km', count: models.filter(m => m.specs.rangeKm && m.specs.rangeKm >= 120).length }
    ];

    const batteryTypes = [...new Set(models.map(m => m.specs.batteryType).filter(Boolean))].map(type => ({
      value: type!,
      label: type!,
      count: models.filter(m => m.specs.batteryType === type).length
    }));

    return { brands, priceRanges, ranges, batteryTypes };
  }, [models]);

  // Filter models based on search and filters
  const filteredModels = useMemo(() => {
    let filtered = models;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(model =>
        model.name.toLowerCase().includes(query) ||
        model.brand.toLowerCase().includes(query) ||
        model.description?.toLowerCase().includes(query)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(model => selectedBrands.includes(model.brand));
    }

    // Price range filter
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter(model => {
        return selectedPriceRanges.some(range => {
          switch (range) {
            case 'under-100k': return model.price.msrp < 100000;
            case '100k-200k': return model.price.msrp >= 100000 && model.price.msrp < 200000;
            case '200k-300k': return model.price.msrp >= 200000 && model.price.msrp < 300000;
            case '300k-500k': return model.price.msrp >= 300000 && model.price.msrp < 500000;
            case 'over-500k': return model.price.msrp >= 500000;
            default: return false;
          }
        });
      });
    }

    // Range filter
    if (selectedRanges.length > 0) {
      filtered = filtered.filter(model => {
        if (!model.specs.rangeKm) return false;
        return selectedRanges.some(range => {
          switch (range) {
            case 'under-50km': return model.specs.rangeKm < 50;
            case '50-80km': return model.specs.rangeKm >= 50 && model.specs.rangeKm < 80;
            case '80-120km': return model.specs.rangeKm >= 80 && model.specs.rangeKm < 120;
            case 'over-120km': return model.specs.rangeKm >= 120;
            default: return false;
          }
        });
      });
    }

    // Battery type filter
    if (selectedBatteryTypes.length > 0) {
      filtered = filtered.filter(model => 
        model.specs.batteryType && selectedBatteryTypes.includes(model.specs.batteryType)
      );
    }

    return filtered;
  }, [models, searchQuery, selectedBrands, selectedPriceRanges, selectedRanges, selectedBatteryTypes]);

  // Update results when filters change
  useEffect(() => {
    setFilteredModels(filteredModels);
  }, [filteredModels, setFilteredModels]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    setSelectedRanges([]);
    setSelectedBatteryTypes([]);
  };

  const hasActiveFilters = searchQuery || 
    selectedBrands.length > 0 || 
    selectedPriceRanges.length > 0 || 
    selectedRanges.length > 0 || 
    selectedBatteryTypes.length > 0;

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Search Bar */}
      <SearchBar
        onSearch={setSearchQuery}
        models={models}
        placeholder="Search by name, brand, or features..."
        className="max-w-3xl mx-auto"
      />

      {/* Filters */}
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <FilterDropdown
            label="Brand"
            options={filterOptions.brands}
            selectedValues={selectedBrands}
            onSelectionChange={setSelectedBrands}
          />
          
          <FilterDropdown
            label="Price Range"
            options={filterOptions.priceRanges}
            selectedValues={selectedPriceRanges}
            onSelectionChange={setSelectedPriceRanges}
          />
          
          <FilterDropdown
            label="Range"
            options={filterOptions.ranges}
            selectedValues={selectedRanges}
            onSelectionChange={setSelectedRanges}
          />
          
          <FilterDropdown
            label="Battery"
            options={filterOptions.batteryTypes}
            selectedValues={selectedBatteryTypes}
            onSelectionChange={setSelectedBatteryTypes}
          />
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: &quot;{searchQuery}&quot;
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSearchQuery('')}
                />
              </Badge>
            )}
            {selectedBrands.map(brand => (
              <Badge key={brand} variant="secondary" className="gap-1">
                {brand}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedBrands(selectedBrands.filter(b => b !== brand))}
                />
              </Badge>
            ))}
            {selectedPriceRanges.map(range => (
              <Badge key={range} variant="secondary" className="gap-1">
                {filterOptions.priceRanges.find(r => r.value === range)?.label}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedPriceRanges(selectedPriceRanges.filter(r => r !== range))}
                />
              </Badge>
            ))}
            {selectedRanges.map(range => (
              <Badge key={range} variant="secondary" className="gap-1">
                {filterOptions.ranges.find(r => r.value === range)?.label}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedRanges(selectedRanges.filter(r => r !== range))}
                />
              </Badge>
            ))}
            {selectedBatteryTypes.map(type => (
              <Badge key={type} variant="secondary" className="gap-1">
                {type}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedBatteryTypes(selectedBatteryTypes.filter(t => t !== type))}
                />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-6 px-2 text-xs"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
