import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/useSound";
import { useSoundContext } from "@/contexts/SoundContext";
import { DifficultyMode } from "@/components/DifficultySelection";

interface GameHeaderProps {
  level: number;
  score: number;
  difficulty: DifficultyMode;
  onLevelSelect: () => void;
  onShowLeaderboard: () => void;
  onChangeDifficulty: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ level, score, difficulty, onLevelSelect, onShowLeaderboard, onChangeDifficulty }) => {
  const { playClickSound } = useSound();
  const { isSoundEnabled, toggleSound } = useSoundContext();
  return (
    <Card className="p-3 sm:p-6 bg-gradient-festival shadow-festive mb-4 sm:mb-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 animate-float">
          🍯 Mithai Mania 🍯
        </h1>
        <p className="text-white/90 mb-3 sm:mb-4 text-sm sm:text-lg">
          Match & Celebrate the Festival of Sweets!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 items-center">
          <div className="flex gap-2 sm:gap-4 items-center">
            <Badge variant="secondary" className="text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2 bg-white/20 text-white border-white/30">
              Level {level}
            </Badge>
            <Badge variant="secondary" className="text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2 bg-white/20 text-white border-white/30">
              Score: {score}
            </Badge>
          </div>
          <div className="flex gap-1 sm:gap-2 items-center flex-wrap justify-center">
            <Button 
              variant={isSoundEnabled ? "celebration" : "outline"} 
              size="sm"
              onClick={() => {
                playClickSound();
                toggleSound();
              }}
              className={isSoundEnabled 
                ? "text-xs sm:text-sm px-2 sm:px-3" 
                : "bg-white/10 text-white border-white/30 hover:bg-white/20 text-xs sm:text-sm px-2 sm:px-3"
              }
            >
              {isSoundEnabled ? "🎵" : "🔇"}
            </Button>
            <Button 
              variant="celebration" 
              size="sm"
              onClick={() => {
                playClickSound();
                onLevelSelect();
              }}
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              📍 Levels
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                playClickSound();
                onShowLeaderboard();
              }}
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-xs sm:text-sm px-2 sm:px-3"
            >
              🏆 Summary
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                playClickSound();
                onChangeDifficulty();
              }}
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-xs sm:text-sm px-2 sm:px-3"
            >
              ⚙️ {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};