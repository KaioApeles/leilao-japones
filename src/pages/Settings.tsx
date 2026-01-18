import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Settings as SettingsIcon, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export const Settings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
        <p className="text-white text-xl">Please login to access settings</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            {t('settings.title')}
          </h1>
        </motion.div>

        {/* Account Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-pink-500/30 space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="w-8 h-8 text-pink-500" />
            <h2 className="text-3xl font-black text-white">{t('settings.account')}</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
              <label className="text-sm text-gray-400 uppercase tracking-wider">
                {t('auth.username')}
              </label>
              <p className="text-xl font-bold text-white mt-1">{user.username}</p>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
              <label className="text-sm text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t('auth.email')}
              </label>
              <p className="text-xl font-bold text-white mt-1">{user.email}</p>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
              <label className="text-sm text-gray-400 uppercase tracking-wider">Account Type</label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xl font-bold text-white">{user.isAdmin ? 'Administrator' : 'User'}</p>
                {user.isAdmin && (
                  <span className="bg-yellow-500/20 border border-yellow-500 px-2 py-1 rounded text-xs font-bold text-yellow-400">
                    ADMIN
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Language Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-pink-500/30 space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-black text-white">{t('settings.language')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { code: 'en' as const, name: 'English', flag: '🇺🇸' },
              { code: 'pt' as const, name: 'Português', flag: '🇧🇷' },
              { code: 'ja' as const, name: '日本語', flag: '🇯🇵' },
            ].map((lang) => (
              <motion.button
                key={lang.code}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLanguage(lang.code)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  language === lang.code
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.5)]'
                    : 'bg-black/40 border-purple-500/30 hover:border-purple-500/60'
                }`}
              >
                <div className="text-4xl mb-2">{lang.flag}</div>
                <div className="text-xl font-bold text-white">{lang.name}</div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Preferences */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-pink-500/30 space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-black text-white">Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-black/40 rounded-lg p-4 border border-purple-500/20">
              <div>
                <p className="font-bold text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive updates about your bids</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between bg-black/40 rounded-lg p-4 border border-purple-500/20">
              <div>
                <p className="font-bold text-white">Sound Effects</p>
                <p className="text-sm text-gray-400">Play sounds for bids and wins</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-500"></div>
              </label>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};
