import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Mail, Clock, Euro, Shield, Languages, Calendar, Phone } from 'lucide-react';
import type { Profile } from '@/lib/data';

interface ProviderProfileProps {
  provider: Profile | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProviderProfile({ provider, isOpen, onClose }: ProviderProfileProps) {
  if (!provider) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Provider Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={provider.avatar} alt={provider.name} />
              <AvatarFallback>{provider.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{provider.name}</h2>
              <p className="text-muted-foreground">{provider.providerType}</p>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{formatAddress(provider.address)}</span>
              </div>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Waiting Time</p>
                  <p className="text-sm text-muted-foreground">
                    {provider.waitingListWeeks} weeks
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center space-x-2">
                <Euro className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Session Price</p>
                  <p className="text-sm text-muted-foreground">
                    €{provider.priceRange.min} - €{provider.priceRange.max}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center space-x-2">
                <Shield className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Insurance</p>
                  <p className="text-sm text-muted-foreground">
                    {provider.acceptsInsurance ? 'Accepted' : 'Not Accepted'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{provider.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {provider.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Languages</h3>
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-primary" />
                <span>{provider.languages.join(', ')}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Availability</h3>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{provider.availability.join(', ')}</span>
              </div>
            </div>

            {provider.acceptsInsurance && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Insurance Networks</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.insuranceNetworks.map((insurance) => (
                    <Badge key={insurance} variant="outline">
                      {insurance}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={`mailto:${provider.email}`} className="text-primary hover:underline">
                    {provider.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href={`tel:${provider.phone}`} className="text-primary hover:underline">
                    {provider.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}