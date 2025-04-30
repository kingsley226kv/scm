
import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';
import { Product } from './types';

interface ProductItemProps {
  product: Product;
  onSelect: (id: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onSelect }) => {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div 
      onClick={() => onSelect(product.id)}
      className={cn(
        "p-3 border rounded-md transition-all cursor-pointer",
        product.selected ? "border-primary bg-primary bg-opacity-10" : "border-gray-200 hover:border-gray-300"
      )}
    >
      <div className="flex justify-between items-start">
        <span className="text-2xl">{product.emoji}</span>
        {product.selected && (
          <span className="bg-green-500 text-white p-1 rounded-full">
            <Check size={12} />
          </span>
        )}
      </div>
      <div className="mt-2">
        <div className="font-medium">{product.name}</div>
        <div className="text-sm text-gray-500">{product.category}</div>
        <div className="flex flex-col">
          <div className="text-sm line-through text-gray-400">RM{product.price.toFixed(2)}</div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-green-600">RM{discountedPrice.toFixed(2)}</span>
            <span className="text-xs bg-red-100 text-red-600 px-1 rounded">
              {product.discountPercentage}% OFF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
