export interface AuctionItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  currentPrice: number;
  lastBidder: string | null;
  endTime: Date;
  status: 'active' | 'upcoming' | 'ended';
  bids: number;
}

export interface Bid {
  id: string;
  itemId: string;
  userId: string;
  username: string;
  amount: number;
  timestamp: Date;
}
