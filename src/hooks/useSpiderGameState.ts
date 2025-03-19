'use client';

import { create } from 'zustand';
import { Card } from '@/types/cards';
import { SpiderGameState, SpiderGameAction, SpiderDifficulty, SpiderMode } from '@/types/spiderCards';

interface SpiderGameStore {
  gameState: SpiderGameState;
  history: SpiderGameAction[];
  historyIndex: number;
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
  history: [],
  historyIndex: -1,
  updateState: (newState) => set((state) => ({
    gameState: { ...state.gameState, ...newState }
  })),
  addMove: (action) => {
    set((state) => {
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), action];
      return {
        history: newHistory,
        historyIndex: state.historyIndex + 1,
        canUndo: true,
        canRedo: false
      };
    });
  },
  undo: () => {
    const state = get();
    if (state.historyIndex < 0) return;

    const action = state.history[state.historyIndex];
    const { from, to, cards } = action;

    const newState = { ...state.gameState };
    newState.tableauPiles = state.gameState.tableauPiles.map(pile => [...pile]);
    newState.foundationPiles = [...state.gameState.foundationPiles];

    if (to.type === 'tableau') {
      newState.tableauPiles[to.index] = newState.tableauPiles[to.index].slice(0, -cards.length);
    } else if (to.type === 'foundation') {
      newState.foundationPiles = newState.foundationPiles.slice(0, -1);
    }

    if (from.type === 'tableau') {
      if (from.cardIndex !== undefined) {
        newState.tableauPiles[from.index] = newState.tableauPiles[from.index].slice(0, from.cardIndex);
      }
      newState.tableauPiles[from.index] = [...newState.tableauPiles[from.index], ...cards];
    }

    set({
      gameState: {
        ...newState,
        moves: state.gameState.moves + 1,
        score: Math.max(0, state.gameState.score - 10)
      },
      historyIndex: state.historyIndex - 1,
      canUndo: state.historyIndex > 0,
      canRedo: true
    });
  },
  redo: () => {
    const state = get();
    if (state.historyIndex >= state.history.length - 1) return;

    const action = state.history[state.historyIndex + 1];
    const { from, to, cards } = action;

    const newState = { ...state.gameState };
    newState.tableauPiles = state.gameState.tableauPiles.map(pile => [...pile]);
    newState.foundationPiles = [...state.gameState.foundationPiles];

    if (from.type === 'tableau') {
      if (from.cardIndex !== undefined) {
        newState.tableauPiles[from.index] = newState.tableauPiles[from.index].slice(0, from.cardIndex);
      } else {
        newState.tableauPiles[from.index] = newState.tableauPiles[from.index].slice(0, -cards.length);
      }
    }

    if (to.type === 'tableau') {
      newState.tableauPiles[to.index] = [...newState.tableauPiles[to.index], ...cards];
    } else if (to.type === 'foundation') {
      newState.foundationPiles = [...newState.foundationPiles, cards];
    }

    set({
      gameState: {
        ...newState,
        moves: state.gameState.moves + 1,
        score: state.gameState.score + 10
      },
      historyIndex: state.historyIndex + 1,
      canUndo: true,
      canRedo: state.historyIndex < state.history.length - 2
    });
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