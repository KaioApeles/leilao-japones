import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, XCircle, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface BidItem {
  id: string;
  name: string;
  imageUrl: string;
  currentPrice: number;
  myBids: number;
  status: 'winning' | 'active' | 'won' | 'lost';
  timeLeft?: string;
}

export const MyBids: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  // Mock data
  const activeBids: BidItem[] = [
    {
      id: '1',
      name: 'PlayStation 5 Console',
      imageUrl: 'https://images.unsplash.com/photo-1709587797077-7a2c94411514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5c3RhdGlvbiUyMGNvbnNvbGUlMjBnYW1pbmd8ZW58MXx8fHwxNzY4NjE4MDIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      currentPrice: 147,
      myBids: 23,
      status: 'winning',
      timeLeft: '08:32:15',
    },
    {
      id: '3',
      name: 'Premium Wireless Headphones',
      imageUrl: 'https://images.unsplash.com/photo-1572119244337-bcb4aae995af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW98ZW58MXx8fHwxNzY4NTY3OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      currentPrice: 56,
      myBids: 8,
      status: 'active',
      timeLeft: '18:12:42',
    },
  ];

  const endedBids: BidItem[] = [
    {
      id: '7',
      name: 'Smart Watch Pro',
      imageUrl: 'https://images.unsplash.com/photo-1668760180303-fcfe2b899e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwdGVjaHxlbnwxfHx8fDE3Njg1NDMzMTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      currentPrice: 89,
      myBids: 15,
      status: 'won',
    },
    {
      id: '8',
      name: 'Gaming Mouse',
      imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
      currentPrice: 34,
      myBids: 5,
      status: 'lost',
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
        <p className="text-white text-xl">Please login to view your bids</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            {t('myBids.title')}
          </h1>
          <p className="text-gray-400">Track all your auction activity</p>
        </motion.div>

        {/* Active Bids */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <Clock className="w-8 h-8 text-pink-500" />
            {t('myBids.active')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))}
          </div>
        </section>

        {/* Ended Bids */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            {t('myBids.ended')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endedBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const BidCard: React.FC<{ bid: BidItem }> = ({ bid }) => {
  const { t } = useLanguage();

  const getStatusBadge = () => {
    switch (bid.status) {
      case 'winning':
        return (
          <div className="flex items-center gap-2 bg-green-500/20 border border-green-500 px-3 py-1 rounded-full">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-bold text-sm">{t('myBids.winning')}</span>
          </div>
        );
      case 'won':
        return (
          <div className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500 px-3 py-1 rounded-full">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm">{t('myBids.won')}</span>
          </div>
        );
      case 'lost':
        return (
          <div className="flex items-center gap-2 bg-red-500/20 border border-red-500 px-3 py-1 rounded-full">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-bold text-sm">{t('myBids.lost')}</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 bg-blue-500/20 border border-blue-500 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-bold text-sm">Active</span>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl overflow-hidden border border-pink-500/30 shadow-lg"
    >
      <div className="relative h-48">
        <img src={bid.imageUrl} alt={bid.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-3 right-3">{getStatusBadge()}</div>
        {bid.timeLeft && (
          <div className="absolute bottom-3 left-3 bg-black/80 px-3 py-1 rounded-full border border-yellow-400">
            <span className="font-mono text-yellow-400 text-sm">{bid.timeLeft}</span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <h3 className="font-bold text-white text-lg">{bid.name}</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/40 rounded-lg p-3 border border-purple-500/20">
            <p className="text-xs text-gray-400 uppercase">Current Price</p>
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
              {bid.currentPrice} ¥
            </p>
          </div>
          <div className="bg-black/40 rounded-lg p-3 border border-purple-500/20">
            <p className="text-xs text-gray-400 uppercase">My Bids</p>
            <p className="text-2xl font-black text-purple-400">{bid.myBids}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
