export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];

export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  board: Board;
  currentPlayer: Player;
  selectedPosition: Position;
  winner: Player | 'draw' | null;
}