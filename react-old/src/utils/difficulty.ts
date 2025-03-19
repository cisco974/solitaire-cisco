import { Card } from '../types/cards';

// Helper function to ensure a minimum number of face-up cards
function ensureMinimumFaceUpCards(piles: Card[][], minFaceUp: number): Card[][] {
  const newPiles = [...piles];
  
  for (let i = 0; i < newPiles.length; i++) {
    const pile = newPiles[i];
    let faceUpCount = pile.filter(card => card.faceUp).length;
    
    // Start from the bottom of the pile and flip cards until we meet the minimum
    let j = pile.length - 1;
    while (faceUpCount < minFaceUp && j >= 0) {
      if (!pile[j].faceUp) {
        pile[j].faceUp = true;
        faceUpCount++;
      }
      j--;
    }
  }
  
  return newPiles;
}

// Helper function to ensure favorable initial sequences
function arrangeFavorableSequences(piles: Card[][]): Card[][] {
  const newPiles = [...piles];
  
  for (let i = 0; i < newPiles.length; i++) {
    const pile = newPiles[i];
    // Sort face-up cards to create more favorable sequences
    const faceDown = pile.filter(card => !card.faceUp);
    const faceUp = pile.filter(card => card.faceUp);
    
    // Sort face-up cards by rank to create more potential moves
    faceUp.sort((a, b) => getRankValue(b.rank) - getRankValue(a.rank));
    
    newPiles[i] = [...faceDown, ...faceUp];
  }
  
  return newPiles;
}

// Helper function to get rank value
function getRankValue(rank: string): number {
  const values: Record<string, number> = {
    'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
    '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
  };
  return values[rank];
}

export function applyDifficulty(
  piles: Card[][],
  difficulty: 'easy' | 'medium' | 'hard',
  gameType: 'klondike' | 'spider' | 'freecell'
): Card[][] {
  let modifiedPiles = [...piles];

  switch (difficulty) {
    case 'easy':
      // More face-up cards and favorable sequences
      switch (gameType) {
        case 'klondike':
          modifiedPiles = ensureMinimumFaceUpCards(modifiedPiles, 3);
          modifiedPiles = arrangeFavorableSequences(modifiedPiles);
          break;
        case 'spider':
          modifiedPiles = ensureMinimumFaceUpCards(modifiedPiles, 4);
          modifiedPiles = arrangeFavorableSequences(modifiedPiles);
          break;
        case 'freecell':
          modifiedPiles = ensureMinimumFaceUpCards(modifiedPiles, 5);
          modifiedPiles = arrangeFavorableSequences(modifiedPiles);
          break;
      }
      break;

    case 'medium':
      // Standard game rules, no modifications
      break;

    case 'hard':
      // Fewer face-up cards and more challenging sequences
      switch (gameType) {
        case 'klondike':
          // Only the top card is face up
          modifiedPiles = ensureMinimumFaceUpCards(modifiedPiles, 1);
          break;
        case 'spider':
          // Minimum face-up cards
          modifiedPiles = ensureMinimumFaceUpCards(modifiedPiles, 2);
          break;
        case 'freecell':
          // Only essential cards are face up
          modifiedPiles = ensureMinimumFaceUpCards(modifiedPiles, 3);
          break;
      }
      break;
  }

  return modifiedPiles;
}