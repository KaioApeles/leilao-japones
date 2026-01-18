import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { AuctionCard } from '../components/AuctionCard';
import { UpcomingCard } from '../components/UpcomingCard';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { mockActiveAuctions, mockUpcomingAuctions } from '../data/mockData';
import { AuctionItem } from '../types/auction';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const { user, updateCredits } = useAuth();
  const [activeAuctions, setActiveAuctions] = useState<AuctionItem[]>(mockActiveAuctions);
  const [upcomingAuctions] = useState<AuctionItem[]>(mockUpcomingAuctions);

  const handleBid = (itemId: string) => {
    if (!user) return;

    setActiveAuctions((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              currentPrice: item.currentPrice + 1,
              lastBidder: user.username,
              bids: item.bids + 1,
            }
          : item
      )
    );
    updateCredits(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative container mx-auto px-4 py-12 space-y-12">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 py-8"
        >
          <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            {t('home.liveAuctions')}
          </h2>
          <p className="text-gray-400 text-lg">Every bid starts at 1¥ • Each bid adds 1¥</p>
        </motion.div>

        {/* Live Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {activeAuctions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AuctionCard item={item} onBid={handleBid} />
            </motion.div>
          ))}
        </div>

        {/* Upcoming Auctions Section */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
              {t('home.upcomingAuctions')}
            </h2>
          </motion.div>

          {/* Upcoming carousel */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4">
              {upcomingAuctions.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <UpcomingCard item={item} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl p-8 border border-purple-500/30 text-center"
        >
          <h3 className="text-2xl font-black text-white mb-2">How it works</h3>
          <p className="text-gray-300">
            Each auction starts at 1¥. Every bid increases the price by 1¥ and costs you 1 credit. 
            The last bidder when the timer runs out wins the item at the final price!
          </p>
        </motion.div>
      </div>
    </div>
  );
};
