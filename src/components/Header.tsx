import React from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, Zap, ShoppingCart, Gavel, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b-2 border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="cursor-pointer"
          >
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              ⚡ BIDガチャ
            </h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Penny Auction</p>
          </motion.div>

          {/* Navigation */}
          {user && (
            <nav className="hidden md:flex items-center gap-2">
              <NavButton
                icon={<Gavel className="w-4 h-4" />}
                label={t('nav.home')}
                onClick={() => navigate('/')}
                active={isActive('/')}
              />
              <NavButton
                icon={<Zap className="w-4 h-4" />}
                label={t('nav.myBids')}
                onClick={() => navigate('/my-bids')}
                active={isActive('/my-bids')}
              />
              <NavButton
                icon={<ShoppingCart className="w-4 h-4" />}
                label={t('nav.buyCredits')}
                onClick={() => navigate('/buy-credits')}
                active={isActive('/buy-credits')}
              />
              <NavButton
                icon={<Settings className="w-4 h-4" />}
                label={t('nav.settings')}
                onClick={() => navigate('/settings')}
                active={isActive('/settings')}
              />
              {user.isAdmin && (
                <NavButton
                  icon={<Shield className="w-4 h-4" />}
                  label={t('nav.admin')}
                  onClick={() => navigate('/admin')}
                  active={isActive('/admin')}
                />
              )}
            </nav>
          )}

          {/* User info & controls */}
          <div className="flex items-center gap-4">
            {/* Language selector */}
            <div className="flex gap-1 bg-purple-900/40 rounded-lg p-1 border border-purple-500/30">
              {(['en', 'pt', 'ja'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded text-xs font-bold uppercase transition-all ${
                    language === lang
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {user ? (
              <>
                {/* Credits display */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-pink-500/20 px-4 py-2 rounded-full border-2 border-yellow-400/50 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="font-black text-white">{user.credits}</span>
                  <span className="text-xs text-gray-300">credits</span>
                </div>

                {/* User menu */}
                <div className="flex items-center gap-2 bg-purple-900/40 px-4 py-2 rounded-full border border-purple-500/30">
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-white">{user.username}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={logout}
                  className="bg-red-500/20 p-2 rounded-full border border-red-500/30 hover:bg-red-500/30 transition-all"
                >
                  <LogOut className="w-5 h-5 text-red-400" />
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-full font-bold text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]"
              >
                {t('nav.login')}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, onClick, active }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
      active
        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
        : 'bg-purple-900/20 text-gray-300 hover:text-white hover:bg-purple-900/40 border border-purple-500/20'
    }`}
  >
    {icon}
    <span>{label}</span>
  </motion.button>
);
