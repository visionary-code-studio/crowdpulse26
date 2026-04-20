
export type CongestionLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Zone {
  id: string;
  name: string;
  type: 'seating' | 'gate' | 'concourse';
  congestion: CongestionLevel;
  activeUsers: number;
  capacity: number;
}

export interface POI {
  id: string;
  name: string;
  type: 'food' | 'restroom' | 'merch' | 'gate';
  zoneId: string;
  waitTime: number; // in minutes
  isOpen: boolean;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  timestamp: string;
  zones: string[]; // Affected zones
}

export const INITIAL_ZONES: Zone[] = [
  { id: 'zone-a', name: 'West Stand (A)', type: 'seating', congestion: 'medium', activeUsers: 4500, capacity: 5000 },
  { id: 'zone-b', name: 'East Stand (B)', type: 'seating', congestion: 'low', activeUsers: 2000, capacity: 5000 },
  { id: 'zone-c', name: 'North Curve (C)', type: 'seating', congestion: 'high', activeUsers: 4800, capacity: 5000 },
  { id: 'zone-d', name: 'South End (D)', type: 'seating', congestion: 'critical', activeUsers: 5100, capacity: 5000 },
  { id: 'gate-1', name: 'Main Gate 1', type: 'gate', congestion: 'high', activeUsers: 800, capacity: 1000 },
  { id: 'gate-2', name: 'VIP Gate 2', type: 'gate', congestion: 'low', activeUsers: 100, capacity: 500 },
  { id: 'concourse-1', name: 'West Concourse', type: 'concourse', congestion: 'medium', activeUsers: 1200, capacity: 2000 },
];

export const INITIAL_POIS: POI[] = [
  { id: 'food-1', name: 'Apex Burgers', type: 'food', zoneId: 'concourse-1', waitTime: 15, isOpen: true },
  { id: 'food-2', name: 'Pizza Point', type: 'food', zoneId: 'zone-b', waitTime: 5, isOpen: true },
  { id: 'restroom-1', name: 'West Restrooms', type: 'restroom', zoneId: 'zone-a', waitTime: 8, isOpen: true },
  { id: 'restroom-2', name: 'East Restrooms', type: 'restroom', zoneId: 'zone-b', waitTime: 2, isOpen: true },
  { id: 'gate-1-poi', name: 'Gate 1 Entry', type: 'gate', zoneId: 'gate-1', waitTime: 20, isOpen: true },
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'alert-1',
    title: 'High Congestion: South End',
    message: 'South End (Zone D) is currently at capacity. Please avoid this area during halftime.',
    severity: 'high',
    timestamp: new Date().toISOString(),
    zones: ['zone-d'],
  },
  {
    id: 'alert-2',
    title: 'Gate 1 Delay',
    message: 'Gate 1 is experiencing long wait times. Use Gate 2 for faster entry.',
    severity: 'medium',
    timestamp: new Date().toISOString(),
    zones: ['gate-1'],
  }
];
