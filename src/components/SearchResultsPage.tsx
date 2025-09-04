"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchResults } from './SearchResults';
import { AdvancedFilters } from './AdvancedFilters';
import { LeadCaptureModal } from './LeadCaptureModal';
import { SearchProvider } from '@/contexts/SearchContext';
import { allModels } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';

export function SearchResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [userLocation, setUserLocation] = useState<string>('');
  const [leadCaptureData, setLeadCaptureData] = useState<{
    query: string;
    filters?: any;
  } | null>(null);

  // Get initial search query from URL
  const initialQuery = searchParams.get('q') || '';
  const initialFilters = {
    brands: searchParams.get('brands')?.split(',') || [],
    priceRanges: searchParams.get('priceRanges')?.split(',') || [],
    ranges: searchParams.get('ranges')?.split(',') || [],
    batteryTypes: searchParams.get('batteryTypes')?.split(',') || []
  };
  const shouldTriggerLead = searchParams.get('lead') === '1';

  // Track user location
  useEffect(() => {
    const trackLocation = async () => {
      try {
        // Get IP-based location (you can use a service like ipapi.co)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const location = `${data.city}, ${data.region}, ${data.country}`;
        setUserLocation(location);
        console.log('User location:', location);
        console.log('IP:', data.ip);
      } catch (error) {
        console.log('Location tracking failed:', error);
        setUserLocation('Unknown');
      }
    };

    trackLocation();
  }, []);

  // Auto-open lead modal when arriving with a search (q/filters) and lead flag
  const leadHandledRef = useRef(false);
  useEffect(() => {
    if (!shouldTriggerLead || leadHandledRef.current) return;
    leadHandledRef.current = true;
    setLeadCaptureData({ query: initialQuery, filters: initialFilters });
    setShowLeadModal(true);
    // Optional: clean the URL by removing lead flag
    try {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.delete('lead');
      router.replace(`/search?${params.toString()}`);
    } catch {
      // noop
    }
  }, [shouldTriggerLead, initialQuery, initialFilters, router]);

  const handleSearch = (query: string, filters: {
    brands: string[];
    priceRanges: string[];
    ranges: string[];
    batteryTypes: string[];
    motorPower: string[];
    topSpeed: string[];
    weight: string[];
    brakes: string[];
  }) => {
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.brands.length) params.set('brands', filters.brands.join(','));
    if (filters.priceRanges.length) params.set('priceRanges', filters.priceRanges.join(','));
    if (filters.ranges.length) params.set('ranges', filters.ranges.join(','));
    if (filters.batteryTypes.length) params.set('batteryTypes', filters.batteryTypes.join(','));
    
    router.push(`/search?${params.toString()}`);
  };

  const handleLeadCapture = (query: string, filters?: any) => {
    // Show lead capture modal when user performs search action
    setLeadCaptureData({ query, filters });
    setShowLeadModal(true);
  };

  const handleModelSelect = () => {
    // Navigate directly to model page without lead capture
    // Lead capture is now handled at search level
  };

  const handleLeadSubmit = (leadData: {
    name: string;
    phone: string;
    timestamp: string;
  }) => {
    // Log lead data with location and search context
    const leadInfo = {
      ...leadData,
      location: userLocation,
      timestamp: new Date().toISOString(),
      searchQuery: leadCaptureData?.query || initialQuery,
      filters: leadCaptureData?.filters || initialFilters,
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
    
    console.log('Lead captured:', leadInfo);
    
    // Close modal and continue with search results
    setShowLeadModal(false);
    setLeadCaptureData(null);
  };

  return (
    <SearchProvider initialModels={allModels}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                <div className="h-6 w-px bg-border" />
                <h1 className="text-lg font-semibold">Search Results</h1>
                {userLocation && (
                  <Badge variant="outline" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    {userLocation}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Advanced Filters Sidebar */}
            <div className="w-80 flex-shrink-0">
              <AdvancedFilters 
                initialQuery={initialQuery}
                initialFilters={initialFilters}
                onSearch={handleSearch}
                onLeadCapture={handleLeadCapture}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <SearchResults 
                models={allModels}
                onModelSelect={handleModelSelect}
              />
            </div>
          </div>
        </div>

        {/* Lead Capture Modal */}
        {showLeadModal && (
          <LeadCaptureModal
            onClose={() => setShowLeadModal(false)}
            onSubmit={handleLeadSubmit}
            location={userLocation}
          />
        )}
      </div>
    </SearchProvider>
  );
}
