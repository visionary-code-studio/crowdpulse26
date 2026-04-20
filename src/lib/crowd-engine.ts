
import { CongestionLevel, Zone, POI } from './mock-data';

export const getCongestionColor = (level: CongestionLevel): string => {
  switch (level) {
    case 'low': return '#10B981'; // Green
    case 'medium': return '#F59E0B'; // Orange
    case 'high': return '#EF4444'; // Red
    case 'critical': return '#7F1D1D'; // Dark Red
    default: return '#3B82F6'; // Blue
  }
};

export const calculatePressure = (active: number, capacity: number): number => {
  return Math.min(Math.round((active / capacity) * 100), 100);
};

export const getRecommendedRoute = (pois: POI[], type: POI['type']): POI | null => {
  // Find the POI of the given type with the shortest wait time
  const options = pois.filter(p => p.type === type && p.isOpen);
  if (options.length === 0) return null;
  
  return options.reduce((prev, curr) => (prev.waitTime < curr.waitTime ? prev : curr));
};

export const getAltRouteSuggestions = (currentZoneId: string, zones: Zone[]): Zone[] => {
  // Simple logic: recommend zones of the same type with lower congestion
  const currentZone = zones.find(z => z.id === currentZoneId);
  if (!currentZone) return [];

  return zones.filter(z => 
    z.id !== currentZoneId && 
    z.type === currentZone.type && 
    (z.congestion === 'low' || z.congestion === 'medium')
  ).slice(0, 2);
};
