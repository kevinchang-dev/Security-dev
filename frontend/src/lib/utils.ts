import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Dutch postal code format: "1234 AB"
interface PostalCodeCoordinates {
  latitude: number;
  longitude: number;
}

interface CityInfo {
  name: string;
  postalCode: string;
  coordinates: PostalCodeCoordinates;
}

// Map of Dutch cities to their central postal codes and coordinates
export const dutchCities: Record<string, CityInfo> = {
  'amsterdam': {
    name: 'Amsterdam',
    postalCode: '1012 JS',
    coordinates: { latitude: 52.3731, longitude: 4.8924 }
  },
  'rotterdam': {
    name: 'Rotterdam',
    postalCode: '3011 BR',
    coordinates: { latitude: 51.9225, longitude: 4.4792 }
  },
  'utrecht': {
    name: 'Utrecht',
    postalCode: '3511 JC',
    coordinates: { latitude: 52.0894, longitude: 5.1246 }
  },
  'the hague': {
    name: 'The Hague',
    postalCode: '2511 CK',
    coordinates: { latitude: 52.0705, longitude: 4.3007 }
  },
  'den haag': {
    name: 'The Hague',
    postalCode: '2511 CK',
    coordinates: { latitude: 52.0705, longitude: 4.3007 }
  },
  'eindhoven': {
    name: 'Eindhoven',
    postalCode: '5611 AZ',
    coordinates: { latitude: 51.4381, longitude: 5.4752 }
  }
};

// Postal code to coordinates mapping
const postalCodeMap: Record<string, PostalCodeCoordinates> = {
  // Amsterdam
  '1012 JS': { latitude: 52.3731, longitude: 4.8924 },
  '1017 CT': { latitude: 52.3602, longitude: 4.8935 },
  '1018 WB': { latitude: 52.3579, longitude: 4.9147 },
  // Rotterdam
  '3011 BR': { latitude: 51.9225, longitude: 4.4792 },
  '3012 KD': { latitude: 51.9201, longitude: 4.4779 },
  // Utrecht
  '3511 JC': { latitude: 52.0894, longitude: 5.1246 },
  '3512 JE': { latitude: 52.0907, longitude: 5.1199 },
  // The Hague
  '2511 CK': { latitude: 52.0705, longitude: 4.3007 },
  '2513 AM': { latitude: 52.0829, longitude: 4.3012 },
  // Eindhoven
  '5611 AZ': { latitude: 51.4381, longitude: 5.4752 },
};

export function getLocationInfo(input: string): { postalCode: string; coordinates: PostalCodeCoordinates } | null {
  // Clean up input
  const cleanInput = input.trim().toLowerCase();

  // Check if input is a postal code
  if (isValidDutchPostalCode(cleanInput)) {
    const coords = postalCodeMap[cleanInput];
    if (coords) {
      return { postalCode: cleanInput, coordinates: coords };
    }
  }

  // Check if input is a city name
  const cityInfo = dutchCities[cleanInput];
  if (cityInfo) {
    return {
      postalCode: cityInfo.postalCode,
      coordinates: cityInfo.coordinates
    };
  }

  return null;
}

export function calculateDistance(postalCode1: string, postalCode2: string): number | null {
  const location1 = postalCodeMap[postalCode1];
  const location2 = postalCodeMap[postalCode2];

  if (!location1 || !location2) return null;

  const R = 6371; // Earth's radius in kilometers
  const dLat = (location2.latitude - location1.latitude) * Math.PI / 180;
  const dLon = (location2.longitude - location1.longitude) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(location1.latitude * Math.PI / 180) * Math.cos(location2.latitude * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal place
}

// Validate Dutch postal code format
export function isValidDutchPostalCode(postalCode: string): boolean {
  const regex = /^[1-9][0-9]{3}\s?[A-Z]{2}$/i;
  return regex.test(postalCode.trim());
}

// Format distance for display
export function formatDistance(distance: number | null): string {
  if (distance === null) return 'Distance unknown';
  return `${distance} km away`;
}