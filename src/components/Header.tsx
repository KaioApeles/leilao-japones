import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, Zap, ShoppingCart, Gavel, Shield, Menu, X, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b-2 border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="cursor-pointer flex-shrink-0"
          >
            <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              ⚡ BIDガチャ
            </h1>
            <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">Penny Auction</p>
          </motion.div>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden lg:flex items-center gap-2">
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
                icon={<Trophy className="w-4 h-4" />}
                label={t('nav.rankings')}
                onClick={() => navigate('/rankings')}
                active={isActive('/rankings')}
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
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language selector */}
            <div className="hidden sm:flex gap-1 bg-purple-900/40 rounded-lg p-1 border border-purple-500/30">
              {(['en', 'pt', 'ja'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 md:px-3 py-1 rounded text-xs font-bold uppercase transition-all ${
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
                <div className="bg-gradient-to-r from-yellow-500/20 to-pink-500/20 px-2 md:px-4 py-1.5 md:py-2 rounded-full border-2 border-yellow-400/50 flex items-center gap-1 md:gap-2">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                  <span className="font-black text-white text-sm md:text-base">{user.credits}</span>
                  <span className="text-[10px] md:text-xs text-gray-300 hidden sm:inline">credits</span>
                </div>

                {/* User menu - Desktop */}
                <div className="hidden md:flex items-center gap-2 bg-purple-900/40 px-4 py-2 rounded-full border border-purple-500/30">
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-white">{user.username}</span>
                </div>

                {/* Logout - Desktop */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={logout}
                  className="hidden md:block bg-red-500/20 p-2 rounded-full border border-red-500/30 hover:bg-red-500/30 transition-all"
                >
                  <LogOut className="w-5 h-5 text-red-400" />
                </motion.button>

                {/* Mobile menu button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden bg-purple-900/40 p-2 rounded-lg border border-purple-500/30"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 text-white" />
                  ) : (
                    <Menu className="w-6 h-6 text-white" />
                  )}
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 md:px-6 py-2 rounded-full font-bold text-white text-sm md:text-base shadow-[0_0_15px_rgba(236,72,153,0.5)]"
              >
                {t('nav.login')}
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {user && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 space-y-2 pb-4"
          >
            {/* Mobile Language Selector */}
            <div className="flex gap-2 justify-center sm:hidden mb-4">
              {(['en', 'pt', 'ja'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                    language === lang
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-purple-900/40 text-gray-400 border border-purple-500/30'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Mobile User Info */}
            <div className="flex items-center justify-center gap-2 bg-purple-900/40 px-4 py-3 rounded-lg border border-purple-500/30 md:hidden">
              <User className="w-5 h-5 text-purple-400" />
              <span className="font-bold text-white">{user.username}</span>
            </div>

            {/* Mobile Nav Items */}
            <MobileNavButton
              icon={<Gavel className="w-5 h-5" />}
              label={t('nav.home')}
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
              active={isActive('/')}
            />
            <MobileNavButton
              icon={<Zap className="w-5 h-5" />}
              label={t('nav.myBids')}
              onClick={() => {
                navigate('/my-bids');
                setMobileMenuOpen(false);
              }}
              active={isActive('/my-bids')}
            />
            <MobileNavButton
              icon={<ShoppingCart className="w-5 h-5" />}
              label={t('nav.buyCredits')}
              onClick={() => {
                navigate('/buy-credits');
                setMobileMenuOpen(false);
              }}
              active={isActive('/buy-credits')}
            />
            <MobileNavButton
              icon={<Trophy className="w-5 h-5" />}
              label={t('nav.rankings')}
              onClick={() => {
                navigate('/rankings');
                setMobileMenuOpen(false);
              }}
              active={isActive('/rankings')}
            />
            <MobileNavButton
              icon={<Settings className="w-5 h-5" />}
              label={t('nav.settings')}
              onClick={() => {
                navigate('/settings');
                setMobileMenuOpen(false);
              }}
              active={isActive('/settings')}
            />
            {user.isAdmin && (
              <MobileNavButton
                icon={<Shield className="w-5 h-5" />}
                label={t('nav.admin')}
                onClick={() => {
                  navigate('/admin');
                  setMobileMenuOpen(false);
                }}
                active={isActive('/admin')}
              />
            )}

            {/* Mobile Logout */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-red-500/20 px-4 py-3 rounded-lg border border-red-500/30 text-red-400 font-bold"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </motion.div>
        )}
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
    className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg font-bold transition-all text-sm ${
      active
        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
        : 'bg-purple-900/20 text-gray-300 hover:text-white hover:bg-purple-900/40 border border-purple-500/20'
    }`}
  >
    {icon}
    <span className="hidden xl:inline">{label}</span>
  </motion.button>
);

const MobileNavButton: React.FC<NavButtonProps> = ({ icon, label, onClick, active }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${
      active
        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]'
        : 'bg-purple-900/20 text-gray-300 border border-purple-500/20'
    }`}
  >
    {icon}
    <span>{label}</span>
  </motion.button>
);