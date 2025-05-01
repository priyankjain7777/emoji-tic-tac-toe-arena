
import React from "react";
import { SquareValue } from "@/utils/gameLogic";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinningSquare: boolean;
  index: number;
}

const Square = ({ value, onClick, isWinningSquare, index }: SquareProps) => {
  const isMobile = useIsMobile();
  
  // Map players to emojis
  const getEmoji = (val: SquareValue) => {
    switch (val) {
      case 'X': return '🦇'; // Batman bat emoji
      case 'O': return '😊'; // Smiley face emoji
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
    <button
      className={cn(
        "square w-full h-full flex items-center justify-center bg-card border-2 border-border rounded-lg transition-all duration-300",
        value === 'X' && "player-x hover:bg-blue-50 dark:hover:bg-blue-900/20",
        value === 'O' && "player-o hover:bg-red-50 dark:hover:bg-red-900/20",
        !value && "hover:bg-muted/50", // Add hover effect for empty squares
        isWinningSquare && "winning-square border-primary border-4 bg-primary/10",
        isMobile ? "text-3xl active:scale-95" : "text-4xl hover:scale-105"
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={!!value} // Disable if already filled
      tabIndex={0}
      role="button"
      aria-label={`Square ${index + 1}, ${value ? `contains ${value}` : 'empty'}`}
    >
      <span className={value ? "floating" : ""}>
        {getEmoji(value)}
      </span>
    </button>
  );
};

export default Square;
