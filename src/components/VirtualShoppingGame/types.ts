
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  emoji: string;
  selected: boolean;
  discountPercentage: number; // Added discount percentage for individual items
}

export interface VirtualShoppingGameProps {
  onComplete: () => void;
}
