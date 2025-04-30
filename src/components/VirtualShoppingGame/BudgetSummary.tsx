
import React from 'react';
import { cn } from '../../lib/utils';

interface BudgetSummaryProps {
  budget: number;
  totalSpent: number;
  isMinimumSpent: boolean;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ 
  budget, 
  totalSpent, 
  isMinimumSpent
}) => {
  const minimumSpendRequired = budget * 0.85;
  
  return (
    <div className="mb-4 space-y-2">
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
        <span>Budget:</span>
        <span className="font-bold">RM{budget.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
        <span>Total:</span>
        <span className={cn(
          "font-bold",
          totalSpent > 0 ? (totalSpent > budget * 0.85 ? "text-amber-500" : "text-green-500") : ""
        )}>
          RM{totalSpent.toFixed(2)} ({((totalSpent / budget) * 100).toFixed(0)}%)
        </span>
      </div>
      
      {totalSpent > 0 && (
        <div className="text-xs">
          <span className={!isMinimumSpent ? "text-amber-500" : "text-green-500"}>
            {isMinimumSpent 
              ? "✅ You're using at least 85% of your budget!" 
              : `❗ You need to spend at least RM${minimumSpendRequired.toFixed(2)} (85% of budget)`}
          </span>
        </div>
      )}
    </div>
  );
};

export default BudgetSummary;
