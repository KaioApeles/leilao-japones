import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Zap } from 'lucide-react';
import { AuctionItem } from '../types/auction';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface AuctionCardProps {
  item: AuctionItem;
  onBid: (itemId: string) => void;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ item, onBid }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(item.endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft('00:00:00');
        clearInterval(timer);
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [item.endTime]);

  const handleBid = () => {
    if (!user) {
      alert('Please login to bid');
      return;
    }
    if (user.credits < 1) {
      alert('Not enough credits!');
      return;
    }
    onBid(item.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl overflow-hidden border-2 border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.3)] backdrop-blur-sm"
    >
      {/* Neon glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 animate-pulse" />
      
      <div className="relative">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Time badge */}
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border-2 border-yellow-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="font-mono text-yellow-400">{timeLeft}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-black text-white tracking-tight">{item.name}</h3>
          <p className="text-gray-300 text-sm line-clamp-2">{item.description}</p>

          {/* Price info */}
          <div className="flex items-center justify-between bg-black/40 rounded-xl p-4 border border-pink-500/30">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider">{t('home.currentPrice')}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                  {item.currentPrice}
                </span>
                <span className="text-xl text-yellow-400">¥</span>
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>

          {/* Last bidder */}
          {item.lastBidder && (
            <div className="flex items-center gap-2 bg-purple-900/40 rounded-lg p-3 border border-purple-500/30">
              <Zap className="w-5 h-5 text-purple-400" />
              <div className="flex-1">
                <p className="text-xs text-gray-400">{t('home.lastBidder')}</p>
                <p className="text-white font-bold">{item.lastBidder}</p>
              </div>
            </div>
          )}

          {/* Bid button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBid}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-black text-xl py-4 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] transition-all uppercase tracking-wider relative overflow-hidden group"
          >
            <span className="relative z-10">{t('home.bid')}</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
