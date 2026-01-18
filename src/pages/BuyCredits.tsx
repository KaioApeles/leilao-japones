import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShoppingCart, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface CreditPack {
  id: string;
  credits: number;
  price: number;
  popular?: boolean;
  bonus?: number;
}

export const BuyCredits: React.FC = () => {
  const { t } = useLanguage();
  const { user, updateCredits } = useAuth();

  const packs: CreditPack[] = [
    {
      id: '1',
      credits: 10,
      price: 500,
    },
    {
      id: '2',
      credits: 50,
      price: 2000,
      bonus: 5,
      popular: true,
    },
    {
      id: '3',
      credits: 100,
      price: 3500,
      bonus: 15,
    },
  ];

  const handlePurchase = (pack: CreditPack) => {
    const totalCredits = pack.credits + (pack.bonus || 0);
    updateCredits(totalCredits);
    alert(`Successfully purchased ${totalCredits} credits!`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
        <p className="text-white text-xl">Please login to buy credits</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative container mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500">
            {t('credits.title')}
          </h1>
          <p className="text-gray-400">Get more bids to win amazing items!</p>
        </motion.div>

        {/* Current Credits */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto bg-gradient-to-r from-yellow-500/20 to-pink-500/20 rounded-2xl p-8 border-2 border-yellow-400/50 text-center"
        >
          <p className="text-gray-300 mb-2">{t('credits.yourCredits')}</p>
          <div className="flex items-center justify-center gap-3">
            <Zap className="w-12 h-12 text-yellow-400" />
            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
              {user.credits}
            </span>
          </div>
          <p className="text-gray-400 mt-2">{t('credits.bids')}</p>
        </motion.div>

        {/* Credit Packs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packs.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border-2 ${
                pack.popular ? 'border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.4)]' : 'border-pink-500/30'
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-2 rounded-full">
                  <span className="text-black font-black text-sm uppercase flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Popular
                  </span>
                </div>
              )}

              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-pink-500/20 p-6 rounded-full border-2 border-yellow-400/50">
                    <Zap className="w-16 h-16 text-yellow-400" />
                  </div>
                </div>

                {/* Credits */}
                <div>
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                    {pack.credits}
                  </div>
                  <p className="text-gray-400 mt-2 uppercase tracking-wider text-sm">Credits</p>
                  {pack.bonus && (
                    <div className="mt-2 inline-block bg-green-500/20 border border-green-500 px-3 py-1 rounded-full">
                      <span className="text-green-400 font-bold text-sm">+{pack.bonus} Bonus!</span>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="bg-black/40 rounded-xl p-4 border border-purple-500/30">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-black text-white">{pack.price}</span>
                    <span className="text-2xl text-yellow-400">¥</span>
                  </div>
                </div>

                {/* Buy button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePurchase(pack)}
                  className={`w-full font-black text-lg py-4 rounded-xl transition-all uppercase flex items-center justify-center gap-2 ${
                    pack.popular
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-[0_0_30px_rgba(250,204,21,0.5)]'
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t('credits.buy')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center"
        >
          <p className="text-gray-300">
            <span className="font-bold text-blue-400">Note:</span> This is a demo. In production, 
            this would integrate with a real payment processor.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
