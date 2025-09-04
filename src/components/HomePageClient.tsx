"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchFilters } from './SearchFilters';
import { allModels } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/contexts/SearchContext';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { ArrowRight } from 'lucide-react';

export function HomePageClient() {
  const router = useRouter();
  const [showLead, setShowLead] = useState(false);
  const [pendingQuery, setPendingQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const {
    searchQuery,
    selectedBrands,
    selectedPriceRanges,
    selectedRanges,
    selectedBatteryTypes
  } = useSearch();

  useEffect(() => {
    // Preload approximate location for logging when modal opens
    const fetchLoc = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const loc = `${data.city}, ${data.region}, ${data.country}`;
        setLocation(loc);
      } catch {
        setLocation('Unknown');
      }
    };
    fetchLoc();
  }, []);

  const handleLeadCapture = (query: string) => {
    setPendingQuery(query);
    setShowLead(true);
  };

  const handleLeadSubmit = (leadData: { name: string; phone: string; timestamp: string }) => {
    // Log lead with location and query context
    console.log('Lead captured (homepage):', {
      ...leadData,
      location,
      searchQuery: pendingQuery,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
    });
    setShowLead(false);
    // Navigate to search page after lead submission
    const params = new URLSearchParams();
    if (pendingQuery) params.set('q', pendingQuery);
    if (selectedBrands.length) params.set('brands', selectedBrands.join(','));
    if (selectedPriceRanges.length) params.set('priceRanges', selectedPriceRanges.join(','));
    if (selectedRanges.length) params.set('ranges', selectedRanges.join(','));
    if (selectedBatteryTypes.length) params.set('batteryTypes', selectedBatteryTypes.join(','));
    router.push(`/search?${params.toString()}`);
  };

  const handleAdvancedSearch = () => {
    // Trigger lead capture for advanced search
    setPendingQuery('');
    setShowLead(true);
  };

  return (
    <>
      <SearchFilters 
        models={allModels} 
        onLeadCapture={handleLeadCapture}
        onAdvancedSearch={handleAdvancedSearch}
      />
      
      {/* Advanced Search CTA */}
      <div className="pt-4">
        <Button 
          onClick={handleAdvancedSearch}
          size="lg" 
          className="h-12 px-8 text-base font-medium bg-green-600 hover:bg-green-700 transition-colors"
        >
          <ArrowRight className="h-4 w-4 mr-2" />
          Advanced Search
        </Button>
      </div>

      {showLead && (
        <LeadCaptureModal 
          onClose={() => setShowLead(false)} 
          onSubmit={handleLeadSubmit}
          location={location}
        />
      )}
    </>
  );
}
