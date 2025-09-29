import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import mithaiCollectionImg from "@/assets/mithai-collection.jpg";
import { useSound } from "@/hooks/useSound";
import { useSoundContext } from "@/contexts/SoundContext";

interface WelcomeScreenProps {
  onStartGame: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  const navigate = useNavigate();
  const { playClickSound } = useSound();
  const { isSoundEnabled, toggleSound } = useSoundContext();
  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 pattern-mandala">
      <Card className="max-w-2xl mx-auto p-4 sm:p-8 bg-gradient-warm shadow-festive">
        <div className="text-center">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-5xl font-bold text-gradient-festival mb-3 sm:mb-4 animate-float">
              🍯 Mithai Mania 🍯
            </h1>
            <h2 className="text-lg sm:text-2xl text-foreground mb-1 sm:mb-2">
              Match & Celebrate!
            </h2>
            <p className="text-muted-foreground text-sm sm:text-lg">
              Festival of Sweets - A Delicious Match-3 Adventure
            </p>
          </div>

          <div className="mb-4 sm:mb-6">
            <img 
              src={mithaiCollectionImg} 
              alt="Colorful Indian Sweets Collection"
              className="w-full max-w-[240px] sm:max-w-[280px] mx-auto rounded-lg shadow-warm"
            />
          </div>

          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
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
              className="w-full text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6"
              onClick={() => {
                playClickSound();
                onStartGame();
              }}
            >
              🎮 Start Sweet Adventure
            </Button>
            
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
              <Button 
                variant={isSoundEnabled ? "festival" : "outline"} 
                size="sm" 
                onClick={() => {
                  playClickSound();
                  toggleSound();
                }} 
                className="text-xs sm:text-sm"
              >
                {isSoundEnabled ? "🎵 Sound On" : "🔇 Sound Off"}
              </Button>
              <Button variant="celebration" size="sm" onClick={playClickSound} className="text-xs sm:text-sm">
                🏆 Leaderboard
              </Button>
              <Button variant="outline" size="sm" onClick={playClickSound} className="text-xs sm:text-sm">
                ⚙️ Settings
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 mb-6">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary text-sm"
                onClick={() => {
                  playClickSound();
                  navigate('/about');
                }}
              >
                About
              </Button>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary text-sm"
                onClick={() => {
                  playClickSound();
                  navigate('/content');
                }}
              >
                Content
              </Button>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary text-sm"
                onClick={() => {
                  playClickSound();
                  navigate('/contact');
                }}
              >
                Contact Us
              </Button>
              <Button
                variant="link"
                className="text-muted-foreground hover:text-primary text-sm"
                onClick={() => {
                  playClickSound();
                  navigate('/privacy-policy');
                }}
              >
                Privacy Policy
              </Button>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>Featuring: Laddoo • Barfi • Jalebi • Rasgulla • Peda • Halwa</p>
            <p className="mt-2">🎪 A celebration of Indian culture and sweetness 🎪</p>
          </div>
        </div>
      </Card>
    </div>
  );
};