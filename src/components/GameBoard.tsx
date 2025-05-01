
import React, { useEffect, useRef } from "react";
import Square from "./Square";
import { useGame } from "@/context/GameContext";
import { motion } from "framer-motion";
import { createClickSound } from "@/utils/soundUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const GameBoard = () => {
  const { state, makeMove } = useGame();
  const { board, winner, isAIThinking, winningLine } = state;
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();
  
  // Initialize audio element
  useEffect(() => {
    // Try to load the click sound from public directory first
    const audio = new Audio("/click.mp3");
    
    // Add error handling for the audio loading
    const handleError = () => {
      console.log("Could not load click.mp3, using fallback sound");
      clickSoundRef.current = createClickSound();
    };
    
    audio.addEventListener('error', handleError);
    
    // Preload the audio
    audio.load();
    clickSoundRef.current = audio;
    
    return () => {
      // Clean up
      audio.removeEventListener('error', handleError);
      if (clickSoundRef.current) {
        clickSoundRef.current.pause();
        clickSoundRef.current = null;
      }
    };
  }, []);

  const handleSquareClick = (index: number) => {
    // Only allow moves if the square is empty, there's no winner, and AI is not thinking
    if (board[index] === null && !winner && !isAIThinking) {
      // Play sound
      if (clickSoundRef.current) {
        try {
          // Create a clone of the audio for better handling of rapid clicks
          const soundClone = clickSoundRef.current.cloneNode() as HTMLAudioElement;
          soundClone.volume = 0.3; // Lower volume for better experience
          soundClone.play().catch(err => {
            console.log("Failed to play sound clone, trying original");
            // If clone fails, try the original
            clickSoundRef.current?.play().catch(err => 
              console.log("All sound playback attempts failed")
            );
          });
        } catch (err) {
          console.error("Error playing sound:", err);
        }
      }
      
      makeMove(index);
    }
  };
  
  return (
    <div
      className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-sm mx-auto"
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
