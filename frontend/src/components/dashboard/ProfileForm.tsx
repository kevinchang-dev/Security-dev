import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { BackgroundSelector } from './BackgroundSelector';
import { SpecialtySelector } from './SpecialtySelector';
import { MultiSelect } from '@/components/home/MultiSelect';
import { defaultProfile, type Profile } from '@/lib/data';
import { languages } from '@/lib/data';

export function ProfileForm() {
  const [profile, setProfile] = useState<Profile>({
    ...defaultProfile,
    addressDetails: {
      street: '',
      houseNumber: '',
      houseNumberAddition: '',
      postalCode: '',
      city: '',
    }
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <p className="text-sm text-muted-foreground">
            Update your provider profile information
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            <Button variant="outline" type="button">Change Photo</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={profile.gender}
                onValueChange={(value: 'male' | 'female' | 'other') => 
                  setProfile(prev => ({ ...prev, gender: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">X</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="street">Street Name</Label>
                <Input
                  id="street"
                  value={profile.addressDetails?.street}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    addressDetails: {
                      ...prev.addressDetails,
                      street: e.target.value
                    }
                  }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="houseNumber">House Number</Label>
                  <Input
                    id="houseNumber"
                    value={profile.addressDetails?.houseNumber}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      addressDetails: {
                        ...prev.addressDetails,
                        houseNumber: e.target.value
                      }
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addition">Addition</Label>
                  <Input
                    id="addition"
                    placeholder="e.g., A, bis"
                    value={profile.addressDetails?.houseNumberAddition}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      addressDetails: {
                        ...prev.addressDetails,
                        houseNumberAddition: e.target.value
                      }
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  placeholder="1234 AB"
                  value={profile.addressDetails?.postalCode}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    addressDetails: {
                      ...prev.addressDetails,
                      postalCode: e.target.value
                    }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={profile.addressDetails?.city}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    addressDetails: {
                      ...prev.addressDetails,
                      city: e.target.value
                    }
                  }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Languages</Label>
            <MultiSelect
              label="Languages"
              options={languages}
              value={profile.languages}
              onChange={(languages) => setProfile(prev => ({ ...prev, languages }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Cultural Backgrounds</Label>
            <BackgroundSelector
              selectedBackgrounds={profile.backgrounds}
              onBackgroundsChange={(backgrounds) =>
                setProfile(prev => ({ ...prev, backgrounds }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Professional Description</Label>
            <Textarea
              id="description"
              value={profile.description}
              onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Specialties</Label>
            <SpecialtySelector
              selectedSpecialties={profile.specialties}
              onSpecialtiesChange={(specialties) =>
                setProfile(prev => ({ ...prev, specialties }))
              }
            />
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}