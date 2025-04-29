
import React from "react";
import { SquareValue } from "@/utils/gameLogic";
import { cn } from "@/lib/utils";

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinningSquare: boolean;
  index: number;
}

const Square = ({ value, onClick, isWinningSquare, index }: SquareProps) => {
  // Map players to emojis
  const getEmoji = (val: SquareValue) => {
    switch (val) {
      case 'X': return '❌';
      case 'O': return '⭕';
      default: return '';
    }
  };
  
  // For accessibility and keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };
  
  return (
    <div
      className={cn(
        "square bg-game-board",
        value === 'X' && "player-x",
        value === 'O' && "player-o",
        isWinningSquare && "winning-square",
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Square ${index + 1}, ${value ? `contains ${value}` : 'empty'}`}
      aria-disabled={!!value}
    >
      <span className={value ? "floating" : ""}>
        {getEmoji(value)}
      </span>
    </div>
  );
};

export default Square;
