import React from "react";
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

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="p-6 bg-gradient-warm shadow-festive text-center max-w-md w-full">
        <div className="mb-4">
          {isLevelComplete ? (
            <>
              <h2 className="text-2xl font-bold text-primary mb-2">🎉 Level Complete!</h2>
              <p className="text-muted-foreground mb-4">
                Congratulations! You reached the target score!
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-destructive mb-2">😔 Game Over</h2>
              <p className="text-muted-foreground mb-4">
                No more moves left! Better luck next time!
              </p>
            </>
          )}
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Score: {score}
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Target: {targetScore}
          </Badge>
        </div>

        <div className="flex gap-3 justify-center">
          <Button 
            variant="hero" 
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
              onClick={() => {
                playClickSound();
                onNextLevel();
              }}
            >
              ➡️ Next Level
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};