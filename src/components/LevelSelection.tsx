import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSound } from "@/hooks/useSound";
import { Lock, Star, Trophy } from "lucide-react";

interface LevelSelectionProps {
  completedLevels: number[];
  currentLevel: number;
  onLevelSelect: (level: number) => void;
  onBack: () => void;
}

const LOCATIONS = [
  { name: "Jaipur", icon: "🏰", color: "bg-rose-100" },
  { name: "Kolkata", icon: "🏛️", color: "bg-yellow-100" },
  { name: "Varanasi", icon: "🕌", color: "bg-orange-100" },
  { name: "Goa", icon: "🏖️", color: "bg-blue-100" },
  { name: "Kashmir", icon: "🏔️", color: "bg-green-100" },
  { name: "Mumbai", icon: "🌆", color: "bg-purple-100" },
  { name: "Delhi", icon: "🏛️", color: "bg-red-100" },
  { name: "Chennai", icon: "🛕", color: "bg-indigo-100" },
  { name: "Bangalore", icon: "🌸", color: "bg-pink-100" },
  { name: "Hyderabad", icon: "💎", color: "bg-cyan-100" },
  { name: "Pune", icon: "🎭", color: "bg-teal-100" },
  { name: "Ahmedabad", icon: "🎨", color: "bg-amber-100" },
  { name: "Lucknow", icon: "👑", color: "bg-emerald-100" },
  { name: "Udaipur", icon: "🏞️", color: "bg-sky-100" },
  { name: "Agra", icon: "🕌", color: "bg-violet-100" },
  { name: "Amritsar", icon: "⭐", color: "bg-orange-100" },
  { name: "Mysore", icon: "🌺", color: "bg-rose-100" },
  { name: "Kochi", icon: "🌴", color: "bg-green-100" },
  { name: "Rishikesh", icon: "🧘", color: "bg-blue-100" },
  { name: "Pushkar", icon: "🐪", color: "bg-yellow-100" },
];

export const LevelSelection: React.FC<LevelSelectionProps> = ({
  completedLevels,
  currentLevel,
  onLevelSelect,
  onBack
}) => {
  const { playClickSound } = useSound();
  const isLevelUnlocked = (level: number) => {
    return level === 1 || completedLevels.includes(level - 1);
  };

  const isLevelCompleted = (level: number) => {
    return completedLevels.includes(level);
  };

  const getLevelStars = (level: number) => {
    // Simple star calculation based on level completion
    return isLevelCompleted(level) ? 3 : 0;
  };

  const getLocationForLevel = (level: number) => {
    const locationIndex = Math.floor((level - 1) / 5);
    return LOCATIONS[locationIndex] || LOCATIONS[LOCATIONS.length - 1];
  };

  return (
    <div className="min-h-screen p-4 pattern-dots">
      <div className="max-w-6xl mx-auto">
        <Card className="p-6 bg-gradient-festival shadow-festive mb-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2 animate-float">
              🗺️ Level Selection 🗺️
            </h1>
            <p className="text-white/90 mb-4 text-lg">
              Journey Through India's Sweet Adventures!
            </p>
            <Button 
              variant="celebration" 
              onClick={() => {
                playClickSound();
                onBack();
              }}
              className="mb-4"
            >
              ← Back to Game
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 100 }, (_, i) => {
            const level = i + 1;
            const location = getLocationForLevel(level);
            const unlocked = isLevelUnlocked(level);
            const completed = isLevelCompleted(level);
            const stars = getLevelStars(level);
            const isCurrent = level === currentLevel;

            return (
              <Card 
                key={level}
                className={`
                  p-4 transition-all duration-200 hover:scale-105 cursor-pointer
                  ${unlocked ? 'bg-white shadow-md hover:shadow-lg' : 'bg-gray-100 opacity-60'}
                  ${isCurrent ? 'ring-2 ring-primary border-primary' : ''}
                  ${completed ? 'bg-gradient-subtle border-gold' : ''}
                `}
                onClick={() => {
                  if (unlocked) {
                    playClickSound();
                    onLevelSelect(level);
                  }
                }}
              >
                <div className="text-center">
                  {/* Location Icon */}
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl mb-2 ${location.color}`}>
                    {unlocked ? location.icon : <Lock className="w-6 h-6 text-gray-400" />}
                  </div>

                  {/* Level Number */}
                  <div className="font-bold text-lg mb-1">
                    Level {level}
                  </div>

                  {/* Location Name */}
                  <div className="text-sm text-muted-foreground mb-2">
                    {location.name}
                  </div>

                  {/* Stars or Status */}
                  {unlocked ? (
                    <div className="flex justify-center items-center gap-1">
                      {completed ? (
                        <>
                          {Array.from({ length: stars }, (_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Trophy className="w-4 h-4 text-gold ml-1" />
                        </>
                      ) : isCurrent ? (
                        <Badge variant="secondary" className="text-xs">Current</Badge>
                      ) : (
                        <div className="flex gap-1">
                          {Array.from({ length: 3 }, (_, i) => (
                            <Star key={i} className="w-4 h-4 text-gray-300" />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs opacity-60">
                      Locked
                    </Badge>
                  )}

                  {/* Play Button */}
                  {unlocked && (
                    <Button 
                      variant={completed ? "celebration" : isCurrent ? "festival" : "outline"}
                      size="sm" 
                      className="mt-3 w-full text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound();
                        onLevelSelect(level);
                      }}
                    >
                      {completed ? "Replay" : isCurrent ? "Continue" : "Play"}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Progress Summary */}
        <Card className="mt-6 p-4 bg-gradient-warm">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">Your Progress</h3>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-gold" />
                <span>Completed: {completedLevels.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Stars: {completedLevels.length * 3}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">Current Level: {currentLevel}</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};