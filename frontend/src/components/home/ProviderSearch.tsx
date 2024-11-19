import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { FilterSection, FilterState } from './FilterSection';
import { ProviderList } from './ProviderList';
import { mockProviders } from '@/lib/data';
import type { Profile } from '@/lib/data';
import { Search, MapPin, AlertCircle } from 'lucide-react';
import { calculateDistance, getLocationInfo } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SearchState extends FilterState {
  searchQuery: string;
  maxWaitingWeeks: number;
  location: string;
  radius: number;
  onlyAvailableNow: boolean;
}

const defaultSearchState: SearchState = {
  searchQuery: '',
  providerType: [],
  backgrounds: [],
  ethnicity: [],
  languages: [],
  specialties: [],
  consultationType: [],
  availability: [],
  treatmentMethods: [],
  ageGroups: [],
  sessionFormats: [],
  focusAreas: [],
  insuranceProviders: [],
  maxWaitingWeeks: 12,
  location: '',
  radius: 10,
  onlyAvailableNow: false,
  gender: 'any'
};

export function ProviderSearch() {
  const [searchState, setSearchState] = useState<SearchState>(defaultSearchState);
  const [filteredProviders, setFilteredProviders] = useState<Profile[]>(mockProviders);
  const [locationError, setLocationError] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = { ...searchState, searchQuery: e.target.value };
    setSearchState(newState);
    applyFilters(newState);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value;
    setLocationError('');

    const newState = { ...searchState, location };
    setSearchState(newState);

    if (location) {
      const locationInfo = getLocationInfo(location);
      if (!locationInfo) {
        setLocationError('Please enter a valid Dutch postal code or city name');
      }
    }

    applyFilters(newState);
  };

  const handleFilterChange = (filters: FilterState) => {
    const newState = { ...searchState, ...filters };
    setSearchState(newState);
    applyFilters(newState);
  };

  const applyFilters = (state: SearchState) => {
    let filtered = mockProviders.filter(provider => {
      // Text search across multiple fields
      const searchQuery = state.searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        provider.name.toLowerCase().includes(searchQuery) ||
        provider.description.toLowerCase().includes(searchQuery) ||
        provider.specialties.some(s => s.toLowerCase().includes(searchQuery)) ||
        provider.treatmentMethods.some(m => m.toLowerCase().includes(searchQuery));

      // Location filtering
      let matchesLocation = true;
      let distance: number | null = null;

      if (state.location) {
        const locationInfo = getLocationInfo(state.location);
        if (locationInfo) {
          distance = calculateDistance(locationInfo.postalCode, provider.address.postalCode);
          matchesLocation = distance !== null && distance <= state.radius;
        }
      }

      // Store the distance in the provider object for display
      provider.distance = distance;

      // Gender filter
      const matchesGender = state.gender === 'any' || provider.gender === state.gender;

      // Basic filters
      const matchesType = state.providerType.length === 0 || 
        state.providerType.includes(provider.providerType);
      const matchesBackground = state.backgrounds.length === 0 || 
        provider.backgrounds.some(bg => state.backgrounds.includes(bg));
      const matchesEthnicity = state.ethnicity.length === 0 || 
        provider.ethnicity.some(eth => state.ethnicity.includes(eth));
      const matchesLanguage = state.languages.length === 0 || 
        provider.languages.some(lang => state.languages.includes(lang));
      const matchesSpecialty = state.specialties.length === 0 || 
        provider.specialties.some(spec => state.specialties.includes(spec));
      const matchesConsultation = state.consultationType.length === 0 || 
        provider.consultationType.some(type => state.consultationType.includes(type));
      const matchesAvailability = state.availability.length === 0 || 
        provider.availability.some(avail => state.availability.includes(avail));
      const matchesTreatment = state.treatmentMethods.length === 0 || 
        provider.treatmentMethods.some(method => state.treatmentMethods.includes(method));
      const matchesAge = state.ageGroups.length === 0 || 
        provider.ageGroups.some(age => state.ageGroups.includes(age));
      const matchesFormat = state.sessionFormats.length === 0 || 
        provider.sessionFormats.some(format => state.sessionFormats.includes(format));
      const matchesFocus = state.focusAreas.length === 0 || 
        provider.focusAreas.some(area => state.focusAreas.includes(area));
      const matchesInsurance = state.insuranceProviders.length === 0 || 
        provider.insuranceNetworks.some(ins => state.insuranceProviders.includes(ins));

      // Advanced filters
      const matchesWaiting = provider.waitingListWeeks <= state.maxWaitingWeeks;
      const matchesAvailableNow = !state.onlyAvailableNow || provider.waitingListWeeks === 0;

      return matchesSearch &&
        matchesLocation &&
        matchesGender &&
        matchesType &&
        matchesBackground &&
        matchesEthnicity &&
        matchesLanguage &&
        matchesSpecialty &&
        matchesConsultation &&
        matchesAvailability &&
        matchesTreatment &&
        matchesAge &&
        matchesFormat &&
        matchesFocus &&
        matchesInsurance &&
        matchesWaiting &&
        matchesAvailableNow;
    });

    // Sort by distance if location is provided
    if (state.location) {
      filtered.sort((a, b) => {
        const distanceA = a.distance ?? Infinity;
        const distanceB = b.distance ?? Infinity;
        return distanceA - distanceB;
      });
    }

    setFilteredProviders(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Search and Quick Filters */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, specialty, or treatment method..."
                value={searchState.searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Maximum Waiting Time (weeks)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[searchState.maxWaitingWeeks]}
                    onValueChange={([value]) => {
                      const newState = { ...searchState, maxWaitingWeeks: value };
                      setSearchState(newState);
                      applyFilters(newState);
                    }}
                    max={24}
                    step={1}
                  />
                  <span className="w-12 text-right">{searchState.maxWaitingWeeks}w</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter city or postal code..."
                      value={searchState.location}
                      onChange={handleLocationChange}
                      className="pl-10"
                    />
                  </div>
                  {locationError && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{locationError}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Maximum Distance (km)</Label>
                  <div className="flex items-center space-x-4">
                    <Slider
                      value={[searchState.radius]}
                      onValueChange={([value]) => {
                        const newState = { ...searchState, radius: value };
                        setSearchState(newState);
                        applyFilters(newState);
                      }}
                      max={50}
                      step={1}
                    />
                    <span className="w-12 text-right">{searchState.radius}km</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="immediate-availability"
                  checked={searchState.onlyAvailableNow}
                  onCheckedChange={(checked) => {
                    const newState = { ...searchState, onlyAvailableNow: checked };
                    setSearchState(newState);
                    applyFilters(newState);
                  }}
                />
                <Label htmlFor="immediate-availability">Show only immediately available providers</Label>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Filters */}
        <FilterSection onFilterChange={handleFilterChange} initialFilters={searchState} />

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {filteredProviders.length} {filteredProviders.length === 1 ? 'Provider' : 'Providers'} Found
            </h2>
            {searchState.location && (
              <p className="text-muted-foreground">
                Showing results near {searchState.location}
              </p>
            )}
          </div>
          <ProviderList providers={filteredProviders} />
        </div>
      </div>
    </div>
  );
}