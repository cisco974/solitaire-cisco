export type MemoryCard = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export type MemoryDifficulty = 'easy' | 'medium' | 'hard';

export interface MemoryGameState {
  cards: MemoryCard[];
  flippedCards: number[];
  matchedPairs: number;
  moves: number;
  score: number;
  startTime: number;
  isComplete: boolean;
  difficulty: MemoryDifficulty;
  bestScores: Record<MemoryDifficulty, number>;
  gamesPlayed: number;
  gamesWon: number;
}

export interface MemoryGameAction {
  type: 'flip' | 'match' | 'reset';
  cardId?: number;
  sourceState?: {
    cards: MemoryCard[];
    flippedCards: number[];
    matchedPairs: number;
  };
}

export const CARDS_PER_DIFFICULTY: Record<MemoryDifficulty, number> = {
  easy: 12, // 6 paires
  medium: 20, // 10 paires
  hard: 30 // 15 paires
};

export const CARD_VALUES = [
  '♠', '♥', '♦', '♣',
  '★', '☆', '♪', '♫',
  '☀', '☁', '☂', '☃',
  '☮', '☯', '☭', '☢',
  '⚛', '⚔', '⚡', '⚶'
];