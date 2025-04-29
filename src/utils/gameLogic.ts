
/**
 * Represents the possible values for a square on the board
 */
export type SquareValue = 'X' | 'O' | null;

/**
 * Represents a player in the game
 */
export type Player = 'X' | 'O';

/**
 * Represents the difficulty level of the AI opponent
 */
export type Difficulty = 'easy' | 'hard';

/**
 * Represents the state of the game
 */
export interface GameState {
  board: SquareValue[];
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  winningLine: number[] | null;
  isAIThinking: boolean;
}

/**
 * Checks if a player has won the game
 * 
 * @param board The current game board
 * @param player The player to check for a win
 * @returns An array of the winning line indices, or null if no win
 */
export function checkWinner(board: SquareValue[]): { winner: Player | null, winningLine: number[] | null } {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { 
        winner: board[a] as Player,
        winningLine: [a, b, c]
      };
    }
  }

  return { winner: null, winningLine: null };
}

/**
 * Checks if the game is a draw
 * 
 * @param board The current game board
 * @returns True if the game is a draw, false otherwise
 */
export function isDraw(board: SquareValue[]): boolean {
  return board.every(square => square !== null) && checkWinner(board).winner === null;
}

/**
 * Gets the available moves on the board
 * 
 * @param board The current game board
 * @returns An array of indices of empty squares
 */
export function getAvailableMoves(board: SquareValue[]): number[] {
  return board.reduce((moves, value, index) => {
    if (value === null) {
      moves.push(index);
    }
    return moves;
  }, [] as number[]);
}

/**
 * Makes a move on the board
 * 
 * @param board The current game board
 * @param index The index to make the move
 * @param player The player making the move
 * @returns A new board with the move made
 */
export function makeMove(board: SquareValue[], index: number, player: Player): SquareValue[] {
  if (board[index] !== null) {
    return board; // Cannot make move, square is already filled
  }

  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
}

/**
 * Toggles the current player
 * 
 * @param currentPlayer The current player
 * @returns The other player
 */
export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === 'X' ? 'O' : 'X';
}

/**
 * Evaluates the board for the minimax algorithm
 * 
 * @param board The current game board
 * @param maximizingPlayer The AI player
 * @returns A score for the current board state
 */
export function evaluateBoard(board: SquareValue[], maximizingPlayer: Player): number {
  const { winner } = checkWinner(board);
  
  if (winner === maximizingPlayer) {
    return 10;
  } else if (winner === getNextPlayer(maximizingPlayer)) {
    return -10;
  } else if (isDraw(board)) {
    return 0;
  }
  
  return 0; // Game is still in progress
}

/**
 * Implementation of the minimax algorithm for the AI opponent
 * 
 * @param board The current game board
 * @param depth The current depth in the search tree
 * @param isMaximizing Whether the current move is for the maximizing player (AI)
 * @param maximizingPlayer The AI player
 * @returns The best score for the current board state
 */
export function minimax(
  board: SquareValue[], 
  depth: number, 
  isMaximizing: boolean, 
  maximizingPlayer: Player
): number {
  const { winner } = checkWinner(board);
  
  // Terminal conditions
  if (winner === maximizingPlayer) {
    return 10 - depth;
  } else if (winner === getNextPlayer(maximizingPlayer)) {
    return depth - 10;
  } else if (isDraw(board)) {
    return 0;
  }
  
  const availableMoves = getAvailableMoves(board);
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of availableMoves) {
      const newBoard = makeMove(board, move, maximizingPlayer);
      const score = minimax(newBoard, depth + 1, false, maximizingPlayer);
      bestScore = Math.max(bestScore, score);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of availableMoves) {
      const newBoard = makeMove(board, move, getNextPlayer(maximizingPlayer));
      const score = minimax(newBoard, depth + 1, true, maximizingPlayer);
      bestScore = Math.min(bestScore, score);
    }
    return bestScore;
  }
}

/**
 * Gets the best move for the AI player using the minimax algorithm
 * 
 * @param board The current game board
 * @param aiPlayer The AI player
 * @returns The index of the best move
 */
export function getBestMove(board: SquareValue[], aiPlayer: Player): number {
  let bestScore = -Infinity;
  let bestMove = -1;
  
  const availableMoves = getAvailableMoves(board);
  
  for (const move of availableMoves) {
    const newBoard = makeMove(board, move, aiPlayer);
    const score = minimax(newBoard, 0, false, aiPlayer);
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  
  return bestMove;
}

/**
 * Gets a random move for the easy AI difficulty
 * 
 * @param board The current game board
 * @returns The index of a random available move
 */
export function getRandomMove(board: SquareValue[]): number {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return -1;
  
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}
