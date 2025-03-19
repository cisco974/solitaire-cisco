import { Card, Suit, Rank } from './cards';

export interface FreeCellGameState {
  score: number;
  moves: number;
  startTime: number;
  isComplete: boolean;
  tableauPiles: Card[][];
  foundationPiles: Card[][];
  freeCells: (Card | null)[];
  difficulty: FreeCellDifficulty;
  bestScores: Record<FreeCellDifficulty, number>;
  gamesPlayed: number;
  gamesWon: number;
}

export type FreeCellDifficulty = 'easy' | 'medium' | 'hard';

export interface FreeCellGameAction {
  type: 'move';
  from: {
    type: 'tableau' | 'freeCell';
    index: number;
    cardIndex?: number;
  };
  to: {
    type: 'tableau' | 'foundation' | 'freeCell';
    index: number;
  };
  cards: Card[];
}

export const isValidFreeCellMove = (
  cards: Card[],
  targetPile: Card[],
  freeCells: (Card | null)[],
  tableauPiles: Card[][]
): boolean => {
  // Check if we have enough free cells and empty columns for the move
  const emptyFreeCells = freeCells.filter(cell => cell === null).length;
  const emptyColumns = tableauPiles.filter(pile => pile.length === 0).length;
  const maxMovableCards = (emptyFreeCells + 1) * Math.pow(2, emptyColumns);
  
  if (cards.length > maxMovableCards) return false;

  if (targetPile.length === 0) {
    return true; // Any card can be placed on an empty tableau
  }

  const [firstCard] = cards;
  const topCard = targetPile[targetPile.length - 1];
  
  return getCardColor(firstCard.suit) !== getCardColor(topCard.suit) &&
         getRankValue(firstCard.rank) === getRankValue(topCard.rank) - 1;
};

export const isValidFreeCellFoundationMove = (card: Card, targetPile: Card[]): boolean => {
  if (targetPile.length === 0) {
    return card.rank === 'A';
  }
  
  const topCard = targetPile[targetPile.length - 1];
  return card.suit === topCard.suit && 
         getRankValue(card.rank) === getRankValue(topCard.rank) + 1;
};

export const checkFreeCellWinCondition = (foundationPiles: Card[][]): boolean => {
  return foundationPiles.every(pile => pile.length === 13);
};

export const calculateFreeCellScore = (state: FreeCellGameState): number => {
  const timeBonus = Math.max(0, 500000 - (Date.now() - state.startTime)) / 1000;
  const difficultyMultiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2
  }[state.difficulty];
  
  return Math.floor((state.score + timeBonus) * difficultyMultiplier);
};

function getRankValue(rank: Rank): number {
  const rankValues: Record<Rank, number> = {
    'K': 13, 'Q': 12, 'J': 11, '10': 10, '9': 9,
    '8': 8, '7': 7, '6': 6, '5': 5, '4': 4,
    '3': 3, '2': 2, 'A': 1
  };
  return rankValues[rank];
}

function getCardColor(suit: Suit): 'red' | 'black' {
  return suit === '♥' || suit === '♦' ? 'red' : 'black';
}