import React, { useState } from 'react';
import { CandyGameBoard } from '@/components/CandyGameBoard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const CandyGame: React.FC = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handleScoreUpdate = (score: number) => {
    setTotalScore(score);
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setTotalScore(0);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        <Card className="p-8 bg-gradient-to-br from-background via-background/95 to-primary/5 shadow-2xl text-center max-w-md">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-primary mb-2">🍭 Candy Crush</h1>
            <p className="text-muted-foreground">
              Match 3 or more candies to score points and create special candies!
            </p>
          </div>
          
          <div className="mb-6 text-left space-y-2 text-sm">
            <div className="p-3 bg-muted/50 rounded-lg">
              <strong>Special Candies:</strong>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• 4 in a row → Striped Candy (clears row/column)</li>
                <li>• 5 in a line → Color Bomb (clears all same color)</li>
                <li>• L/T shape → Wrapped Candy (3x3 explosion)</li>
              </ul>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <strong>Scoring:</strong>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• Normal match: 10 points per candy</li>
                <li>• Special candy creation: 50 points</li>
                <li>• Special candy explosion: 100+ points</li>
              </ul>
            </div>
          </div>
          
          <Button onClick={handleStartGame} size="lg" className="w-full">
            🚀 Start Playing
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <Badge variant="secondary" className="text-2xl px-6 py-3">
          Total Score: {totalScore}
        </Badge>
      </div>
      
      <CandyGameBoard onScoreUpdate={handleScoreUpdate} />
      
      <div className="mt-4 flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => setGameStarted(false)}
        >
          🏠 Menu
        </Button>
      </div>
    </div>
  );
};