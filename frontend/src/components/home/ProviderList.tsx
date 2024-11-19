import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import type { Profile } from '@/lib/data';
import { ProviderProfile } from './ProviderProfile';
import { useState } from 'react';

interface ProviderListProps {
  providers: Profile[];
}

export function ProviderList({ providers }: ProviderListProps) {
  const [selectedProvider, setSelectedProvider] = useState<Profile | null>(null);

  const formatAddress = (address: Profile['address']) => {
    const parts = [
      address.street,
      address.houseNumber,
      address.additional,
      address.city,
      address.postalCode
    ].filter(Boolean);
    return parts.join(' ');
  };

  const formatDistance = (distance?: number) => {
    if (!distance) return '';
    return `${distance.toFixed(1)} km away`;
  };

  if (providers.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No healthcare providers found matching your criteria.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {providers.map((provider) => (
          <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={provider.avatar} alt={provider.name} />
                  <AvatarFallback>{provider.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground">{provider.providerType}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <div>
                    <p>{formatAddress(provider.address)}</p>
                    {provider.distance && (
                      <p className="text-sm font-medium text-primary">
                        {formatDistance(provider.distance)}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm line-clamp-3">{provider.description}</p>
                <div className="flex flex-wrap gap-1">
                  {provider.specialties.slice(0, 3).map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <Button 
                  className="w-full mt-4"
                  onClick={() => setSelectedProvider(provider)}
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProviderProfile
        provider={selectedProvider}
        isOpen={!!selectedProvider}
        onClose={() => setSelectedProvider(null)}
      />
    </>
  );
}