import { Card } from './cards';

export interface SpiderGameState {
  score: number;
  moves: number;
  startTime: number;
  isComplete: boolean;
  tableauPiles: Card[][];
  foundationPiles: Card[][];
  stock: Card[][];  // Groups of 10 cards for dealing
  difficulty: SpiderDifficulty;
  mode: SpiderMode;
  bestScores: Record<SpiderDifficulty, number>;
  gamesPlayed: number;
  gamesWon: number;
}

export type SpiderDifficulty = 'beginner' | 'medium' | 'expert';
export type SpiderMode = '1-suit' | '2-suits' | '4-suits';

export interface SpiderGameAction {
  type: 'move';
  from: {
    type: 'tableau';
    index: number;
    cardIndex: number;
  };
  to: {
    type: 'tableau' | 'foundation';
    index: number;
  };
  cards: Card[];
}

export const isValidSpiderTableauMove = (cards: Card[], targetPile: Card[]): boolean => {
  const [firstCard] = cards;
  
  if (targetPile.length === 0) {
    return true; // Any card can be placed on an empty tableau
  }
  
  const topCard = targetPile[targetPile.length - 1];
  return getRankValue(firstCard.rank) === getRankValue(topCard.rank) - 1;
};

export const isValidSpiderFoundationMove = (cards: Card[]): boolean => {
  if (cards.length !== 13) return false;

  const suit = cards[0].suit;
  let expectedRank = 13; // Start with King

  return cards.every(card => {
    if (card.suit !== suit || getRankValue(card.rank) !== expectedRank) {
      return false;
    }
    expectedRank--;
    return true;
  });
};

export const checkSpiderWinCondition = (foundationPiles: Card[][]): boolean => {
  return foundationPiles.length === 8; // 8 complete sequences
};

export const calculateSpiderScore = (state: SpiderGameState): number => {
  const timeBonus = Math.max(0, 1000000 - (Date.now() - state.startTime)) / 1000;
  const difficultyMultiplier = {
    beginner: 1,
    medium: 1.5,
    expert: 2
  }[state.difficulty];
  
  return Math.floor((state.score + timeBonus) * difficultyMultiplier);
};

function getRankValue(rank: string): number {
  const rankValues: Record<string, number> = {
    'K': 13, 'Q': 12, 'J': 11, '10': 10, '9': 9,
    '8': 8, '7': 7, '6': 6, '5': 5, '4': 4,
    '3': 3, '2': 2, 'A': 1
  };
  return rankValues[rank];
}

export { SpiderSolitaire };