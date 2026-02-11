import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Zap, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface RankingPlayer {
  position: number;
  username: string;
  auctionsWon: number;
  totalBids: number;
  avatar?: string;
}

// Mock data for rankings
const mockRankings: RankingPlayer[] = [
  { position: 1, username: 'SakuraGamer99', auctionsWon: 47, totalBids: 892 },
  { position: 2, username: 'TokyoDrift', auctionsWon: 39, totalBids: 756 },
  { position: 3, username: 'NeonNinja', auctionsWon: 34, totalBids: 641 },
  { position: 4, username: 'PhotoNinja', auctionsWon: 28, totalBids: 523 },
  { position: 5, username: 'MusicLover', auctionsWon: 25, totalBids: 487 },
  { position: 6, username: 'GachaKing', auctionsWon: 22, totalBids: 412 },
  { position: 7, username: 'BidMaster', auctionsWon: 19, totalBids: 378 },
  { position: 8, username: 'LuckyPlayer', auctionsWon: 16, totalBids: 341 },
  { position: 9, username: 'TokyoPlayer', auctionsWon: 14, totalBids: 298 },
  { position: 10, username: 'AuctionPro', auctionsWon: 12, totalBids: 267 },
];

export const Rankings: React.FC = () => {
  const { t } = useLanguage();

  const getMedalColor = (position: number) => {
    if (position === 1) return 'from-yellow-400 to-yellow-600';
    if (position === 2) return 'from-gray-300 to-gray-500';
    if (position === 3) return 'from-amber-600 to-amber-800';
    return 'from-purple-500 to-pink-500';
  };

  const getMedalGlow = (position: number) => {
    if (position === 1) return 'shadow-[0_0_30px_rgba(250,204,21,0.6)]';
    if (position === 2) return 'shadow-[0_0_30px_rgba(209,213,219,0.5)]';
    if (position === 3) return 'shadow-[0_0_30px_rgba(217,119,6,0.5)]';
    return 'shadow-[0_0_20px_rgba(236,72,153,0.4)]';
  };

  const getPositionIcon = (position: number) => {
    if (position <= 3) {
      return <Trophy className="w-6 h-6 md:w-8 md:h-8" />;
    }
    return <Medal className="w-5 h-5 md:w-6 md:h-6" />;
  };

  const renderTopThree = () => {
    const top3 = mockRankings.slice(0, 3);
    const order = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd for podium effect

    return (
      <div className="flex justify-center items-end gap-2 md:gap-4 mb-8 md:mb-12">
        {order.map((player, idx) => {
          const actualPosition = player.position;
          const heightClass = actualPosition === 1 ? 'h-48 md:h-64' : actualPosition === 2 ? 'h-40 md:h-56' : 'h-32 md:h-48';
          
          return (
            <motion.div
              key={player.username}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className={`flex-1 max-w-[150px] md:max-w-xs ${heightClass} relative`}
            >
              <div className={`h-full bg-gradient-to-b ${getMedalColor(actualPosition)} rounded-t-2xl border-2 border-white/20 ${getMedalGlow(actualPosition)} flex flex-col items-center justify-start pt-4 md:pt-6 px-2 md:px-4`}>
                {/* Medal Icon */}
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="mb-2 md:mb-4"
                >
                  {getPositionIcon(actualPosition)}
                </motion.div>

                {/* Position Number */}
                <div className="text-3xl md:text-5xl font-black mb-1 md:mb-2 text-white drop-shadow-lg">
                  #{actualPosition}
                </div>

                {/* Username */}
                <div className="text-xs md:text-sm font-bold text-white/90 text-center mb-2 md:mb-3 line-clamp-1 px-1">
                  {player.username}
                </div>

                {/* Stats */}
                <div className="bg-black/30 rounded-lg px-2 md:px-3 py-1.5 md:py-2 backdrop-blur-sm mb-2">
                  <div className="text-xl md:text-3xl font-black text-white">
                    {player.auctionsWon}
                  </div>
                  <div className="text-[10px] md:text-xs text-white/80">
                    {t('rankings.auctionsWon')}
                  </div>
                </div>

                <div className="text-[10px] md:text-xs text-white/70 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {player.totalBids} {t('rankings.totalBids')}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderRemainingRankings = () => {
    const remaining = mockRankings.slice(3);

    return (
      <div className="space-y-3 md:space-y-4">
        {remaining.map((player, idx) => (
          <motion.div
            key={player.username}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
            className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl border-2 border-purple-500/30 p-4 md:p-6 hover:border-pink-500/50 transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
          >
            <div className="flex items-center gap-3 md:gap-4">
              {/* Position */}
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg">
                <span className="text-xl md:text-2xl font-black text-white">
                  {player.position}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <Medal className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                  <h3 className="text-base md:text-xl font-black text-white truncate">
                    {player.username}
                  </h3>
                </div>
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
                  <div className="flex items-center gap-1 text-green-400">
                    <Trophy className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-bold">{player.auctionsWon}</span>
                    <span className="text-gray-400 hidden sm:inline">{t('rankings.auctionsWon')}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Zap className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-bold">{player.totalBids}</span>
                    <span className="text-gray-400 hidden sm:inline">{t('rankings.totalBids')}</span>
                  </div>
                </div>
              </div>

              {/* Trend Icon */}
              <div className="flex-shrink-0 hidden md:block">
                <TrendingUp className="w-6 h-6 text-pink-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white py-6 md:py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
            <Trophy className="w-8 h-8 md:w-12 md:h-12 text-yellow-400" />
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
              {t('rankings.title')}
            </h1>
            <Trophy className="w-8 h-8 md:w-12 md:h-12 text-yellow-400" />
          </div>
          <p className="text-base md:text-xl text-gray-400 uppercase tracking-wider">
            {t('rankings.subtitle')}
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        {renderTopThree()}

        {/* Remaining Rankings */}
        {renderRemainingRankings()}

        {/* Decorative elements */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="fixed top-20 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl pointer-events-none hidden lg:block"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="fixed bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none hidden lg:block"
        />
      </div>
    </div>
  );
};
