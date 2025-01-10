import React from 'react';
import { Cell as CellType } from '../types';
import { CircleIcon, XIcon } from 'lucide-react';

interface CellProps {
  value: CellType;
  isSelected: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, isSelected, onClick }) => {
  return (
    <div
      className={`
        w-24 h-24 flex items-center justify-center
        ${isSelected ? 'bg-blue-200' : 'bg-white'}
        rounded-lg cursor-pointer transition-colors
        hover:bg-blue-100
      `}
      onClick={onClick}
    >
      {value === 'X' && <XIcon className="w-12 h-12 text-blue-600" />}
      {value === 'O' && <CircleIcon className="w-12 h-12 text-red-600" />}
    </div>
  );
};

export default Cell;