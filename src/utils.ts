import { Board, Player, Position } from './types';

export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export function checkWinner(board: Board): Player | 'draw' | null {
  // Check for winner
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }

  // Check for draw
  if (board.every(cell => cell !== null)) {
    return 'draw';
  }

  return null;
}

export function positionToIndex(position: Position): number {
  return position.row * 3 + position.col;
}

export function indexToPosition(index: number): Position {
  return {
    row: Math.floor(index / 3),
    col: index % 3
  };
}

export function movePosition(position: Position, direction: 'up' | 'down' | 'left' | 'right'): Position {
  const newPosition = { ...position };

  switch (direction) {
    case 'up':
      newPosition.row = (newPosition.row - 1 + 3) % 3;
      break;
    case 'down':
      newPosition.row = (newPosition.row + 1) % 3;
      break;
    case 'left':
      newPosition.col = (newPosition.col - 1 + 3) % 3;
      break;
    case 'right':
      newPosition.col = (newPosition.col + 1) % 3;
      break;
  }

  return newPosition;
}