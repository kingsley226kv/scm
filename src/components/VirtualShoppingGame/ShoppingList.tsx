
import React from 'react';
import { Button } from '../ui/button';
import { Product } from './types';

interface ShoppingListProps {
  products: Product[];
  budget: number;
  totalSpent: number;
  onComplete: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ 
  products, 
  budget, 
  totalSpent, 
  onComplete 
}) => {
  const selectedProducts = products.filter(product => product.selected);
  const totalItems = selectedProducts.length;
  
  return (
    <>
      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
        <h4 className="font-bold text-green-700 mb-2">Shopping Summary</h4>
        <div className="flex justify-between mb-1">
          <span>Total Budget:</span>
          <span>RM{budget.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Total Spent (with discounts):</span>
          <span className="font-bold">RM{totalSpent.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Items Purchased:</span>
          <span>{totalItems} items</span>
        </div>
      </div>
      
      <h4 className="font-bold mb-2">Shopping List:</h4>
      <div className="divide-y mb-6">
        {selectedProducts.map(product => {
          const discountedPrice = product.price * (1 - product.discountPercentage / 100);
          
          return (
            <div key={product.id} className="py-2 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-xl mr-2">{product.emoji}</span>
                <div>
                  <div>{product.name}</div>
                  <div className="text-sm text-gray-500">{product.category}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm line-through text-gray-400">RM{product.price.toFixed(2)}</div>
                <div className="font-bold text-green-600">RM{discountedPrice.toFixed(2)}</div>
                <div className="text-xs text-red-600">{product.discountPercentage}% OFF</div>
              </div>
            </div>
          );
        })}
      </div>
      
      <Button onClick={onComplete} className="w-full">
        Complete Shopping Experience
      </Button>
    </>
  );
};

export default ShoppingList;
