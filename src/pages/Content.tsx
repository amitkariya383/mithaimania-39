import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useSound } from "@/hooks/useSound";

const Content: React.FC = () => {
  const navigate = useNavigate();
  const { playClickSound } = useSound();

  return (
    <div className="min-h-screen p-4 pattern-mandala">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-gradient-warm shadow-festive">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gradient-festival mb-4">
              📚 Game Content & Rules 📚
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything You Need to Know About Playing Mithai Mania
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                🎯 How to Play
              </h2>
              <div className="space-y-4">
                <Card className="p-4 bg-white/50">
                  <h3 className="font-semibold mb-2">1. Match 3 or More</h3>
                  <p className="text-muted-foreground">
                    Swap adjacent mithai (sweets) to create horizontal or vertical lines of 3 or more identical sweets.
                  </p>
                </Card>
                <Card className="p-4 bg-white/50">
                  <h3 className="font-semibold mb-2">2. Reach the Target Score</h3>
                  <p className="text-muted-foreground">
                    Complete each level by reaching the target score within the limited number of moves available.
                  </p>
                </Card>
                <Card className="p-4 bg-white/50">
                  <h3 className="font-semibold mb-2">3. Strategic Thinking</h3>
                  <p className="text-muted-foreground">
                    Plan your moves carefully! Each swap counts, and some combinations create bigger scoring opportunities.
                  </p>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                🏆 Difficulty Levels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-green-100 border-green-300">
                  <Badge variant="secondary" className="mb-2 bg-green-200">Easy Mode</Badge>
                  <ul className="text-sm space-y-1">
                    <li>• 50 moves per level</li>
                    <li>• 300 points to win</li>
                    <li>• Perfect for beginners</li>
                    <li>• More time to strategize</li>
                  </ul>
                </Card>
                <Card className="p-4 bg-yellow-100 border-yellow-300">
                  <Badge variant="secondary" className="mb-2 bg-yellow-200">Moderate Mode</Badge>
                  <ul className="text-sm space-y-1">
                    <li>• 30 moves per level</li>
                    <li>• 500 points to win</li>
                    <li>• Balanced challenge</li>
                    <li>• Great for practice</li>
                  </ul>
                </Card>
                <Card className="p-4 bg-red-100 border-red-300">
                  <Badge variant="secondary" className="mb-2 bg-red-200">Hard Mode</Badge>
                  <ul className="text-sm space-y-1">
                    <li>• 20 moves per level</li>
                    <li>• 700 points to win</li>
                    <li>• Expert level challenge</li>
                    <li>• Maximum difficulty</li>
                  </ul>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                🍬 Meet the Mithai
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4 bg-white/50 text-center">
                  <div className="text-3xl mb-2">🟡</div>
                  <h3 className="font-semibold">Laddoo</h3>
                  <p className="text-xs text-muted-foreground">Sweet round balls made with flour, ghee, and sugar</p>
                </Card>
                <Card className="p-4 bg-white/50 text-center">
                  <div className="text-3xl mb-2">⬜</div>
                  <h3 className="font-semibold">Barfi</h3>
                  <p className="text-xs text-muted-foreground">Dense milk-based confection cut into squares</p>
                </Card>
                <Card className="p-4 bg-white/50 text-center">
                  <div className="text-3xl mb-2">🟠</div>
                  <h3 className="font-semibold">Jalebi</h3>
                  <p className="text-xs text-muted-foreground">Crispy spiral-shaped sweet soaked in syrup</p>
                </Card>
                <Card className="p-4 bg-white/50 text-center">
                  <div className="text-3xl mb-2">⚪</div>
                  <h3 className="font-semibold">Rasgulla</h3>
                  <p className="text-xs text-muted-foreground">Soft spongy balls in light sugar syrup</p>
                </Card>
                <Card className="p-4 bg-white/50 text-center">
                  <div className="text-3xl mb-2">🟤</div>
                  <h3 className="font-semibold">Peda</h3>
                  <p className="text-xs text-muted-foreground">Round flattened sweet made with khoya</p>
                </Card>
                <Card className="p-4 bg-white/50 text-center">
                  <div className="text-3xl mb-2">🟡</div>
                  <h3 className="font-semibold">Halwa</h3>
                  <p className="text-xs text-muted-foreground">Dense sweet pudding with nuts and cardamom</p>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                🗺️ Journey Through India
              </h2>
              <p className="text-muted-foreground mb-4">
                Explore 20 beautiful Indian cities with 5 unique levels each:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <Badge variant="outline">🏰 Jaipur</Badge>
                <Badge variant="outline">🏛️ Kolkata</Badge>
                <Badge variant="outline">🕌 Varanasi</Badge>
                <Badge variant="outline">🏖️ Goa</Badge>
                <Badge variant="outline">🏔️ Kashmir</Badge>
                <Badge variant="outline">🌆 Mumbai</Badge>
                <Badge variant="outline">🏛️ Delhi</Badge>
                <Badge variant="outline">🛕 Chennai</Badge>
                <Badge variant="outline">🌸 Bangalore</Badge>
                <Badge variant="outline">💎 Hyderabad</Badge>
                <Badge variant="outline">🎭 Pune</Badge>
                <Badge variant="outline">🎨 Ahmedabad</Badge>
                <Badge variant="outline">👑 Lucknow</Badge>
                <Badge variant="outline">🏞️ Udaipur</Badge>
                <Badge variant="outline">🕌 Agra</Badge>
                <Badge variant="outline">⭐ Amritsar</Badge>
                <Badge variant="outline">🌺 Mysore</Badge>
                <Badge variant="outline">🌴 Kochi</Badge>
                <Badge variant="outline">🧘 Rishikesh</Badge>
                <Badge variant="outline">🐪 Pushkar</Badge>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                🎊 Scoring System
              </h2>
              <div className="space-y-2">
                <Card className="p-3 bg-white/50">
                  <p><strong>Basic Match (3 pieces):</strong> 30 points</p>
                </Card>
                <Card className="p-3 bg-white/50">
                  <p><strong>Good Match (4 pieces):</strong> 40 points</p>
                </Card>
                <Card className="p-3 bg-white/50">
                  <p><strong>Great Match (5+ pieces):</strong> 50+ points</p>
                </Card>
                <Card className="p-3 bg-white/50">
                  <p><strong>Level Completion Bonus:</strong> Level number × 100 points</p>
                </Card>
              </div>
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

export default Content;