import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const { t } = useLanguage();
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(username, email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-64 md:w-96 h-64 md:h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-64 md:w-96 h-64 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl md:rounded-2xl p-6 md:p-8 border-2 border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.3)] backdrop-blur-sm">
          {/* Logo */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-2">
              ⚡ BIDガチャ
            </h1>
            <p className="text-gray-400 uppercase tracking-widest text-xs md:text-sm">Penny Auction</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 md:mb-8 bg-black/40 p-1 rounded-lg">
            <button
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-2.5 md:py-3 rounded-lg font-bold transition-all text-sm md:text-base ${
                !isRegister
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{t('auth.login')}</span>
                <span className="sm:hidden">Login</span>
              </div>
            </button>
            <button
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-2.5 md:py-3 rounded-lg font-bold transition-all text-sm md:text-base ${
                isRegister
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{t('auth.register')}</span>
                <span className="sm:hidden">Register</span>
              </div>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {isRegister && (
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-300 mb-2">
                  {t('auth.username')}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                  required={isRegister}
                />
              </div>
            )}

            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-300 mb-2">
                {t('auth.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-300 mb-2">
                {t('auth.password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-black text-base md:text-lg py-3 md:py-4 rounded-lg md:rounded-xl shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] transition-all uppercase"
            >
              {isRegister ? t('auth.createAccount') : t('auth.login')}
            </motion.button>
          </form>

          {/* Demo hint */}
          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs md:text-sm text-gray-300 text-center">
              <span className="font-bold text-blue-400">Demo:</span> Use admin@admin.com / admin for admin access
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};