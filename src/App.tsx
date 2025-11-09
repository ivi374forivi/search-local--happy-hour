import { useState, useMemo, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/sonner';
import { VenueCard } from '@/components/VenueCard';
import { VenueDetail } from '@/components/VenueDetail';
import { FilterPanel } from '@/components/FilterPanel';
import { FloatingDecor } from '@/components/FloatingDecor';
import { QuickStats } from '@/components/QuickStats';
import { MagnifyingGlass, FunnelSimple, Heart, MapPin, Sparkle } from '@phosphor-icons/react';
import { Venue, FilterState } from '@/lib/types';
import { MOCK_VENUES } from '@/lib/mock-data';
import { isDealActiveNow } from '@/lib/time-utils';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [favorites, setFavorites] = useKV<string[]>('favorites', []);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    dealTypes: [],
    priceLevel: [],
    activeNow: false,
    searchQuery: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const headerOpacity = Math.min(scrollY / 100, 1);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="parallax-bg" />
      <FloatingDecor />
      
      <Toaster />
      
      <motion.header 
        className="sticky top-0 z-50 glass-morphic-strong border-b border-border/50 backdrop-blur-xl"
        style={{
          boxShadow: `0 8px 32px 0 rgba(31, 38, 135, ${0.1 * headerOpacity})`
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 py-5">
          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-accent/30 via-secondary/20 to-primary/30 rounded-2xl blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent flex items-center gap-2">
                  <Sparkle weight="fill" className="text-accent" />
                  HappyHourAI
                </h1>
                <p className="text-sm text-muted-foreground font-medium">Less scrolling. More sipping.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className="relative glass-morphic border-border/50 hover:border-accent/50 transition-all duration-300"
                >
                  <motion.div
                    animate={{ rotate: showFilters ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FunnelSimple weight={showFilters ? 'fill' : 'regular'} />
                  </motion.div>
                  <AnimatePresence>
                    {activeFilterCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2"
                      >
                        <Badge className="h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs pulse-glow">
                          {activeFilterCount}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <MagnifyingGlass 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" 
              weight="bold"
              size={20}
            />
            <Input
              placeholder="Search by venue, neighborhood, or vibe..."
              className="pl-12 h-12 glass-morphic border-border/50 focus:border-accent/50 transition-all duration-300 relative"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            />
          </motion.div>

          <motion.div 
            className="flex items-center gap-2 mt-4 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <MapPin weight="fill" className="w-5 h-5 text-primary" />
            <span className="text-foreground">Downtown</span>
            <span className="text-muted-foreground">•</span>
            <motion.span 
              className="text-accent font-semibold"
              key={filteredVenues.length}
              initial={{ scale: 1.2, color: 'oklch(0.72 0.15 35)' }}
              animate={{ scale: 1, color: 'oklch(0.75 0.16 85)' }}
            >
              {filteredVenues.length} venues
            </motion.span>
          </motion.div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <AnimatePresence>
            {showFilters && (
              <motion.aside 
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="lg:w-80 flex-shrink-0"
              >
                <div className="sticky top-24">
                  <FilterPanel filters={filters} onFiltersChange={setFilters} />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <motion.div 
            className="flex-1"
            layout
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <QuickStats venues={filteredVenues} />
            
            <AnimatePresence mode="wait">
              {filteredVenues.length === 0 ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-20"
                >
                  <motion.div 
                    className="glass-card p-12 rounded-3xl inline-block stacked-element"
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div 
                      className="text-8xl mb-6"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🍹
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      No deals found
                    </h2>
                    <p className="text-muted-foreground mb-6 text-lg">
                      Try adjusting your filters or search terms
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="lg"
                        onClick={() => setFilters({
                          dealTypes: [],
                          priceLevel: [],
                          activeNow: false,
                          searchQuery: ''
                        })}
                        className="bg-gradient-to-r from-accent to-secondary text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Clear All Filters
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  key="grid"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredVenues.map((venue, index) => (
                    <motion.div
                      key={venue.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 100,
                        damping: 15
                      }}
                    >
                      <VenueCard
                        venue={venue}
                        isFavorite={(favorites || []).includes(venue.id)}
                        onToggleFavorite={toggleFavorite}
                        onClick={() => setSelectedVenue(venue)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(favorites || []).length > 0 && filteredVenues.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 glass-card p-8 rounded-3xl stacked-element floating-element"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Heart weight="fill" className="text-secondary w-6 h-6" />
                    </motion.div>
                    <h2 className="text-2xl font-bold">
                      {(favorites || []).length} Favorite{(favorites || []).length !== 1 ? 's' : ''}
                    </h2>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Your saved venues are always easy to find. Come back anytime!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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