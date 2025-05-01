
import React from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RefreshCw, User, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const GameControls = () => {
  const { 
    resetGame, 
    mode, 
    setGameMode, 
    difficulty, 
    setDifficulty 
  } = useGame();
  
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-3 sm:space-y-4 w-full max-w-xs sm:max-w-sm mx-auto">
      <div className="flex gap-2 sm:gap-3">
        <Button 
          variant="outline" 
          className="flex-1 text-xs sm:text-sm" 
          onClick={() => setGameMode("pvp")}
          aria-pressed={mode === "pvp"}
        >
          <Users className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
          Player vs Player
        </Button>
        
        <Button 
          variant="outline" 
          className="flex-1 text-xs sm:text-sm" 
          onClick={() => setGameMode("ai")}
          aria-pressed={mode === "ai"}
        >
          <User className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
          vs Computer
        </Button>
      </div>
      
      {mode === "ai" && (
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm">Difficulty:</span>
          <Select
            value={difficulty}
            onValueChange={(value) => setDifficulty(value as "easy" | "hard")}
          >
            <SelectTrigger className="flex-1 text-xs sm:text-sm">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="hard">Hard (Unbeatable)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <Button 
        className="w-full text-xs sm:text-sm" 
        onClick={resetGame} 
        variant="default"
      >
        <RefreshCw className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
        New Game
      </Button>
    </div>
  );
};

export default GameControls;
