'use client';

import { create } from 'zustand';
import { Card } from '@/types/cards';
import { SpiderGameState, SpiderGameAction, SpiderDifficulty, SpiderMode } from '@/types/spiderCards';

interface SpiderGameStore {
  gameState: SpiderGameState;
  updateState: (newState: Partial<SpiderGameState>) => void;
  addMove: (action: SpiderGameAction) => void;
  undo: () => void;
  redo: () => void;
  setDifficulty: (difficulty: SpiderDifficulty) => void;
  setMode: (mode: SpiderMode) => void;
  updateStats: (won: boolean) => void;
  canUndo: boolean;
  canRedo: boolean;
}

const defaultState: SpiderGameState = {
  score: 0,
  moves: 0,
  startTime: Date.now(),
  isComplete: false,
  tableauPiles: Array(10).fill([]),
  foundationPiles: [],
  stock: [],
  difficulty: 'medium',
  mode: '1-suit',
  bestScores: {
    beginner: 0,
    medium: 0,
    expert: 0
  },
  gamesPlayed: 0,
  gamesWon: 0
};

export const useSpiderGameState = create<SpiderGameStore>((set, get) => ({
  gameState: defaultState,
  updateState: (newState) => set((state) => ({
    gameState: { ...state.gameState, ...newState }
  })),
  addMove: (action) => {
    // Add move implementation
  },
  undo: () => {
    // Undo implementation
  },
  redo: () => {
    // Redo implementation
  },
  setDifficulty: (difficulty) => set((state) => ({
    gameState: { ...state.gameState, difficulty }
  })),
  setMode: (mode) => set((state) => ({
    gameState: { ...state.gameState, mode }
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