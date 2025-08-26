import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/useSound";

interface GameHeaderProps {
  level: number;
  score: number;
  onLevelSelect: () => void;
  onShowLeaderboard: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ level, score, onLevelSelect, onShowLeaderboard }) => {
  const { playClickSound } = useSound();
  return (
    <Card className="p-6 bg-gradient-festival shadow-festive mb-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2 animate-float">
          🍯 Mithai Mania 🍯
        </h1>
        <p className="text-white/90 mb-4 text-lg">
          Match & Celebrate the Festival of Sweets!
        </p>
        
        <div className="flex justify-center gap-4 items-center">
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 text-white border-white/30">
            Level {level}
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 text-white border-white/30">
            Total Score: {score}
          </Badge>
          <Button 
            variant="celebration" 
            size="sm"
            onClick={() => {
              playClickSound();
              onLevelSelect();
            }}
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
            className="bg-white/10 text-white border-white/30 hover:bg-white/20"
          >
            🏆 Summary
          </Button>
        </div>
      </div>
    </Card>
  );
};