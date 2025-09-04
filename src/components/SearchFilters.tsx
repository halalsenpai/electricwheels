"use client";

import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { FilterDropdown } from './FilterDropdown';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Filter, Building2, DollarSign, Route, Battery, Zap, Gauge, Weight, Shield, Search } from 'lucide-react';
import { Model } from '@/types';
import { useSearch } from '@/contexts/SearchContext';

interface SearchFiltersProps {
  models: Model[];
  className?: string;
  onLeadCapture?: (query: string) => void;
  onAdvancedSearch?: () => void;
}

export function SearchFilters({ models, className = "", onLeadCapture, onAdvancedSearch }: SearchFiltersProps) {
  const router = useRouter();
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

  const navigateToSearchPage = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedBrands.length) params.set('brands', selectedBrands.join(','));
    if (selectedPriceRanges.length) params.set('priceRanges', selectedPriceRanges.join(','));
    if (selectedRanges.length) params.set('ranges', selectedRanges.join(','));
    if (selectedBatteryTypes.length) params.set('batteryTypes', selectedBatteryTypes.join(','));
    // trigger lead capture on arrival
    params.set('lead', '1');
    router.push(`/search?${params.toString()}`);
  };

  const hasActiveFilters = searchQuery || 
    selectedBrands.length > 0 || 
    selectedPriceRanges.length > 0 || 
    selectedRanges.length > 0 || 
    selectedBatteryTypes.length > 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filters (with integrated Search) */}
      <div className="mx-auto max-w-6xl w-full">
        <div className="rounded-2xl border bg-card text-card-foreground shadow-sm">
          <div className="px-5 sm:px-6 md:px-8 py-5 sm:py-6 md:py-7">
            {/* Integrated Search Bar */}
            <div className="mb-4 sm:mb-5 md:mb-6">
              <SearchBar
                onSearch={setSearchQuery}
                models={models}
                placeholder="Search by name, brand, or features..."
                className="w-full"
                onLeadCapture={onLeadCapture}
                navigateOnSearch={false}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              <FilterDropdown
                label="Brand"
                options={filterOptions.brands}
                selectedValues={selectedBrands}
                onSelectionChange={setSelectedBrands}
                icon={<Building2 className="h-4 w-4" />}
              />
              <FilterDropdown
                label="Price Range"
                options={filterOptions.priceRanges}
                selectedValues={selectedPriceRanges}
                onSelectionChange={setSelectedPriceRanges}
                icon={<DollarSign className="h-4 w-4" />}
              />
              <FilterDropdown
                label="Range"
                options={filterOptions.ranges}
                selectedValues={selectedRanges}
                onSelectionChange={setSelectedRanges}
                icon={<Route className="h-4 w-4" />}
              />
              <FilterDropdown
                label="Battery"
                options={filterOptions.batteryTypes}
                selectedValues={selectedBatteryTypes}
                onSelectionChange={setSelectedBatteryTypes}
                icon={<Battery className="h-4 w-4" />}
              />
            </div>


            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mt-4 sm:mt-5 md:mt-6 border-t pt-4 sm:pt-5 flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm font-medium text-muted-foreground mr-1">Active:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1 rounded-full px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <Search className="h-3 w-3" />
                    &quot;{searchQuery}&quot;
                    <button
                      type="button"
                      aria-label="Remove search query filter"
                      onClick={(e) => { e.stopPropagation(); setSearchQuery(''); }}
                      className="inline-flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedBrands.map(brand => (
                  <Badge key={brand} variant="secondary" className="gap-1 rounded-full px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
                    <Building2 className="h-3 w-3" />
                    {brand}
                    <button
                      type="button"
                      aria-label={`Remove ${brand} filter`}
                      onClick={(e) => { e.stopPropagation(); setSelectedBrands((prev) => prev.filter((b) => b !== brand)); }}
                      className="inline-flex items-center justify-center hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedPriceRanges.map(range => (
                  <Badge key={range} variant="secondary" className="gap-1 rounded-full px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
                    <DollarSign className="h-3 w-3" />
                    {filterOptions.priceRanges.find(r => r.value === range)?.label}
                    <button
                      type="button"
                      aria-label={`Remove ${range} price filter`}
                      onClick={(e) => { e.stopPropagation(); setSelectedPriceRanges((prev) => prev.filter((r) => r !== range)); }}
                      className="inline-flex items-center justify-center hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedRanges.map(range => (
                  <Badge key={range} variant="secondary" className="gap-1 rounded-full px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    <Route className="h-3 w-3" />
                    {filterOptions.ranges.find(r => r.value === range)?.label}
                    <button
                      type="button"
                      aria-label={`Remove ${range} range filter`}
                      onClick={(e) => { e.stopPropagation(); setSelectedRanges((prev) => prev.filter((r) => r !== range)); }}
                      className="inline-flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedBatteryTypes.map(type => (
                  <Badge key={type} variant="secondary" className="gap-1 rounded-full px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                    <Battery className="h-3 w-3" />
                    {type}
                    <button
                      type="button"
                      aria-label={`Remove ${type} battery filter`}
                      onClick={(e) => { e.stopPropagation(); setSelectedBatteryTypes((prev) => prev.filter((t) => t !== type)); }}
                      className="inline-flex items-center justify-center hover:bg-orange-200 dark:hover:bg-orange-800 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
