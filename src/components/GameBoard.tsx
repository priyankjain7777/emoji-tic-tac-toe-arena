
import React from "react";
import Square from "./Square";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";

const GameBoard = () => {
  const { state, makeMove } = useGame();
  const { board, winner, isAIThinking, winningLine } = state;
  
  const handleSquareClick = (index: number) => {
    // Only allow moves if the square is empty, there's no winner, and AI is not thinking
    if (board[index] === null && !winner && !isAIThinking) {
      makeMove(index);
    }
  };
  
  return (
    <div
      className="grid grid-cols-3 gap-3 w-full max-w-sm mx-auto"
      role="grid"
      aria-label="Tic Tac Toe game board"
    >
      {board.map((square, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="aspect-square"
        >
          <Square
            value={square}
            onClick={() => handleSquareClick(index)}
            isWinningSquare={winningLine?.includes(index) || false}
            index={index}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default GameBoard;
