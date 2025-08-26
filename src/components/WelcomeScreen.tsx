import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import mithaiCollectionImg from "@/assets/mithai-collection.jpg";
import { useSound } from "@/hooks/useSound";

interface WelcomeScreenProps {
  onStartGame: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  const { playClickSound } = useSound();
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pattern-mandala">
      <Card className="max-w-2xl mx-auto p-8 bg-gradient-warm shadow-festive">
        <div className="text-center">
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-gradient-festival mb-4 animate-float">
              🍯 Mithai Mania 🍯
            </h1>
            <h2 className="text-2xl text-foreground mb-2">
              Match & Celebrate!
            </h2>
            <p className="text-muted-foreground text-lg">
              Festival of Sweets - A Delicious Match-3 Adventure
            </p>
          </div>

          <div className="mb-8">
            <img 
              src={mithaiCollectionImg} 
              alt="Colorful Indian Sweets Collection"
              className="w-full max-w-md mx-auto rounded-lg shadow-warm"
            />
          </div>

          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="p-4 bg-white/50 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <p><strong>Match 3 or more</strong> delicious mithai to clear them and score points!</p>
              </div>
              <div className="p-4 bg-white/50 rounded-lg">
                <div className="text-2xl mb-2">🎊</div>
                <p><strong>Special power-ups</strong> themed as festival fireworks and celebrations!</p>
              </div>
              <div className="p-4 bg-white/50 rounded-lg">
                <div className="text-2xl mb-2">🏛️</div>
                <p><strong>Journey through</strong> iconic Indian locations and festivals!</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full text-xl px-12 py-6"
              onClick={() => {
                playClickSound();
                onStartGame();
              }}
            >
              🎮 Start Sweet Adventure
            </Button>
            
            <div className="flex justify-center gap-4">
              <Button variant="festival" size="sm" onClick={playClickSound}>
                🎵 Sound On
              </Button>
              <Button variant="celebration" size="sm" onClick={playClickSound}>
                🏆 Leaderboard
              </Button>
              <Button variant="outline" size="sm" onClick={playClickSound}>
                ⚙️ Settings
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>Featuring: Laddoo • Barfi • Jalebi • Rasgulla • Peda • Halwa</p>
            <p className="mt-2">🎪 A celebration of Indian culture and sweetness 🎪</p>
          </div>
        </div>
      </Card>
    </div>
  );
};