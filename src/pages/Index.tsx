import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { DifficultySelection, DifficultyMode } from "@/components/DifficultySelection";
import { GameHeader } from "@/components/GameHeader";
import { GameBoard } from "@/components/GameBoard";
import { LevelSelection } from "@/components/LevelSelection";
import { Leaderboard } from "@/components/Leaderboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AdBanner from "@/components/AdBanner";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [showDifficultySelection, setShowDifficultySelection] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyMode>('moderate');
  const [showLevelSelection, setShowLevelSelection] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [levelScore, setLevelScore] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [levelCompletedShown, setLevelCompletedShown] = useState(false);

  const handleStartGame = useCallback(() => {
    setShowDifficultySelection(true);
  }, []);

  const handleDifficultySelect = useCallback((difficulty: DifficultyMode) => {
    setSelectedDifficulty(difficulty);
    setShowDifficultySelection(false);
    setGameStarted(true);
    
    const difficultyMessages = {
      easy: "🌟 Easy mode selected! Take your time and enjoy!",
      moderate: "⚖️ Moderate mode selected! Perfect balance of fun and challenge!",
      hard: "🔥 Hard mode selected! Show us what you've got!"
    };
    
    toast(difficultyMessages[difficulty], {
      description: "Match 3 or more mithai to score points and complete levels!",
    });
  }, []);

  const handleScoreUpdate = useCallback((score: number) => {
    setLevelScore(score);
  }, []);

  const handleNextLevel = useCallback(() => {
    const nextLevel = currentLevel + 1;
    setCurrentLevel(nextLevel);
    setLevelCompleted(false);
    setLevelScore(0);
    setLevelCompletedShown(false); // Reset for next level
    
    toast(`🎯 Starting Level ${nextLevel}!`, {
      description: `New challenge awaits!`,
    });
  }, [currentLevel]);

  const handleLevelComplete = useCallback(() => {
    // Prevent multiple calls for same level completion
    if (levelCompletedShown) return;
    
    const bonus = currentLevel * 100;
    const newTotalScore = totalScore + levelScore + bonus;

    if (!completedLevels.includes(currentLevel)) {
      setCompletedLevels((prev) => [...prev, currentLevel]);
    }

    setTotalScore(newTotalScore);
    setLevelScore(0);
    setLevelCompleted(true);
    setLevelCompletedShown(true);

    // Fireworks will handle the UI for level completion
  }, [currentLevel, totalScore, levelScore, completedLevels, levelCompletedShown]);

  const handleFireworksNextLevel = useCallback(() => {
    handleNextLevel();
    setLevelCompleted(false);
    setLevelCompletedShown(false);
  }, [handleNextLevel]);

  const handleFireworksStayHere = useCallback(() => {
    setLevelCompleted(false);
    setLevelCompletedShown(false);
    toast("👍 Continue playing this level!", {
      description: "You can replay or try for a higher score"
    });
  }, []);

  const handleLevelSelectOpen = () => setShowLevelSelection(true);
  const handleLevelSelectClose = () => setShowLevelSelection(false);

  const handleLevelChange = (level: number) => {
    setCurrentLevel(level);
    setLevelScore(0);
    setLevelCompleted(false);
    setLevelCompletedShown(false); // Reset for new level
    setShowLevelSelection(false);
    toast(`🎯 Starting Level ${level}!`, {
      description: `Get ready for the challenge!`,
    });
  };

  const handleShowLeaderboard = () => setShowLeaderboard(true);
  const handleLeaderboardClose = () => setShowLeaderboard(false);

  const handleChangeDifficulty = useCallback(() => {
    setShowDifficultySelection(true);
  }, []);

  if (showDifficultySelection) {
    return (
      <DifficultySelection
        onDifficultySelect={handleDifficultySelect}
        onBack={() => setShowDifficultySelection(false)}
      />
    );
  }

  if (!gameStarted) {
    return (
      <WelcomeScreen 
        onStartGame={handleStartGame}
      />
    );
  }

  if (showLevelSelection) {
    return (
      <LevelSelection
        completedLevels={completedLevels}
        currentLevel={currentLevel}
        onLevelSelect={handleLevelChange}
        onBack={handleLevelSelectClose}
      />
    );
  }

  if (showLeaderboard) {
    return (
      <Leaderboard
        totalScore={totalScore}
        currentLevel={currentLevel}
        completedLevels={completedLevels}
        onBack={handleLeaderboardClose}
      />
    );
  }

  return (
    <div className="min-h-screen p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <GameHeader
          level={currentLevel}
          score={totalScore + levelScore}
          difficulty={selectedDifficulty}
          onLevelSelect={handleLevelSelectOpen}
          onShowLeaderboard={handleShowLeaderboard}
          onChangeDifficulty={handleChangeDifficulty}
        />

        <div className="flex justify-center">
          <GameBoard
            difficulty={selectedDifficulty}
            onScoreUpdate={handleScoreUpdate}
            onLevelComplete={handleLevelComplete}
            currentLevel={currentLevel}
            levelCompleted={levelCompleted}
            onFireworksNextLevel={handleFireworksNextLevel}
            onFireworksStayHere={handleFireworksStayHere}
          />
        </div>

        {/* ✅ Ad Banner */}
        <div className="my-4">
          <AdBanner />
        </div>

        <div className="mt-4 sm:mt-6 text-center text-muted-foreground px-2">
          <p className="text-xs sm:text-sm">🎯 Goal: Score {
            selectedDifficulty === 'easy' ? '300' : 
            selectedDifficulty === 'hard' ? '700' : '500'
          } points to complete the level</p>
          <p className="text-xs mt-1 sm:mt-2">
            Swap adjacent mithai to create matches of 3 or more
          </p>
          <div className="flex justify-center items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
            <Badge variant="outline" className="text-xs">
              Difficulty: {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-muted text-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <Button
              variant="link"
              className="text-muted-foreground hover:text-primary p-0 h-auto"
              onClick={() => navigate('/about')}
            >
              About
            </Button>
            <span className="text-muted-foreground hidden sm:inline">•</span>
            <Button
              variant="link"
              className="text-muted-foreground hover:text-primary p-0 h-auto"
              onClick={() => navigate('/content')}
            >
              Content
            </Button>
            <span className="text-muted-foreground hidden sm:inline">•</span>
            <Button
              variant="link"
              className="text-muted-foreground hover:text-primary p-0 h-auto"
              onClick={() => navigate('/privacy-policy')}
            >
              Privacy Policy
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 sm:mt-3 px-4">
            © 2024 Mithai Mania. Celebrating Indian sweets and culture through gaming.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
