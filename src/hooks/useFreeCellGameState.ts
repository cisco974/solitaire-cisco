'use client';

import { create } from 'zustand';
import { Card } from '@/types/cards';
import { FreeCellGameState, FreeCellGameAction, FreeCellDifficulty } from '@/types/freecellCards';

interface FreeCellGameStore {
  gameState: FreeCellGameState;
  updateState: (newState: Partial<FreeCellGameState>) => void;
  addMove: (action: FreeCellGameAction) => void;
  undo: () => void;
  redo: () => void;
  setDifficulty: (difficulty: FreeCellDifficulty) => void;
  updateStats: (won: boolean) => void;
  canUndo: boolean;
  canRedo: boolean;
}

const defaultState: FreeCellGameState = {
  score: 0,
  moves: 0,
  startTime: Date.now(),
  isComplete: false,
  tableauPiles: Array(8).fill([]),
  foundationPiles: Array(4).fill([]),
  freeCells: Array(4).fill(null),
  difficulty: 'medium',
  bestScores: {
    easy: 0,
    medium: 0,
    hard: 0
  },
  gamesPlayed: 0,
  gamesWon: 0
};

export const useFreeCellGameState = create<FreeCellGameStore>((set, get) => ({
  gameState: defaultState,
  updateState: (newState) => set((state) => ({
    gameState: { ...state.gameState, ...newState }
  })),
  addMove: (action) => {
    // Add move implementation
    // This would store the move in a history array for undo/redo
  },
  undo: () => {
    // Undo implementation
    // This would revert the last move from history
  },
  redo: () => {
    // Redo implementation
    // This would reapply a previously undone move
  },
  setDifficulty: (difficulty) => set((state) => ({
    gameState: { ...state.gameState, difficulty }
  })),
  updateStats: (won) => {
    const state = get().gameState;
    set({
      gameState: {
        ...state,
        gamesPlayed: state.gamesPlayed + 1,
        gamesWon: state.gamesWon + (won ? 1 : 0),
        bestScores: {
          ...state.bestScores,
          [state.difficulty]: won ? Math.max(state.bestScores[state.difficulty], state.score) : state.bestScores[state.difficulty]
        }
      }
    });
  },
  canUndo: false,
  canRedo: false
}));