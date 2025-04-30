import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

interface ItemFinderGameProps {
  onComplete: () => void;
}

const items = [
  { id: 1, name: 'Fashion Handbag', emoji: '👜', found: false },
  { id: 2, name: 'Sports Shoes', emoji: '👟', found: false },
  { id: 3, name: 'Sunglasses', emoji: '👓', found: false },
  { id: 4, name: 'Fashion Hat', emoji: '🧢', found: false },
  { id: 5, name: 'Luxury Watch', emoji: '⌚', found: false },
];

const ItemFinderGame: React.FC<ItemFinderGameProps> = ({ onComplete }) => {
  const [gameItems, setGameItems] = useState(items);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds
  const [gameActive, setGameActive] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameActive) {
      // Time's up
      setGameActive(false);
      toast.error('Time\'s up!');
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, gameActive]);
  
  useEffect(() => {
    if (gameItems.every(item => item.found)) {
      setGameActive(false);
      setGameComplete(true);
      toast.success('Congratulations! You found all items!');
    }
  }, [gameItems]);
  
  const handleStartGame = () => {
    // Reset the game
    setGameItems(items.map(item => ({ ...item, found: false })));
    setTimeLeft(30);
    setGameActive(true);
    setGameComplete(false);
  };
  
  const handleItemClick = (id: number) => {
    if (!gameActive) return;
    
    setGameItems(gameItems.map(item => 
      item.id === id ? { ...item, found: true } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Shopping Expert Challenge</h3>
        <p className="text-sm text-gray-600 mb-4">
          Find all items within the time limit. Click on the items in the list below to mark them as found.
        </p>
        
        {!gameActive && !gameComplete ? (
          <Button onClick={handleStartGame} className="w-full mb-4">
            Start Game
          </Button>
        ) : null}
        
        {gameActive && (
          <div className="mb-4">
            <div className={cn(
              "text-lg font-bold",
              timeLeft < 10 ? "text-red-500 animate-pulse" : ""
            )}>
              Time Left: {timeLeft}s
            </div>
          </div>
        )}
        
        <div className="divide-y">
          {gameItems.map(item => (
            <div 
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                "py-3 px-2 flex items-center justify-between cursor-pointer",
                item.found ? "bg-green-50" : gameActive ? "hover:bg-gray-50" : "",
              )}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{item.emoji}</span>
                <span>{item.name}</span>
              </div>
              {item.found && <span className="text-green-500">✓ Found</span>}
            </div>
          ))}
        </div>
        
        {gameComplete && (
          <Button onClick={onComplete} className="w-full mt-6">
            Complete Task
          </Button>
        )}
        
        {!gameActive && !gameComplete && gameItems.some(item => item.found) && (
          <div className="mt-4">
            <Button onClick={handleStartGame} variant="outline" className="w-full">
              Restart Game
            </Button>
          </div>
        )}
        
        {timeLeft === 0 && !gameComplete && (
          <div className="mt-4">
            <p className="text-red-500 mb-2">Time's up! Try again.</p>
            <Button onClick={handleStartGame} className="w-full">
              Restart Game
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemFinderGame;
