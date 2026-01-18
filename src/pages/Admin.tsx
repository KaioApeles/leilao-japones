import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Package, Pause, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { AuctionItem } from '../types/auction';

export const Admin: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    startTime: '',
  });

  // Mock data
  const [items, setItems] = useState<AuctionItem[]>([
    {
      id: '1',
      name: 'PlayStation 5 Console',
      description: 'Brand new PS5',
      imageUrl: 'https://images.unsplash.com/photo-1709587797077-7a2c94411514?w=400',
      currentPrice: 147,
      lastBidder: 'SakuraGamer99',
      endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
      status: 'active',
      bids: 147,
    },
  ]);

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
        <p className="text-white text-xl">Admin access required</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: AuctionItem = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      imageUrl: formData.imageUrl,
      currentPrice: 1,
      lastBidder: null,
      endTime: formData.startTime ? new Date(formData.startTime) : new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: formData.startTime ? 'upcoming' : 'active',
      bids: 0,
    };
    setItems([...items, newItem]);
    setFormData({ name: '', description: '', imageUrl: '', startTime: '' });
    alert('Item created successfully!');
  };

  const handleEndAuction = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: 'ended' as const } : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="container mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500">
            {t('admin.dashboard')}
          </h1>
          <p className="text-gray-400">Manage auction items and monitor activity</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'create'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-purple-900/40 text-gray-400 border border-purple-500/30 hover:text-white'
            }`}
          >
            <Plus className="w-5 h-5" />
            {t('admin.createItem')}
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'manage'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-purple-900/40 text-gray-400 border border-purple-500/30 hover:text-white'
            }`}
          >
            <Package className="w-5 h-5" />
            {t('admin.manageAuctions')}
          </button>
        </div>

        {/* Create Item Form */}
        {activeTab === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-pink-500/30"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  {t('admin.itemName')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  {t('admin.description')}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 h-24"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  {t('admin.imageUrl')}
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  {t('admin.startTime')} (Optional - leave blank for immediate)
                </label>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-black text-lg py-4 rounded-xl shadow-[0_0_30px_rgba(236,72,153,0.5)] uppercase"
              >
                {t('admin.create')}
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* Manage Items */}
        {activeTab === 'manage' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-4"
          >
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-pink-500/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/40 border-b border-purple-500/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase">Item</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase">{t('admin.status')}</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase">Bids</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-300 uppercase">{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/20">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-purple-900/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="font-bold text-white">{item.name}</p>
                              <p className="text-sm text-gray-400">{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === 'active' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500' 
                              : item.status === 'upcoming'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500'
                              : 'bg-red-500/20 text-red-400 border border-red-500'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-yellow-400">{item.currentPrice} ¥</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-purple-400">{item.bids}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {item.status === 'active' && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEndAuction(item.id)}
                                className="p-2 bg-red-500/20 rounded-lg border border-red-500/30 hover:bg-red-500/30"
                                title="End Auction"
                              >
                                <Pause className="w-4 h-4 text-red-400" />
                              </motion.button>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-2 bg-gray-500/20 rounded-lg border border-gray-500/30 hover:bg-gray-500/30"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-gray-400" />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
