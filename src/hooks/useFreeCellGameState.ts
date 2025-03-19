'use client';

import { create } from 'zustand';
import { Card } from '@/types/cards';
import { FreeCellGameState, FreeCellGameAction, FreeCellDifficulty } from '@/types/freecellCards';

interface FreeCellGameStore {
  gameState: FreeCellGameState;
  history: FreeCellGameAction[];
  historyIndex: number;
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
    newState.foundationPiles = state.gameState.foundationPiles.map(pile => [...pile]);
    newState.freeCells = [...state.gameState.freeCells];

    if (to.type === 'tableau') {
      newState.tableauPiles[to.index] = newState.tableauPiles[to.index].slice(0, -cards.length);
    } else if (to.type === 'foundation') {
      newState.foundationPiles[to.index] = newState.foundationPiles[to.index].slice(0, -1);
    } else if (to.type === 'freeCell') {
      newState.freeCells[to.index] = null;
    }

    if (from.type === 'tableau') {
      if (from.cardIndex !== undefined) {
        newState.tableauPiles[from.index] = newState.tableauPiles[from.index].slice(0, from.cardIndex);
      }
      newState.tableauPiles[from.index] = [...newState.tableauPiles[from.index], ...cards];
    } else if (from.type === 'freeCell') {
      newState.freeCells[from.index] = cards[0];
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
    newState.foundationPiles = state.gameState.foundationPiles.map(pile => [...pile]);
    newState.freeCells = [...state.gameState.freeCells];

    if (from.type === 'tableau') {
      if (from.cardIndex !== undefined) {
        newState.tableauPiles[from.index] = newState.tableauPiles[from.index].slice(0, from.cardIndex);
      } else {
        newState.tableauPiles[from.index] = newState.tableauPiles[from.index].slice(0, -cards.length);
      }
    } else if (from.type === 'freeCell') {
      newState.freeCells[from.index] = null;
    }

    if (to.type === 'tableau') {
      newState.tableauPiles[to.index] = [...newState.tableauPiles[to.index], ...cards];
    } else if (to.type === 'foundation') {
      newState.foundationPiles[to.index] = [...newState.foundationPiles[to.index], ...cards];
    } else if (to.type === 'freeCell') {
      newState.freeCells[to.index] = cards[0];
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