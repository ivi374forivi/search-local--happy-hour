import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Star, 
  Clock, 
  ShareNetwork, 
  NavigationArrow,
  BeerBottle,
  Wine,
  Martini,
  ForkKnife
} from '@phosphor-icons/react';
import { Venue, DealType } from '@/lib/types';
import { isDealActiveNow, formatTimeRange, getRelativeTime } from '@/lib/time-utils';
import { toast } from 'sonner';

interface VenueDetailProps {
  venue: Venue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const dealIcons: Record<DealType, React.ReactNode> = {
  beer: <BeerBottle className="w-4 h-4" weight="fill" />,
  wine: <Wine className="w-4 h-4" weight="fill" />,
  cocktails: <Martini className="w-4 h-4" weight="fill" />,
  food: <ForkKnife className="w-4 h-4" weight="fill" />,
  all: <BeerBottle className="w-4 h-4" weight="fill" />
};

export function VenueDetail({ venue, open, onOpenChange }: VenueDetailProps) {
  if (!venue) return null;

  const priceSymbol = '$'.repeat(venue.priceLevel);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleGetDirections = () => {
    const address = encodeURIComponent(venue.address);
    window.open(`https://maps.google.com/?q=${address}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{venue.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <img 
              src={venue.image} 
              alt={venue.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star weight="fill" className="w-5 h-5 text-accent" />
                <span className="font-semibold">{venue.rating}</span>
                <span className="text-muted-foreground">({venue.reviewCount} reviews)</span>
              </div>
              <span className="text-muted-foreground">{priceSymbol}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <ShareNetwork className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm" onClick={handleGetDirections}>
                <NavigationArrow className="w-4 h-4 mr-2" />
                Directions
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" weight="fill" />
              <div>
                <div className="font-medium">{venue.address}</div>
                <div className="text-muted-foreground">{venue.neighborhood}</div>
                {venue.distance && (
                  <div className="text-muted-foreground">{venue.distance} miles away</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {venue.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" weight="fill" />
              Happy Hour Deals
            </h3>
            <div className="space-y-4">
              {venue.deals.map(deal => {
                const isActive = isDealActiveNow(deal);
                return (
                  <div 
                    key={deal.id}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      isActive 
                        ? 'bg-accent/10 border-accent' 
                        : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {dealIcons[deal.type]}
                        <h4 className="font-semibold">{deal.title}</h4>
                      </div>
                      {isActive && (
                        <Badge className="bg-accent text-accent-foreground">
                          Active Now
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {deal.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      {deal.price && (
                        <span className="font-semibold text-primary">
                          {deal.price}
                        </span>
                      )}
                      <span className="text-muted-foreground">
                        {formatTimeRange(deal.timeRange)}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {deal.daysActive.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center pt-2">
            {getRelativeTime(venue.lastUpdated)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
