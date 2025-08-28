import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useSound } from "@/hooks/useSound";
import { DifficultyMode } from "@/components/DifficultySelection";
import { Fireworks } from "@/components/Fireworks";
// Import mithai images
import laddooImg from "@/assets/laddoo.png";
import barfiImg from "@/assets/barfi.png";
import jalebiImg from "@/assets/jalebi.png";
import rasgullaImg from "@/assets/rasgulla.png";
import pedaImg from "@/assets/peda.png";
import halwaImg from "@/assets/halwa.png";
// Mithai types with their images
const MITHAI_TYPES = [
  { id: 'laddoo', name: 'Laddoo', image: laddooImg, color: 'text-yellow-600' },
  { id: 'barfi', name: 'Barfi', image: barfiImg, color: 'text-gray-500' },
  { id: 'jalebi', name: 'Jalebi', image: jalebiImg, color: 'text-orange-500' },
  { id: 'rasgulla', name: 'Rasgulla', image: rasgullaImg, color: 'text-blue-100' },
  { id: 'peda', name: 'Peda', image: pedaImg, color: 'text-amber-700' },
  { id: 'halwa', name: 'Halwa', image: halwaImg, color: 'text-yellow-500' },
];
interface Piece {
  id: string;
  type: string;
  row: number;
  col: number;
}
interface GameBoardProps {
  difficulty: DifficultyMode;
  onScoreUpdate: (score: number) => void;
  onLevelComplete: () => void;
  currentLevel: number;
  levelCompleted?: boolean;
  onFireworksNextLevel: () => void;
  onFireworksStayHere: () => void;
}
const BOARD_SIZE = 8;
export const GameBoard: React.FC<GameBoardProps> = ({ difficulty, onScoreUpdate, onLevelComplete, currentLevel, levelCompleted = false, onFireworksNextLevel, onFireworksStayHere }) => {
  // Get difficulty settings
  const getDifficultySettings = useCallback(() => {
    switch (difficulty) {
      case 'easy':
        return { moves: 50, targetScore: 300 };
      case 'hard':
        return { moves: 20, targetScore: 700 };
      default: // moderate
        return { moves: 30, targetScore: 500 };
    }
  }, [difficulty]);
  const { moves: initialMoves, targetScore } = getDifficultySettings();
  const [board, setBoard] = useState<Piece[][]>([]);
  const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(initialMoves);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [hasShownFireworks, setHasShownFireworks] = useState(false); // Added to track if fireworks shown
  
  // Drag and slide states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ row: number; col: number } | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Sound effects
  const { 
    playMatchSound, 
    playLevelCompleteSound, 
    playClickSound, 
    playErrorSound, 
    playSelectSound, 
    playSwapSound 
  } = useSound();
  // Generate a random mithai type that doesn't create immediate matches
  const getRandomMithaiType = useCallback((board: Piece[][], row: number, col: number) => {
    const availableTypes = [...MITHAI_TYPES];
    
    // Remove types that would create horizontal matches
    if (col >= 2) {
      const leftType1 = board[row][col - 1]?.type;
      const leftType2 = board[row][col - 2]?.type;
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
      const topType1 = board[row - 1][col]?.type;
      const topType2 = board[row - 2][col]?.type;
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
      : MITHAI_TYPES[Math.floor(Math.random() * MITHAI_TYPES.length)];
  }, []);
  // Initialize the board without immediate matches
  const initializeBoard = useCallback(() => {
    console.log('Initializing new game board...');
    const newBoard: Piece[][] = [];
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      newBoard[row] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        const randomType = getRandomMithaiType(newBoard, row, col);
        newBoard[row][col] = {
          id: `${row}-${col}`,
          type: randomType.id,
          row,
          col,
        };
      }
    }
    
    setBoard(newBoard);
    setScore(0);
    setMoves(initialMoves);
    setGameComplete(false);
    setSelectedPiece(null);
    setShowFireworks(false);
    setHasShownFireworks(false); // Reset flag on new board
    onScoreUpdate(0);
    console.log('Board initialized successfully');
  }, [getRandomMithaiType, onScoreUpdate, initialMoves]);
  // Check for matches (3 or more in a row/column)
  const findMatches = useCallback((currentBoard: Piece[][]) => {
    const matches: Piece[] = [];
    
    // Check horizontal matches
    for (let row = 0; row < BOARD_SIZE; row++) {
      let count = 1;
      let currentType = currentBoard[row][0].type;
      
      for (let col = 1; col < BOARD_SIZE; col++) {
        if (currentBoard[row][col].type === currentType && currentType !== '') {
          count++;
        } else {
          if (count >= 3 && currentType !== '') {
            for (let i = col - count; i < col; i++) {
              matches.push(currentBoard[row][i]);
            }
          }
          count = 1;
          currentType = currentBoard[row][col].type;
        }
      }
      
      if (count >= 3 && currentType !== '') {
        for (let i = BOARD_SIZE - count; i < BOARD_SIZE; i++) {
          matches.push(currentBoard[row][i]);
        }
      }
    }
    // Check vertical matches
    for (let col = 0; col < BOARD_SIZE; col++) {
      let count = 1;
      let currentType = currentBoard[0][col].type;
      
      for (let row = 1; row < BOARD_SIZE; row++) {
        if (currentBoard[row][col].type === currentType && currentType !== '') {
          count++;
        } else {
          if (count >= 3 && currentType !== '') {
            for (let i = row - count; i < row; i++) {
              matches.push(currentBoard[i][col]);
            }
          }
          count = 1;
          currentType = currentBoard[row][col].type;
        }
      }
      
      if (count >= 3 && currentType !== '') {
        for (let i = BOARD_SIZE - count; i < BOARD_SIZE; i++) {
          matches.push(currentBoard[i][col]);
        }
      }
    }
    return matches;
  }, []);
  // Remove matches and drop pieces
  const removeMatches = useCallback((matchedPieces: Piece[]) => {
    if (matchedPieces.length === 0 || gameComplete) return;
    console.log(`Found ${matchedPieces.length} matches to remove`);
    setIsAnimating(true);
    
    // Calculate score
    const points = matchedPieces.length * 10;
    const newScore = score + points;
    setScore(newScore);
    onScoreUpdate(newScore);
    // Play match sound and show celebration toast
    playMatchSound();
    toast(`🎉 Great! ${matchedPieces.length} mithai matched!`, {
      description: `+${points} points`,
    });
    setTimeout(() => {
      setBoard(currentBoard => {
        const newBoard = currentBoard.map(row => [...row]);
        
        // Remove matched pieces
        matchedPieces.forEach(piece => {
          newBoard[piece.row][piece.col] = {
            ...newBoard[piece.row][piece.col],
            type: '',
          };
        });
        // Drop remaining pieces
        for (let col = 0; col < BOARD_SIZE; col++) {
          const column = [];
          for (let row = BOARD_SIZE - 1; row >= 0; row--) {
            if (newBoard[row][col].type !== '') {
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
              const randomType = getRandomMithaiType(newBoard, row, col);
              newBoard[row][col] = {
                id: `${row}-${col}`,
                type: randomType.id,
                row,
                col,
              };
            }
          }
        }
        
        return newBoard;
      });
      
      setIsAnimating(false);
    }, 500);
  }, [score, onScoreUpdate, gameComplete, getRandomMithaiType]);
  // Check for matches after board changes
  useEffect(() => {
    if (board.length > 0 && !isAnimating && !gameComplete) {
      const matches = findMatches(board);
      if (matches.length > 0) {
        console.log(`Auto-removing ${matches.length} matches`);
        removeMatches(matches);
      }
    }
  }, [board, findMatches, removeMatches, isAnimating, gameComplete]);
  // Handle piece selection and swapping
  const handlePieceClick = useCallback((row: number, col: number) => {
    if (isAnimating || moves <= 0 || gameComplete) {
      console.log('Click ignored - game state:', { isAnimating, moves, gameComplete });
      return;
    }
    console.log(`Clicked piece at [${row}, ${col}]`);
    if (!selectedPiece) {
      setSelectedPiece({ row, col });
      playSelectSound();
      console.log(`Selected piece at [${row}, ${col}]`);
      return;
    }
    // Check if clicking the same piece (deselect)
    if (selectedPiece.row === row && selectedPiece.col === col) {
      setSelectedPiece(null);
      console.log('Deselected piece');
      return;
    }
    // Check if adjacent
    const rowDiff = Math.abs(selectedPiece.row - row);
    const colDiff = Math.abs(selectedPiece.col - col);
    
    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      console.log(`Attempting swap: [${selectedPiece.row}, ${selectedPiece.col}] with [${row}, ${col}]`);
      
      // Create a temporary board to test the swap
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
      
      // Check if this swap creates matches
      const matches = findMatches(testBoard);
      
      if (matches.length > 0) {
        console.log(`Valid swap - will create ${matches.length} matches`);
        // Valid move - apply the swap
        playSwapSound();
        setBoard(testBoard);
        setMoves(moves - 1);
        setSelectedPiece(null);
      } else {
        console.log('Invalid swap - no matches created');
        // Invalid move - just deselect
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
      console.log(`Selected new piece at [${row}, ${col}]`);
    }
  }, [selectedPiece, isAnimating, moves, gameComplete, board, findMatches]);

  // Handle drag start
  const handleDragStart = useCallback((row: number, col: number, clientX: number, clientY: number) => {
    if (isAnimating || moves <= 0 || gameComplete) return;
    
    setIsDragging(true);
    setDragStart({ row, col });
    setSelectedPiece({ row, col });
    setDragOffset({ x: 0, y: 0 });
    playSelectSound();
  }, [isAnimating, moves, gameComplete, playSelectSound]);

  // Handle drag move
  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || !dragStart) return;
    
    // Calculate drag offset (you might want to adjust this based on your grid size)
    const newOffset = { x: clientX, y: clientY };
    setDragOffset(newOffset);
  }, [isDragging, dragStart]);

  // Handle drag end
  const handleDragEnd = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || !dragStart) return;
    
    setIsDragging(false);
    
    // Calculate which direction was dragged with mobile-friendly thresholds
    const threshold = 25; // Reduced threshold for better mobile sensitivity
    const deltaX = clientX;
    const deltaY = clientY;
    
    let targetRow = dragStart.row;
    let targetCol = dragStart.col;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > threshold) {
        targetCol = deltaX > 0 ? dragStart.col + 1 : dragStart.col - 1;
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > threshold) {
        targetRow = deltaY > 0 ? dragStart.row + 1 : dragStart.row - 1;
      }
    }
    
    // Check bounds
    if (targetRow >= 0 && targetRow < BOARD_SIZE && targetCol >= 0 && targetCol < BOARD_SIZE) {
      // Trigger the swap
      handlePieceClick(targetRow, targetCol);
    } else {
      setSelectedPiece(null);
    }
    
    setDragStart(null);
    setDragOffset({ x: 0, y: 0 });
  }, [isDragging, dragStart, handlePieceClick]);

  // Mouse event handlers
  const handleMouseDown = useCallback((row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - rect.left - (rect.width / 16) * (col + 0.5);
    const startY = e.clientY - rect.top - (rect.height / 8) * (row + 0.5);
    handleDragStart(row, col, startX, startY);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && dragStart) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 16) * (dragStart.col + 0.5);
      const y = e.clientY - rect.top - (rect.height / 8) * (dragStart.row + 0.5);
      handleDragMove(x, y);
    }
  }, [isDragging, dragStart, handleDragMove]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (isDragging && dragStart) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 16) * (dragStart.col + 0.5);
      const y = e.clientY - rect.top - (rect.height / 8) * (dragStart.row + 0.5);
      handleDragEnd(x, y);
    }
  }, [isDragging, dragStart, handleDragEnd]);

  // Touch event handlers with improved mobile support
  const handleTouchStart = useCallback((row: number, col: number, e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = touch.clientX - rect.left - (rect.width / 16) * (col + 0.5);
    const startY = touch.clientY - rect.top - (rect.height / 8) * (row + 0.5);
    handleDragStart(row, col, startX, startY);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging && dragStart) {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = touch.clientX - rect.left - (rect.width / 16) * (dragStart.col + 0.5);
      const y = touch.clientY - rect.top - (rect.height / 8) * (dragStart.row + 0.5);
      handleDragMove(x, y);
    }
  }, [isDragging, dragStart, handleDragMove]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (isDragging && dragStart) {
      e.preventDefault();
      const touch = e.changedTouches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = touch.clientX - rect.left - (rect.width / 16) * (dragStart.col + 0.5);
      const y = touch.clientY - rect.top - (rect.height / 8) * (dragStart.row + 0.5);
      handleDragEnd(x, y);
    }
  }, [isDragging, dragStart, handleDragEnd]);
  // Initialize board on mount
  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);
  // Check for level completion and show fireworks once, prevent repeated show
  useEffect(() => {
    if (score >= targetScore && !gameComplete && !showFireworks && !hasShownFireworks) {
      console.log('Level completed! Score:', score);
      setGameComplete(true);
      setShowFireworks(true);
      setHasShownFireworks(true);
      playLevelCompleteSound();
      
      // Show fireworks and then call parent callback after 3 seconds
      setTimeout(() => {
        setShowFireworks(false);
        onLevelComplete();
      }, 3000);
    }
  }, [score, gameComplete, onLevelComplete, playLevelCompleteSound, targetScore, showFireworks, hasShownFireworks]);
  // Reset game state when level changes or when level is completed
  useEffect(() => {
    if (levelCompleted) {
      setGameComplete(false);
      setShowFireworks(false);
    }
  }, [levelCompleted]);
  // Reset fireworks shown flag and initialize board when level changes
  useEffect(() => {
    if (currentLevel > 1) {
      console.log(`Starting new level ${currentLevel}`);
      setHasShownFireworks(false);
      initializeBoard();
    }
  }, [currentLevel, initializeBoard]);
  const getMithaiInfo = (type: string) => {
    return MITHAI_TYPES.find(m => m.id === type) || MITHAI_TYPES[0];
  };
  return (
    <Card className="p-3 sm:p-6 bg-gradient-warm shadow-festive w-full max-w-lg mx-auto">
      <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
        <div className="flex gap-2 sm:gap-4">
          <Badge variant="secondary" className="text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2">
            Score: {score}
          </Badge>
          <Badge variant="outline" className="text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2">
            Moves: {moves}
          </Badge>
        </div>
        <Button 
          variant="festival" 
          size="sm"
          onClick={() => {
            playClickSound();
            initializeBoard();
          }}
          className="text-xs sm:text-sm px-2 sm:px-3"
        >
          🔄 New Game
        </Button>
      </div>
      <div 
        className="grid grid-cols-8 gap-1 w-full bg-white/50 p-2 sm:p-4 rounded-lg shadow-game relative select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          touchAction: 'none', // Prevent default touch behaviors like scrolling
          userSelect: 'none'
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const mithai = getMithaiInfo(piece.type);
            const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;
            const isDraggedPiece = isDragging && dragStart?.row === rowIndex && dragStart?.col === colIndex;
            
            return (
              <button
                key={piece.id}
                onClick={() => !isDragging && handlePieceClick(rowIndex, colIndex)}
                onMouseDown={(e) => handleMouseDown(rowIndex, colIndex, e)}
                onTouchStart={(e) => handleTouchStart(rowIndex, colIndex, e)}
                className={`
                  aspect-square bg-white rounded-md sm:rounded-lg border-2 transition-all duration-200 
                  hover:scale-105 hover:shadow-md active:scale-95 touch-manipulation select-none
                  min-h-[40px] min-w-[40px] sm:min-h-[50px] sm:min-w-[50px] relative
                  ${isSelected ? 'border-primary ring-2 ring-primary/50 scale-105' : 'border-border'}
                  ${isAnimating ? 'pointer-events-none opacity-75' : ''}
                  ${isDraggedPiece ? 'z-10 shadow-lg' : ''}
                `}
                style={{
                  transform: isDraggedPiece 
                    ? `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(1.1)` 
                    : undefined,
                  zIndex: isDraggedPiece ? 20 : undefined,
                  touchAction: 'none',
                  userSelect: 'none'
                }}
                disabled={isAnimating}
              >
                {piece.type && (
                  <img 
                    src={mithai.image} 
                    alt={mithai.name}
                    className="w-full h-full object-contain p-0.5 sm:p-1 pointer-events-none select-none"
                    draggable={false}
                    style={{
                      touchAction: 'none',
                      userSelect: 'none'
                    }}
                  />
                )}
              </button>
            );
          })
        )}
      </div>
      {(moves <= 0 || gameComplete) && (
        <div className="mt-4 text-center">
          <Button variant="hero" onClick={() => {
            playClickSound();
            initializeBoard();
          }}>
            🎮 Play Again
          </Button>
        </div>
      )}
      
      <Fireworks 
        show={showFireworks} 
        onComplete={() => setShowFireworks(false)} 
        nextLevel={currentLevel + 1}
        onNextLevel={onFireworksNextLevel}
        onStayHere={onFireworksStayHere}
      />
    </Card>
  );
};
