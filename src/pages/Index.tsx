
import React from "react";
import { GameProvider } from "@/context/GameContext";
import GameBoard from "@/components/GameBoard";
import GameStatus from "@/components/GameStatus";
import GameControls from "@/components/GameControls";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10">
      <header className="w-full flex justify-between items-center max-w-xl mb-6 px-2">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Emoji Tic Tac Toe Arena
        </h1>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-xl">
        <GameProvider>
          <GameStatus />
          <div className="w-full mb-8">
            <GameBoard />
          </div>
          <GameControls />
        </GameProvider>
      </main>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Play with keyboard: Tab to navigate, Enter/Space to select</p>
        <p className="mt-1">© 2025 Emoji Tic Tac Toe Arena</p>
      </footer>
    </div>
  );
};

export default Index;
