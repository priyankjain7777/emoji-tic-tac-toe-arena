
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

const GameControls = () => {
  const { 
    resetGame, 
    mode, 
    setGameMode, 
    difficulty, 
    setDifficulty 
  } = useGame();
  
  return (
    <div className="space-y-4 w-full max-w-sm mx-auto">
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={() => setGameMode("pvp")}
          aria-pressed={mode === "pvp"}
        >
          <Users className="mr-2 h-4 w-4" /> 
          Player vs Player
        </Button>
        
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={() => setGameMode("ai")}
          aria-pressed={mode === "ai"}
        >
          <User className="mr-2 h-4 w-4" /> 
          vs Computer
        </Button>
      </div>
      
      {mode === "ai" && (
        <div className="flex items-center gap-3">
          <span className="text-sm">Difficulty:</span>
          <Select
            value={difficulty}
            onValueChange={(value) => setDifficulty(value as "easy" | "hard")}
          >
            <SelectTrigger className="flex-1">
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
        className="w-full" 
        onClick={resetGame} 
        variant="default"
      >
        <RefreshCw className="mr-2 h-4 w-4" /> 
        New Game
      </Button>
    </div>
  );
};

export default GameControls;
