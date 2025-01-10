import React from 'react';
import { Cell as CellType, Position } from '../types';
import Cell from './Cell';

interface BoardProps {
  board: CellType[];
  selectedPosition: Position;
  onCellClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, selectedPosition, onCellClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 bg-gray-800 p-2 rounded-lg">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          isSelected={index === selectedPosition.row * 3 + selectedPosition.col}
          onClick={() => onCellClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;