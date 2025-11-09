import { motion } from 'framer-motion';
import { Sparkle, Star, Heart, Wine, Martini, BeerBottle } from '@phosphor-icons/react';

interface FloatingDecorProps {
  className?: string;
}

const icons = [Sparkle, Star, Heart, Wine, Martini, BeerBottle];

export function FloatingDecor({ className = '' }: FloatingDecorProps) {
  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {Array.from({ length: 12 }).map((_, i) => {
        const Icon = icons[i % icons.length];
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 15 + Math.random() * 10;
        const size = 20 + Math.random() * 30;
        const opacity = 0.03 + Math.random() * 0.07;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${left}%`,
              top: '110%',
            }}
            animate={{
              y: [0, -window.innerHeight - 200],
              x: [0, (Math.random() - 0.5) * 100],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Icon
              size={size}
              weight="fill"
              style={{
                opacity,
                color: `oklch(${0.5 + Math.random() * 0.3} 0.${Math.floor(Math.random() * 2)}${Math.floor(Math.random() * 2)} ${Math.random() * 360})`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
