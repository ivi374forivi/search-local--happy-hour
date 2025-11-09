import { useState, useMemo } from 'react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/sonner';
import { VenueCard } from '@/components/VenueCard';
import { VenueDetail } from '@/components/VenueDetail';
import { FilterPanel } from '@/components/FilterPanel';
import { MagnifyingGlass, FunnelSimple, Heart, MapPin } from '@phosphor-icons/react';
import { Venue, FilterState } from '@/lib/types';
import { MOCK_VENUES } from '@/lib/mock-data';
import { isDealActiveNow } from '@/lib/time-utils';
import { motion } from 'framer-motion';

function App() {
  const [favorites, setFavorites] = useKV<string[]>('favorites', []);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dealTypes: [],
    priceLevel: [],
    activeNow: false,
    searchQuery: ''
  });

  const filteredVenues = useMemo(() => {
    let results = [...MOCK_VENUES];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(venue => 
        venue.name.toLowerCase().includes(query) ||
        venue.neighborhood.toLowerCase().includes(query) ||
        venue.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (filters.activeNow) {
      results = results.filter(venue => 
        venue.deals.some(deal => isDealActiveNow(deal))
      );
    }

    if (filters.dealTypes.length > 0) {
      results = results.filter(venue =>
        venue.deals.some(deal => 
          filters.dealTypes.includes(deal.type) || deal.type === 'all'
        )
      );
    }

    if (filters.priceLevel.length > 0) {
      results = results.filter(venue =>
        filters.priceLevel.includes(venue.priceLevel)
      );
    }

    return results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }, [filters]);

  const toggleFavorite = (venueId: string) => {
    setFavorites((currentFavorites) => {
      const favs = currentFavorites || [];
      if (favs.includes(venueId)) {
        return favs.filter(id => id !== venueId);
      }
      return [...favs, venueId];
    });
  };

  const activeFilterCount = 
    filters.dealTypes.length + 
    filters.priceLevel.length + 
    (filters.activeNow ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">HappyHourAI</h1>
              <p className="text-sm text-muted-foreground">Less scrolling. More sipping.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="relative"
              >
                <FunnelSimple weight={showFilters ? 'fill' : 'regular'} />
                {activeFilterCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          <div className="relative">
            <MagnifyingGlass 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
              weight="bold"
            />
            <Input
              placeholder="Search by venue, neighborhood, or vibe..."
              className="pl-10"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
            <MapPin weight="fill" className="w-4 h-4" />
            <span>Downtown • Showing {filteredVenues.length} venues</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {showFilters && (
            <motion.aside 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-80 flex-shrink-0"
            >
              <FilterPanel filters={filters} onFiltersChange={setFilters} />
            </motion.aside>
          )}

          <div className="flex-1">
            {filteredVenues.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍹</div>
                <h2 className="text-2xl font-semibold mb-2">No deals found</h2>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button 
                  onClick={() => setFilters({
                    dealTypes: [],
                    priceLevel: [],
                    activeNow: false,
                    searchQuery: ''
                  })}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVenues.map((venue) => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    isFavorite={(favorites || []).includes(venue.id)}
                    onToggleFavorite={toggleFavorite}
                    onClick={() => setSelectedVenue(venue)}
                  />
                ))}
              </div>
            )}

            {(favorites || []).length > 0 && filteredVenues.length > 0 && (
              <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Heart weight="fill" className="text-secondary" />
                  <h2 className="text-lg font-semibold">
                    {(favorites || []).length} Favorite{(favorites || []).length !== 1 ? 's' : ''}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your saved venues are always easy to find. Come back anytime!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <VenueDetail
        venue={selectedVenue}
        open={!!selectedVenue}
        onOpenChange={(open) => !open && setSelectedVenue(null)}
      />
    </div>
  );
}

export default App;