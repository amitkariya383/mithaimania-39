export type ScoreType = 'match' | 'special-creation' | 'explosion' | 'combo';

export const SCORE_VALUES = {
  match: 10,           // Normal match = 10 points per candy
  'special-creation': 50,  // Special candy creation = 50 points
  explosion: 100,      // Special candy explosion = 100 points
  combo: 200,          // Special candy combination = 200 points
} as const;

export const calculateScore = (count: number, type: ScoreType): number => {
  const baseScore = SCORE_VALUES[type];
  
  switch (type) {
    case 'match':
      return baseScore * count;
    case 'special-creation':
      return baseScore;
    case 'explosion':
      return baseScore + (count * 5); // Bonus points for more pieces destroyed
    case 'combo':
      return baseScore * count; // Multiply by number of special candies involved
    default:
      return baseScore;
  }
};

export const getScoreMultiplier = (matchSize: number): number => {
  if (matchSize >= 5) return 2.0;
  if (matchSize >= 4) return 1.5;
  return 1.0;
};

export const calculateBonusScore = (
  consecutiveMatches: number,
  specialCandiesCreated: number,
  comboCount: number
): number => {
  let bonus = 0;
  
  // Consecutive match bonus
  if (consecutiveMatches > 1) {
    bonus += (consecutiveMatches - 1) * 25;
  }
  
  // Special candy creation bonus
  bonus += specialCandiesCreated * SCORE_VALUES['special-creation'];
  
  // Combo bonus
  if (comboCount > 0) {
    bonus += comboCount * SCORE_VALUES.combo;
  }
  
  return bonus;
};