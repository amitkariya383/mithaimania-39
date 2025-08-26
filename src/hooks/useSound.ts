import { useCallback, useEffect, useRef } from 'react';

export interface SoundOptions {
  volume?: number;
  loop?: boolean;
}

export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundCacheRef = useRef<Map<string, AudioBuffer>>(new Map());

  // Initialize AudioContext
  useEffect(() => {
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    // Initialize on first user interaction
    const handleFirstInteraction = () => {
      initAudioContext();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Create sound using Web Audio API
  const createOscillatorSound = useCallback((
    frequency: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume: number = 0.3
  ) => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, []);

  // Play match sound - uplifting chime
  const playMatchSound = useCallback(() => {
    if (!audioContextRef.current) return;
    
    // Play a pleasant chord
    createOscillatorSound(523.25, 0.3, 'sine', 0.2); // C5
    setTimeout(() => createOscillatorSound(659.25, 0.3, 'sine', 0.15), 50); // E5
    setTimeout(() => createOscillatorSound(783.99, 0.4, 'sine', 0.1), 100); // G5
  }, [createOscillatorSound]);

  // Play level complete sound - celebration
  const playLevelCompleteSound = useCallback(() => {
    if (!audioContextRef.current) return;
    
    // Triumphant ascending melody
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00]; // C5 to A5
    notes.forEach((freq, index) => {
      setTimeout(() => createOscillatorSound(freq, 0.3, 'triangle', 0.25), index * 100);
    });
  }, [createOscillatorSound]);

  // Play button click sound
  const playClickSound = useCallback(() => {
    if (!audioContextRef.current) return;
    createOscillatorSound(800, 0.1, 'square', 0.1);
  }, [createOscillatorSound]);

  // Play error sound
  const playErrorSound = useCallback(() => {
    if (!audioContextRef.current) return;
    createOscillatorSound(200, 0.3, 'sawtooth', 0.15);
  }, [createOscillatorSound]);

  // Play piece select sound
  const playSelectSound = useCallback(() => {
    if (!audioContextRef.current) return;
    createOscillatorSound(1000, 0.1, 'sine', 0.08);
  }, [createOscillatorSound]);

  // Play swap sound
  const playSwapSound = useCallback(() => {
    if (!audioContextRef.current) return;
    createOscillatorSound(600, 0.2, 'triangle', 0.12);
  }, [createOscillatorSound]);

  return {
    playMatchSound,
    playLevelCompleteSound,
    playClickSound,
    playErrorSound,
    playSelectSound,
    playSwapSound,
  };
};