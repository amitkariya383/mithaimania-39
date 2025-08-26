import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useSound } from "@/hooks/useSound";

const About: React.FC = () => {
  const navigate = useNavigate();
  const { playClickSound } = useSound();

  return (
    <div className="min-h-screen p-4 pattern-mandala">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-gradient-warm shadow-festive">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gradient-festival mb-4">
              🍯 About Mithai Mania 🍯
            </h1>
            <p className="text-xl text-muted-foreground">
              A Sweet Journey Through Indian Culture
            </p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                🎮 What is Mithai Mania?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Mithai Mania is an exciting match-3 puzzle game that celebrates the rich tradition of Indian sweets (mithai). 
                Our game combines the addictive gameplay of classic puzzle games with the vibrant colors and flavors of 
                traditional Indian confections like Laddoo, Barfi, Jalebi, Rasgulla, Peda, and Halwa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                🏛️ Cultural Journey
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Travel through 100 levels across 20 iconic Indian cities including Jaipur, Mumbai, Delhi, Varanasi, 
                and many more. Each location brings its own unique charm and challenges, celebrating the diversity 
                and beauty of Indian culture.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                🎯 Game Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-white/50">
                  <Badge variant="secondary" className="mb-2">Difficulty Modes</Badge>
                  <p className="text-sm text-muted-foreground">
                    Choose from Easy, Moderate, or Hard difficulty levels to match your skill level.
                  </p>
                </Card>
                <Card className="p-4 bg-white/50">
                  <Badge variant="secondary" className="mb-2">100 Levels</Badge>
                  <p className="text-sm text-muted-foreground">
                    Explore 20 beautiful Indian cities with 5 levels each, totaling 100 exciting challenges.
                  </p>
                </Card>
                <Card className="p-4 bg-white/50">
                  <Badge variant="secondary" className="mb-2">Authentic Sweets</Badge>
                  <p className="text-sm text-muted-foreground">
                    Match real Indian sweets with beautiful, authentic imagery and names.
                  </p>
                </Card>
                <Card className="p-4 bg-white/50">
                  <Badge variant="secondary" className="mb-2">Cultural Celebration</Badge>
                  <p className="text-sm text-muted-foreground">
                    Experience the joy and colors of Indian festivals through engaging gameplay.
                  </p>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                🎪 Our Mission
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe in celebrating culture through gaming. Mithai Mania is designed to bring joy, 
                preserve tradition, and introduce players worldwide to the sweetness of Indian culture. 
                Every match you make is a celebration of the rich heritage of Indian sweets and festivals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                🌟 Join the Sweet Adventure
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you're a puzzle game enthusiast or someone looking to explore Indian culture, 
                Mithai Mania offers an engaging and educational experience for players of all ages. 
                Start your sweet journey today!
              </p>
            </section>
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => {
                playClickSound();
                navigate('/');
              }}
            >
              🎮 Start Playing Now
            </Button>
          </div>

          <div className="text-center mt-6">
            <Button 
              variant="ghost"
              onClick={() => {
                playClickSound();
                navigate('/');
              }}
            >
              ← Back to Home
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;