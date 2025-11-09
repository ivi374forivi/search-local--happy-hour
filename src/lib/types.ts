export type DealType = 'beer' | 'wine' | 'cocktails' | 'food' | 'all';
export type PriceLevel = 1 | 2 | 3;
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface TimeRange {
  start: string;
  end: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  type: DealType;
  price?: string;
  daysActive: DayOfWeek[];
  timeRange: TimeRange;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  priceLevel: PriceLevel;
  rating: number;
  reviewCount: number;
  tags: string[];
  deals: Deal[];
  image: string;
  distance?: number;
  lastUpdated: string;
}

export interface FilterState {
  dealTypes: DealType[];
  priceLevel: PriceLevel[];
  activeNow: boolean;
  day?: DayOfWeek;
  time?: string;
  searchQuery: string;
}
