
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { 
  SquareValue, 
  Player, 
  Difficulty,
  GameState,
  checkWinner,
  isDraw,
  getNextPlayer,
  makeMove,
  getBestMove,
  getRandomMove
} from "@/utils/gameLogic";
import { useToast } from "@/hooks/use-toast";

// Define action types
type GameAction =
  | { type: "MAKE_MOVE"; index: number }
  | { type: "RESET_GAME" }
  | { type: "SET_DIFFICULTY"; difficulty: Difficulty }
  | { type: "SET_GAME_MODE"; mode: GameMode }
  | { type: "SET_AI_THINKING"; isThinking: boolean }
  | { type: "SET_PLAYER_NAMES"; playerXName: string; playerOName: string };

// Game modes
export type GameMode = "pvp" | "ai";

// Context interface
interface GameContextType {
  state: GameState;
  mode: GameMode;
  difficulty: Difficulty;
  playerXName: string;
  playerOName: string;
  makeMove: (index: number) => void;
  resetGame: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setGameMode: (mode: GameMode) => void;
  setPlayerNames: (playerXName: string, playerOName: string) => void;
}

// Initial state
const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  winningLine: null,
  isAIThinking: false
};

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Game reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "MAKE_MOVE": {
      const { index } = action;
      
      // Ignore if square already filled or game is over
      if (state.board[index] !== null || state.winner !== null || state.isAIThinking) {
        return state;
      }
      
      // Make the move
      const newBoard = makeMove(state.board, index, state.currentPlayer);
      
      // Check for winner or draw
      const { winner, winningLine } = checkWinner(newBoard);
      const draw = !winner && isDraw(newBoard);
      
      return {
        ...state,
        board: newBoard,
        currentPlayer: draw || winner ? state.currentPlayer : getNextPlayer(state.currentPlayer),
        winner: draw ? "draw" : winner,
        winningLine: winningLine,
      };
    }
    case "RESET_GAME":
      return {
        ...initialState,
      };
    case "SET_AI_THINKING":
      return {
        ...state,
        isAIThinking: action.isThinking,
      };
    default:
      return state;
  }
}

// Provider component
export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [mode, setMode] = React.useState<GameMode>("pvp");
  const [difficulty, setDifficultyState] = React.useState<Difficulty>("easy");
  const [playerXName, setPlayerXName] = React.useState<string>("Player X");
  const [playerOName, setPlayerOName] = React.useState<string>("Player O");
  
  const { toast } = useToast();
  
  // AI move logic
  useEffect(() => {
    if (
      mode === "ai" && 
      state.currentPlayer === "O" && 
      state.winner === null &&
      !state.isAIThinking
    ) {
      // Simulate AI thinking
      dispatch({ type: "SET_AI_THINKING", isThinking: true });
      
      const timer = setTimeout(() => {
        const aiMove = difficulty === "easy" 
          ? getRandomMove(state.board) 
          : getBestMove(state.board, "O");
        
        if (aiMove !== -1) {
          dispatch({ type: "MAKE_MOVE", index: aiMove });
        }
        
        dispatch({ type: "SET_AI_THINKING", isThinking: false });
      }, 800); // Simulate thinking delay
      
      return () => clearTimeout(timer);
    }
  }, [state.currentPlayer, state.winner, mode, difficulty, state.board, state.isAIThinking]);
  
  // Show toast on game end
  useEffect(() => {
    if (state.winner === "X") {
      toast({
        title: "Game Over",
        description: `${playerXName} wins! 🎉`,
      });
    } else if (state.winner === "O") {
      toast({
        title: "Game Over",
        description: `${playerOName} wins! 🎉`,
      });
    } else if (state.winner === "draw") {
      toast({
        title: "Game Over",
        description: "It's a draw! 🤝",
      });
    }
  }, [state.winner, playerXName, playerOName, toast]);
  
  const makeMove = (index: number) => {
    dispatch({ type: "MAKE_MOVE", index });
  };
  
  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };
  
  const setDifficulty = (difficulty: Difficulty) => {
    setDifficultyState(difficulty);
  };
  
  const setGameMode = (newMode: GameMode) => {
    setMode(newMode);
    resetGame();
  };
  
  const setPlayerNames = (newPlayerXName: string, newPlayerOName: string) => {
    setPlayerXName(newPlayerXName);
    setPlayerOName(newPlayerOName);
  };
  
  const contextValue: GameContextType = {
    state,
    mode,
    difficulty,
    playerXName,
    playerOName,
    makeMove,
    resetGame,
    setDifficulty,
    setGameMode,
    setPlayerNames,
  };
  
  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to use the game context
export function useGame() {
  const context = useContext(GameContext);
  
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  
  return context;
}
