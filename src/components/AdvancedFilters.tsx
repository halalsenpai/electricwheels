"use client";

import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { FilterDropdown } from './FilterDropdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, Search, Zap, Gauge } from 'lucide-react';
import { allModels } from '@/lib/data';

interface AdvancedFiltersProps {
  initialQuery: string;
  initialFilters: {
    brands: string[];
    priceRanges: string[];
    ranges: string[];
    batteryTypes: string[];
  };
  onSearch: (query: string, filters: {
    brands: string[];
    priceRanges: string[];
    ranges: string[];
    batteryTypes: string[];
    motorPower: string[];
    topSpeed: string[];
    weight: string[];
    brakes: string[];
  }) => void;
  onLeadCapture?: (query: string, filters: any) => void;
}

export function AdvancedFilters({ initialQuery, initialFilters, onSearch, onLeadCapture }: AdvancedFiltersProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialFilters.brands);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>(initialFilters.priceRanges);
  const [selectedRanges, setSelectedRanges] = useState<string[]>(initialFilters.ranges);
  const [selectedBatteryTypes, setSelectedBatteryTypes] = useState<string[]>(initialFilters.batteryTypes);
  const [selectedMotorPower, setSelectedMotorPower] = useState<string[]>([]);
  const [selectedTopSpeed, setSelectedTopSpeed] = useState<string[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<string[]>([]);
  const [selectedBrakes, setSelectedBrakes] = useState<string[]>([]);

  // Generate filter options from models data
  const filterOptions = {
    brands: [...new Set(allModels.map(m => m.brand))].map(brand => ({
      value: brand,
      label: brand,
      count: allModels.filter(m => m.brand === brand).length
    })),

    priceRanges: [
      { value: 'under-100k', label: 'Under PKR 100K', count: allModels.filter(m => m.price.msrp < 100000).length },
      { value: '100k-200k', label: 'PKR 100K - 200K', count: allModels.filter(m => m.price.msrp >= 100000 && m.price.msrp < 200000).length },
      { value: '200k-300k', label: 'PKR 200K - 300K', count: allModels.filter(m => m.price.msrp >= 200000 && m.price.msrp < 300000).length },
      { value: '300k-500k', label: 'PKR 300K - 500K', count: allModels.filter(m => m.price.msrp >= 300000 && m.price.msrp < 500000).length },
      { value: 'over-500k', label: 'Over PKR 500K', count: allModels.filter(m => m.price.msrp >= 500000).length }
    ],

    ranges: [
      { value: 'under-50km', label: 'Under 50 km', count: allModels.filter(m => m.specs.rangeKm && m.specs.rangeKm < 50).length },
      { value: '50-80km', label: '50 - 80 km', count: allModels.filter(m => m.specs.rangeKm && m.specs.rangeKm >= 50 && m.specs.rangeKm < 80).length },
      { value: '80-120km', label: '80 - 120 km', count: allModels.filter(m => m.specs.rangeKm && m.specs.rangeKm >= 80 && m.specs.rangeKm < 120).length },
      { value: 'over-120km', label: 'Over 120 km', count: allModels.filter(m => m.specs.rangeKm && m.specs.rangeKm >= 120).length }
    ],

    batteryTypes: [...new Set(allModels.map(m => m.specs.batteryType).filter(Boolean))].map(type => ({
      value: type!,
      label: type!,
      count: allModels.filter(m => m.specs.batteryType === type).length
    })),

    motorPower: [
      { value: 'under-1kw', label: 'Under 1kW', count: allModels.filter(m => m.specs.motorPowerW < 1000).length },
      { value: '1-2kw', label: '1kW - 2kW', count: allModels.filter(m => m.specs.motorPowerW >= 1000 && m.specs.motorPowerW < 2000).length },
      { value: '2-3kw', label: '2kW - 3kW', count: allModels.filter(m => m.specs.motorPowerW >= 2000 && m.specs.motorPowerW < 3000).length },
      { value: 'over-3kw', label: 'Over 3kW', count: allModels.filter(m => m.specs.motorPowerW >= 3000).length }
    ],

    topSpeed: [
      { value: 'under-60kmh', label: 'Under 60 km/h', count: allModels.filter(m => m.specs.topSpeedKmh < 60).length },
      { value: '60-70kmh', label: '60 - 70 km/h', count: allModels.filter(m => m.specs.topSpeedKmh >= 60 && m.specs.topSpeedKmh < 70).length },
      { value: '70-80kmh', label: '70 - 80 km/h', count: allModels.filter(m => m.specs.topSpeedKmh >= 70 && m.specs.topSpeedKmh < 80).length },
      { value: 'over-80kmh', label: 'Over 80 km/h', count: allModels.filter(m => m.specs.topSpeedKmh >= 80).length }
    ],

    weight: [
      { value: 'under-90kg', label: 'Under 90 kg', count: allModels.filter(m => m.specs.weightKg && m.specs.weightKg < 90).length },
      { value: '90-100kg', label: '90 - 100 kg', count: allModels.filter(m => m.specs.weightKg && m.specs.weightKg >= 90 && m.specs.weightKg < 100).length },
      { value: 'over-100kg', label: 'Over 100 kg', count: allModels.filter(m => m.specs.weightKg && m.specs.weightKg >= 100).length }
    ],

    brakes: [
      { value: 'drum', label: 'Drum Brakes', count: allModels.filter(m => m.specs.brakes === 'Drum').length },
      { value: 'disc', label: 'Disc Brakes', count: allModels.filter(m => m.specs.brakes === 'Disc').length }
    ]
  };

  const handleSearch = () => {
    const filters = {
      brands: selectedBrands,
      priceRanges: selectedPriceRanges,
      ranges: selectedRanges,
      batteryTypes: selectedBatteryTypes,
      motorPower: selectedMotorPower,
      topSpeed: selectedTopSpeed,
      weight: selectedWeight,
      brakes: selectedBrakes
    };
    
    onSearch(searchQuery, filters);
    
    // Trigger lead capture modal
    if (onLeadCapture) {
      onLeadCapture(searchQuery, filters);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    setSelectedRanges([]);
    setSelectedBatteryTypes([]);
    setSelectedMotorPower([]);
    setSelectedTopSpeed([]);
    setSelectedWeight([]);
    setSelectedBrakes([]);
  };

  const hasActiveFilters = searchQuery || 
    selectedBrands.length > 0 || 
    selectedPriceRanges.length > 0 || 
    selectedRanges.length > 0 || 
    selectedBatteryTypes.length > 0 ||
    selectedMotorPower.length > 0 ||
    selectedTopSpeed.length > 0 ||
    selectedWeight.length > 0 ||
    selectedBrakes.length > 0;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SearchBar
            onSearch={setSearchQuery}
            models={allModels}
            placeholder="Search bikes..."
            className="w-full"
            onLeadCapture={(q) => onLeadCapture?.(q, {
              brands: selectedBrands,
              priceRanges: selectedPriceRanges,
              ranges: selectedRanges,
              batteryTypes: selectedBatteryTypes,
              motorPower: selectedMotorPower,
              topSpeed: selectedTopSpeed,
              weight: selectedWeight,
              brakes: selectedBrakes
            })}
            navigateOnSearch={false}
          />
        </CardContent>
      </Card>

      {/* Basic Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Basic Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FilterDropdown
            label="Brand"
            options={filterOptions.brands}
            selectedValues={selectedBrands}
            onSelectionChange={setSelectedBrands}
            className="w-full"
          />
          
          <FilterDropdown
            label="Price Range"
            options={filterOptions.priceRanges}
            selectedValues={selectedPriceRanges}
            onSelectionChange={setSelectedPriceRanges}
            className="w-full"
          />
          
          <FilterDropdown
            label="Range"
            options={filterOptions.ranges}
            selectedValues={selectedRanges}
            onSelectionChange={setSelectedRanges}
            className="w-full"
          />
          
          <FilterDropdown
            label="Battery Type"
            options={filterOptions.batteryTypes}
            selectedValues={selectedBatteryTypes}
            onSelectionChange={setSelectedBatteryTypes}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Performance Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FilterDropdown
            label="Motor Power"
            options={filterOptions.motorPower}
            selectedValues={selectedMotorPower}
            onSelectionChange={setSelectedMotorPower}
            className="w-full"
          />
          
          <FilterDropdown
            label="Top Speed"
            options={filterOptions.topSpeed}
            selectedValues={selectedTopSpeed}
            onSelectionChange={setSelectedTopSpeed}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Physical Specs */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            Physical Specs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FilterDropdown
            label="Weight"
            options={filterOptions.weight}
            selectedValues={selectedWeight}
            onSelectionChange={setSelectedWeight}
            className="w-full"
          />
          
          <FilterDropdown
            label="Brakes"
            options={filterOptions.brakes}
            selectedValues={selectedBrakes}
            onSelectionChange={setSelectedBrakes}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button 
          onClick={handleSearch}
          className="w-full h-12 bg-green-600 hover:bg-green-700"
        >
          Apply Filters
        </Button>
        
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={clearAllFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Active Filters ({[
                searchQuery && 'Search',
                selectedBrands.length && 'Brands',
                selectedPriceRanges.length && 'Price',
                selectedRanges.length && 'Range',
                selectedBatteryTypes.length && 'Battery',
                selectedMotorPower.length && 'Motor',
                selectedTopSpeed.length && 'Speed',
                selectedWeight.length && 'Weight',
                selectedBrakes.length && 'Brakes'
              ].filter(Boolean).length})
            </CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
