export type SpecialCandyType = 'normal' | 'striped-horizontal' | 'striped-vertical' | 'wrapped' | 'color-bomb';

export interface CandyType {
  id: string;
  name: string;
  emoji: string;
  color: string;
  type: 'normal' | 'special';
}

export interface CandyPiece {
  id: string;
  candyType: string;
  specialType: SpecialCandyType;
  row: number;
  col: number;
}

export const CANDY_TYPES: CandyType[] = [
  { id: 'red', name: 'Red Candy', emoji: '🍓', color: '#ff6b6b', type: 'normal' },
  { id: 'blue', name: 'Blue Candy', emoji: '🫐', color: '#4ecdc4', type: 'normal' },
  { id: 'green', name: 'Green Candy', emoji: '🍏', color: '#45b7d1', type: 'normal' },
  { id: 'yellow', name: 'Yellow Candy', emoji: '🍌', color: '#f9ca24', type: 'normal' },
  { id: 'purple', name: 'Purple Candy', emoji: '🍇', color: '#6c5ce7', type: 'normal' },
  { id: 'orange', name: 'Orange Candy', emoji: '🍊', color: '#fd79a8', type: 'normal' },
];

export const createSpecialCandy = (
  candyType: string, 
  specialType: SpecialCandyType, 
  row: number, 
  col: number
): CandyPiece => {
  return {
    id: `${row}-${col}`,
    candyType,
    specialType,
    row,
    col,
  };
};

// Special candy combination effects
export type CombinationResult = {
  piecesToRemove: CandyPiece[];
  specialEffects: string[];
};

export const combineSpecialCandies = (
  piece1: CandyPiece,
  piece2: CandyPiece,
  board: CandyPiece[][]
): CombinationResult => {
  const BOARD_SIZE = board.length;
  const piecesToRemove: CandyPiece[] = [];
  const specialEffects: string[] = [];

  // Helper function to get all pieces of a specific color
  const getAllOfColor = (color: string) => {
    const pieces: CandyPiece[] = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col].candyType === color) {
          pieces.push(board[row][col]);
        }
      }
    }
    return pieces;
  };

  // Helper function to get 3x3 area around a position
  const get3x3Area = (row: number, col: number) => {
    const pieces: CandyPiece[] = [];
    for (let r = Math.max(0, row - 1); r <= Math.min(BOARD_SIZE - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(BOARD_SIZE - 1, col + 1); c++) {
        pieces.push(board[r][c]);
      }
    }
    return pieces;
  };

  const type1 = piece1.specialType;
  const type2 = piece2.specialType;

  // Color Bomb + Color Bomb → clears entire board
  if (type1 === 'color-bomb' && type2 === 'color-bomb') {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        piecesToRemove.push(board[row][col]);
      }
    }
    specialEffects.push('board-clear');
  }
  
  // Color Bomb + Striped → turns all candies of that color into striped and activates them
  else if ((type1 === 'color-bomb' && (type2 === 'striped-horizontal' || type2 === 'striped-vertical')) ||
           (type2 === 'color-bomb' && (type1 === 'striped-horizontal' || type1 === 'striped-vertical'))) {
    const colorBomb = type1 === 'color-bomb' ? piece1 : piece2;
    const striped = type1 === 'color-bomb' ? piece2 : piece1;
    
    const sameColorPieces = getAllOfColor(striped.candyType);
    sameColorPieces.forEach(piece => {
      // Turn into striped and activate
      if (striped.specialType === 'striped-horizontal') {
        // Clear entire row for each piece
        for (let col = 0; col < BOARD_SIZE; col++) {
          piecesToRemove.push(board[piece.row][col]);
        }
      } else {
        // Clear entire column for each piece
        for (let row = 0; row < BOARD_SIZE; row++) {
          piecesToRemove.push(board[row][piece.col]);
        }
      }
    });
    specialEffects.push('color-striped-combo');
  }
  
  // Color Bomb + Wrapped → turns all candies of that color into wrapped and activates them
  else if ((type1 === 'color-bomb' && type2 === 'wrapped') ||
           (type2 === 'color-bomb' && type1 === 'wrapped')) {
    const colorBomb = type1 === 'color-bomb' ? piece1 : piece2;
    const wrapped = type1 === 'color-bomb' ? piece2 : piece1;
    
    const sameColorPieces = getAllOfColor(wrapped.candyType);
    sameColorPieces.forEach(piece => {
      // Turn into wrapped and activate (3x3 explosion)
      piecesToRemove.push(...get3x3Area(piece.row, piece.col));
    });
    specialEffects.push('color-wrapped-combo');
  }
  
  // Striped + Striped → clears both a row and column at the intersection
  else if ((type1 === 'striped-horizontal' || type1 === 'striped-vertical') &&
           (type2 === 'striped-horizontal' || type2 === 'striped-vertical')) {
    // Clear row and column at intersection
    const intersectionRow = piece1.row;
    const intersectionCol = piece1.col;
    
    // Clear entire row
    for (let col = 0; col < BOARD_SIZE; col++) {
      piecesToRemove.push(board[intersectionRow][col]);
    }
    
    // Clear entire column
    for (let row = 0; row < BOARD_SIZE; row++) {
      piecesToRemove.push(board[row][intersectionCol]);
    }
    
    specialEffects.push('double-striped');
  }
  
  // Striped + Wrapped → clears 3 rows and 3 columns
  else if (((type1 === 'striped-horizontal' || type1 === 'striped-vertical') && type2 === 'wrapped') ||
           ((type2 === 'striped-horizontal' || type2 === 'striped-vertical') && type1 === 'wrapped')) {
    const wrapped = type1 === 'wrapped' ? piece1 : piece2;
    
    // Clear 3 rows centered on wrapped candy
    for (let row = Math.max(0, wrapped.row - 1); row <= Math.min(BOARD_SIZE - 1, wrapped.row + 1); row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        piecesToRemove.push(board[row][col]);
      }
    }
    
    // Clear 3 columns centered on wrapped candy
    for (let col = Math.max(0, wrapped.col - 1); col <= Math.min(BOARD_SIZE - 1, wrapped.col + 1); col++) {
      for (let row = 0; row < BOARD_SIZE; row++) {
        piecesToRemove.push(board[row][col]);
      }
    }
    
    specialEffects.push('striped-wrapped');
  }
  
  // Wrapped + Wrapped → double explosions covering larger area
  else if (type1 === 'wrapped' && type2 === 'wrapped') {
    // First explosion: 3x3 around each wrapped candy
    piecesToRemove.push(...get3x3Area(piece1.row, piece1.col));
    piecesToRemove.push(...get3x3Area(piece2.row, piece2.col));
    
    // Second explosion: 5x5 around each wrapped candy
    for (let r = Math.max(0, piece1.row - 2); r <= Math.min(BOARD_SIZE - 1, piece1.row + 2); r++) {
      for (let c = Math.max(0, piece1.col - 2); c <= Math.min(BOARD_SIZE - 1, piece1.col + 2); c++) {
        piecesToRemove.push(board[r][c]);
      }
    }
    
    for (let r = Math.max(0, piece2.row - 2); r <= Math.min(BOARD_SIZE - 1, piece2.row + 2); r++) {
      for (let c = Math.max(0, piece2.col - 2); c <= Math.min(BOARD_SIZE - 1, piece2.col + 2); c++) {
        piecesToRemove.push(board[r][c]);
      }
    }
    
    specialEffects.push('double-wrapped');
  }

  // Remove duplicates
  const uniquePieces = Array.from(new Set(piecesToRemove.map(p => p.id)))
    .map(id => piecesToRemove.find(p => p.id === id)!);

  return {
    piecesToRemove: uniquePieces,
    specialEffects,
  };
};