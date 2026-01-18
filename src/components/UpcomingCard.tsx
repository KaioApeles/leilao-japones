import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { AuctionItem } from '../types/auction';
import { useLanguage } from '../contexts/LanguageContext';

interface UpcomingCardProps {
  item: AuctionItem;
}

export const UpcomingCard: React.FC<UpcomingCardProps> = ({ item }) => {
  const { t } = useLanguage();
  const [startsIn, setStartsIn] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const start = new Date(item.endTime).getTime() - (24 * 60 * 60 * 1000); // 24 hours before end
      const distance = start - now;

      if (distance < 0) {
        setStartsIn('Starting soon...');
        clearInterval(timer);
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setStartsIn(`${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [item.endTime]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-lg md:rounded-xl overflow-hidden border border-blue-500/30 shadow-lg backdrop-blur-sm min-w-[240px] sm:min-w-[280px] flex-shrink-0"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
      
      <div className="relative p-3 md:p-4 space-y-2 md:space-y-3">
        {/* Image */}
        <div className="relative h-32 md:h-40 rounded-lg overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-yellow-400 animate-pulse" />
          </div>
          
          {/* Coming soon badge */}
          <div className="absolute top-2 right-2 bg-blue-500 px-2 md:px-3 py-1 rounded-full">
            <span className="text-[10px] md:text-xs font-bold text-white uppercase">Coming Soon</span>
          </div>
        </div>

        <h4 className="font-bold text-white text-base md:text-lg line-clamp-2">{item.name}</h4>
        
        <div className="flex items-center gap-2 bg-black/40 rounded-lg p-2">
          <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] md:text-xs text-gray-400">{t('home.startsIn')}</p>
            <p className="text-white font-mono text-xs md:text-sm truncate">{startsIn}</p>
          </div>
        </div>

        <div className="text-center pt-2 border-t border-blue-500/20">
          <p className="text-xs md:text-sm text-gray-400">Starting at</p>
          <p className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-400">
            1 ¥
          </p>
        </div>
      </div>
    </motion.div>
  );
};