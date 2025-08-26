import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSound } from "@/hooks/useSound";

export type DifficultyMode = 'easy' | 'moderate' | 'hard';

interface DifficultySelectionProps {
  onDifficultySelect: (difficulty: DifficultyMode) => void;
  onBack: () => void;
}

const DIFFICULTY_MODES = [
  {
    id: 'easy' as DifficultyMode,
    name: 'Easy',
    icon: '😊',
    description: 'Perfect for beginners',
    features: ['50 Moves per level', '300 Points to win', 'More time to think'],
    color: 'bg-green-100 border-green-300',
    buttonVariant: 'outline' as const
  },
  {
    id: 'moderate' as DifficultyMode,
    name: 'Moderate',
    icon: '🤔',
    description: 'Balanced challenge',
    features: ['30 Moves per level', '500 Points to win', 'Good for practice'],
    color: 'bg-yellow-100 border-yellow-300',
    buttonVariant: 'festival' as const
  },
  {
    id: 'hard' as DifficultyMode,
    name: 'Hard',
    icon: '🔥',
    description: 'For expert players',
    features: ['20 Moves per level', '700 Points to win', 'Ultimate challenge'],
    color: 'bg-red-100 border-red-300',
    buttonVariant: 'celebration' as const
  }
];

export const DifficultySelection: React.FC<DifficultySelectionProps> = ({
  onDifficultySelect,
  onBack
}) => {
  const { playClickSound } = useSound();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pattern-mandala">
      <Card className="max-w-4xl mx-auto p-8 bg-gradient-warm shadow-festive">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient-festival mb-4 animate-float">
            🎯 Select Difficulty 🎯
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose your challenge level for the sweet adventure!
          </p>
          <Button 
            variant="ghost" 
            onClick={() => {
              playClickSound();
              onBack();
            }}
            className="mt-4"
          >
            ← Back to Welcome
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIFFICULTY_MODES.map((mode) => (
            <Card 
              key={mode.id}
              className={`p-6 transition-all duration-200 hover:scale-105 cursor-pointer border-2 ${mode.color}`}
              onClick={() => {
                playClickSound();
                onDifficultySelect(mode.id);
              }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{mode.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{mode.name}</h3>
                <p className="text-muted-foreground mb-4">{mode.description}</p>
                
                <div className="space-y-2 mb-6">
                  {mode.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="block text-sm">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button 
                  variant={mode.buttonVariant}
                  className="w-full text-lg py-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickSound();
                    onDifficultySelect(mode.id);
                  }}
                >
                  Select {mode.name} 🎮
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>💡 You can change difficulty anytime from the settings</p>
        </div>
      </Card>
    </div>
  );
};