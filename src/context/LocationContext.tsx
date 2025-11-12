import { createContext, useContext, useState, ReactNode } from 'react';

export interface Location {
  id: string;
  name: string;
}

interface LocationContextType {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
  locations: Location[];
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const mockLocations: Location[] = [
  { id: '1', name: 'Arstock Palermo' },
  { id: '2', name: 'Arstock Belgrano' },
  { id: '3', name: 'Arstock Recoleta' },
];

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location>(mockLocations[0]);

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation, locations: mockLocations }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
};
