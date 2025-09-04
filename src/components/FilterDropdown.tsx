"use client";

import { useState } from 'react';
import { ChevronDown, Check, Building2, DollarSign, Route, Battery, Zap, Gauge, Weight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  multiple?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export function FilterDropdown({
  label,
  options,
  selectedValues,
  onSelectionChange,
  multiple = true,
  className = "",
  icon
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      onSelectionChange(newValues);
    } else {
      onSelectionChange([value]);
      setOpen(false);
    }
  };

  const handleClear = () => {
    onSelectionChange([]);
  };

  const selectedCount = selectedValues.length;
  const hasSelection = selectedCount > 0;

  return (
    <div className={className}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`h-12 justify-between min-w-[180px] px-4 transition-all duration-200 font-medium border-2 ${
              hasSelection 
                ? 'border-green-500 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 shadow-sm' 
                : 'hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm border-gray-200 dark:border-gray-700'
            }`}
          >
            <span className="flex items-center gap-2">
              {icon && <span className="text-muted-foreground">{icon}</span>}
              {label}
              {hasSelection && (
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  {selectedCount}
                </Badge>
              )}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-2 shadow-lg border-2" align="start">
          {hasSelection && (
            <DropdownMenuItem onClick={handleClear} className="text-muted-foreground">
              Clear all
            </DropdownMenuItem>
          )}
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <span>{option.label}</span>
                <div className="flex items-center gap-2">
                  {option.count && (
                    <span className="text-xs text-muted-foreground">
                      {option.count}
                    </span>
                  )}
                  {isSelected && <Check className="h-4 w-4 text-green-600" />}
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
