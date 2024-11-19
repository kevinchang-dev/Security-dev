import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MultiSelect } from './MultiSelect';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  backgrounds,
  languages,
  specialties,
  consultationTypes,
  availability,
  treatmentMethods,
  ageGroups,
  sessionFormats,
  focusAreas,
  insuranceProviders,
  providerTypes,
  ethnicities
} from '@/lib/data';

interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  providerType: string[];
  backgrounds: string[];
  languages: string[];
  specialties: string[];
  consultationType: string[];
  availability: string[];
  treatmentMethods: string[];
  ageGroups: string[];
  sessionFormats: string[];
  focusAreas: string[];
  insuranceProviders: string[];
  ethnicity: string[];
  gender?: 'male' | 'female' | 'other' | 'any';
}

const defaultFilters: FilterState = {
  providerType: [],
  backgrounds: [],
  languages: [],
  specialties: [],
  consultationType: [],
  availability: [],
  treatmentMethods: [],
  ageGroups: [],
  sessionFormats: [],
  focusAreas: [],
  insuranceProviders: [],
  ethnicity: [],
  gender: 'any'
};

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
}

function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-primary">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  );
}

export function FilterSection({ onFilterChange, initialFilters = defaultFilters }: FilterSectionProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const updateFilter = (key: keyof FilterState, value: string[] | string) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const flatProviderTypes = Object.values(providerTypes).flat();

  return (
    <Card>
      <CardContent className="p-6 space-y-8">
        <FilterGroup title="Essentiële Informatie">
          <MultiSelect
            label="Type Therapeut"
            options={flatProviderTypes}
            value={filters.providerType}
            onChange={(value) => updateFilter('providerType', value)}
          />
          <MultiSelect
            label="Culturele Achtergrond"
            options={backgrounds}
            value={filters.backgrounds}
            onChange={(value) => updateFilter('backgrounds', value)}
          />
          <MultiSelect
            label="Etniciteit"
            options={ethnicities}
            value={filters.ethnicity}
            onChange={(value) => updateFilter('ethnicity', value)}
          />
          <MultiSelect
            label="Talen"
            options={languages}
            value={filters.languages}
            onChange={(value) => updateFilter('languages', value)}
          />
          <div className="space-y-2">
            <Label>Geslacht</Label>
            <Select
              value={filters.gender}
              onValueChange={(value: 'male' | 'female' | 'other' | 'any') => 
                updateFilter('gender', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecteer geslachtsvoorkeur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Geen voorkeur</SelectItem>
                <SelectItem value="male">Man</SelectItem>
                <SelectItem value="female">Vrouw</SelectItem>
                <SelectItem value="other">X</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </FilterGroup>

        <Separator />

        <FilterGroup title="Expertise & Specialisatie">
          <MultiSelect
            label="Specialisaties"
            options={specialties}
            value={filters.specialties}
            onChange={(value) => updateFilter('specialties', value)}
          />
          <MultiSelect
            label="Behandelmethoden"
            options={treatmentMethods}
            value={filters.treatmentMethods}
            onChange={(value) => updateFilter('treatmentMethods', value)}
          />
          <MultiSelect
            label="Aandachtsgebieden"
            options={focusAreas}
            value={filters.focusAreas}
            onChange={(value) => updateFilter('focusAreas', value)}
          />
        </FilterGroup>

        <Separator />

        <FilterGroup title="Sessiedetails">
          <MultiSelect
            label="Consultatietype"
            options={consultationTypes}
            value={filters.consultationType}
            onChange={(value) => updateFilter('consultationType', value)}
          />
          <MultiSelect
            label="Sessieformaten"
            options={sessionFormats}
            value={filters.sessionFormats}
            onChange={(value) => updateFilter('sessionFormats', value)}
          />
          <MultiSelect
            label="Leeftijdsgroepen"
            options={ageGroups}
            value={filters.ageGroups}
            onChange={(value) => updateFilter('ageGroups', value)}
          />
        </FilterGroup>

        <Separator />

        <FilterGroup title="Praktische Informatie">
          <MultiSelect
            label="Beschikbaarheid"
            options={availability}
            value={filters.availability}
            onChange={(value) => updateFilter('availability', value)}
          />
          <MultiSelect
            label="Zorgverzekeraars"
            options={insuranceProviders}
            value={filters.insuranceProviders}
            onChange={(value) => updateFilter('insuranceProviders', value)}
          />
        </FilterGroup>
      </CardContent>
    </Card>
  );
}