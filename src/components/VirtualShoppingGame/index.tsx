
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';
import { VirtualShoppingGameProps, Product } from './types';
import { initialProducts, getPlayerBudget } from './productData';
import ProductItem from './ProductItem';
import BudgetSummary from './BudgetSummary';
import ShoppingList from './ShoppingList';

const VirtualShoppingGame: React.FC<VirtualShoppingGameProps> = ({ onComplete }) => {
  // For demo purposes, we'll assign a random player ID
  const [playerId] = useState(() => Math.floor(Math.random() * 10));
  const [budget, setBudget] = useState(getPlayerBudget(playerId));
  const [products, setProducts] = useState(() => {
    // Apply random discount to each product
    return initialProducts.map(product => ({
      ...product,
      discountPercentage: Math.floor(Math.random() * 30) + 5 // Random discount between 5% and 35%
    }));
  });
  const [gameComplete, setGameComplete] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    toast.info(`Welcome Player! Your budget is RM${budget}`);
  }, [budget]);

  const handleSelectItem = (id: number) => {
    const selectedProduct = products.find(product => product.id === id);
    if (!selectedProduct) return;
    
    // Check budget when adding an item
    if (!selectedProduct.selected) {
      const currentTotalSpent = products
        .filter(product => product.selected)
        .reduce((sum, product) => {
          const discountedPrice = product.price * (1 - product.discountPercentage / 100);
          return sum + discountedPrice;
        }, 0);
      
      const discountedPrice = selectedProduct.price * (1 - selectedProduct.discountPercentage / 100);
      if (currentTotalSpent + discountedPrice > budget) {
        toast.error('Not enough budget!');
        return;
      }
    }
    
    setProducts(products.map(product => {
      if (product.id === id) {
        return { ...product, selected: !product.selected };
      }
      return product;
    }));
  };
  
  const totalSpent = products
    .filter(product => product.selected)
    .reduce((sum, product) => {
      const discountedPrice = product.price * (1 - product.discountPercentage / 100);
      return sum + discountedPrice;
    }, 0);
    
  const totalItems = products.filter(product => product.selected).length;
  
  // Calculate if 85% of budget is used
  const minimumSpendRequired = budget * 0.85;
  const isMinimumSpent = totalSpent >= minimumSpendRequired;
  
  const handleCheckout = () => {
    if (totalItems < 4) {
      toast.error('Please select at least 4 items');
      return;
    }
    
    if (!isMinimumSpent) {
      toast.error(`You need to spend at least 85% of your budget (RM${minimumSpendRequired.toFixed(2)})`);
      return;
    }
    
    if (totalSpent > budget) {
      toast.error('Your total exceeds your budget!');
      return;
    }
    
    setStep(2);
    toast.success('Shopping list confirmed, please proceed to next step');
  };
  
  const handleComplete = () => {
    setGameComplete(true);
    toast('Congratulations on completing the virtual shopping experience!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-2">Virtual Shopping Experience</h3>
        <p className="text-sm text-gray-600 mb-2">
          {step === 1 
            ? `Go on a virtual shopping spree! You have a budget of RM${budget}, and need to buy at least 4 items. Your total must use at least 85% of your budget without exceeding it. Each item has a unique discount!` 
            : 'Shopping completed! Please review your shopping list.'}
        </p>
        <p className="text-xs text-blue-600 mb-6">
          Player ID: {playerId + 1}
        </p>
        
        {step === 1 && (
          <>
            <BudgetSummary 
              budget={budget}
              totalSpent={totalSpent}
              isMinimumSpent={isMinimumSpent}
            />
            
            <div className="grid grid-cols-2 gap-3 mb-6 max-h-80 overflow-y-auto">
              {products.map(product => (
                <ProductItem 
                  key={product.id} 
                  product={product}
                  onSelect={handleSelectItem}
                />
              ))}
            </div>
            
            <Button 
              onClick={handleCheckout} 
              disabled={totalItems < 4 || !isMinimumSpent || totalSpent > budget} 
              className="w-full"
            >
              {totalItems < 4 
                ? `Select ${4 - totalItems} more items` 
                : !isMinimumSpent 
                  ? "Spend at least 85% of budget"
                  : totalSpent > budget
                    ? "Total exceeds budget"
                    : "Confirm Shopping List"
              }
            </Button>
          </>
        )}
        
        {step === 2 && (
          <>
            {!gameComplete ? (
              <ShoppingList 
                products={products}
                budget={budget}
                totalSpent={totalSpent}
                onComplete={handleComplete}
              />
            ) : (
              <Button onClick={onComplete} className="w-full">
                Complete Task
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VirtualShoppingGame;
