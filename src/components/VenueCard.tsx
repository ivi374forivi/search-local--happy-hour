import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Star, Clock } from '@phosphor-icons/react';
import { Venue } from '@/lib/types';
import { isDealActiveNow, formatTimeRange, getRelativeTime } from '@/lib/time-utils';
import { motion } from 'framer-motion';

interface VenueCardProps {
  venue: Venue;
  isFavorite: boolean;
  onToggleFavorite: (venueId: string) => void;
  onClick: () => void;
}

export function VenueCard({ venue, isFavorite, onToggleFavorite, onClick }: VenueCardProps) {
  const hasActiveDeals = venue.deals.some(deal => isDealActiveNow(deal));
  const priceSymbol = '$'.repeat(venue.priceLevel);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={onClick}
      >
        <div className="relative">
          <img 
            src={venue.image} 
            alt={venue.name}
            className="w-full h-48 object-cover"
          />
          {hasActiveDeals && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-accent text-accent-foreground font-semibold animate-pulse-subtle">
                <Clock className="w-3 h-3 mr-1" weight="fill" />
                Active Now
              </Badge>
            </div>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(venue.id);
            }}
          >
            <Heart 
              weight={isFavorite ? 'fill' : 'regular'} 
              className={isFavorite ? 'text-secondary' : 'text-foreground'}
            />
          </Button>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg leading-tight mb-1">{venue.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" weight="fill" />
                <span>{venue.neighborhood}</span>
                {venue.distance && (
                  <span>• {venue.distance} mi</span>
                )}
                <span>• {priceSymbol}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-3">
            <Star weight="fill" className="w-4 h-4 text-accent" />
            <span className="font-medium text-sm">{venue.rating}</span>
            <span className="text-sm text-muted-foreground">({venue.reviewCount})</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {venue.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            {venue.deals.slice(0, 2).map(deal => {
              const isActive = isDealActiveNow(deal);
              return (
                <div 
                  key={deal.id} 
                  className={`text-sm p-2 rounded-lg border ${isActive ? 'bg-accent/10 border-accent' : 'bg-muted/50 border-transparent'}`}
                >
                  <div className="font-medium">{deal.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatTimeRange(deal.timeRange)}
                  </div>
                </div>
              );
            })}
            {venue.deals.length > 2 && (
              <div className="text-xs text-muted-foreground text-center">
                +{venue.deals.length - 2} more deals
              </div>
            )}
          </div>

          <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
            {getRelativeTime(venue.lastUpdated)}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
