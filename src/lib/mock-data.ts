import { Venue } from './types';

export const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: 'The Golden Hour',
    address: '123 Main St',
    neighborhood: 'Downtown',
    priceLevel: 2,
    rating: 4.5,
    reviewCount: 342,
    tags: ['Rooftop', 'Cocktails', 'Outdoor'],
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
    distance: 0.3,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    deals: [
      {
        id: 'd1',
        title: '$5 House Cocktails',
        description: 'All house cocktails and draft beers',
        type: 'cocktails',
        price: '$5',
        daysActive: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        timeRange: { start: '16:00', end: '19:00' }
      },
      {
        id: 'd2',
        title: 'Half-Price Wine',
        description: 'All wine by the glass',
        type: 'wine',
        price: '50% off',
        daysActive: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        timeRange: { start: '16:00', end: '18:00' }
      }
    ]
  },
  {
    id: '2',
    name: 'Brewmaster\'s Hideaway',
    address: '456 Elm Ave',
    neighborhood: 'Arts District',
    priceLevel: 1,
    rating: 4.7,
    reviewCount: 523,
    tags: ['Craft Beer', 'Casual', 'Games'],
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80',
    distance: 0.7,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    deals: [
      {
        id: 'd3',
        title: '$3 Draft Beers',
        description: 'Select draft beers and appetizers',
        type: 'beer',
        price: '$3',
        daysActive: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        timeRange: { start: '15:00', end: '18:00' }
      },
      {
        id: 'd4',
        title: 'Taco Tuesday',
        description: '$2 tacos with drink purchase',
        type: 'food',
        price: '$2',
        daysActive: ['tuesday'],
        timeRange: { start: '15:00', end: '20:00' }
      }
    ]
  },
  {
    id: '3',
    name: 'Sunset Lounge',
    address: '789 Beach Blvd',
    neighborhood: 'Waterfront',
    priceLevel: 3,
    rating: 4.3,
    reviewCount: 287,
    tags: ['Upscale', 'Ocean View', 'Live Music'],
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80',
    distance: 1.2,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    deals: [
      {
        id: 'd5',
        title: 'Wine Down Wednesday',
        description: '$6 select wines and small plates',
        type: 'wine',
        price: '$6',
        daysActive: ['wednesday'],
        timeRange: { start: '17:00', end: '20:00' }
      }
    ]
  },
  {
    id: '4',
    name: 'The Local Tap',
    address: '321 Oak Street',
    neighborhood: 'University District',
    priceLevel: 1,
    rating: 4.6,
    reviewCount: 612,
    tags: ['Sports Bar', 'Wings', 'Beer Garden'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    distance: 0.5,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    deals: [
      {
        id: 'd6',
        title: 'All Day Happy Hour',
        description: '$4 select beers and well drinks',
        type: 'all',
        price: '$4',
        daysActive: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        timeRange: { start: '11:00', end: '19:00' }
      },
      {
        id: 'd7',
        title: 'Wing Wednesday',
        description: '50¢ wings with any drink',
        type: 'food',
        price: '50¢',
        daysActive: ['wednesday'],
        timeRange: { start: '16:00', end: '22:00' }
      }
    ]
  },
  {
    id: '5',
    name: 'Verde Garden Bar',
    address: '555 Park Lane',
    neighborhood: 'Midtown',
    priceLevel: 2,
    rating: 4.4,
    reviewCount: 198,
    tags: ['Garden Patio', 'Farm-to-Table', 'Cocktails'],
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
    distance: 0.9,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    deals: [
      {
        id: 'd8',
        title: 'Garden Hour',
        description: '$7 craft cocktails and $5 small bites',
        type: 'cocktails',
        price: '$7',
        daysActive: ['tuesday', 'wednesday', 'thursday', 'friday'],
        timeRange: { start: '16:00', end: '18:30' }
      }
    ]
  },
  {
    id: '6',
    name: 'Bourbon & Branch',
    address: '888 Whiskey Row',
    neighborhood: 'Historic District',
    priceLevel: 3,
    rating: 4.8,
    reviewCount: 456,
    tags: ['Whiskey Bar', 'Speakeasy', 'Craft Cocktails'],
    image: 'https://images.unsplash.com/photo-1509669803555-fd5dbb783b5f?w=800&q=80',
    distance: 1.5,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    deals: [
      {
        id: 'd9',
        title: 'Bourbon Hour',
        description: '$8 select bourbons and classic cocktails',
        type: 'cocktails',
        price: '$8',
        daysActive: ['thursday', 'friday'],
        timeRange: { start: '17:00', end: '19:00' }
      }
    ]
  }
];
