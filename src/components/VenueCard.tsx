import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Star, Clock, Sparkle } from '@phosphor-icons/react';
import { Venue } from '@/lib/types';
import { isDealActiveNow, formatTimeRange, getRelativeTime } from '@/lib/time-utils';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

interface VenueCardProps {
  venue: Venue;
  isFavorite: boolean;
  onToggleFavorite: (venueId: string) => void;
  onClick: () => void;
}

export function VenueCard({ venue, isFavorite, onToggleFavorite, onClick }: VenueCardProps) {
  const hasActiveDeals = venue.deals.some(deal => isDealActiveNow(deal));
  const priceSymbol = '$'.repeat(venue.priceLevel);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      className="group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, z: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="glass-card overflow-hidden cursor-pointer rounded-3xl stacked-element relative"
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        animate={isHovered ? {
          boxShadow: [
            '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
            '0 20px 60px 0 rgba(31, 38, 135, 0.25)',
            '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative overflow-hidden">
          <motion.div
            className="shimmer absolute inset-0 z-10 pointer-events-none"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          />
          <motion.img 
            src={venue.image} 
            alt={venue.name}
            className="w-full h-56 object-cover"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {hasActiveDeals && (
            <motion.div 
              className="absolute top-4 left-4 z-20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Badge className="bg-accent text-accent-foreground font-bold pulse-glow shadow-lg backdrop-blur-sm">
                <Clock className="w-4 h-4 mr-1" weight="fill" />
                Active Now
              </Badge>
            </motion.div>
          )}
          
          <motion.div
            className="absolute top-4 right-4 z-20"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              size="icon"
              variant="ghost"
              className="glass-morphic hover:bg-white/30 transition-all duration-300 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(venue.id);
              }}
            >
              <motion.div
                animate={isFavorite ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart 
                  weight={isFavorite ? 'fill' : 'regular'} 
                  className={isFavorite ? 'text-secondary' : 'text-white'}
                  size={20}
                />
              </motion.div>
            </Button>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <motion.h3 
              className="font-bold text-2xl leading-tight text-white drop-shadow-lg"
              animate={isHovered ? { y: -5 } : { y: 0 }}
            >
              {venue.name}
            </motion.h3>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" weight="fill" />
              <span className="font-medium">{venue.neighborhood}</span>
              {venue.distance && (
                <>
                  <span>•</span>
                  <span className="font-semibold text-accent">{venue.distance} mi</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-secondary">{priceSymbol}</span>
            </div>
          </div>

          <motion.div 
            className="flex items-center gap-2 glass-morphic px-4 py-2 rounded-full w-fit"
            whileHover={{ scale: 1.05 }}
          >
            <Star weight="fill" className="w-5 h-5 text-accent" />
            <span className="font-bold text-base">{venue.rating}</span>
            <span className="text-sm text-muted-foreground">({venue.reviewCount})</span>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {venue.tags.slice(0, 3).map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge variant="secondary" className="text-xs font-semibold px-3 py-1 bg-gradient-to-r from-muted to-muted/50">
                  <Sparkle className="w-3 h-3 mr-1" weight="fill" />
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          <div className="space-y-3">
            {venue.deals.slice(0, 2).map((deal, index) => {
              const isActive = isDealActiveNow(deal);
              return (
                <motion.div 
                  key={deal.id}
                  className={`text-sm p-4 rounded-2xl border-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-accent/20 to-accent/10 border-accent/50 shadow-lg' 
                      : 'glass-morphic border-border/30'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <div className="font-bold text-base mb-1">{deal.title}</div>
                  <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" weight="fill" />
                    {formatTimeRange(deal.timeRange)}
                  </div>
                </motion.div>
              );
            })}
            {venue.deals.length > 2 && (
              <motion.div 
                className="text-xs text-muted-foreground text-center font-semibold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                +{venue.deals.length - 2} more deals
              </motion.div>
            )}
          </div>

          <motion.div 
            className="pt-4 border-t border-border/30 text-xs text-muted-foreground font-medium flex items-center justify-between"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>{getRelativeTime(venue.lastUpdated)}</span>
            <Sparkle className="w-4 h-4 text-accent" weight="fill" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
