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
  ForkKnife,
  Sparkle
} from '@phosphor-icons/react';
import { Venue, DealType } from '@/lib/types';
import { isDealActiveNow, formatTimeRange, getRelativeTime } from '@/lib/time-utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface VenueDetailProps {
  venue: Venue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const dealIcons: Record<DealType, React.ReactNode> = {
  beer: <BeerBottle className="w-5 h-5" weight="fill" />,
  wine: <Wine className="w-5 h-5" weight="fill" />,
  cocktails: <Martini className="w-5 h-5" weight="fill" />,
  food: <ForkKnife className="w-5 h-5" weight="fill" />,
  all: <Sparkle className="w-5 h-5" weight="fill" />
};

export function VenueDetail({ venue, open, onOpenChange }: VenueDetailProps) {
  if (!venue) return null;

  const priceSymbol = '$'.repeat(venue.priceLevel);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!', {
      duration: 3000,
    });
  };

  const handleGetDirections = () => {
    const address = encodeURIComponent(venue.address);
    window.open(`https://maps.google.com/?q=${address}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass-morphic-strong border-2 border-border/50 p-0">
        <AnimatePresence mode="wait">
          {open && venue && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <DialogHeader className="p-8 pb-0">
                <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {venue.name}
                </DialogTitle>
              </DialogHeader>

              <div className="p-8 space-y-8">
                <motion.div 
                  className="relative overflow-hidden rounded-3xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="shimmer absolute inset-0 z-10 pointer-events-none" />
                  <img 
                    src={venue.image} 
                    alt={venue.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>

                <motion.div 
                  className="flex items-center justify-between glass-morphic p-6 rounded-2xl"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Star weight="fill" className="w-7 h-7 text-accent" />
                      <span className="font-bold text-2xl">{venue.rating}</span>
                      <span className="text-muted-foreground text-base">({venue.reviewCount} reviews)</span>
                    </div>
                    <Separator orientation="vertical" className="h-8 bg-border/30" />
                    <span className="text-2xl font-bold text-secondary">{priceSymbol}</span>
                  </div>
                  <div className="flex gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm" onClick={handleShare} className="glass-morphic border-border/50">
                        <ShareNetwork className="w-5 h-5 mr-2" />
                        Share
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" onClick={handleGetDirections} className="bg-gradient-to-r from-primary to-accent shadow-lg">
                        <NavigationArrow className="w-5 h-5 mr-2" />
                        Directions
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="glass-morphic p-6 rounded-2xl"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" weight="fill" />
                    <div>
                      <div className="font-bold text-lg mb-1">{venue.address}</div>
                      <div className="text-muted-foreground text-base">{venue.neighborhood}</div>
                      {venue.distance && (
                        <div className="text-accent font-semibold mt-1">{venue.distance} miles away</div>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {venue.tags.map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4 + index * 0.05, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Badge variant="secondary" className="text-sm px-4 py-2 bg-gradient-to-r from-muted to-muted/50 font-semibold">
                        <Sparkle className="w-4 h-4 mr-1" weight="fill" />
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>

                <Separator className="bg-border/30" />

                <div>
                  <motion.h3 
                    className="font-bold text-3xl mb-6 flex items-center gap-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Clock className="w-7 h-7 text-accent" weight="fill" />
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Happy Hour Deals
                    </span>
                  </motion.h3>
                  <div className="space-y-4">
                    {venue.deals.map((deal, index) => {
                      const isActive = isDealActiveNow(deal);
                      return (
                        <motion.div 
                          key={deal.id}
                          className={`p-6 rounded-3xl border-2 transition-all duration-300 ${
                            isActive 
                              ? 'glass-card border-accent shadow-lg pulse-glow stacked-element' 
                              : 'glass-morphic border-border/50'
                          }`}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 100 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <motion.div
                                animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                {dealIcons[deal.type]}
                              </motion.div>
                              <h4 className="font-bold text-xl">{deal.title}</h4>
                            </div>
                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  exit={{ scale: 0, rotate: 180 }}
                                >
                                  <Badge className="bg-accent text-accent-foreground font-bold px-3 py-1 pulse-glow">
                                    <Sparkle className="w-3 h-3 mr-1" weight="fill" />
                                    Active Now
                                  </Badge>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <p className="text-base text-muted-foreground mb-3">
                            {deal.description}
                          </p>
                          <div className="flex items-center gap-6 text-base">
                            {deal.price && (
                              <span className="font-bold text-xl text-secondary">
                                {deal.price}
                              </span>
                            )}
                            <span className="text-muted-foreground flex items-center gap-2">
                              <Clock className="w-4 h-4" weight="fill" />
                              {formatTimeRange(deal.timeRange)}
                            </span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-border/30 text-sm text-muted-foreground font-medium">
                            {deal.daysActive.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ')}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <motion.div 
                  className="text-center pt-4 glass-morphic p-4 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
                    <Sparkle className="w-4 h-4 text-accent" weight="fill" />
                    {getRelativeTime(venue.lastUpdated)}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
