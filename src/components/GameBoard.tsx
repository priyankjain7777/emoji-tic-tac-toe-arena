
import React, { useEffect, useRef } from "react";
import Square from "./Square";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";

const GameBoard = () => {
  const { state, makeMove } = useGame();
  const { board, winner, isAIThinking, winningLine } = state;
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    clickSoundRef.current = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vm//Nh//+mmLdBi1fPwXv9//iurWQLAAAAAAAAAAAAAAAAAAABQAAAAAwAQKAAAAAAAQAAAKACw==");
  }, []);

  const handleSquareClick = (index: number) => {
    // Only allow moves if the square is empty, there's no winner, and AI is not thinking
    if (board[index] === null && !winner && !isAIThinking) {
      // Play sound
      if (clickSoundRef.current) {
        clickSoundRef.current.currentTime = 0;
        clickSoundRef.current.play().catch(err => console.error("Error playing sound:", err));
      }
      
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
