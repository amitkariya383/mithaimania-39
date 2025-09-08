import React from 'react';

interface AnimatingPiece {
  row: number;
  col: number;
  type: string;
}

interface CandyAnimationsProps {
  animatingPieces: AnimatingPiece[];
}

export const CandyAnimations: React.FC<CandyAnimationsProps> = ({ animatingPieces }) => {
  if (animatingPieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {animatingPieces.map((piece, index) => (
        <div
          key={`${piece.row}-${piece.col}-${index}`}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getAnimationClass(piece.type)}`}
          style={{
            left: `${50 + (piece.col - 3.5) * 8}%`,
            top: `${50 + (piece.row - 3.5) * 8}%`,
          }}
        >
          {getAnimationElement(piece.type)}
        </div>
      ))}
    </div>
  );
};

const getAnimationClass = (type: string): string => {
  switch (type) {
    case 'explosion':
      return 'animate-ping';
    case 'special-activation':
      return 'animate-pulse';
    case 'combo':
      return 'animate-bounce';
    default:
      return 'animate-pulse';
  }
};

const getAnimationElement = (type: string): React.ReactNode => {
  switch (type) {
    case 'explosion':
      return (
        <div className="w-16 h-16 bg-gradient-radial from-yellow-400 via-orange-500 to-red-500 rounded-full opacity-80">
          <div className="absolute inset-2 bg-gradient-radial from-white via-yellow-300 to-transparent rounded-full animate-pulse"></div>
        </div>
      );
    case 'special-activation':
      return (
        <div className="w-20 h-20 border-4 border-primary rounded-full animate-spin">
          <div className="absolute inset-2 bg-gradient-conic from-primary via-secondary to-primary rounded-full opacity-50"></div>
        </div>
      );
    case 'combo':
      return (
        <div className="text-4xl font-bold text-primary animate-bounce">
          ✨
        </div>
      );
    default:
      return (
        <div className="w-12 h-12 bg-primary/50 rounded-full animate-pulse"></div>
      );
  }
};