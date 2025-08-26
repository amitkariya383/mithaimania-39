import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Target, Award, ArrowLeft } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface LeaderboardProps {
  totalScore: number;
  currentLevel: number;
  completedLevels: number[];
  onBack: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ 
  totalScore, 
  currentLevel, 
  completedLevels, 
  onBack 
}) => {
  const { playClickSound } = useSound();

  const getAchievements = () => {
    const achievements = [];
    
    if (completedLevels.length >= 5) {
      achievements.push({ icon: "🎯", title: "Sweet Starter", desc: "Complete 5 levels" });
    }
    if (completedLevels.length >= 10) {
      achievements.push({ icon: "🍯", title: "Mithai Master", desc: "Complete 10 levels" });
    }
    if (completedLevels.length >= 15) {
      achievements.push({ icon: "👑", title: "Festival King", desc: "Complete 15 levels" });
    }
    if (totalScore >= 5000) {
      achievements.push({ icon: "💎", title: "Score Champion", desc: "Reach 5000 points" });
    }
    if (totalScore >= 10000) {
      achievements.push({ icon: "🌟", title: "Sweet Legend", desc: "Reach 10000 points" });
    }

    return achievements;
  };

  const achievements = getAchievements();
  const progressPercentage = Math.min((completedLevels.length / 25) * 100, 100);

  return (
    <div className="min-h-screen p-4 pattern-dots">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              playClickSound();
              onBack();
            }}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold text-gradient-festival">
            🏆 Game Summary
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Main Stats Card */}
          <Card className="bg-gradient-festival shadow-festive">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                Game Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Total Score:</span>
                  <Badge variant="secondary" className="text-xl px-4 py-2 bg-white/20 text-white">
                    {totalScore.toLocaleString()}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg">Current Level:</span>
                  <Badge variant="secondary" className="text-xl px-4 py-2 bg-white/20 text-white">
                    {currentLevel}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg">Levels Completed:</span>
                  <Badge variant="secondary" className="text-xl px-4 py-2 bg-white/20 text-white">
                    {completedLevels.length} / 25
                  </Badge>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{progressPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-white h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements Card */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {achievements.length > 0 ? (
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h3 className="font-semibold text-primary">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Complete levels and score points to unlock achievements!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Level Details */}
          <Card className="shadow-game md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-accent" />
                Level Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {Array.from({ length: 25 }, (_, i) => i + 1).map((level) => {
                  const isCompleted = completedLevels.includes(level);
                  const isCurrent = level === currentLevel;
                  
                  return (
                    <div 
                      key={level}
                      className={`
                        w-12 h-12 rounded-lg flex items-center justify-center text-sm font-semibold border-2 transition-all
                        ${isCompleted 
                          ? 'bg-primary text-primary-foreground border-primary shadow-warm' 
                          : isCurrent 
                            ? 'bg-accent text-accent-foreground border-accent animate-pulse'
                            : 'bg-muted text-muted-foreground border-border'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Star className="w-4 h-4" />
                      ) : (
                        level
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-accent rounded animate-pulse"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded"></div>
                  <span>Locked</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fun Stats */}
          <Card className="shadow-warm md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-6 h-6 text-festival-orange" />
                Sweet Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{completedLevels.length}</div>
                  <div className="text-sm text-muted-foreground">Levels Won</div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-accent">{Math.max(0, currentLevel - 1)}</div>
                  <div className="text-sm text-muted-foreground">Best Level</div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-festival-orange">
                    {completedLevels.length > 0 ? Math.round(totalScore / completedLevels.length) : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Score</div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-secondary">{achievements.length}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            🎯 Keep playing to unlock more achievements and climb the sweet leaderboard!
          </p>
        </div>
      </div>
    </div>
  );
};