import React, { useEffect, useState } from 'react';

interface FireworksProps {
  show: boolean;
  onComplete?: () => void;
  nextLevel?: number;
  onNextLevel?: () => void;
  onStayHere?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export const Fireworks: React.FC<FireworksProps> = ({ show, onComplete, nextLevel, onNextLevel, onStayHere }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showButtons, setShowButtons] = useState(false);

  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(45, 86%, 62%)', // Golden
    'hsl(320, 75%, 70%)', // Pink
    'hsl(195, 100%, 60%)', // Cyan
    'hsl(120, 75%, 60%)', // Green
  ];

  const createExplosion = (x: number, y: number) => {
    const newParticles: Particle[] = [];
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 2 + Math.random() * 4;
      const life = 60 + Math.random() * 40;
      
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life,
        maxLife: life,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 3,
      });
    }
    
    return newParticles;
  };

  useEffect(() => {
    if (!show) {
      setParticles([]);
      setShowButtons(false);
      return;
    }

    // Create multiple explosions
    const explosions = [
      { x: 20, y: 30, delay: 0 },
      { x: 80, y: 25, delay: 200 },
      { x: 50, y: 40, delay: 400 },
      { x: 30, y: 20, delay: 600 },
      { x: 70, y: 35, delay: 800 },
    ];

    explosions.forEach(({ x, y, delay }) => {
      setTimeout(() => {
        setParticles(prev => [
          ...prev,
          ...createExplosion(x, y)
        ]);
      }, delay);
    });

    // Show buttons after initial celebration - increased delay for better visibility
    const showBtns = setTimeout(() => {
      setShowButtons(true);
    }, 3500);

    return () => {
      clearTimeout(showBtns);
    };
  }, [show, onComplete, nextLevel]);

  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.1, // gravity
            life: particle.life - 1,
          }))
          .filter(particle => particle.life > 0)
      );
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(interval);
  }, [particles.length]);

  if (!show && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {particles.map(particle => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size * (particle.life / particle.maxLife)}
            fill={particle.color}
            opacity={particle.life / particle.maxLife}
          />
        ))}
      </svg>
      
      {/* Celebration text with buttons */}
      {show && !showButtons && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="text-center animate-scale-in bg-background/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-primary/20">
            <h2 className="text-4xl md:text-6xl font-bold text-primary animate-bounce drop-shadow-lg">
              🎉 Level Complete! 🎉
            </h2>
            <p className="text-xl md:text-2xl text-foreground mt-4 animate-fade-in font-semibold">
              Shabash! Well Done!
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="text-3xl animate-bounce" style={{animationDelay: '0s'}}>⭐</span>
              <span className="text-3xl animate-bounce" style={{animationDelay: '0.1s'}}>🎊</span>
              <span className="text-3xl animate-bounce" style={{animationDelay: '0.2s'}}>⭐</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Level complete with action buttons */}
      {show && showButtons && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm pointer-events-auto">
          <div className="text-center animate-scale-in bg-background/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-primary/20">
            <h2 className="text-3xl md:text-5xl font-bold text-primary drop-shadow-lg">
              🎊 Level Complete! 🎊
            </h2>
            <p className="text-lg md:text-xl text-foreground mt-4 font-semibold">
              Choose your next action:
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onNextLevel}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
              >
                🚀 Next Level {nextLevel || ''}
              </button>
              <button
                onClick={onStayHere}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors shadow-lg"
              >
                🔄 Replay Level
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};