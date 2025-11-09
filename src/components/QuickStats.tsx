import { motion } from 'framer-motion';
import { Clock, Fire, TrendUp, Sparkle } from '@phosphor-icons/react';
import { Venue } from '@/lib/types';
import { isDealActiveNow } from '@/lib/time-utils';

interface QuickStatsProps {
  venues: Venue[];
}

export function QuickStats({ venues }: QuickStatsProps) {
  const activeDealsCount = venues.filter(v => 
    v.deals.some(deal => isDealActiveNow(deal))
  ).length;

  const totalDeals = venues.reduce((acc, v) => acc + v.deals.length, 0);

  const topRatedCount = venues.filter(v => v.rating >= 4.5).length;

  const stats = [
    {
      icon: Fire,
      label: 'Active Now',
      value: activeDealsCount,
      color: 'text-accent',
      bgColor: 'from-accent/20 to-accent/5',
    },
    {
      icon: Clock,
      label: 'Total Deals',
      value: totalDeals,
      color: 'text-primary',
      bgColor: 'from-primary/20 to-primary/5',
    },
    {
      icon: TrendUp,
      label: 'Top Rated',
      value: topRatedCount,
      color: 'text-secondary',
      bgColor: 'from-secondary/20 to-secondary/5',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.1, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className={`glass-card p-6 rounded-2xl bg-gradient-to-br ${stat.bgColor} stacked-element relative overflow-hidden group cursor-pointer`}
        >
          <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkle size={80} weight="fill" className={stat.color} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <stat.icon size={28} weight="fill" className={stat.color} />
              </motion.div>
              <motion.div
                className={`text-4xl font-bold ${stat.color}`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {stat.value}
              </motion.div>
            </div>
            <div className="text-sm font-semibold text-muted-foreground">
              {stat.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
