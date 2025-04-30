
import { Product } from './types';

// Extended product list with 20 items
export const initialProducts: Product[] = [
  { id: 1, name: 'Fashion Dress', category: 'Women\'s Wear', price: 99, emoji: '👗', selected: false, discountPercentage: 0 },
  { id: 2, name: 'Business Suit', category: 'Men\'s Wear', price: 199, emoji: '👔', selected: false, discountPercentage: 0 },
  { id: 3, name: 'Sports Shoes', category: 'Footwear', price: 149, emoji: '👟', selected: false, discountPercentage: 0 },
  { id: 4, name: 'Luxury Watch', category: 'Accessories', price: 299, emoji: '⌚', selected: false, discountPercentage: 0 },
  { id: 5, name: 'Makeup Set', category: 'Beauty', price: 79, emoji: '💄', selected: false, discountPercentage: 0 },
  { id: 6, name: 'Casual Jacket', category: 'Men\'s Wear', price: 129, emoji: '🧥', selected: false, discountPercentage: 0 },
  { id: 7, name: 'Jeans', category: 'Pants', price: 69, emoji: '👖', selected: false, discountPercentage: 0 },
  { id: 8, name: 'Handbag', category: 'Accessories', price: 89, emoji: '👜', selected: false, discountPercentage: 0 },
  { id: 9, name: 'Sunglasses', category: 'Accessories', price: 59, emoji: '👓', selected: false, discountPercentage: 0 },
  { id: 10, name: 'Winter Scarf', category: 'Accessories', price: 29, emoji: '🧣', selected: false, discountPercentage: 0 },
  { id: 11, name: 'Smartphone', category: 'Electronics', price: 299, emoji: '📱', selected: false, discountPercentage: 0 },
  { id: 12, name: 'Laptop', category: 'Electronics', price: 599, emoji: '💻', selected: false, discountPercentage: 0 },
  { id: 13, name: 'Headphones', category: 'Electronics', price: 79, emoji: '🎧', selected: false, discountPercentage: 0 },
  { id: 14, name: 'Running Shorts', category: 'Sportswear', price: 39, emoji: '🩳', selected: false, discountPercentage: 0 },
  { id: 15, name: 'Fitness Tracker', category: 'Electronics', price: 49, emoji: '⌚', selected: false, discountPercentage: 0 },
  { id: 16, name: 'Formal Shoes', category: 'Footwear', price: 129, emoji: '👞', selected: false, discountPercentage: 0 },
  { id: 17, name: 'Summer Dress', category: 'Women\'s Wear', price: 79, emoji: '👗', selected: false, discountPercentage: 0 },
  { id: 18, name: 'Baseball Cap', category: 'Accessories', price: 19, emoji: '🧢', selected: false, discountPercentage: 0 },
  { id: 19, name: 'Perfume', category: 'Beauty', price: 69, emoji: '🧴', selected: false, discountPercentage: 0 },
  { id: 20, name: 'Wallet', category: 'Accessories', price: 49, emoji: '👛', selected: false, discountPercentage: 0 },
];

// Get a player-specific budget based on a simple ID system
export const getPlayerBudget = (playerId: number): number => {
  const budgets = [200, 260, 310, 280, 350, 230, 290, 320, 270, 240];
  return budgets[playerId % budgets.length];
};
