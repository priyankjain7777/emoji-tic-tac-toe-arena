
import React from "react";
import { useGame } from "@/context/GameContext";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const GameStatus = () => {
  const { state, playerXName, playerOName, mode } = useGame();
  const { currentPlayer, winner, isAIThinking } = state;
  const isMobile = useIsMobile();
  
  const getStatusText = () => {
    if (winner === 'X') {
      return `${playerXName} wins!`;
    } else if (winner === 'O') {
      return `${playerOName} wins!`;
    } else if (winner === 'draw') {
      return "It's a draw!";
    } else {
      return isAIThinking 
        ? "AI is thinking..." 
        : `${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
    }
  };
  
  const getEmoji = () => {
    if (winner === 'X') {
      return '🎉 🦇';
    } else if (winner === 'O') {
      return '🎉 😊';
    } else if (winner === 'draw') {
      return '🤝';
    } else {
      return currentPlayer === 'X' ? '🦇' : '😊';
    }
  };
  
  return (
    <div 
      className="text-center mb-4 sm:mb-6 p-3 rounded-lg bg-card"
      aria-live="polite"
    >
      <div className={cn(
        isMobile ? "text-3xl mb-1" : "text-4xl mb-2",
        currentPlayer === 'X' && !winner && "text-game-x",
        currentPlayer === 'O' && !winner && "text-game-o"
      )}>
        {getEmoji()}
      </div>
      <h2 className={isMobile ? "text-lg font-semibold" : "text-xl font-semibold"}>{getStatusText()}</h2>
      
      {isAIThinking && (
        <div className="mt-2 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStatus;
