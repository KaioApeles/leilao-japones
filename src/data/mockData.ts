import { AuctionItem } from '../types/auction';

export const mockActiveAuctions: AuctionItem[] = [
  {
    id: '1',
    name: 'PlayStation 5 Console',
    description: 'Brand new PS5 gaming console with controller',
    imageUrl: 'https://images.unsplash.com/photo-1709587797077-7a2c94411514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5c3RhdGlvbiUyMGNvbnNvbGUlMjBnYW1pbmd8ZW58MXx8fHwxNzY4NjE4MDIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    currentPrice: 147,
    lastBidder: 'SakuraGamer99',
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    status: 'active',
    bids: 147,
  },
  {
    id: '2',
    name: 'Nintendo Switch OLED',
    description: 'Latest Nintendo Switch OLED model',
    imageUrl: 'https://images.unsplash.com/photo-1608559168291-408b5649d285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaW50ZW5kbyUyMHN3aXRjaCUyMGdhbWV8ZW58MXx8fHwxNzY4NjE4MDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    currentPrice: 89,
    lastBidder: 'TokyoPlayer',
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    status: 'active',
    bids: 89,
  },
  {
    id: '3',
    name: 'Premium Wireless Headphones',
    description: 'High-quality noise cancelling headphones',
    imageUrl: 'https://images.unsplash.com/photo-1572119244337-bcb4aae995af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW98ZW58MXx8fHwxNzY4NTY3OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    currentPrice: 56,
    lastBidder: 'MusicLover',
    endTime: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
    status: 'active',
    bids: 56,
  },
  {
    id: '4',
    name: 'Professional Camera Kit',
    description: 'Complete photography kit with accessories',
    imageUrl: 'https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njg1NDg0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    currentPrice: 203,
    lastBidder: 'PhotoNinja',
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    status: 'active',
    bids: 203,
  },
];

export const mockUpcomingAuctions: AuctionItem[] = [
  {
    id: '5',
    name: 'Smart Watch Pro',
    description: 'Latest smartwatch with health monitoring',
    imageUrl: 'https://images.unsplash.com/photo-1668760180303-fcfe2b899e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwdGVjaHxlbnwxfHx8fDE3Njg1NDMzMTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    currentPrice: 1,
    lastBidder: null,
    endTime: new Date(Date.now() + 28 * 60 * 60 * 1000), // 28 hours from now (starts in 4 hours)
    status: 'upcoming',
    bids: 0,
  },
  {
    id: '6',
    name: '4K Drone with Camera',
    description: 'Professional drone with 4K recording',
    imageUrl: 'https://images.unsplash.com/photo-1699084583993-16958aa157d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY4NTU4NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    currentPrice: 1,
    lastBidder: null,
    endTime: new Date(Date.now() + 32 * 60 * 60 * 1000), // 32 hours from now (starts in 8 hours)
    status: 'upcoming',
    bids: 0,
  },
];
