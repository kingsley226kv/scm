
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

interface MemoryGameProps {
  onComplete: () => void;
}

// Brand logos for memory game (using emoji as placeholders)
const brandEmojis = ['🛍️', '👗', '👟', '👜', '🧢', '👓', '🧣', '⌚', '💄', '👔', '👕', '👖', '👚', '👘'];

const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    // Initialize the game with 10 pairs (including the original 6 and 4 new ones)
    const emojisForGame = brandEmojis.slice(0, 10);
    const gameCards = [...emojisForGame, ...emojisForGame]
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);
    
    setCards(gameCards);
  }, []);

  useEffect(() => {
    // Check for matches
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      
      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setCards(cards.map((card, index) => 
          flippedCards.includes(index) ? { ...card, matched: true } : card
        ));
        toast.success('Find Match！');
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map((card, index) => 
            flippedCards.includes(index) ? { ...card, flipped: false } : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      
      setMoves(moves + 1);
    }
  }, [flippedCards, cards, moves]);

  useEffect(() => {
    // Check if game is complete
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameComplete(true);
      toast.success('Congratulation！');
    }
  }, [cards]);

  const handleCardClick = (index: number) => {
    // Ignore if already two cards are flipped or this card is already flipped/matched
    if (flippedCards.length >= 2 || cards[index].flipped || cards[index].matched) {
      return;
    }
    
    // Flip the card
    setCards(cards.map((card, i) => 
      i === index ? { ...card, flipped: true } : card
    ));
    
    // Add to flipped cards
    setFlippedCards([...flippedCards, index]);
  };

  return (
    <div className="space-y-6">
      {!gameComplete ? (
        <>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Brand Memory Match Game</h3>
            <p className="text-sm text-gray-600 mb-4">Flip the cards to find matching brand logos</p>
            
            <div className="text-sm text-gray-500 mb-4">
              Moves: {moves}
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {cards.map((card, index) => (
                <div 
                  key={card.id} 
                  onClick={() => handleCardClick(index)}
                  className={cn(
                    "h-16 flex items-center justify-center rounded-md cursor-pointer transition-all duration-300",
                    card.flipped || card.matched ? "bg-primary text-white" : "bg-gray-200",
                    card.matched && "bg-green-500"
                  )}
                >
                  {(card.flipped || card.matched) ? (
                    <span className="text-2xl">{card.emoji}</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
          <p className="mb-4">You completed the memory game in {moves} moves!</p>
          <Button onClick={onComplete} className="mt-2">
            Complete Task
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
