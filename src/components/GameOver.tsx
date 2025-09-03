import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSound } from "@/hooks/useSound";

interface GameOverProps {
  score: number;
  targetScore: number;
  isLevelComplete: boolean;
  onPlayAgain: () => void;
  onNextLevel?: () => void;
  show: boolean;
}

export const GameOver: React.FC<GameOverProps> = ({
  score,
  targetScore,
  isLevelComplete,
  onPlayAgain,
  onNextLevel,
  show
}) => {
  const { playClickSound } = useSound();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      // Small delay for smooth animation
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [show]);

  if (!show) return null;

  const scorePercentage = Math.round((score / targetScore) * 100);
  const isClose = scorePercentage >= 80;

  return (
    <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Card className={`relative p-8 bg-gradient-to-br from-background via-background/95 to-primary/5 shadow-2xl text-center max-w-lg w-full border-2 border-primary/20 transform transition-all duration-500 ${isVisible ? 'scale-100 translate-y-0' : 'scale-75 translate-y-8'}`}>
        
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent/30 rounded-full animate-pulse delay-300"></div>
        <div className="absolute -bottom-3 -left-2 w-5 h-5 bg-secondary/25 rounded-full animate-pulse delay-500"></div>
        <div className="absolute -bottom-4 -right-4 w-7 h-7 bg-primary/15 rounded-full animate-pulse delay-700"></div>

        <div className="mb-6">
          {isLevelComplete ? (
            <>
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
                Level Complete!
              </h2>
              <p className="text-muted-foreground text-lg">
                Fantastic! You crushed the target score!
              </p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4 filter grayscale">😔</div>
              <h2 className="text-3xl font-bold text-destructive mb-3 animate-pulse">
                Game Over
              </h2>
              <p className="text-muted-foreground text-base mb-2">
                {isClose ? "So close! You almost made it!" : "No more moves left!"}
              </p>
              <p className="text-sm text-muted-foreground/80">
                {isClose ? "Just a little more next time!" : "Better luck next time!"}
              </p>
            </>
          )}
        </div>

        {/* Score display with progress indication */}
        <div className="mb-8 space-y-4">
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge 
              variant="secondary" 
              className={`text-xl px-6 py-3 font-bold transition-all duration-300 ${
                score >= targetScore ? 'bg-green-500/20 text-green-700 border-green-500/30' : 
                isClose ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30' :
                'bg-red-500/20 text-red-700 border-red-500/30'
              }`}
            >
              Score: {score}
            </Badge>
            <Badge variant="outline" className="text-xl px-6 py-3 font-bold border-primary/30">
              Target: {targetScore}
            </Badge>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                score >= targetScore ? 'bg-gradient-to-r from-green-500 to-green-600' :
                isClose ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                'bg-gradient-to-r from-red-500 to-red-600'
              }`}
              style={{ width: `${Math.min(scorePercentage, 100)}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {scorePercentage}% of target achieved
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            variant="hero" 
            size="lg"
            className="px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform"
            onClick={() => {
              playClickSound();
              onPlayAgain();
            }}
          >
            🎮 Play Again
          </Button>
          
          {isLevelComplete && onNextLevel && (
            <Button 
              variant="celebration" 
              size="lg"
              className="px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform animate-pulse"
              onClick={() => {
                playClickSound();
                onNextLevel();
              }}
            >
              ➡️ Next Level
            </Button>
          )}
        </div>

        {/* Motivational message for close attempts */}
        {!isLevelComplete && isClose && (
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-primary font-medium">
              💪 You were so close! Try a different strategy!
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};