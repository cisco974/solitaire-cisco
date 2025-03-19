'use client';

export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
export type Color = 'red' | 'black';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type KlondikeMode = 'draw-1' | 'draw-3';

export interface Card {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
}

export interface ValidMove {
  from: {
    type: 'tableau' | 'waste' | 'foundation';
    index: number;
    cardIndex?: number;
  };
  to: {
    type: 'tableau' | 'foundation';
    index: number;
  };
  cards: Card[];
}

export interface GameState {
  score: number;
  moves: number;
  startTime: number;
  isComplete: boolean;
  tableauPiles: Card[][];
  foundationPiles: Card[][];
  stock: Card[];
  waste: Card[];
  difficulty: Difficulty;
  mode: KlondikeMode;
  bestScores: Record<Difficulty, number>;
  gamesPlayed: number;
  gamesWon: number;
}

export interface GameAction {
  type: 'move';
  from: {
    type: 'tableau' | 'waste' | 'foundation';
    index: number;
    cardIndex?: number;
  };
  to: {
    type: 'tableau' | 'foundation';
    index: number;
  };
  cards: Card[];
}

export const getRankValue = (rank: Rank): number => {
  const rankValues: Record<Rank, number> = {
    'A': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13
  };
  return rankValues[rank];
};

export const getCardColor = (suit: Suit): Color => {
  return suit === '♥' || suit === '♦' ? 'red' : 'black';
};

export const isValidFoundationMove = (card: Card, targetPile: Card[]): boolean => {
  if (targetPile.length === 0) {
    return card.rank === 'A';
  }
  
  const topCard = targetPile[targetPile.length - 1];
  return card.suit === topCard.suit && 
         getRankValue(card.rank) === getRankValue(topCard.rank) + 1;
};

export const isValidTableauMove = (cards: Card[], targetPile: Card[]): boolean => {
  const [firstCard] = cards;
  
  if (targetPile.length === 0) {
    return firstCard.rank === 'K';
  }
  
  const topCard = targetPile[targetPile.length - 1];
  return getCardColor(firstCard.suit) !== getCardColor(topCard.suit) && 
         getRankValue(firstCard.rank) === getRankValue(topCard.rank) - 1;
};

export const isPartOfDescendingSequence = (cards: Card[], index: number, requireSameSuit: boolean = false): boolean => {
  if (index === cards.length - 1) return true;
  
  const currentCard = cards[index];
  const nextCard = cards[index + 1];
  
  if (!currentCard.faceUp || !nextCard.faceUp) return false;
  
  const isDescending = getRankValue(currentCard.rank) === getRankValue(nextCard.rank) + 1;
  
  if (requireSameSuit) {
    return isDescending && currentCard.suit === nextCard.suit;
  } else {
    return isDescending && getCardColor(currentCard.suit) !== getCardColor(nextCard.suit);
  }
};

export const findValidMoves = (state: GameState): ValidMove[] => {
  const validMoves: ValidMove[] = [];

  // Check tableau piles for valid foundation moves
  for (let i = 0; i < state.tableauPiles.length; i++) {
    const pile = state.tableauPiles[i];
    if (pile.length === 0) continue;

    const card = pile[pile.length - 1];
    if (!card.faceUp) continue;

    // Check each foundation pile
    for (let j = 0; j < state.foundationPiles.length; j++) {
      if (isValidFoundationMove(card, state.foundationPiles[j])) {
        validMoves.push({
          from: { type: 'tableau', index: i },
          to: { type: 'foundation', index: j },
          cards: [card]
        });
      }
    }

    // Check moves to other tableau piles
    for (let j = 0; j < state.tableauPiles.length; j++) {
      if (i === j) continue;
      if (isValidTableauMove([card], state.tableauPiles[j])) {
        validMoves.push({
          from: { type: 'tableau', index: i },
          to: { type: 'tableau', index: j },
          cards: [card]
        });
      }
    }
  }

  // Check waste pile for valid moves
  if (state.waste.length > 0) {
    const card = state.waste[state.waste.length - 1];
    
    // Check foundation piles
    for (let j = 0; j < state.foundationPiles.length; j++) {
      if (isValidFoundationMove(card, state.foundationPiles[j])) {
        validMoves.push({
          from: { type: 'waste', index: 0 },
          to: { type: 'foundation', index: j },
          cards: [card]
        });
      }
    }

    // Check tableau piles
    for (let j = 0; j < state.tableauPiles.length; j++) {
      if (isValidTableauMove([card], state.tableauPiles[j])) {
        validMoves.push({
          from: { type: 'waste', index: 0 },
          to: { type: 'tableau', index: j },
          cards: [card]
        });
      }
    }
  }

  return validMoves;
};

export const checkWinCondition = (foundationPiles: Card[][]): boolean => {
  return foundationPiles.every(pile => pile.length === 13);
};