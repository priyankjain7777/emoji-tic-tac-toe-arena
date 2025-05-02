
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
  
  const getPlayerImage = () => {
    if (winner === 'X') {
      return (
        <div className="flex items-center">
          <span className="mr-2">🎉</span>
          <img src="/lovable-uploads/7af06b8c-2a6d-4865-8a61-e00bdc83d76d.png" alt="Modi" className="w-8 h-8 object-contain" />
        </div>
      );
    } else if (winner === 'O') {
      return (
        <div className="flex items-center">
          <span className="mr-2">🎉</span>
          <img src="/lovable-uploads/92dce563-20ee-473e-9a9e-d1e1e98ba54c.png" alt="Trump" className="w-8 h-8 object-contain" />
        </div>
      );
    } else if (winner === 'draw') {
      return (
        <div className="flex items-center justify-center">
          <span>🤝</span>
        </div>
      );
    } else {
      return currentPlayer === 'X' ? (
        <img src="/lovable-uploads/7af06b8c-2a6d-4865-8a61-e00bdc83d76d.png" alt="Modi" className="w-8 h-8 object-contain" />
      ) : (
        <img src="/lovable-uploads/92dce563-20ee-473e-9a9e-d1e1e98ba54c.png" alt="Trump" className="w-8 h-8 object-contain" />
      );
    }
  };
  
  return (
    <div 
      className="text-center mb-4 sm:mb-6 p-3 rounded-lg bg-card"
      aria-live="polite"
    >
      <div className={cn(
        "flex justify-center items-center",
        isMobile ? "mb-1" : "mb-2",
        currentPlayer === 'X' && !winner && "text-game-x",
        currentPlayer === 'O' && !winner && "text-game-o"
      )}>
        {getPlayerImage()}
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
