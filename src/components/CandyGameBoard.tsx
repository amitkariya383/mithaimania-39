import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useSound } from "@/hooks/useSound";
import { CandyAnimations } from "./CandyAnimations";
import { CANDY_TYPES, CandyPiece, SpecialCandyType, createSpecialCandy } from "@/types/CandyTypes";
import { calculateScore, ScoreType } from "@/utils/CandyScoring";

const BOARD_SIZE = 8;

interface CandyGameBoardProps {
  onScoreUpdate?: (score: number) => void;
}

export const CandyGameBoard: React.FC<CandyGameBoardProps> = ({ onScoreUpdate }) => {
  const [board, setBoard] = useState<CandyPiece[][]>([]);
  const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingPieces, setAnimatingPieces] = useState<{ row: number; col: number; type: string }[]>([]);

  const { playMatchSound, playClickSound, playErrorSound, playSelectSound, playSwapSound } = useSound();

  // Generate random candy type that doesn't create immediate matches
  const getRandomCandyType = useCallback((board: CandyPiece[][], row: number, col: number) => {
    const availableTypes = [...CANDY_TYPES.filter(c => c.type === 'normal')];
    
    // Remove types that would create horizontal matches
    if (col >= 2) {
      const leftType1 = board[row][col - 1]?.candyType;
      const leftType2 = board[row][col - 2]?.candyType;
      if (leftType1 === leftType2) {
        const matchingType = availableTypes.find(t => t.id === leftType1);
        if (matchingType) {
          const index = availableTypes.indexOf(matchingType);
          availableTypes.splice(index, 1);
        }
      }
    }
    
    // Remove types that would create vertical matches
    if (row >= 2) {
      const topType1 = board[row - 1][col]?.candyType;
      const topType2 = board[row - 2][col]?.candyType;
      if (topType1 === topType2) {
        const matchingType = availableTypes.find(t => t.id === topType1);
        if (matchingType) {
          const index = availableTypes.indexOf(matchingType);
          availableTypes.splice(index, 1);
        }
      }
    }
    
    return availableTypes.length > 0 
      ? availableTypes[Math.floor(Math.random() * availableTypes.length)]
      : CANDY_TYPES.find(c => c.type === 'normal')!;
  }, []);

  // Initialize board
  const initializeBoard = useCallback(() => {
    const newBoard: CandyPiece[][] = [];
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      newBoard[row] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        const randomCandy = getRandomCandyType(newBoard, row, col);
        newBoard[row][col] = {
          id: `${row}-${col}`,
          candyType: randomCandy.id,
          specialType: 'normal',
          row,
          col,
        };
      }
    }
    
    setBoard(newBoard);
    setScore(0);
    setSelectedPiece(null);
    setAnimatingPieces([]);
    onScoreUpdate?.(0);
  }, [getRandomCandyType, onScoreUpdate]);

  // Find matches and determine special candy type
  const findMatches = useCallback((currentBoard: CandyPiece[][]) => {
    const matches: CandyPiece[] = [];
    const specialCandyCreations: { row: number; col: number; type: SpecialCandyType }[] = [];
    
    // Check horizontal matches
    for (let row = 0; row < BOARD_SIZE; row++) {
      let count = 1;
      let currentType = currentBoard[row][0].candyType;
      let startCol = 0;
      
      for (let col = 1; col < BOARD_SIZE; col++) {
        if (currentBoard[row][col].candyType === currentType && currentType !== '') {
          count++;
        } else {
          if (count >= 3 && currentType !== '') {
            const matchedPieces = [];
            for (let i = startCol; i < col; i++) {
              matchedPieces.push(currentBoard[row][i]);
              matches.push(currentBoard[row][i]);
            }
            
            // Create special candy based on match size
            if (count === 4) {
              specialCandyCreations.push({ row, col: startCol + 1, type: 'striped-horizontal' });
            } else if (count === 5) {
              specialCandyCreations.push({ row, col: startCol + 2, type: 'color-bomb' });
            }
          }
          count = 1;
          currentType = currentBoard[row][col].candyType;
          startCol = col;
        }
      }
      
      // Check end of row
      if (count >= 3 && currentType !== '') {
        const matchedPieces = [];
        for (let i = startCol; i < BOARD_SIZE; i++) {
          matchedPieces.push(currentBoard[row][i]);
          matches.push(currentBoard[row][i]);
        }
        
        if (count === 4) {
          specialCandyCreations.push({ row, col: startCol + 1, type: 'striped-horizontal' });
        } else if (count === 5) {
          specialCandyCreations.push({ row, col: startCol + 2, type: 'color-bomb' });
        }
      }
    }

    // Check vertical matches
    for (let col = 0; col < BOARD_SIZE; col++) {
      let count = 1;
      let currentType = currentBoard[0][col].candyType;
      let startRow = 0;
      
      for (let row = 1; row < BOARD_SIZE; row++) {
        if (currentBoard[row][col].candyType === currentType && currentType !== '') {
          count++;
        } else {
          if (count >= 3 && currentType !== '') {
            const matchedPieces = [];
            for (let i = startRow; i < row; i++) {
              matchedPieces.push(currentBoard[i][col]);
              matches.push(currentBoard[i][col]);
            }
            
            if (count === 4) {
              specialCandyCreations.push({ row: startRow + 1, col, type: 'striped-vertical' });
            } else if (count === 5) {
              specialCandyCreations.push({ row: startRow + 2, col, type: 'color-bomb' });
            }
          }
          count = 1;
          currentType = currentBoard[row][col].candyType;
          startRow = row;
        }
      }
      
      // Check end of column
      if (count >= 3 && currentType !== '') {
        const matchedPieces = [];
        for (let i = startRow; i < BOARD_SIZE; i++) {
          matchedPieces.push(currentBoard[i][col]);
          matches.push(currentBoard[i][col]);
        }
        
        if (count === 4) {
          specialCandyCreations.push({ row: startRow + 1, col, type: 'striped-vertical' });
        } else if (count === 5) {
          specialCandyCreations.push({ row: startRow + 2, col, type: 'color-bomb' });
        }
      }
    }

    return { matches, specialCandyCreations };
  }, []);

  // Activate special candy effects
  const activateSpecialCandy = useCallback((piece: CandyPiece, board: CandyPiece[][]) => {
    const piecesToRemove: CandyPiece[] = [];
    
    switch (piece.specialType) {
      case 'striped-horizontal':
        // Clear entire row
        for (let col = 0; col < BOARD_SIZE; col++) {
          piecesToRemove.push(board[piece.row][col]);
        }
        break;
        
      case 'striped-vertical':
        // Clear entire column
        for (let row = 0; row < BOARD_SIZE; row++) {
          piecesToRemove.push(board[row][piece.col]);
        }
        break;
        
      case 'wrapped':
        // Clear 3x3 area (twice)
        for (let r = Math.max(0, piece.row - 1); r <= Math.min(BOARD_SIZE - 1, piece.row + 1); r++) {
          for (let c = Math.max(0, piece.col - 1); c <= Math.min(BOARD_SIZE - 1, piece.col + 1); c++) {
            piecesToRemove.push(board[r][c]);
          }
        }
        break;
        
      case 'color-bomb':
        // Remove all candies of the same color
        const colorToRemove = piece.candyType;
        for (let row = 0; row < BOARD_SIZE; row++) {
          for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col].candyType === colorToRemove) {
              piecesToRemove.push(board[row][col]);
            }
          }
        }
        break;
    }
    
    return piecesToRemove;
  }, []);

  // Remove matches and handle special candies
  const removeMatches = useCallback((matchedPieces: CandyPiece[], specialCreations: { row: number; col: number; type: SpecialCandyType }[]) => {
    if (matchedPieces.length === 0) return;
    
    setIsAnimating(true);
    setAnimatingPieces(matchedPieces.map(p => ({ row: p.row, col: p.col, type: 'explosion' })));
    
    // Calculate score
    const matchScore = calculateScore(matchedPieces.length, 'match');
    const specialScore = specialCreations.length * calculateScore(1, 'special-creation');
    const totalScore = matchScore + specialScore;
    
    const newScore = score + totalScore;
    setScore(newScore);
    onScoreUpdate?.(newScore);
    
    playMatchSound();
    toast(`🍭 Sweet! ${matchedPieces.length} candies matched!`, {
      description: `+${totalScore} points`,
    });

    setTimeout(() => {
      setBoard(currentBoard => {
        const newBoard = currentBoard.map(row => [...row]);
        
        // Remove matched pieces
        matchedPieces.forEach(piece => {
          newBoard[piece.row][piece.col] = {
            ...newBoard[piece.row][piece.col],
            candyType: '',
            specialType: 'normal',
          };
        });
        
        // Create special candies
        specialCreations.forEach(({ row, col, type }) => {
          if (newBoard[row][col].candyType !== '') {
            const candyInfo = CANDY_TYPES.find(c => c.id === newBoard[row][col].candyType);
            newBoard[row][col] = createSpecialCandy(candyInfo?.id || 'red', type, row, col);
          }
        });
        
        // Drop remaining pieces
        for (let col = 0; col < BOARD_SIZE; col++) {
          const column = [];
          for (let row = BOARD_SIZE - 1; row >= 0; row--) {
            if (newBoard[row][col].candyType !== '') {
              column.push(newBoard[row][col]);
            }
          }
          
          // Fill from bottom
          for (let row = BOARD_SIZE - 1; row >= 0; row--) {
            if (column.length > 0) {
              const piece = column.shift()!;
              newBoard[row][col] = {
                ...piece,
                row,
                col,
                id: `${row}-${col}`,
              };
            } else {
              // Add new random piece
              const randomCandy = getRandomCandyType(newBoard, row, col);
              newBoard[row][col] = {
                id: `${row}-${col}`,
                candyType: randomCandy.id,
                specialType: 'normal',
                row,
                col,
              };
            }
          }
        }
        
        return newBoard;
      });
      
      setIsAnimating(false);
      setAnimatingPieces([]);
    }, 800);
  }, [score, onScoreUpdate, getRandomCandyType, playMatchSound]);

  // Handle piece selection and swapping
  const handlePieceClick = useCallback((row: number, col: number) => {
    if (isAnimating) return;
    
    const piece = board[row][col];
    
    // If clicking on a special candy and no piece is selected, activate it
    if (!selectedPiece && piece.specialType !== 'normal') {
      const piecesToRemove = activateSpecialCandy(piece, board);
      const explosionScore = calculateScore(piecesToRemove.length, 'explosion');
      const newScore = score + explosionScore;
      setScore(newScore);
      onScoreUpdate?.(newScore);
      
      setAnimatingPieces([{ row, col, type: 'special-activation' }]);
      setTimeout(() => {
        removeMatches(piecesToRemove, []);
      }, 300);
      return;
    }
    
    if (!selectedPiece) {
      setSelectedPiece({ row, col });
      playSelectSound();
      return;
    }
    
    // Check if clicking the same piece (deselect)
    if (selectedPiece.row === row && selectedPiece.col === col) {
      setSelectedPiece(null);
      return;
    }
    
    // Check if adjacent
    const rowDiff = Math.abs(selectedPiece.row - row);
    const colDiff = Math.abs(selectedPiece.col - col);
    
    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      // Create test board for swap
      const testBoard = board.map(boardRow => [...boardRow]);
      const temp = { ...testBoard[selectedPiece.row][selectedPiece.col] };
      
      testBoard[selectedPiece.row][selectedPiece.col] = {
        ...testBoard[row][col],
        row: selectedPiece.row,
        col: selectedPiece.col,
        id: `${selectedPiece.row}-${selectedPiece.col}`
      };
      
      testBoard[row][col] = {
        ...temp,
        row: row,
        col: col,
        id: `${row}-${col}`
      };
      
      const { matches, specialCandyCreations } = findMatches(testBoard);
      
      if (matches.length > 0) {
        playSwapSound();
        setBoard(testBoard);
        setSelectedPiece(null);
        setTimeout(() => {
          removeMatches(matches, specialCandyCreations);
        }, 300);
      } else {
        playErrorSound();
        setSelectedPiece(null);
        toast("❌ No matches possible with this swap!", {
          description: "Try a different combination",
        });
      }
    } else {
      // Not adjacent, select new piece
      setSelectedPiece({ row, col });
      playSelectSound();
    }
  }, [selectedPiece, isAnimating, board, findMatches, removeMatches, activateSpecialCandy, score, onScoreUpdate, playSelectSound, playSwapSound, playErrorSound]);

  // Check for matches after board changes
  useEffect(() => {
    if (board.length > 0 && !isAnimating) {
      const { matches, specialCandyCreations } = findMatches(board);
      if (matches.length > 0) {
        setTimeout(() => {
          removeMatches(matches, specialCandyCreations);
        }, 500);
      }
    }
  }, [board, findMatches, removeMatches, isAnimating]);

  // Initialize board on mount
  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  const getCandyInfo = (candyType: string) => {
    return CANDY_TYPES.find(c => c.id === candyType) || CANDY_TYPES[0];
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-background via-background/95 to-primary/5 shadow-2xl w-full max-w-lg mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Score: {score}
        </Badge>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            playClickSound();
            initializeBoard();
          }}
        >
          🔄 New Game
        </Button>
      </div>

      <div className="grid grid-cols-8 gap-1 w-full bg-white/50 p-4 rounded-lg shadow-lg">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const candy = getCandyInfo(piece.candyType);
            const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;
            const isAnimating = animatingPieces.some(p => p.row === rowIndex && p.col === colIndex);
            
            return (
              <button
                key={piece.id}
                onClick={() => handlePieceClick(rowIndex, colIndex)}
                className={`
                  aspect-square bg-white rounded-lg border-2 transition-all duration-200 relative overflow-hidden
                  hover:scale-105 hover:shadow-md active:scale-95 touch-manipulation
                  min-h-[50px] min-w-[50px]
                  ${isSelected ? 'border-primary ring-2 ring-primary/50 scale-105' : 'border-border'}
                  ${isAnimating ? 'animate-pulse' : ''}
                `}
                disabled={isAnimating}
              >
                {piece.candyType && (
                  <>
                    <div 
                      className="w-full h-full rounded-md flex items-center justify-center text-2xl font-bold"
                      style={{ backgroundColor: candy.color }}
                    >
                      {candy.emoji}
                    </div>
                    
                    {/* Special candy indicators */}
                    {piece.specialType === 'striped-horizontal' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    )}
                    {piece.specialType === 'striped-vertical' && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
                    )}
                    {piece.specialType === 'wrapped' && (
                      <div className="absolute inset-0 border-2 border-yellow-300 rounded-md animate-pulse"></div>
                    )}
                    {piece.specialType === 'color-bomb' && (
                      <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent animate-pulse"></div>
                    )}
                  </>
                )}
              </button>
            );
          })
        )}
      </div>
      
      <CandyAnimations animatingPieces={animatingPieces} />
    </Card>
  );
};